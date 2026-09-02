export const COLS = 15;
export const ROWS = 11;
export const STEP = 1 / 60;
export const START_LIVES = 3;

export type Dir = 0 | 1 | 2 | 3;
export const DX = [0, 1, 0, -1] as const;
export const DY = [-1, 0, 1, 0] as const;
export const DIR_FROM_KEY: Record<string, Dir> = {
  KeyW: 0,
  ArrowUp: 0,
  KeyD: 1,
  ArrowRight: 1,
  KeyS: 2,
  ArrowDown: 2,
  KeyA: 3,
  ArrowLeft: 3,
};

export type FruitId = "lemon" | "watermelon" | "grape" | "pineapple" | "strawberry";
export type EnemyKind = "gummy" | "lollipop" | "gelatin" | "chocolate" | "sour" | "boss";
export type WorldId = "fridge" | "pantry" | "freezer" | "factory" | "arena";
export type Tile = 0 | 1 | 2 | 3 | 4 | 5;

// Coletáveis do modo "collect" (inspirado nas frutas do Bad Ice-Cream).
// Não são o mesmo que as frutas jogáveis: são itens espalhados pelo mapa.
export type ItemKind = "banana" | "cherry" | "blueberry" | "kiwi";

export const ITEM_INFO: Record<ItemKind, { name: string; color: string; accent: string }> = {
  banana: { name: "Banana", color: "#f0d94e", accent: "#c9a72c" },
  cherry: { name: "Cereja", color: "#d6304a", accent: "#7a2030" },
  blueberry: { name: "Mirtilo", color: "#4a5fd6", accent: "#2c3a8f" },
  kiwi: { name: "Kiwi", color: "#8fc23a", accent: "#4f6b1e" },
};

// Uma "onda" de coleta: N itens de um tipo aparecem; quando todos são
// coletados, a próxima onda entra (como banana -> uva no Bad Ice-Cream).
export type LevelWave = { item: ItemKind; count: number; moving?: boolean };
export type LevelObjective = { waves: LevelWave[] };

export const FRUITS: Record<
  FruitId,
  {
    id: FruitId;
    name: string;
    role: string;
    power: string;
    powerName: string;
    icon: string;
    hint: string;
    cooldown: number;
    accent: string;
  }
> = {
  lemon: {
    id: "lemon",
    name: "Limão",
    role: "Ácido",
    power: "Espirra suco ácido à frente, atordoando e derretendo doces próximos.",
    powerName: "Suco Ácido",
    icon: "🍋",
    hint: "Melhor contra grupos.",
    cooldown: 2.2,
    accent: "#c8b43a",
  },
  watermelon: {
    id: "watermelon",
    name: "Melancia",
    role: "Rolamento",
    power: "Rola em linha reta, esmagando caixas e inimigos no caminho.",
    powerName: "Rolamento",
    icon: "🍉",
    hint: "Mobilidade e dano em área.",
    cooldown: 4.4,
    accent: "#d6455d",
  },
  grape: {
    id: "grape",
    name: "Uva",
    role: "Salto",
    power: "Pula duas casas e deixa um rastro escorregadio.",
    powerName: "Salto Duplo",
    icon: "🍇",
    hint: "Derruba perseguições.",
    cooldown: 2.8,
    accent: "#7b4bb7",
  },
  pineapple: {
    id: "pineapple",
    name: "Abacaxi",
    role: "Espinhos",
    power: "Cria uma parede de espinhos temporária para prender inimigos.",
    powerName: "Muro de Espinhos",
    icon: "🍍",
    hint: "Controle de caminho.",
    cooldown: 3.4,
    accent: "#d4a017",
  },
  strawberry: {
    id: "strawberry",
    name: "Morango",
    role: "Ímpeto",
    power: "Dash rápido: atravessa inimigos e escapa de apertos.",
    powerName: "Dash Veloz",
    icon: "🍓",
    hint: "Fuga e atravessar corredores.",
    cooldown: 2.4,
    accent: "#c43c3c",
  },
};

export const FRUIT_ORDER: FruitId[] = ["lemon", "watermelon", "grape", "pineapple", "strawberry"];

export const ENEMY_INFO: Record<
  EnemyKind,
  { name: string; hp: number; speed: number; blurb: string }
> = {
  gummy: { name: "Bala de Goma", hp: 1, speed: 2.8, blurb: "Persegue em linha, lenta e teimosa." },
  lollipop: { name: "Pirulito", hp: 2, speed: 2.4, blurb: "Quebra as caixas que você constrói." },
  gelatin: {
    name: "Gelatina",
    hp: 2,
    speed: 4.6,
    blurb: "Copia o seu último movimento com atraso.",
  },
  chocolate: {
    name: "Chocolate",
    hp: 2,
    speed: 1.55,
    blurb: "Deixa poças que atrasam seus passos.",
  },
  sour: { name: "Bala Ácida", hp: 2, speed: 1.85, blurb: "Atira cristais de açúcar à distância." },
  boss: {
    name: "Rei do Açúcar",
    hp: 12,
    speed: 2.35,
    blurb: "Persegue, quebra muros e dispara refrigerante.",
  },
};

export const WORLDS: Record<
  WorldId,
  {
    id: WorldId;
    name: string;
    wall: string;
    wallSide: string;
    floor: string;
    grout: string;
    floorSprite: string;
  }
> = {
  fridge: {
    id: "fridge",
    name: "Geladeira",
    wall: "#8fbdd0",
    wallSide: "#5a8fa6",
    floor: "#d6ebf4",
    grout: "#b7d3e0",
    floorSprite: "/sprites/floor-fridge.png",
  },
  pantry: {
    id: "pantry",
    name: "Despensa",
    wall: "#c9a36e",
    wallSide: "#8d6a3c",
    floor: "#e2c99a",
    grout: "#c9ae78",
    floorSprite: "/sprites/floor-pantry.png",
  },
  freezer: {
    id: "freezer",
    name: "Freezer",
    wall: "#c5e8ee",
    wallSide: "#7ab3be",
    floor: "#e8f7f8",
    grout: "#c5e0e4",
    floorSprite: "/sprites/floor-freezer.png",
  },
  factory: {
    id: "factory",
    name: "Fábrica de Doces",
    wall: "#e59ab4",
    wallSide: "#b45c7c",
    floor: "#f3d0dc",
    grout: "#e0b4c4",
    floorSprite: "/sprites/floor-factory.png",
  },
  arena: {
    id: "arena",
    name: "Arena do Rei",
    wall: "#6a3a32",
    wallSide: "#3f201c",
    floor: "#4a2c26",
    grout: "#2e1a16",
    floorSprite: "/sprites/floor-arena.png",
  },
};

export type LevelDef = {
  id: string;
  name: string;
  world: WorldId;
  intro: string;
  map: string[];
  // Se ausente: vitória ao eliminar todos os inimigos (comportamento atual).
  // Se presente: vitória ao completar todas as ondas de coleta; inimigos
  // continuam vivos como obstáculo, não precisam ser eliminados.
  objective?: LevelObjective;
};

export const LEVELS: LevelDef[] = [
  {
    id: "1-1",
    name: "Prateleira Fria",
    world: "fridge",
    intro: "Colete as bananas espalhadas pela prateleira sem deixar a bala de goma te tocar.",
    map: [
      "###############",
      "#P............#",
      "#.............#",
      "#..###...###..#",
      "#.............#",
      "#......G......#",
      "#.............#",
      "#..###...###..#",
      "#............G#",
      "#............o#",
      "###############",
    ],
    objective: { waves: [{ item: "banana", count: 3 }] },
  },
  {
    id: "1-2",
    name: "Corredor do Iogurte",
    world: "fridge",
    intro: "Corredores estreitos: colete as bananas e bloqueie as gomas com espinhos.",
    map: [
      "###############",
      "#P....#......o#",
      "#.....#..###..#",
      "###...#....#..#",
      "#.....#....#..#",
      "#..G..#..G.#..#",
      "#.....#....#..#",
      "#..#........#.#",
      "#..##########.#",
      "#............G#",
      "###############",
    ],
    objective: { waves: [{ item: "banana", count: 4 }] },
  },
  {
    id: "1-3",
    name: "Gaveta Lotada",
    world: "fridge",
    intro: "Colete as bananas primeiro. Depois as cerejas vão fugir de você!",
    map: [
      "###############",
      "#o.#P....#...o#",
      "#..#.....#....#",
      "#..#..X..#..G.#",
      "#.............#",
      "#.G...XXX...G.#",
      "#.............#",
      "#..#.....#....#",
      "#..#.....#....#",
      "#o.#.....#...o#",
      "###############",
    ],
    objective: {
      waves: [
        { item: "banana", count: 3 },
        { item: "cherry", count: 3, moving: true },
      ],
    },
  },
  {
    id: "2-1",
    name: "Caixas na Despensa",
    world: "pantry",
    intro: "Pirulitos quebram caixas. Colete as cerejas fujonas sem se deixar cercar.",
    map: [
      "###############",
      "#P........X...#",
      "#....XXX......#",
      "#.............#",
      "#..X.......X..#",
      "#......L......#",
      "#..X.......X..#",
      "#.............#",
      "#....XXX......#",
      "#o........L...#",
      "###############",
    ],
    objective: { waves: [{ item: "cherry", count: 4, moving: true }] },
  },
  {
    id: "2-2",
    name: "Mistura Doce",
    world: "pantry",
    intro: "Gomas e pirulitos juntos. Colete os mirtilos, depois as cerejas em fuga.",
    map: [
      "###############",
      "#P..#.....#..o#",
      "#...#..X..#...#",
      "#...#.....#...#",
      "##X##.....##X##",
      "#...G.....L...#",
      "##X##.....##X##",
      "#...#.....#...#",
      "#...#..X..#...#",
      "#o..#.....#..G#",
      "###############",
    ],
    objective: {
      waves: [
        { item: "blueberry", count: 4 },
        { item: "cherry", count: 3, moving: true },
      ],
    },
  },
  {
    id: "2-3",
    name: "Labirinto de Farinha",
    world: "pantry",
    intro: "Colete as bananas nos corredores, depois os mirtilos fugidios pelos cantos.",
    map: [
      "###############",
      "#P.#....#....o#",
      "#..#.#..#..#..#",
      "#....#.....#.L#",
      "####.#.X.#.####",
      "#....#...#....#",
      "####.#.X.#.####",
      "#L.#.....#....#",
      "#..#.#..#..#..#",
      "#o...#....#..G#",
      "###############",
    ],
    objective: {
      waves: [
        { item: "banana", count: 3 },
        { item: "blueberry", count: 4, moving: true },
      ],
    },
  },
  {
    id: "3-1",
    name: "Eco Gelado",
    world: "freezer",
    intro: "A gelatina copia o seu movimento. Colete os kiwis, depois as cerejas fujonas.",
    map: [
      "###############",
      "#P............#",
      "#.............#",
      "#....#####....#",
      "#.............#",
      "#......J......#",
      "#.............#",
      "#....#####....#",
      "#.............#",
      "#o............#",
      "###############",
    ],
    objective: {
      waves: [
        { item: "kiwi", count: 3 },
        { item: "cherry", count: 3, moving: true },
      ],
    },
  },
  {
    id: "3-2",
    name: "Geada Dupla",
    world: "freezer",
    intro: "Gelatina e gomas. Os mirtilos e kiwis fogem — o eco chega atrasado, use isso.",
    map: [
      "###############",
      "#P..#.....#..o#",
      "#...#.....#...#",
      "#...#..X..#...#",
      "#.............#",
      "#.G....J....G.#",
      "#.............#",
      "#...#..X..#...#",
      "#...#.....#...#",
      "#o..#.....#...#",
      "###############",
    ],
    objective: {
      waves: [
        { item: "blueberry", count: 4, moving: true },
        { item: "kiwi", count: 3, moving: true },
      ],
    },
  },
  {
    id: "3-3",
    name: "Câmara Fria",
    world: "freezer",
    intro: "Duas gelatinas. Colete bananas, depois cerejas e kiwis fugindo dos ecos.",
    map: [
      "###############",
      "#P...........o#",
      "#..XXX...XXX..#",
      "#.............#",
      "#.J.........#.#",
      "#.....#.......#",
      "#.#.........J.#",
      "#.............#",
      "#..XXX...XXX..#",
      "#o............#",
      "###############",
    ],
    objective: {
      waves: [
        { item: "banana", count: 3 },
        { item: "cherry", count: 3, moving: true },
        { item: "kiwi", count: 3, moving: true },
      ],
    },
  },
  {
    id: "4-1",
    name: "Chão Derretido",
    world: "factory",
    intro: "Chocolate deixa poças. Colete os kiwis e mirtilos fugidios sem pisar no rastro.",
    map: [
      "###############",
      "#P............#",
      "#....###......#",
      "#.............#",
      "#..C.......C..#",
      "#.............#",
      "#......###....#",
      "#.............#",
      "#.............#",
      "#o............#",
      "###############",
    ],
    objective: {
      waves: [
        { item: "kiwi", count: 4, moving: true },
        { item: "blueberry", count: 4, moving: true },
      ],
    },
  },
  {
    id: "4-2",
    name: "Linha de Disparo",
    world: "factory",
    intro: "Balas ácidas atiram de longe. Colete tudo usando caixas como cobertura.",
    map: [
      "###############",
      "#P....X......S#",
      "#.....#.......#",
      "#..X..#..X....#",
      "#.....#.......#",
      "#..X..#..X....#",
      "#.....#.......#",
      "#..X..#..X....#",
      "#.....#.......#",
      "#o....X......S#",
      "###############",
    ],
    objective: {
      waves: [
        { item: "banana", count: 3 },
        { item: "cherry", count: 4, moving: true },
        { item: "kiwi", count: 3, moving: true },
      ],
    },
  },
  {
    id: "4-3",
    name: "Esteira Final",
    world: "factory",
    intro: "Chocolate, ácido e goma. Combine bloqueio e poder pra coletar tudo em movimento.",
    map: [
      "###############",
      "#P.#....C....o#",
      "#..#..........#",
      "#..#..XXXX....#",
      "#............S#",
      "#..G..........#",
      "#............S#",
      "#.....XXXX..#.#",
      "#...........#.#",
      "#o...C......#.#",
      "###############",
    ],
    objective: {
      waves: [
        { item: "blueberry", count: 4, moving: true },
        { item: "kiwi", count: 4, moving: true },
        { item: "cherry", count: 4, moving: true },
      ],
    },
  },
  {
    id: "5-1",
    name: "Antes do Trono",
    world: "arena",
    intro: "A corte do rei. Sobreviva à mistura e siga em frente.",
    map: [
      "###############",
      "#P....#.#....o#",
      "#..G..#.#..L..#",
      "#.....#.#.....#",
      "##X##.....##X##",
      "#......C......#",
      "##X##.....##X##",
      "#.....#.#.....#",
      "#..S..#.#..J..#",
      "#o....#.#.....#",
      "###############",
    ],
  },
  {
    id: "5-2",
    name: "Rei do Açúcar",
    world: "arena",
    intro: "O refrigerante corrompido. Quebre as fases, não deixe o rei te encostar.",
    map: [
      "###############",
      "#P...........o#",
      "#..X.......X..#",
      "#.............#",
      "#....#...#....#",
      "#......B......#",
      "#....#...#....#",
      "#.............#",
      "#..X.......X..#",
      "#o............#",
      "###############",
    ],
  },
];

export function opposite(dir: Dir): Dir {
  return ((dir + 2) % 4) as Dir;
}

export function dirFromDelta(dx: number, dy: number): Dir {
  if (Math.abs(dx) > Math.abs(dy)) return dx > 0 ? 1 : 3;
  return dy > 0 ? 2 : 0;
}
