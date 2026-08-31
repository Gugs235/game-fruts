const KEY = "fruit-rebellion-save";
const VERSION = 1;

export type SaveData = {
  version: number;
  unlocked: number;
  highScore: number;
  seenHowTo: boolean;
  muted: boolean;
};

const DEFAULTS: SaveData = {
  version: VERSION,
  unlocked: 0,
  highScore: 0,
  seenHowTo: false,
  muted: false,
};

function migrate(raw: SaveData): SaveData {
  const s = { ...DEFAULTS, ...raw };
  s.version = VERSION;
  return s;
}

export function loadSave(): SaveData {
  if (typeof localStorage === "undefined") return { ...DEFAULTS };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULTS };
    return migrate(JSON.parse(raw) as SaveData);
  } catch {
    return { ...DEFAULTS };
  }
}

export function writeSave(data: SaveData) {
  if (typeof localStorage === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify({ ...data, version: VERSION }));
  } catch {
    /* private mode */
  }
}
