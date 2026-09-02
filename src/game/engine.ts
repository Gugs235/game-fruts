import { STEP } from "./data";
import { GameAudio } from "./audio";
import { Input } from "./input";
import { loadSprites, renderSim, type SpriteMap } from "./render";
import { Sim, type HudSnap } from "./sim";
import type { FruitId } from "./data";

export class FruitEngine {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  sim: Sim;
  input: Input;
  audio: GameAudio;
  sprites: SpriteMap = {};
  private raf = 0;
  private acc = 0;
  private last = 0;
  private running = false;
  private dead = false;
  private frozenTime = 0;
  private unbind: (() => void) | null = null;
  onHud: (h: HudSnap) => void;
  onOver: (status: "win" | "lose", score: number) => void;
  private lastStatus: "play" | "win" | "lose" = "play";
  private hudAcc = 0;
  private overAt: number | null = null;
  private overFired = false;
  private overStatus: "win" | "lose" | null = null;

  constructor(
    canvas: HTMLCanvasElement,
    opts: {
      onHud: (h: HudSnap) => void;
      onOver: (status: "win" | "lose", score: number) => void;
      audio: GameAudio;
    },
  ) {
    this.canvas = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("canvas");
    this.ctx = ctx;
    this.onHud = opts.onHud;
    this.onOver = opts.onOver;
    this.audio = opts.audio;
    this.input = new Input();
    this.sim = new Sim({
      onSfx: (name) => {
        try {
          this.audio[name]();
        } catch {
          /* ignore sfx errors */
        }
      },
    });
  }

  async start(levelIndex: number, fruits: FruitId[], players: number, score: number) {
    const sprites = await loadSprites();
    if (this.dead) return;
    this.sprites = sprites;
    this.sim.load(levelIndex, fruits, players, score);
    this.unbind = this.input.attach();
    this.running = true;
    this.acc = 0;
    this.last = performance.now();
    this.frozenTime = this.last / 1000;
    this.lastStatus = "play";
    this.overAt = null;
    this.overFired = false;
    this.overStatus = null;
    this.wireProbe();
    this.canvas.tabIndex = 0;
    this.canvas.focus({ preventScroll: true });
    this.loop(this.last);
  }

  setPaused(v: boolean) {
    if (this.dead) return;
    this.sim.paused = v;
  }

  destroy() {
    this.dead = true;
    this.running = false;
    cancelAnimationFrame(this.raf);
    this.unbind?.();
    this.unbind = null;
    if (typeof window !== "undefined") delete window.__controlsTest;
  }

  private wireProbe() {
    if (typeof window === "undefined") return;
    window.__controlsTest = {
      getYaw: () => {
        const p = this.sim.playerPos();
        const yaw = [Math.PI / 2, 0, -Math.PI / 2, Math.PI][p.dir] ?? 0;
        return yaw;
      },
      getSpeed: () => this.sim.playerPos().speed,
      getX: () => this.sim.playerPos().x,
      getY: () => this.sim.playerPos().y,
      setKeys: (codes: string[]) => this.input.setKeys(codes),
    };
  }

  private loop = (now: number) => {
    if (!this.running || this.dead) return;
    this.raf = requestAnimationFrame(this.loop);
    try {
      let dt = (now - this.last) / 1000;
      this.last = now;
      if (dt > 0.1) dt = 0.1;
      this.acc += dt;
      while (this.acc >= STEP) {
        this.sim.step(STEP, this.input);
        this.acc -= STEP;
      }
      this.fit();
      const rect = this.canvas.getBoundingClientRect();
      const running = !this.sim.paused && this.sim.status === "play";
      if (running) this.frozenTime = now / 1000;
      if (rect.width > 0 && rect.height > 0) {
        renderSim(this.ctx, this.sim, this.sprites, rect.width, rect.height, this.frozenTime);
      }
      this.audio.tickMusic(
        dt,
        this.sim.level.world === "arena" || this.sim.level.world === "factory",
      );
      this.hudAcc += dt;
      if (this.hudAcc > 0.12) {
        this.hudAcc = 0;
        this.onHud(this.sim.hud());
      }
      if (this.sim.status !== "play" && this.lastStatus === "play") {
        this.lastStatus = this.sim.status;
        this.overStatus = this.sim.status;
        this.onHud(this.sim.hud());
        this.overAt = now;
      }
      if (this.overAt !== null && !this.overFired && now - this.overAt >= 2000) {
        this.overFired = true;
        this.onOver(this.overStatus!, this.sim.score);
      }
    } catch (err) {
      console.error("[fruit-rebellion]", err);
    }
  };

  private fit() {
    const parent = this.canvas.parentElement;
    const w = Math.max(1, parent?.clientWidth ?? 720);
    const h = Math.max(1, parent?.clientHeight ?? 528);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const bw = Math.floor(w * dpr);
    const bh = Math.floor(h * dpr);
    if (this.canvas.width !== bw || this.canvas.height !== bh) {
      this.canvas.width = bw;
      this.canvas.height = bh;
      this.canvas.style.width = `${w}px`;
      this.canvas.style.height = `${h}px`;
    }
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
}
