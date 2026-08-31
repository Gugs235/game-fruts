import {
  COLS,
  ROWS,
  DX,
  DY,
  ENEMY_INFO,
  FRUITS,
  LEVELS,
  START_LIVES,
  type Dir,
  type EnemyKind,
  type FruitId,
  type LevelDef,
  type Tile,
  type WorldId,
} from "./data";
import type { Input } from "./input";

export type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
  color: string;
  kind: "dot" | "confetti" | "spark" | "melt";
};

export type Entity = {
  id: number;
  kind: "player" | EnemyKind | "projectile";
  playerIndex?: 0 | 1;
  fruit?: FruitId;
  gx: number;
  gy: number;
  x: number;
  y: number;
  dir: Dir;
  moving: boolean;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  t: number;
  speed: number;
  hp: number;
  maxHp: number;
  alive: boolean;
  stun: number;
  invuln: number;
  cooldown: number;
  crateCd: number;
  trapped: number;
  flash: number;
  squash: number;
  rollLeft: number;
  dashing: number;
  shotCd: number;
  phase: number;
  spawnedMinions: boolean;
  owner?: number;
  mimic: { dir: Dir; at: number }[];
};

export type HudSnap = {
  lives: number;
  score: number;
  enemies: number;
  levelName: string;
  world: WorldId;
  worldName: string;
  p1Cd: number;
  p2Cd: number;
  p1Fruit: FruitId;
  p2Fruit: FruitId | null;
  message: string | null;
  status: "play" | "win" | "lose";
  players: number;
  paused: boolean;
};

export type SimHooks = {
  onSfx: (name: "move" | "crate" | "power" | "hit" | "kill" | "hurt" | "win" | "lose" | "pickup") => void;
};

let nextId = 1;

function makeEntity(partial: Partial<Entity> & Pick<Entity, "kind" | "gx" | "gy">): Entity {
  return {
    id: nextId++,
    dir: 2,
    x: partial.gx,
    y: partial.gy,
    moving: false,
    fromX: partial.gx,
    fromY: partial.gy,
    toX: partial.gx,
    toY: partial.gy,
    t: 0,
    speed: 5.2,
    hp: 1,
    maxHp: 1,
    alive: true,
    stun: 0,
    invuln: 0,
    cooldown: 0,
    crateCd: 0,
    trapped: 0,
    flash: 0,
    squash: 0,
    rollLeft: 0,
    dashing: 0,
    shotCd: 0,
    phase: 1,
    spawnedMinions: false,
    mimic: [],
    ...partial,
  };
}

export class Sim {
  tiles: Tile[] = [];
  tileLife: number[] = [];
  entities: Entity[] = [];
  particles: Particle[] = [];
  level!: LevelDef;
  lives = START_LIVES;
  score = 0;
  time = 0;
  status: "play" | "win" | "lose" = "play";
  hitstop = 0;
  trauma = 0;
  message: string | null = null;
  messageT = 0;
  players = 1;
  fruits: FruitId[] = ["lemon"];
  paused = false;
  pickups = 0;
  collected = new Set<string>();
  private hooks: SimHooks;

  constructor(hooks: SimHooks) {
    this.hooks = hooks;
  }

  load(levelIndex: number, fruits: FruitId[], players: number, score = 0) {
    nextId = 1;
    const level = LEVELS[levelIndex] ?? LEVELS[0]!;
    this.level = level;
    this.fruits = fruits;
    this.players = players;
    this.lives = START_LIVES;
    this.score = score;
    this.time = 0;
    this.status = "play";
    this.hitstop = 0;
    this.trauma = 0;
    this.paused = false;
    this.entities = [];
    this.particles = [];
    this.collected = new Set();
    this.tiles = new Array(COLS * ROWS).fill(0);
    this.tileLife = new Array(COLS * ROWS).fill(0);
    this.message = level.intro;
    this.messageT = 3.2;

    const spawns: { ch: string; x: number; y: number }[] = [];
    for (let y = 0; y < ROWS; y++) {
      const row = level.map[y] ?? "";
      for (let x = 0; x < COLS; x++) {
        const ch = row[x] ?? "#";
        const i = y * COLS + x;
        if (ch === "#") this.tiles[i] = 1;
        else if (ch === "X") this.tiles[i] = 2;
        else this.tiles[i] = 0;
        if ("PGQJLCSoB".includes(ch)) spawns.push({ ch, x, y });
      }
    }

    const p1s = spawns.find((s) => s.ch === "P") ?? { x: 1, y: 1, ch: "P" };
    const p2s = spawns.find((s) => s.ch === "Q");
    this.spawnPlayer(0, fruits[0] ?? "lemon", p1s.x, p1s.y);
    if (players > 1) {
      let x = p2s?.x ?? p1s.x + 1;
      let y = p2s?.y ?? p1s.y;
      if (!this.walkable(x, y)) {
        x = p1s.x;
        y = Math.min(ROWS - 2, p1s.y + 1);
      }
      this.spawnPlayer(1, fruits[1] ?? fruits[0] ?? "strawberry", x, y);
    }

    for (const s of spawns) {
      if (s.ch === "G") this.spawnEnemy("gummy", s.x, s.y);
      if (s.ch === "L") this.spawnEnemy("lollipop", s.x, s.y);
      if (s.ch === "J") this.spawnEnemy("gelatin", s.x, s.y);
      if (s.ch === "C") this.spawnEnemy("chocolate", s.x, s.y);
      if (s.ch === "S") this.spawnEnemy("sour", s.x, s.y);
      if (s.ch === "B") this.spawnEnemy("boss", s.x, s.y);
      if (s.ch === "o") this.pickups++;
    }
  }

  private spawnPlayer(index: 0 | 1, fruit: FruitId, x: number, y: number) {
    this.entities.push(
      makeEntity({
        kind: "player",
        playerIndex: index,
        fruit,
        gx: x,
        gy: y,
        speed: 5.4,
        hp: 1,
        maxHp: 1,
        invuln: 0.6,
        dir: 1,
      }),
    );
  }

  private spawnEnemy(kind: EnemyKind, x: number, y: number) {
    const info = ENEMY_INFO[kind];
    this.entities.push(
      makeEntity({
        kind,
        gx: x,
        gy: y,
        speed: info.speed,
        hp: info.hp,
        maxHp: info.hp,
        dir: 3,
      }),
    );
  }

  idx(x: number, y: number) {
    return y * COLS + x;
  }

  inBounds(x: number, y: number) {
    return x >= 0 && y >= 0 && x < COLS && y < ROWS;
  }

  tileAt(x: number, y: number): Tile {
    if (!this.inBounds(x, y)) return 1;
    return this.tiles[this.idx(x, y)] ?? 1;
  }

  setTile(x: number, y: number, t: Tile, life = 0) {
    if (!this.inBounds(x, y)) return;
    this.tiles[this.idx(x, y)] = t;
    this.tileLife[this.idx(x, y)] = life;
  }

  walkable(x: number, y: number, forRoll = false): boolean {
    const t = this.tileAt(x, y);
    if (t === 1) return false;
    if (t === 2) return forRoll;
    return true;
  }

  occupied(x: number, y: number, self?: Entity, ignorePlayers = false): boolean {
    for (const e of this.entities) {
      if (!e.alive || e === self || e.kind === "projectile") continue;
      if (ignorePlayers && e.kind === "player") continue;
      if (self?.kind === "player" && e.kind === "player") continue;
      if (e.gx === x && e.gy === y) return true;
      if (e.moving && e.toX === x && e.toY === y) return true;
    }
    return false;
  }

  nearestPlayer(e: Entity): Entity | null {
    let best: Entity | null = null;
    let bestD = 1e9;
    for (const p of this.entities) {
      if (p.kind !== "player" || !p.alive) continue;
      const d = Math.abs(p.gx - e.gx) + Math.abs(p.gy - e.gy);
      if (d < bestD) {
        bestD = d;
        best = p;
      }
    }
    return best;
  }

  private burst(x: number, y: number, color: string, n = 10, kind: Particle["kind"] = "dot") {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const s = 2 + Math.random() * 5;
      this.particles.push({
        x: x + 0.5,
        y: y + 0.5,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s,
        life: 0.35 + Math.random() * 0.35,
        max: 0.7,
        size: 3 + Math.random() * 4,
        color,
        kind,
      });
    }
  }

  private startMove(e: Entity, dir: Dir) {
    const nx = e.gx + DX[dir];
    const ny = e.gy + DY[dir];
    const rolling = e.rollLeft > 0 || e.dashing > 0;
    if (!this.walkable(nx, ny, rolling)) return false;
    if (this.tileAt(nx, ny) === 2 && rolling) {
      this.setTile(nx, ny, 0);
      this.burst(nx, ny, "#c4a574", 8, "spark");
      this.hooks.onSfx("crate");
    }
    if (this.occupied(nx, ny, e, rolling && e.kind === "player")) {
      if (rolling && e.kind === "player") {
        this.hitAt(nx, ny, 2, e);
      } else return false;
    }
    e.dir = dir;
    e.moving = true;
    e.fromX = e.gx;
    e.fromY = e.gy;
    e.toX = nx;
    e.toY = ny;
    e.t = 0;
    e.squash = 0.18;
    return true;
  }

  private finishMove(e: Entity) {
    e.gx = e.toX;
    e.gy = e.toY;
    e.x = e.gx;
    e.y = e.gy;
    e.moving = false;
    e.t = 0;
    e.squash = 0.22;

    const tile = this.tileAt(e.gx, e.gy);
    if (e.kind === "player") {
      if (e.rollLeft <= 0 && e.dashing <= 0) {
        e.speed = tile === 5 ? 2.6 : 5.4;
      }
      if (e.dashing > 0) this.hitAt(e.gx, e.gy, 1, e);
      if (e.rollLeft > 0) {
        e.rollLeft--;
        if (e.rollLeft > 0) this.startMove(e, e.dir);
        else e.speed = 5.4;
      }
      for (const g of this.entities) {
        if (g.kind === "gelatin" && g.alive) {
          g.mimic.push({ dir: e.dir, at: this.time });
          if (g.mimic.length > 14) g.mimic.shift();
        }
      }
      const row = this.level.map[e.gy] ?? "";
      if (row[e.gx] === "o") {
        const key = `p-${e.gx}-${e.gy}`;
        if (!this.collected.has(key)) {
          this.collected.add(key);
          this.score += 50;
          this.burst(e.gx, e.gy, "#e2c04a", 12, "spark");
          this.hooks.onSfx("pickup");
        }
      }
    } else if (e.kind !== "projectile") {
      if (tile === 3) this.damage(e, 1);
      if (tile === 4) {
        e.stun = Math.max(e.stun, 0.7);
        this.burst(e.gx, e.gy, "#b57ad6", 6);
      }
      if (e.kind === "chocolate") this.setTile(e.gx, e.gy, 5, 5.5);
      if (e.rollLeft > 0) {
        e.rollLeft--;
        if (e.rollLeft > 0) this.startMove(e, e.dir);
      }
    }
  }

  private hitAt(x: number, y: number, dmg: number, _src?: Entity) {
    for (const e of this.entities) {
      if (!e.alive || e.kind === "player" || e.kind === "projectile") continue;
      if ((e.gx === x && e.gy === y) || (e.moving && e.toX === x && e.toY === y)) {
        this.damage(e, dmg);
      }
    }
  }

  damage(e: Entity, dmg: number) {
    if (!e.alive) return;
    if (e.kind === "player" && e.invuln > 0) return;
    e.hp -= dmg;
    e.flash = 0.12;
    e.squash = 0.35;
    this.hitstop = Math.max(this.hitstop, 0.05);
    this.trauma = Math.min(1, this.trauma + 0.28);
    if (e.kind === "player") {
      e.invuln = 1.4;
      this.lives -= 1;
      this.hooks.onSfx("hurt");
      this.burst(e.gx, e.gy, "#c43c3c", 14, "spark");
      if (this.lives <= 0) {
        this.status = "lose";
        this.hooks.onSfx("lose");
      }
    } else {
      this.hooks.onSfx("hit");
      this.burst(e.gx, e.gy, "#ffd4e0", 8, "melt");
      if (e.hp <= 0) this.kill(e);
    }
  }

  kill(e: Entity) {
    e.alive = false;
    this.score += e.kind === "boss" ? 1000 : 120;
    this.burst(e.gx, e.gy, "#f4efe6", 18, "confetti");
    this.hooks.onSfx("kill");
    this.trauma = Math.min(1, this.trauma + 0.4);
    this.hitstop = 0.08;
  }

  private usePower(p: Entity) {
    if (!p.fruit || p.cooldown > 0 || p.stun > 0 || p.rollLeft > 0) return;
    const def = FRUITS[p.fruit];
    p.cooldown = def.cooldown;
    this.hooks.onSfx("power");
    this.trauma = Math.min(1, this.trauma + 0.15);

    if (p.fruit === "lemon") {
      const cells = [
        [p.gx + DX[p.dir], p.gy + DY[p.dir]],
        [p.gx + 2 * DX[p.dir], p.gy + 2 * DY[p.dir]],
        [p.gx + DX[p.dir] + DX[((p.dir + 1) % 4) as Dir], p.gy + DY[p.dir] + DY[((p.dir + 1) % 4) as Dir]],
        [p.gx + DX[p.dir] + DX[((p.dir + 3) % 4) as Dir], p.gy + DY[p.dir] + DY[((p.dir + 3) % 4) as Dir]],
      ];
      for (const [x, y] of cells) {
        if (!this.inBounds(x, y) || this.tileAt(x, y) === 1) continue;
        this.burst(x, y, "#c8e85a", 7, "melt");
        for (const e of this.entities) {
          if (!e.alive || e.kind === "player" || e.kind === "projectile") continue;
          if (e.gx === x && e.gy === y) {
            e.stun = Math.max(e.stun, 1.6);
            this.damage(e, e.kind === "gummy" ? 1 : 1);
          }
        }
      }
    } else if (p.fruit === "watermelon") {
      p.rollLeft = 5;
      p.invuln = Math.max(p.invuln, 1.1);
      p.speed = 9.5;
      if (!p.moving) this.startMove(p, p.dir);
    } else if (p.fruit === "grape") {
      const midX = p.gx + DX[p.dir];
      const midY = p.gy + DY[p.dir];
      const landX = p.gx + DX[p.dir] * 2;
      const landY = p.gy + DY[p.dir] * 2;
      if (this.walkable(landX, landY) && !this.occupied(landX, landY, p)) {
        if (this.tileAt(p.gx, p.gy) === 0) this.setTile(p.gx, p.gy, 4, 3.2);
        if (this.walkable(midX, midY) && this.tileAt(midX, midY) === 0) this.setTile(midX, midY, 4, 3.2);
        p.gx = landX;
        p.gy = landY;
        p.x = landX;
        p.y = landY;
        p.moving = false;
        p.invuln = Math.max(p.invuln, 0.25);
        this.burst(landX, landY, "#9b6ad6", 10);
        this.hitAt(midX, midY, 1, p);
      }
    } else if (p.fruit === "pineapple") {
      const fx = p.gx + DX[p.dir];
      const fy = p.gy + DY[p.dir];
      const side = ((p.dir % 2) * 2) as Dir;
      const cells = [
        [fx, fy],
        [fx + DX[side], fy + DY[side]],
        [fx - DX[side], fy - DY[side]],
      ];
      for (const [x, y] of cells) {
        if (!this.inBounds(x, y) || this.tileAt(x, y) === 1) continue;
        this.setTile(x, y, 3, 4.2);
        this.burst(x, y, "#3f8f5c", 6, "spark");
        this.hitAt(x, y, 1, p);
      }
    } else if (p.fruit === "strawberry") {
      p.dashing = 3;
      p.invuln = Math.max(p.invuln, 0.55);
      p.speed = 11;
      if (!p.moving) this.startMove(p, p.dir);
    }
  }

  private toggleCrate(p: Entity) {
    if (p.crateCd > 0 || p.stun > 0 || p.rollLeft > 0) return;
    const nx = p.gx + DX[p.dir];
    const ny = p.gy + DY[p.dir];
    if (!this.inBounds(nx, ny)) return;
    const t = this.tileAt(nx, ny);
    if (t === 1) return;
    if (t === 2) {
      this.setTile(nx, ny, 0);
      this.burst(nx, ny, "#c4a574", 6);
      this.hooks.onSfx("crate");
      p.crateCd = 0.18;
      return;
    }
    if (t !== 0 && t !== 4 && t !== 5) return;
    if (this.occupied(nx, ny, p)) return;
    this.setTile(nx, ny, 2);
    this.burst(nx, ny, "#d7c09a", 5);
    this.hooks.onSfx("crate");
    p.crateCd = 0.18;
  }

  private breakCrate(x: number, y: number) {
    if (this.tileAt(x, y) !== 2) return;
    this.setTile(x, y, 0);
    this.burst(x, y, "#c4a574", 8, "spark");
    this.hooks.onSfx("crate");
  }

  private shoot(e: Entity, dir: Dir, speed = 6.2) {
    const nx = e.gx + DX[dir];
    const ny = e.gy + DY[dir];
    if (!this.walkable(nx, ny)) return;
    this.entities.push(
      makeEntity({
        kind: "projectile",
        gx: e.gx,
        gy: e.gy,
        dir,
        speed,
        owner: e.id,
        hp: 1,
        maxHp: 1,
      }),
    );
    const p = this.entities[this.entities.length - 1]!;
    this.startMove(p, dir);
  }

  private thinkEnemy(e: Entity) {
    if (e.stun > 0 || e.moving) return;
    const target = this.nearestPlayer(e);
    if (!target) return;

    if (e.kind === "gelatin") {
      while (e.mimic.length && this.time - e.mimic[0]!.at >= 0.7) {
        const m = e.mimic.shift()!;
        if (this.startMove(e, m.dir)) return;
      }
      return;
    }

    if (e.kind === "sour") {
      const d = Math.abs(target.gx - e.gx) + Math.abs(target.gy - e.gy);
      e.dir = this.faceToward(e, target);
      if (e.shotCd <= 0 && d <= 7) {
        this.shoot(e, e.dir, 6.4);
        e.shotCd = 1.7;
      }
      if (d < 4) this.tryDirs(e, this.fleeDirs(e, target));
      else if (d > 6) this.tryDirs(e, this.chaseDirs(e, target));
      return;
    }

    if (e.kind === "boss") {
      const ratio = e.hp / e.maxHp;
      e.phase = ratio > 0.66 ? 1 : ratio > 0.33 ? 2 : 3;
      e.speed = e.phase === 3 ? 2.9 : 2.35;
      if (e.phase >= 3 && !e.spawnedMinions) {
        e.spawnedMinions = true;
        this.spawnEnemy("gummy", 1, 1);
        this.spawnEnemy("gummy", COLS - 2, ROWS - 2);
        this.message = "O rei convoca gomas!";
        this.messageT = 2;
      }
      if (e.phase >= 2 && e.shotCd <= 0) {
        this.shoot(e, this.faceToward(e, target), 5.6);
        e.shotCd = e.phase === 3 ? 1.15 : 1.45;
      }
      const dirs = this.chaseDirs(e, target);
      for (const d of dirs) {
        const nx = e.gx + DX[d];
        const ny = e.gy + DY[d];
        if (this.tileAt(nx, ny) === 2) {
          this.breakCrate(nx, ny);
          e.stun = 0.2;
          return;
        }
        if (this.startMove(e, d)) return;
      }
      return;
    }

    if (e.kind === "lollipop") {
      const dirs = this.chaseDirs(e, target);
      for (const d of dirs) {
        const nx = e.gx + DX[d];
        const ny = e.gy + DY[d];
        if (this.tileAt(nx, ny) === 2) {
          this.breakCrate(nx, ny);
          e.stun = 0.28;
          return;
        }
        if (this.startMove(e, d)) return;
      }
      e.trapped += 0.016;
      return;
    }

    const dirs = this.chaseDirs(e, target);
    if (!this.tryDirs(e, dirs)) e.trapped += 0.016;
    else e.trapped = 0;
  }

  private faceToward(e: Entity, t: Entity): Dir {
    const dx = t.gx - e.gx;
    const dy = t.gy - e.gy;
    if (Math.abs(dx) > Math.abs(dy)) return dx > 0 ? 1 : 3;
    if (dy !== 0) return dy > 0 ? 2 : 0;
    return e.dir;
  }

  private chaseDirs(e: Entity, t: Entity): Dir[] {
    const dirs: Dir[] = [0, 1, 2, 3];
    dirs.sort((a, b) => {
      const da = Math.abs(e.gx + DX[a] - t.gx) + Math.abs(e.gy + DY[a] - t.gy);
      const db = Math.abs(e.gx + DX[b] - t.gx) + Math.abs(e.gy + DY[b] - t.gy);
      if (da !== db) return da - db;
      if (a === e.dir) return -1;
      if (b === e.dir) return 1;
      return 0;
    });
    return dirs;
  }

  private fleeDirs(e: Entity, t: Entity): Dir[] {
    return this.chaseDirs(e, t).slice().reverse();
  }

  private tryDirs(e: Entity, dirs: Dir[]) {
    for (const d of dirs) {
      if (this.startMove(e, d)) return true;
    }
    return false;
  }

  step(dt: number, input: Input) {
    if (this.paused || this.status !== "play") return;
    if (this.hitstop > 0) {
      this.hitstop -= dt;
      return;
    }
    this.time += dt;
    this.trauma = Math.max(0, this.trauma - dt * 1.6);
    if (this.messageT > 0) {
      this.messageT -= dt;
      if (this.messageT <= 0) this.message = null;
    }

    for (let i = 0; i < this.tiles.length; i++) {
      if (this.tileLife[i]! > 0) {
        this.tileLife[i]! -= dt;
        if (this.tileLife[i]! <= 0 && (this.tiles[i] === 3 || this.tiles[i] === 4 || this.tiles[i] === 5)) {
          this.tiles[i] = 0;
        }
      }
    }

    const { p1, p2 } = input.poll();
    if (input.pauseEdge) this.paused = true;

    const acts = [p1, p2];
    for (const p of this.entities) {
      if (p.kind !== "player" || !p.alive) continue;
      p.cooldown = Math.max(0, p.cooldown - dt);
      p.crateCd = Math.max(0, p.crateCd - dt);
      p.stun = Math.max(0, p.stun - dt);
      p.invuln = Math.max(0, p.invuln - dt);
      p.flash = Math.max(0, p.flash - dt);
      p.squash = Math.max(0, p.squash - dt * 1.8);
    }

    for (const e of this.entities) {
      if (!e.alive || e.kind === "player") continue;
      e.stun = Math.max(0, e.stun - dt);
      e.flash = Math.max(0, e.flash - dt);
      e.squash = Math.max(0, e.squash - dt * 1.6);
      e.shotCd = Math.max(0, e.shotCd - dt);
    }

    for (const e of this.entities) {
      if (!e.alive || !e.moving) {
        if (e.alive && !e.moving) {
          e.x = e.gx;
          e.y = e.gy;
        }
        continue;
      }
      let spd = e.speed;
      if (e.kind === "player" && this.tileAt(e.toX, e.toY) === 5) spd *= 0.5;
      e.t += dt * spd;
      const u = Math.min(1, e.t);
      e.x = e.fromX + (e.toX - e.fromX) * u;
      e.y = e.fromY + (e.toY - e.fromY) * u;
      if (e.t >= 1) this.finishMove(e);
    }

    for (const p of this.entities) {
      if (p.kind !== "player" || !p.alive) continue;
      const a = acts[p.playerIndex ?? 0]!;
      if (p.dashing > 0 && !p.moving) {
        p.dashing--;
        if (p.dashing > 0) this.startMove(p, p.dir);
        else p.speed = 5.4;
      }
      if (p.rollLeft > 0 && !p.moving) {
        if (!this.startMove(p, p.dir)) {
          p.rollLeft = 0;
          p.speed = 5.4;
        }
      }
      if (p.stun > 0) continue;
      if (a.dir !== null && !p.moving && p.rollLeft <= 0 && p.dashing <= 0) {
        p.dir = a.dir;
        this.startMove(p, a.dir);
      } else if (a.dir !== null && p.moving) {
        p.dir = a.dir;
      }
      if (input.powerEdge[p.playerIndex ?? 0]) this.usePower(p);
      if (input.crateEdge[p.playerIndex ?? 0]) this.toggleCrate(p);
    }

    for (const e of this.entities) {
      if (!e.alive || e.kind === "player") continue;
      if (e.kind === "projectile") {
        if (!e.moving) {
          if (!this.startMove(e, e.dir)) e.alive = false;
        }
        continue;
      }
      if (e.trapped > 1.15) {
        this.kill(e);
        continue;
      }
      this.thinkEnemy(e);
    }

    this.resolveTouches();

    for (const p of this.particles) {
      p.life -= dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 6 * dt;
    }
    this.particles = this.particles.filter((p) => p.life > 0);
    this.entities = this.entities.filter((e) => e.alive || e.flash > 0);

    const enemies = this.entities.filter(
      (e) => e.alive && e.kind !== "player" && e.kind !== "projectile",
    );
    if (enemies.length === 0 && this.status === "play") {
      this.status = "win";
      this.score += 250 + Math.max(0, 80 - Math.floor(this.time)) * 5;
      this.hooks.onSfx("win");
    }
  }

  private resolveTouches() {
    const players = this.entities.filter((e) => e.kind === "player" && e.alive);
    for (const e of this.entities) {
      if (!e.alive) continue;
      if (e.kind === "projectile") {
        if (this.tileAt(e.gx, e.gy) === 1 || this.tileAt(e.gx, e.gy) === 2) {
          if (this.tileAt(e.gx, e.gy) === 2) this.breakCrate(e.gx, e.gy);
          e.alive = false;
          this.burst(e.gx, e.gy, "#d6ff4a", 6, "spark");
          continue;
        }
        for (const p of players) {
          if (p.invuln > 0) continue;
          if (Math.abs(p.x - e.x) < 0.55 && Math.abs(p.y - e.y) < 0.55) {
            this.damage(p, 1);
            e.alive = false;
          }
        }
        continue;
      }
      if (e.kind === "player") continue;
      for (const p of players) {
        if (p.invuln > 0 || p.rollLeft > 0 || p.dashing > 0) continue;
        if (Math.abs(p.x - e.x) < 0.62 && Math.abs(p.y - e.y) < 0.62) this.damage(p, 1);
      }
    }
  }

  hud(): HudSnap {
    const enemies = this.entities.filter(
      (e) => e.alive && e.kind !== "player" && e.kind !== "projectile",
    ).length;
    const p1 = this.entities.find((e) => e.kind === "player" && e.playerIndex === 0);
    const p2 = this.entities.find((e) => e.kind === "player" && e.playerIndex === 1);
    const cd = (p?: Entity) => {
      if (!p?.fruit) return 0;
      const max = FRUITS[p.fruit].cooldown;
      return p.cooldown <= 0 ? 1 : 1 - p.cooldown / max;
    };
    return {
      lives: this.lives,
      score: this.score,
      enemies,
      levelName: this.level.name,
      world: this.level.world,
      worldName: this.level.world === "fridge" ? "Geladeira" : this.level.world === "pantry" ? "Despensa" : this.level.world === "freezer" ? "Freezer" : this.level.world === "factory" ? "Fábrica de Doces" : "Arena do Rei",
      p1Cd: cd(p1),
      p2Cd: cd(p2),
      p1Fruit: p1?.fruit ?? "lemon",
      p2Fruit: p2?.fruit ?? null,
      message: this.message,
      status: this.status,
      players: this.players,
      paused: this.paused,
    };
  }

  playerPos() {
    const p = this.entities.find((e) => e.kind === "player" && e.alive);
    return { x: p?.x ?? 0, y: p?.y ?? 0, dir: p?.dir ?? 1, moving: !!p?.moving, speed: p?.moving ? p.speed : 0 };
  }
}

export type ControlsProbe = {
  getYaw: () => number;
  getSpeed: () => number;
  getX: () => number;
  getY: () => number;
  setKeys: (codes: string[]) => void;
};

declare global {
  interface Window {
    __controlsTest?: ControlsProbe;
  }
}
