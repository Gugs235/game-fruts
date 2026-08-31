import { useRef, type PointerEvent } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";
import type { Dir } from "@/game/data";

export function TouchPad({
  onDir,
  onPower,
  onCrate,
}: {
  onDir: (d: Dir | null) => void;
  onPower: (v: boolean) => void;
  onCrate: (v: boolean) => void;
}) {
  const held = useRef<Dir[]>([]);

  const setHeld = (d: Dir, on: boolean) => {
    const next = held.current.filter((x) => x !== d);
    if (on) next.push(d);
    held.current = next;
    onDir(next.length ? next[next.length - 1]! : null);
  };

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 px-3 pb-[max(10px,env(safe-area-inset-bottom))] pt-2">
      <div className="pointer-events-auto grid w-36 grid-cols-3 grid-rows-3 gap-1 sm:w-40">
        <span />
        <PadBtn label="Cima" onHold={(v) => setHeld(0, v)}>
          <ChevronUp className="size-5" />
        </PadBtn>
        <span />
        <PadBtn label="Esquerda" onHold={(v) => setHeld(3, v)}>
          <ChevronLeft className="size-5" />
        </PadBtn>
        <span />
        <PadBtn label="Direita" onHold={(v) => setHeld(1, v)}>
          <ChevronRight className="size-5" />
        </PadBtn>
        <span />
        <PadBtn label="Baixo" onHold={(v) => setHeld(2, v)}>
          <ChevronDown className="size-5" />
        </PadBtn>
        <span />
      </div>
      <div className="pointer-events-auto flex gap-3">
        <ActionBtn label="Caixa" onHold={onCrate} />
        <ActionBtn label="Poder" primary onHold={onPower} />
      </div>
    </div>
  );
}

function bindHold(onHold: (v: boolean) => void) {
  return {
    onPointerDown: (e: PointerEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      e.currentTarget.setPointerCapture(e.pointerId);
      onHold(true);
    },
    onPointerUp: (e: PointerEvent<HTMLButtonElement>) => {
      e.preventDefault();
      onHold(false);
    },
    onPointerCancel: () => onHold(false),
    onLostPointerCapture: () => onHold(false),
  };
}

function PadBtn({
  label,
  onHold,
  children,
}: {
  label: string;
  onHold: (v: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="grid h-12 w-12 place-items-center rounded-md border border-border bg-elevated/90 text-fg"
      style={{ touchAction: "none" }}
      {...bindHold(onHold)}
    >
      {children}
    </button>
  );
}

function ActionBtn({
  label,
  onHold,
  primary,
}: {
  label: string;
  onHold: (v: boolean) => void;
  primary?: boolean;
}) {
  return (
    <button
      type="button"
      className={`h-16 w-16 rounded-full border text-xs font-semibold ${
        primary ? "border-accent bg-accent text-accent-fg" : "border-border bg-elevated/90 text-fg"
      }`}
      style={{ touchAction: "none" }}
      {...bindHold(onHold)}
    >
      {label}
    </button>
  );
}
