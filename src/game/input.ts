import { type Dir } from "./data";

export type PlayerActions = {
  dir: Dir | null;
  power: boolean;
  crate: boolean;
  pause: boolean;
};

const P1_DIRS: Record<string, Dir> = {
  KeyW: 0,
  KeyD: 1,
  KeyS: 2,
  KeyA: 3,
};
const P2_DIRS: Record<string, Dir> = {
  ArrowUp: 0,
  ArrowRight: 1,
  ArrowDown: 2,
  ArrowLeft: 3,
};

function radialDeadzone(x: number, y: number, dz = 0.22) {
  const m = Math.hypot(x, y);
  if (m < dz) return { x: 0, y: 0 };
  const scale = (m - dz) / (1 - dz) / m;
  return { x: x * scale, y: y * scale };
}

function dirFromStick(x: number, y: number): Dir | null {
  if (x === 0 && y === 0) return null;
  if (Math.abs(x) > Math.abs(y)) return x > 0 ? 1 : 3;
  return y > 0 ? 2 : 0;
}

export class Input {
  keys = new Set<string>();
  injected: string[] | null = null;
  touchDir: Dir | null = null;
  touchPower = false;
  touchCrate = false;
  touchPause = false;
  private prevPower = [false, false];
  private prevCrate = [false, false];
  private prevPause = false;
  powerEdge = [false, false];
  crateEdge = [false, false];
  pauseEdge = false;

  attach() {
    const down = (e: KeyboardEvent) => {
      this.keys.add(e.code);
      if (
        e.code.startsWith("Arrow") ||
        e.code === "Space" ||
        e.code === "KeyW" ||
        e.code === "KeyA" ||
        e.code === "KeyS" ||
        e.code === "KeyD" ||
        e.code === "KeyE" ||
        e.code === "Enter"
      ) {
        e.preventDefault();
      }
    };
    const up = (e: KeyboardEvent) => {
      this.keys.delete(e.code);
    };
    const clear = () => this.keys.clear();
    const onVisibility = () => {
      if (document.hidden) this.keys.clear();
    };
    window.addEventListener("keydown", down, { capture: true });
    window.addEventListener("keyup", up, { capture: true });
    window.addEventListener("blur", clear);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("keydown", down, { capture: true });
      window.removeEventListener("keyup", up, { capture: true });
      window.removeEventListener("blur", clear);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }

  setKeys(codes: string[]) {
    this.injected = codes.length ? codes : null;
  }

  poll() {
    const k = this.injected ? new Set([...this.injected, ...this.keys]) : this.keys;
    const p1 = this.readPlayer(k, 0);
    const p2 = this.readPlayer(k, 1);
    this.powerEdge[0] = p1.power && !this.prevPower[0];
    this.powerEdge[1] = p2.power && !this.prevPower[1];
    this.crateEdge[0] = p1.crate && !this.prevCrate[0];
    this.crateEdge[1] = p2.crate && !this.prevCrate[1];
    this.pauseEdge = p1.pause && !this.prevPause;
    this.prevPower = [p1.power, p2.power];
    this.prevCrate = [p1.crate, p2.crate];
    this.prevPause = p1.pause;
    this.touchPause = false;
    return { p1, p2 };
  }

  private readPad(index: number): Gamepad | null {
    try {
      const pads = navigator.getGamepads?.();
      const pad = pads?.[index];
      if (!pad || pad.mapping !== "standard") return null;
      return pad;
    } catch {
      return null;
    }
  }

  private readPlayer(k: Set<string>, index: 0 | 1): PlayerActions {
    let dir: Dir | null = null;
    if (index === 0 && this.touchDir !== null) dir = this.touchDir;
    const table = index === 0 ? P1_DIRS : P2_DIRS;
    for (const [code, d] of Object.entries(table)) {
      if (k.has(code)) dir = d;
    }

    const pad = this.readPad(index);
    if (pad) {
      const ax = pad.axes ?? [];
      const stick = radialDeadzone(ax[0] ?? 0, ax[1] ?? 0);
      const fromStick = dirFromStick(stick.x, stick.y);
      if (fromStick !== null) dir = fromStick;
      const btns = pad.buttons ?? [];
      if (btns[12]?.pressed) dir = 0;
      if (btns[15]?.pressed) dir = 1;
      if (btns[13]?.pressed) dir = 2;
      if (btns[14]?.pressed) dir = 3;
    }

    const btns = pad?.buttons ?? [];
    const power =
      index === 0
        ? k.has("Space") || this.touchPower || !!btns[0]?.pressed
        : k.has("Enter") || k.has("NumpadEnter") || !!btns[0]?.pressed;
    const crate =
      index === 0
        ? k.has("KeyE") || k.has("ShiftLeft") || this.touchCrate || !!btns[1]?.pressed
        : k.has("ShiftRight") || k.has("Slash") || k.has("Numpad0") || !!btns[1]?.pressed;
    const pause = k.has("Escape") || this.touchPause || !!btns[9]?.pressed;

    return { dir, power, crate, pause };
  }
}
