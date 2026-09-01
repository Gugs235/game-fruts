import { COLS, ROWS, ITEM_INFO, WORLDS, type FruitId, type ItemKind, type WorldId } from "./data";
import type { Entity, Particle, Sim } from "./sim";

export type SpriteMap = Record<string, HTMLImageElement>;

const SPRITE_URLS: Record<string, string> = {
  lemon: "/sprites/lemon.png",
  watermelon: "/sprites/watermelon.png",
  grape: "/sprites/grape.png",
  pineapple: "/sprites/pineapple.png",
  strawberry: "/sprites/strawberry.png",
  gummy: "/sprites/gummy.png",
  lollipop: "/sprites/lollipop.png",
  gelatin: "/sprites/gelatin.png",
  chocolate: "/sprites/chocolate.png",
  sour: "/sprites/sour.png",
  "floor-fridge": "/sprites/floor-fridge.png",
  "floor-pantry": "/sprites/floor-pantry.png",
  "floor-freezer": "/sprites/floor-freezer.png",
  "floor-factory": "/sprites/floor-factory.png",
  "floor-arena": "/sprites/floor-arena.png",
};

export function loadSprites(): Promise<SpriteMap> {
  if (spriteCache) return Promise.resolve(spriteCache);
  if (spriteLoading) return spriteLoading;
  const entries = Object.entries(SPRITE_URLS);
  spriteLoading = Promise.all(
    entries.map(
      ([key, url]) =>
        new Promise<[string, HTMLImageElement | null]>((resolve) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => resolve([key, img]);
          img.onerror = () => resolve([key, null]);
          img.src = url;
        }),
    ),
  ).then((pairs) => {
    const map: SpriteMap = {};
    for (const [key, img] of pairs) {
      if (img) map[key] = img;
    }
    spriteCache = map;
    return map;
  });
  return spriteLoading;
}

let spriteCache: SpriteMap | null = null;
let spriteLoading: Promise<SpriteMap> | null = null;

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function drawCrate(ctx: CanvasRenderingContext2D, x: number, y: number, t: number, depth: number) {
  ctx.save();
  ctx.translate(x, y - depth * 0.15);
  ctx.fillStyle = "#8a6232";
  ctx.fillRect(4, t * 0.35, t - 8, t * 0.55 + depth * 0.2);
  ctx.fillStyle = "#c4a05a";
  roundRect(ctx, 5, 4, t - 10, t * 0.62, 4);
  ctx.fill();
  ctx.strokeStyle = "#6a4420";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = "#d8b56e";
  ctx.fillRect(8, t * 0.18, t - 16, 4);
  ctx.fillRect(8, t * 0.38, t - 16, 4);
  ctx.restore();
}

function drawSpike(ctx: CanvasRenderingContext2D, x: number, y: number, t: number, time: number) {
  const bob = Math.sin(time * 8) * 2;
  ctx.save();
  ctx.translate(x + t / 2, y + t * 0.72 + bob);
  ctx.fillStyle = "#2f6b3e";
  for (let i = -1; i <= 1; i++) {
    ctx.beginPath();
    ctx.moveTo(i * t * 0.22 - 6, 0);
    ctx.lineTo(i * t * 0.22, -t * 0.55);
    ctx.lineTo(i * t * 0.22 + 6, 0);
    ctx.fill();
  }
  ctx.fillStyle = "#5dae6c";
  for (let i = -1; i <= 1; i++) {
    ctx.beginPath();
    ctx.moveTo(i * t * 0.22 - 3, 0);
    ctx.lineTo(i * t * 0.22, -t * 0.42);
    ctx.lineTo(i * t * 0.22 + 3, 0);
    ctx.fill();
  }
  ctx.restore();
}

function drawBoss(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  t: number,
  e: Entity,
  time: number,
) {
  const s = t * (1.15 + Math.sin(time * 3) * 0.03);
  ctx.save();
  ctx.translate(x + t / 2, y + t / 2);
  ctx.scale(e.dir === 3 ? -1 : 1, 1);
  ctx.fillStyle = "#3a1c18";
  ctx.beginPath();
  ctx.ellipse(0, s * 0.28, s * 0.28, s * 0.1, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#5a241c";
  roundRect(ctx, -s * 0.28, -s * 0.38, s * 0.56, s * 0.7, 10);
  ctx.fill();
  ctx.fillStyle = "#7a3228";
  roundRect(ctx, -s * 0.22, -s * 0.3, s * 0.44, s * 0.52, 8);
  ctx.fill();
  ctx.fillStyle = "#e2c04a";
  roundRect(ctx, -s * 0.2, -s * 0.5, s * 0.4, s * 0.16, 4);
  ctx.fill();
  ctx.fillStyle = "#c43c3c";
  ctx.beginPath();
  ctx.arc(0, -s * 0.56, s * 0.08, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#f3ede3";
  ctx.beginPath();
  ctx.arc(-s * 0.1, -s * 0.12, s * 0.07, 0, Math.PI * 2);
  ctx.arc(s * 0.1, -s * 0.12, s * 0.07, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#1c1410";
  ctx.beginPath();
  ctx.arc(-s * 0.08, -s * 0.11, s * 0.03, 0, Math.PI * 2);
  ctx.arc(s * 0.12, -s * 0.11, s * 0.03, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#1c1410";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(0, s * 0.06, s * 0.12, 0.15, Math.PI - 0.15);
  ctx.stroke();
  ctx.restore();
}

function drawProjectile(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  t: number,
  time: number,
) {
  ctx.save();
  ctx.translate(x + t / 2, y + t / 2);
  ctx.rotate(time * 8);
  ctx.fillStyle = "#d6ff4a";
  ctx.beginPath();
  ctx.moveTo(0, -t * 0.22);
  ctx.lineTo(t * 0.16, 0);
  ctx.lineTo(0, t * 0.22);
  ctx.lineTo(-t * 0.16, 0);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawItem(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  t: number,
  kind: ItemKind,
  time: number,
  seed: number,
) {
  const info = ITEM_INFO[kind];
  const bob = Math.sin(time * 4 + seed) * 2.5;
  ctx.save();
  ctx.translate(x + t / 2, y + t / 2 + bob);
  ctx.fillStyle = "rgba(0,0,0,0.16)";
  ctx.beginPath();
  ctx.ellipse(0, t * 0.34 - bob, t * 0.2, t * 0.07, 0, 0, Math.PI * 2);
  ctx.fill();

  if (kind === "banana") {
    ctx.rotate(-0.5);
    ctx.fillStyle = info.color;
    ctx.beginPath();
    ctx.moveTo(-t * 0.22, t * 0.14);
    ctx.quadraticCurveTo(0, -t * 0.32, t * 0.24, -t * 0.12);
    ctx.quadraticCurveTo(0, -t * 0.14, -t * 0.1, t * 0.2);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = info.accent;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  } else if (kind === "cherry") {
    ctx.strokeStyle = "#3f8f5c";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-t * 0.08, -t * 0.05);
    ctx.lineTo(0, -t * 0.26);
    ctx.lineTo(t * 0.1, -t * 0.05);
    ctx.stroke();
    for (const dx of [-t * 0.1, t * 0.1]) {
      ctx.fillStyle = info.color;
      ctx.beginPath();
      ctx.arc(dx, t * 0.08, t * 0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.35)";
      ctx.beginPath();
      ctx.arc(dx - t * 0.04, t * 0.02, t * 0.04, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (kind === "blueberry") {
    const spots = [
      [0, -t * 0.1],
      [-t * 0.13, t * 0.08],
      [t * 0.13, t * 0.08],
    ];
    for (const [dx, dy] of spots) {
      ctx.fillStyle = info.color;
      ctx.beginPath();
      ctx.arc(dx!, dy!, t * 0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = info.accent;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  } else {
    // kiwi
    ctx.fillStyle = info.color;
    ctx.beginPath();
    ctx.arc(0, 0, t * 0.26, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f3ede3";
    ctx.beginPath();
    ctx.arc(0, 0, t * 0.16, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = info.accent;
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(Math.cos(a) * t * 0.1, Math.sin(a) * t * 0.1, t * 0.02, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

export function renderSim(
  ctx: CanvasRenderingContext2D,
  sim: Sim,
  sprites: SpriteMap,
  cssW: number,
  cssH: number,
  time: number,
) {
  ctx.clearRect(0, 0, cssW, cssH);
  const world = WORLDS[sim.level.world as WorldId];
  const tile = Math.floor(Math.min(cssW / COLS, cssH / ROWS));
  const ox = Math.floor((cssW - tile * COLS) / 2);
  const oy = Math.floor((cssH - tile * ROWS) / 2);
  const shake = sim.trauma * sim.trauma;
  const sx = shake ? (Math.random() * 2 - 1) * 10 * shake : 0;
  const sy = shake ? (Math.random() * 2 - 1) * 8 * shake : 0;
  ctx.save();
  ctx.translate(ox + sx, oy + sy);

  const floor = sprites[`floor-${world.id}`];
  const depth = Math.max(4, tile * 0.18);

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const t = sim.tileAt(x, y);
      const px = x * tile;
      const py = y * tile;
      if (t === 1) continue;
      if (floor) ctx.drawImage(floor, px, py, tile, tile);
      else {
        ctx.fillStyle = world.floor;
        ctx.fillRect(px, py, tile, tile);
      }
      ctx.strokeStyle = world.grout;
      ctx.globalAlpha = 0.35;
      ctx.strokeRect(px + 0.5, py + 0.5, tile - 1, tile - 1);
      ctx.globalAlpha = 1;
      if (t === 5) {
        ctx.fillStyle = "rgba(90, 42, 22, 0.45)";
        ctx.beginPath();
        ctx.ellipse(px + tile / 2, py + tile * 0.62, tile * 0.34, tile * 0.16, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      if (t === 4) {
        ctx.fillStyle = "rgba(155, 106, 214, 0.35)";
        ctx.beginPath();
        ctx.ellipse(px + tile / 2, py + tile * 0.62, tile * 0.32, tile * 0.14, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (sim.tileAt(x, y) !== 1) continue;
      const px = x * tile;
      const py = y * tile;
      ctx.fillStyle = world.wallSide;
      ctx.fillRect(px, py + tile - depth, tile, depth + 2);
      ctx.fillStyle = world.wall;
      roundRect(ctx, px + 1, py - depth + 2, tile - 2, tile - 2, 5);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.16)";
      ctx.fillRect(px + 4, py - depth + 6, tile - 10, 5);
    }
  }

  const pickups = sim.level.map;
  for (let y = 0; y < ROWS; y++) {
    const row = pickups[y] ?? "";
    for (let x = 0; x < COLS; x++) {
      if (row[x] !== "o") continue;
      if (sim.collected.has(`p-${x}-${y}`)) continue;
      const px = x * tile + tile / 2;
      const py = y * tile + tile / 2 + Math.sin(time * 4 + x) * 3;
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(time * 1.2);
      ctx.fillStyle = "#e2c04a";
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const a = (i * Math.PI * 2) / 5 - Math.PI / 2;
        const r = i % 2 === 0 ? tile * 0.22 : tile * 0.1;
        ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
  }

  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const t = sim.tileAt(x, y);
      const px = x * tile;
      const py = y * tile;
      if (t === 2) drawCrate(ctx, px, py, tile, depth);
      if (t === 3) drawSpike(ctx, px, py, tile, time);
    }
  }

  const drawables = sim.entities.filter((e) => e.alive || e.flash > 0).slice();
  drawables.sort((a, b) => a.y - b.y || a.x - b.x);

  for (const e of drawables) {
    const px = e.x * tile;
    const py = e.y * tile;
    if (e.kind === "projectile") {
      drawProjectile(ctx, px, py, tile, time);
      continue;
    }
    if (e.kind === "item" && e.item) {
      drawItem(ctx, px, py, tile, e.item, time, e.id);
      continue;
    }
    if (e.kind === "boss") {
      if (e.flash > 0) ctx.globalAlpha = 0.55 + Math.sin(time * 40) * 0.3;
      drawBoss(ctx, px, py, tile, e, time);
      ctx.globalAlpha = 1;
      drawHp(ctx, px, py, tile, e);
      continue;
    }
    const key = e.kind === "player" ? (e.fruit as FruitId) : e.kind;
    const img = sprites[key];
    const bob = Math.sin(time * 6 + e.id) * (e.moving ? 2.4 : 1.4);
    const squash = 1 - e.squash * 0.35;
    const stretch = 1 + e.squash * 0.28;
    const size = tile * (e.kind === "player" ? 1.08 : 1.02);
    ctx.save();
    ctx.translate(px + tile / 2, py + tile * 0.62 + bob);
    ctx.scale((e.dir === 3 ? -1 : 1) * (1 / squash), stretch);
    if (e.kind === "player" && e.invuln > 0 && Math.floor(time * 16) % 2 === 0)
      ctx.globalAlpha = 0.45;
    if (e.flash > 0) ctx.globalAlpha = 0.7;
    if (img) {
      ctx.drawImage(img, -size / 2, -size + 6, size, size);
    } else {
      ctx.fillStyle = "#888";
      ctx.beginPath();
      ctx.arc(0, -size * 0.3, size * 0.3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    ctx.globalAlpha = 1;
    if (e.kind !== "player" && e.maxHp > 1) drawHp(ctx, px, py, tile, e);
    if (e.kind === "player" && e.playerIndex === 1) {
      ctx.fillStyle = "#8ec5ff";
      ctx.font = `700 ${Math.max(10, tile * 0.22)}px Nunito, sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("P2", px + tile / 2, py - 2);
    }
  }

  for (const p of sim.particles) {
    const a = Math.max(0, p.life / p.max);
    ctx.globalAlpha = a;
    ctx.fillStyle = p.color;
    const s = p.size * (p.kind === "confetti" ? 1 : a);
    ctx.fillRect(p.x * tile - s / 2, p.y * tile - s / 2, s, s);
  }
  ctx.globalAlpha = 1;
  ctx.restore();
}

function drawHp(ctx: CanvasRenderingContext2D, px: number, py: number, tile: number, e: Entity) {
  const w = tile * 0.7;
  const h = 5;
  const x = px + (tile - w) / 2;
  const y = py - 6;
  ctx.fillStyle = "rgba(0,0,0,0.45)";
  ctx.fillRect(x, y, w, h);
  ctx.fillStyle = e.kind === "boss" ? "#c43c3c" : "#3f8f5c";
  ctx.fillRect(x, y, w * Math.max(0, e.hp / e.maxHp), h);
}
