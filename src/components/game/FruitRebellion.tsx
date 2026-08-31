import { useEffect, useRef, useState } from "react";
import {
  Heart,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  Users,
  User,
  ChevronLeft,
  HelpCircle,
} from "lucide-react";
import { FRUIT_ORDER, FRUITS, LEVELS, WORLDS, type FruitId } from "@/game/data";
import { FruitEngine } from "@/game/engine";
import { GameAudio } from "@/game/audio";
import { loadSave, writeSave, type SaveData } from "@/game/save";
import type { HudSnap } from "@/game/sim";
import { TouchPad } from "./TouchPad";

type Screen = "title" | "mode" | "howto" | "chars" | "play" | "complete";

const SPRITE: Record<FruitId, string> = {
  lemon: "/sprites/lemon.png",
  watermelon: "/sprites/watermelon.png",
  grape: "/sprites/grape.png",
  pineapple: "/sprites/pineapple.png",
  strawberry: "/sprites/strawberry.png",
};

export function FruitRebellion() {
  const [save, setSave] = useState<SaveData>({
    version: 1,
    unlocked: 0,
    highScore: 0,
    seenHowTo: false,
    muted: false,
  });
  const [screen, setScreen] = useState<Screen>("title");
  const [players, setPlayers] = useState<1 | 2>(1);
  const [levelIndex, setLevelIndex] = useState(0);
  const [p1, setP1] = useState<FruitId>("lemon");
  const [p2, setP2] = useState<FruitId>("strawberry");
  const [picking, setPicking] = useState<0 | 1>(0);
  const [hud, setHud] = useState<HudSnap | null>(null);
  const [paused, setPaused] = useState(false);
  const [over, setOver] = useState<"win" | "lose" | null>(null);
  const [carryScore, setCarryScore] = useState(0);
  const audioRef = useRef<GameAudio | null>(null);
  if (!audioRef.current) audioRef.current = new GameAudio();
  const audio = audioRef.current;

  useEffect(() => {
    setSave(loadSave());
  }, []);

  useEffect(() => {
    audio.setMuted(save.muted);
  }, [audio, save.muted]);

  useEffect(() => {
    const onVis = () => {
      if (!document.hidden) audio.resume();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [audio]);

  const persist = (next: SaveData) => {
    setSave(next);
    writeSave(next);
  };

  const unlockAudio = () => {
    try {
      audio.unlock();
    } catch {
      /* ignore */
    }
  };

  const goChars = (fromLevel = levelIndex) => {
    setLevelIndex(fromLevel);
    setPicking(0);
    setOver(null);
    setPaused(false);
    setScreen("chars");
  };

  const startPlay = () => {
    unlockAudio();
    setHud(null);
    setOver(null);
    setPaused(false);
    setScreen("play");
  };

  return (
    <div className="relative min-h-dvh overflow-hidden bg-bg text-fg">
      <div className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: kitchenBg }} />
      {screen === "title" && (
        <Title
          highScore={save.highScore}
          unlocked={save.unlocked}
          onPlay={() => {
            unlockAudio();
            setScreen("mode");
          }}
          onHowTo={() => {
            unlockAudio();
            setScreen("howto");
          }}
        />
      )}
      {screen === "mode" && (
        <ModeSelect
          onBack={() => setScreen("title")}
          onPick={(n) => {
            setPlayers(n);
            if (!save.seenHowTo) {
              persist({ ...save, seenHowTo: true });
              setScreen("howto");
            } else goChars(Math.min(save.unlocked, LEVELS.length - 1));
          }}
        />
      )}
      {screen === "howto" && (
        <HowTo
          onBack={() => setScreen(players ? "mode" : "title")}
          onContinue={() => goChars(Math.min(save.unlocked, LEVELS.length - 1))}
        />
      )}
      {screen === "chars" && (
        <CharSelect
          players={players}
          picking={picking}
          p1={p1}
          p2={p2}
          level={LEVELS[levelIndex]!}
          onPick={(id) => {
            if (picking === 0) setP1(id);
            else setP2(id);
          }}
          onBack={() => setScreen("mode")}
          onConfirm={() => {
            if (players === 2 && picking === 0) setPicking(1);
            else startPlay();
          }}
        />
      )}
      {screen === "play" && (
        <PlayView
          key={`${levelIndex}-${p1}-${p2}-${players}`}
          levelIndex={levelIndex}
          p1Fruit={p1}
          p2Fruit={p2}
          players={players}
          score={carryScore}
          audio={audio}
          muted={save.muted}
          hud={hud}
          paused={paused || !!hud?.paused}
          over={over}
          onHud={setHud}
          onOver={(s, score) => {
            setOver(s);
            setCarryScore(score);
            if (s === "win") {
              const unlocked = Math.max(save.unlocked, levelIndex + 1);
              persist({ ...save, unlocked, highScore: Math.max(save.highScore, score) });
            } else {
              persist({ ...save, highScore: Math.max(save.highScore, score) });
            }
          }}
          onPause={(v) => setPaused(v)}
          onMute={() => persist({ ...save, muted: !save.muted })}
          onMenu={() => {
            setCarryScore(0);
            setScreen("title");
          }}
          onRetry={() => {
            setCarryScore(0);
            goChars(levelIndex);
          }}
          onNext={() => {
            const next = levelIndex + 1;
            if (next >= LEVELS.length) {
              setScreen("complete");
              return;
            }
            goChars(next);
          }}
        />
      )}
      {screen === "complete" && (
        <Complete score={carryScore} onMenu={() => { setCarryScore(0); setScreen("title"); }} />
      )}
    </div>
  );
}

const kitchenBg =
  "radial-gradient(ellipse at top, color-mix(in oklab, var(--color-elevated) 70%, transparent), transparent 55%), repeating-linear-gradient(90deg, color-mix(in oklab, var(--color-fg) 4%, transparent) 0 1px, transparent 1px 48px), repeating-linear-gradient(0deg, color-mix(in oklab, var(--color-fg) 4%, transparent) 0 1px, transparent 1px 48px)";

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-xl border border-border bg-surface/92 p-6 shadow-[var(--shadow-panel)] ${className}`}
    >
      {children}
    </div>
  );
}

function Btn({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "danger";
  className?: string;
  type?: "button";
}) {
  const styles =
    variant === "primary"
      ? "bg-accent text-accent-fg hover:brightness-110"
      : variant === "danger"
        ? "bg-berry text-fg hover:brightness-110"
        : "bg-elevated text-fg border border-border-strong hover:bg-surface";
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 font-semibold tracking-tight transition-transform duration-[var(--motion-quick)] ease-[var(--ease-out)] active:scale-[0.98] ${styles} ${className}`}
    >
      {children}
    </button>
  );
}

function Title({
  highScore,
  unlocked,
  onPlay,
  onHowTo,
}: {
  highScore: number;
  unlocked: number;
  onPlay: () => void;
  onHowTo: () => void;
}) {
  return (
    <main className="relative z-10 mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center gap-8 px-5 py-10">
      <div className="flex gap-2">
        {FRUIT_ORDER.map((id) => (
          <img
            key={id}
            src={SPRITE[id]}
            alt=""
            className="h-16 w-16 object-contain drop-shadow-lg sm:h-20 sm:w-20"
          />
        ))}
      </div>
      <div className="text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-muted">Campanha cooperativa</p>
        <h1 className="font-display text-5xl font-semibold leading-none tracking-[-0.04em] text-fg sm:text-6xl">
          Fruit Rebellion
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted">
          O Rei do Açúcar corrompeu a despensa. Escolha uma fruta, bloqueie caminhos e liberte o reino da comida.
        </p>
      </div>
      <div className="flex w-full max-w-sm flex-col gap-3">
        <Btn onClick={onPlay} className="w-full">
          <Play className="size-4" strokeWidth={2.4} />
          Jogar
        </Btn>
        <Btn variant="ghost" onClick={onHowTo} className="w-full">
          <HelpCircle className="size-4" />
          Como jogar
        </Btn>
      </div>
      <p className="text-sm text-subtle">
        Recorde {highScore} · Fase {Math.min(unlocked + 1, LEVELS.length)}/{LEVELS.length}
      </p>
    </main>
  );
}

function ModeSelect({ onPick, onBack }: { onPick: (n: 1 | 2) => void; onBack: () => void }) {
  return (
    <main className="relative z-10 mx-auto flex min-h-dvh max-w-2xl flex-col justify-center gap-6 px-5 py-10">
      <button type="button" onClick={onBack} className="inline-flex items-center gap-1 text-sm text-muted">
        <ChevronLeft className="size-4" /> Voltar
      </button>
      <h2 className="font-display text-3xl tracking-tight">Modo</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => onPick(1)}
          className="rounded-lg border border-border bg-surface p-5 text-left transition-colors hover:border-border-strong"
        >
          <User className="mb-3 size-6 text-accent" />
          <h3 className="font-display text-xl">1 jogador</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Campanha solo. Cada fase apresenta um doce novo, depois mistura dois ou três tipos.
          </p>
        </button>
        <button
          type="button"
          onClick={() => onPick(2)}
          className="rounded-lg border border-border bg-surface p-5 text-left transition-colors hover:border-border-strong"
        >
          <Users className="mb-3 size-6 text-accent" />
          <h3 className="font-display text-xl">2 jogadores</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Cooperativo local. P1 usa WASD, P2 usa as setas. Bloqueiem caminhos juntos.
          </p>
        </button>
      </div>
    </main>
  );
}

function HowTo({ onContinue, onBack }: { onContinue: () => void; onBack: () => void }) {
  return (
    <main className="relative z-10 mx-auto flex min-h-dvh max-w-xl flex-col justify-center gap-6 px-5 py-10">
      <button type="button" onClick={onBack} className="inline-flex items-center gap-1 text-sm text-muted">
        <ChevronLeft className="size-4" /> Voltar
      </button>
      <h2 className="font-display text-3xl tracking-tight">Como jogar</h2>
      <Panel className="space-y-4 text-sm leading-relaxed text-muted">
        <p>
          Movimento em grade, no estilo labirinto. O objetivo de cada fase é eliminar todos os doces — prendendo-os com
          caixas, usando o poder da fruta ou desviando até eles se encurralarem.
        </p>
        <ul className="space-y-2">
          <li>
            <span className="font-semibold text-fg">P1</span> — WASD mover · Espaço poder · E caixa
          </li>
          <li>
            <span className="font-semibold text-fg">P2</span> — Setas mover · Enter poder · Shift direito caixa
          </li>
          <li>Toque: cruz direcional + Poder + Caixa. Controle também aceito.</li>
        </ul>
        <p>
          Três vidas por fase. Contato com um doce ou projétil custa uma vida. Inimigos presos por caixas são esmagados.
        </p>
      </Panel>
      <Btn onClick={onContinue}>Escolher fruta</Btn>
    </main>
  );
}

function CharSelect({
  players,
  picking,
  p1,
  p2,
  level,
  onPick,
  onConfirm,
  onBack,
}: {
  players: 1 | 2;
  picking: 0 | 1;
  p1: FruitId;
  p2: FruitId;
  level: (typeof LEVELS)[number];
  onPick: (id: FruitId) => void;
  onConfirm: () => void;
  onBack: () => void;
}) {
  const selected = picking === 0 ? p1 : p2;
  const def = FRUITS[selected];
  return (
    <main className="relative z-10 mx-auto flex min-h-dvh max-w-3xl flex-col justify-center gap-6 px-5 py-8">
      <button type="button" onClick={onBack} className="inline-flex items-center gap-1 text-sm text-muted">
        <ChevronLeft className="size-4" /> Voltar
      </button>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
          {WORLDS[level.world].name} · {level.id}
        </p>
        <h2 className="font-display text-3xl tracking-tight">
          {players === 2 ? `Jogador ${picking + 1}, escolha` : "Escolha sua fruta"}
        </h2>
        <p className="mt-1 text-sm text-muted">{level.name} — {level.intro}</p>
      </div>
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {FRUIT_ORDER.map((id) => {
          const active = selected === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onPick(id)}
              className={`flex min-h-20 flex-col items-center rounded-lg border bg-elevated p-2 transition-colors ${
                active ? "border-accent" : "border-border hover:border-border-strong"
              }`}
            >
              <img src={SPRITE[id]} alt={FRUITS[id].name} className="h-12 w-12 object-contain sm:h-16 sm:w-16" />
              <span className="mt-1 text-xs font-semibold">{FRUITS[id].name}</span>
            </button>
          );
        })}
      </div>
      <Panel>
        <p className="font-display text-xl">{def.name}</p>
        <p className="text-sm text-subtle">{def.role}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">{def.power}</p>
      </Panel>
      <Btn onClick={onConfirm} className="self-start">
        {players === 2 && picking === 0 ? "Jogador 2" : "Entrar na fase"}
      </Btn>
    </main>
  );
}

function PlayView({
  levelIndex,
  p1Fruit,
  p2Fruit,
  players,
  score,
  audio,
  muted,
  hud,
  paused,
  over,
  onHud,
  onOver,
  onPause,
  onMute,
  onMenu,
  onRetry,
  onNext,
}: {
  levelIndex: number;
  p1Fruit: FruitId;
  p2Fruit: FruitId;
  players: 1 | 2;
  score: number;
  audio: GameAudio;
  muted: boolean;
  hud: HudSnap | null;
  paused: boolean;
  over: "win" | "lose" | null;
  onHud: (h: HudSnap) => void;
  onOver: (s: "win" | "lose", score: number) => void;
  onPause: (v: boolean) => void;
  onMute: () => void;
  onMenu: () => void;
  onRetry: () => void;
  onNext: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<FruitEngine | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const onOverRef = useRef(onOver);
  const onHudRef = useRef(onHud);
  onOverRef.current = onOver;
  onHudRef.current = onHud;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;
    const fruits: FruitId[] = players === 2 ? [p1Fruit, p2Fruit] : [p1Fruit];
    const engine = new FruitEngine(canvas, {
      audio,
      onHud: (h) => onHudRef.current(h),
      onOver: (s, sc) => onOverRef.current(s, sc),
    });
    engineRef.current = engine;
    void engine.start(levelIndex, fruits, players, score).then(() => {
      if (cancelled) engine.destroy();
    });
    return () => {
      cancelled = true;
      engine.destroy();
      engineRef.current = null;
    };
  }, [audio, levelIndex, p1Fruit, p2Fruit, players, score]);

  useEffect(() => {
    engineRef.current?.setPaused(paused || !!over);
  }, [paused, over]);

  const lives = hud?.lives ?? 3;
  const level = LEVELS[levelIndex]!;

  return (
    <div className="relative flex min-h-dvh flex-col">
      <header className="z-10 flex items-center gap-3 border-b border-border bg-bg/80 px-3 py-2 backdrop-blur-sm">
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            {WORLDS[level.world].name} · {level.id}
          </p>
          <p className="truncate font-display text-lg leading-tight">{level.name}</p>
        </div>
        <div className="flex items-center gap-1" aria-label="Vidas">
          {Array.from({ length: 3 }).map((_, i) => (
            <Heart
              key={i}
              className={`size-5 ${i < lives ? "fill-berry text-berry" : "text-subtle"}`}
              strokeWidth={2}
            />
          ))}
        </div>
        <p className="w-16 text-right font-display text-lg tabular-nums">{hud?.score ?? score}</p>
        <p className="hidden text-sm text-muted sm:block">{hud?.enemies ?? 0} doces</p>
        <p className="hidden text-xs text-subtle lg:block">WASD · Espaço · E</p>
        <button
          type="button"
          className="grid size-11 place-items-center rounded-md border border-border bg-elevated"
          onClick={onMute}
          aria-label={muted ? "Ativar som" : "Silenciar"}
        >
          {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
        </button>
        <button
          type="button"
          className="grid size-11 place-items-center rounded-md border border-border bg-elevated"
          onClick={() => onPause(true)}
          aria-label="Pausar"
        >
          <Pause className="size-4" />
        </button>
      </header>

      <div className="relative flex min-h-0 flex-1 flex-col">
        <div
          ref={wrapRef}
          className="relative min-h-[280px] flex-1 touch-none"
          onPointerDown={() => canvasRef.current?.focus({ preventScroll: true })}
        >
          <canvas
            ref={canvasRef}
            tabIndex={0}
            className="block h-full w-full touch-none bg-bg outline-none"
            style={{ touchAction: "none" }}
          />
          {hud?.message && !over && (
            <div className="pointer-events-none absolute inset-x-0 top-4 flex justify-center px-4">
              <p className="rounded-md border border-border bg-surface/90 px-4 py-2 text-center text-sm text-fg">
                {hud.message}
              </p>
            </div>
          )}
          <TouchPad
            onDir={(d) => {
              const eng = engineRef.current;
              if (eng) eng.input.touchDir = d;
            }}
            onPower={(v) => {
              const eng = engineRef.current;
              if (eng) eng.input.touchPower = v;
            }}
            onCrate={(v) => {
              const eng = engineRef.current;
              if (eng) eng.input.touchCrate = v;
            }}
          />
        </div>
      </div>

      {(paused || over) && (
        <div className="absolute inset-0 z-20 grid place-items-center bg-bg/70 px-5">
          <Panel className="w-full max-w-sm text-center">
            <h2 className="font-display text-3xl">
              {over === "win" ? "Fase limpa" : over === "lose" ? "Fim de jogo" : "Pausa"}
            </h2>
            <p className="mt-2 text-sm text-muted">
              {over === "win"
                ? "Os doces foram derretidos. Escolha a próxima fruta."
                : over === "lose"
                  ? "O açúcar venceu desta vez."
                  : "O labirinto espera."}
            </p>
            <p className="mt-3 font-display text-2xl tabular-nums">{hud?.score ?? score}</p>
            <div className="mt-5 flex flex-col gap-2">
              {over === "win" && <Btn onClick={onNext}>{levelIndex + 1 >= LEVELS.length ? "Final" : "Próxima fase"}</Btn>}
              {over === "lose" && (
                <Btn onClick={onRetry}>
                  <RotateCcw className="size-4" /> Tentar de novo
                </Btn>
              )}
              {!over && (
                <Btn
                  onClick={() => {
                    onPause(false);
                    engineRef.current?.setPaused(false);
                    if (engineRef.current) engineRef.current.sim.paused = false;
                  }}
                >
                  Continuar
                </Btn>
              )}
              <Btn variant="ghost" onClick={onMenu}>
                Menu
              </Btn>
            </div>
          </Panel>
        </div>
      )}
    </div>
  );
}

function Complete({ score, onMenu }: { score: number; onMenu: () => void }) {
  return (
    <main className="mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center gap-6 px-5 text-center">
      <h1 className="font-display text-4xl tracking-tight">Reino libertado</h1>
      <p className="text-muted">O Rei do Açúcar perdeu o trono. As frutas voltam à despensa.</p>
      <p className="font-display text-3xl tabular-nums">{score}</p>
      <Btn onClick={onMenu}>Menu</Btn>
    </main>
  );
}

