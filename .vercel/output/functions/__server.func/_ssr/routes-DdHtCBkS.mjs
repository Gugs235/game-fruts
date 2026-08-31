import { i as __toESM } from "../_runtime.mjs";
import { L as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Pause, d as ChevronUp, f as ChevronRight, i as User, l as Heart, m as ChevronDown, n as Volume2, o as RotateCcw, p as ChevronLeft, r as Users, s as Play, t as VolumeX, u as CircleHelp } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DdHtCBkS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STEP = 1 / 60;
var DX = [
	0,
	1,
	0,
	-1
];
var DY = [
	-1,
	0,
	1,
	0
];
var FRUITS = {
	lemon: {
		id: "lemon",
		name: "Limão",
		role: "Ácido",
		power: "Espirra suco ácido à frente, atordoando e derretendo doces próximos.",
		hint: "Melhor contra grupos.",
		cooldown: 2.2,
		accent: "#c8b43a"
	},
	watermelon: {
		id: "watermelon",
		name: "Melancia",
		role: "Rolamento",
		power: "Rola em linha reta, esmagando caixas e inimigos no caminho.",
		hint: "Mobilidade e dano em área.",
		cooldown: 4.4,
		accent: "#d6455d"
	},
	grape: {
		id: "grape",
		name: "Uva",
		role: "Salto",
		power: "Pula duas casas e deixa um rastro escorregadio.",
		hint: "Derruba perseguições.",
		cooldown: 2.8,
		accent: "#7b4bb7"
	},
	pineapple: {
		id: "pineapple",
		name: "Abacaxi",
		role: "Espinhos",
		power: "Cria uma parede de espinhos temporária para prender inimigos.",
		hint: "Controle de caminho.",
		cooldown: 3.4,
		accent: "#d4a017"
	},
	strawberry: {
		id: "strawberry",
		name: "Morango",
		role: "Ímpeto",
		power: "Dash rápido: atravessa inimigos e escapa de apertos.",
		hint: "Fuga e atravessar corredores.",
		cooldown: 2.4,
		accent: "#c43c3c"
	}
};
var FRUIT_ORDER = [
	"lemon",
	"watermelon",
	"grape",
	"pineapple",
	"strawberry"
];
var ENEMY_INFO = {
	gummy: {
		name: "Bala de Goma",
		hp: 1,
		speed: 2.15,
		blurb: "Persegue em linha, lenta e teimosa."
	},
	lollipop: {
		name: "Pirulito",
		hp: 2,
		speed: 1.95,
		blurb: "Quebra as caixas que você constrói."
	},
	gelatin: {
		name: "Gelatina",
		hp: 2,
		speed: 4.6,
		blurb: "Copia o seu último movimento com atraso."
	},
	chocolate: {
		name: "Chocolate",
		hp: 2,
		speed: 1.55,
		blurb: "Deixa poças que atrasam seus passos."
	},
	sour: {
		name: "Bala Ácida",
		hp: 2,
		speed: 1.85,
		blurb: "Atira cristais de açúcar à distância."
	},
	boss: {
		name: "Rei do Açúcar",
		hp: 12,
		speed: 2.35,
		blurb: "Persegue, quebra muros e dispara refrigerante."
	}
};
var WORLDS = {
	fridge: {
		id: "fridge",
		name: "Geladeira",
		wall: "#8fbdd0",
		wallSide: "#5a8fa6",
		floor: "#d6ebf4",
		grout: "#b7d3e0",
		floorSprite: "/sprites/floor-fridge.png"
	},
	pantry: {
		id: "pantry",
		name: "Despensa",
		wall: "#c9a36e",
		wallSide: "#8d6a3c",
		floor: "#e2c99a",
		grout: "#c9ae78",
		floorSprite: "/sprites/floor-pantry.png"
	},
	freezer: {
		id: "freezer",
		name: "Freezer",
		wall: "#c5e8ee",
		wallSide: "#7ab3be",
		floor: "#e8f7f8",
		grout: "#c5e0e4",
		floorSprite: "/sprites/floor-freezer.png"
	},
	factory: {
		id: "factory",
		name: "Fábrica de Doces",
		wall: "#e59ab4",
		wallSide: "#b45c7c",
		floor: "#f3d0dc",
		grout: "#e0b4c4",
		floorSprite: "/sprites/floor-factory.png"
	},
	arena: {
		id: "arena",
		name: "Arena do Rei",
		wall: "#6a3a32",
		wallSide: "#3f201c",
		floor: "#4a2c26",
		grout: "#2e1a16",
		floorSprite: "/sprites/floor-arena.png"
	}
};
var LEVELS = [
	{
		id: "1-1",
		name: "Prateleira Fria",
		world: "fridge",
		intro: "Ande na grade, empilhe caixas e prenda as balas de goma.",
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
			"###############"
		]
	},
	{
		id: "1-2",
		name: "Corredor do Iogurte",
		world: "fridge",
		intro: "Corredores estreitos: bloqueie as saídas antes que elas te alcancem.",
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
			"###############"
		]
	},
	{
		id: "1-3",
		name: "Gaveta Lotada",
		world: "fridge",
		intro: "Três gomas. Use o poder da fruta para limpar o grupo.",
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
			"###############"
		]
	},
	{
		id: "2-1",
		name: "Caixas na Despensa",
		world: "pantry",
		intro: "Pirulitos quebram caixas. Não confie em um muro para sempre.",
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
			"###############"
		]
	},
	{
		id: "2-2",
		name: "Mistura Doce",
		world: "pantry",
		intro: "Gomas e pirulitos juntos. Prenda um, fuja do outro.",
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
			"###############"
		]
	},
	{
		id: "2-3",
		name: "Labirinto de Farinha",
		world: "pantry",
		intro: "Aperte os pirulitos nos cantos antes que destruam tudo.",
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
			"###############"
		]
	},
	{
		id: "3-1",
		name: "Eco Gelado",
		world: "freezer",
		intro: "A gelatina copia o seu movimento. Dê um passo, depois mude o plano.",
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
			"###############"
		]
	},
	{
		id: "3-2",
		name: "Geada Dupla",
		world: "freezer",
		intro: "Gelatina e gomas. O eco chega atrasado — use isso.",
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
			"###############"
		]
	},
	{
		id: "3-3",
		name: "Câmara Fria",
		world: "freezer",
		intro: "Duas gelatinas. Não deixe os ecos te encurralarem.",
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
			"###############"
		]
	},
	{
		id: "4-1",
		name: "Chão Derretido",
		world: "factory",
		intro: "Chocolate deixa poças. Evite o rastro ou fique lento.",
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
			"###############"
		]
	},
	{
		id: "4-2",
		name: "Linha de Disparo",
		world: "factory",
		intro: "Balas ácidas atiram de longe. Use caixas como cobertura.",
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
			"###############"
		]
	},
	{
		id: "4-3",
		name: "Esteira Final",
		world: "factory",
		intro: "Chocolate, ácido e goma. Combine bloqueio e poder.",
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
			"###############"
		]
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
			"###############"
		]
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
			"###############"
		]
	}
];
var P1_DIRS = {
	KeyW: 0,
	KeyD: 1,
	KeyS: 2,
	KeyA: 3
};
var P2_DIRS = {
	ArrowUp: 0,
	ArrowRight: 1,
	ArrowDown: 2,
	ArrowLeft: 3
};
function radialDeadzone(x, y, dz = .18) {
	const m = Math.hypot(x, y);
	if (m < dz) return {
		x: 0,
		y: 0
	};
	const scale = (m - dz) / (1 - dz) / m;
	return {
		x: x * scale,
		y: y * scale
	};
}
function dirFromStick(x, y) {
	if (x === 0 && y === 0) return null;
	if (Math.abs(x) > Math.abs(y)) return x > 0 ? 1 : 3;
	return y > 0 ? 2 : 0;
}
var Input = class {
	keys = /* @__PURE__ */ new Set();
	injected = null;
	touchDir = null;
	touchPower = false;
	touchCrate = false;
	touchPause = false;
	prevPower = [false, false];
	prevCrate = [false, false];
	prevPause = false;
	powerEdge = [false, false];
	crateEdge = [false, false];
	pauseEdge = false;
	attach(target) {
		const down = (e) => {
			this.keys.add(e.code);
			if (e.code.startsWith("Arrow") || e.code === "Space" || e.code === "KeyW" || e.code === "KeyA" || e.code === "KeyS" || e.code === "KeyD") e.preventDefault();
		};
		const up = (e) => this.keys.delete(e.code);
		const clear = () => this.keys.clear();
		target.addEventListener("keydown", down);
		target.addEventListener("keyup", up);
		window.addEventListener("blur", clear);
		document.addEventListener("visibilitychange", () => {
			if (document.hidden) this.keys.clear();
		});
		return () => {
			target.removeEventListener("keydown", down);
			target.removeEventListener("keyup", up);
			window.removeEventListener("blur", clear);
		};
	}
	setKeys(codes) {
		this.injected = codes;
	}
	poll() {
		const k = this.injected ? new Set(this.injected) : this.keys;
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
		return {
			p1,
			p2
		};
	}
	readPlayer(k, index) {
		let dir = null;
		if (index === 0) {
			if (this.touchDir !== null) dir = this.touchDir;
			for (const [code, d] of Object.entries(P1_DIRS)) if (k.has(code)) dir = d;
		} else for (const [code, d] of Object.entries(P2_DIRS)) if (k.has(code)) dir = d;
		const pad = (typeof navigator !== "undefined" ? navigator.getGamepads?.() : [])?.[index];
		if (pad && pad.mapping === "standard") {
			const stick = radialDeadzone(pad.axes[0] ?? 0, pad.axes[1] ?? 0);
			const fromStick = dirFromStick(stick.x, stick.y);
			if (fromStick !== null) dir = fromStick;
			if (pad.buttons[12]?.pressed) dir = 0;
			if (pad.buttons[15]?.pressed) dir = 1;
			if (pad.buttons[13]?.pressed) dir = 2;
			if (pad.buttons[14]?.pressed) dir = 3;
		}
		const power = index === 0 ? k.has("Space") || this.touchPower || !!pad?.buttons[0]?.pressed : k.has("Enter") || k.has("NumpadEnter") || !!pad?.buttons[0]?.pressed;
		const crate = index === 0 ? k.has("KeyE") || k.has("ShiftLeft") || this.touchCrate || !!pad?.buttons[1]?.pressed : k.has("ShiftRight") || k.has("Slash") || k.has("Numpad0") || !!pad?.buttons[1]?.pressed;
		const pause = k.has("Escape") || k.has("KeyP") || this.touchPause || !!pad?.buttons[9]?.pressed;
		return {
			dir,
			power,
			crate,
			pause
		};
	}
};
var SPRITE_URLS = {
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
	"floor-arena": "/sprites/floor-arena.png"
};
function loadSprites() {
	const entries = Object.entries(SPRITE_URLS);
	return Promise.all(entries.map(([key, url]) => new Promise((resolve, reject) => {
		const img = new Image();
		img.crossOrigin = "anonymous";
		img.onload = () => resolve([key, img]);
		img.onerror = () => reject(/* @__PURE__ */ new Error(`sprite ${url}`));
		img.src = url;
	}))).then((pairs) => Object.fromEntries(pairs));
}
function roundRect(ctx, x, y, w, h, r) {
	const rr = Math.min(r, w / 2, h / 2);
	ctx.beginPath();
	ctx.moveTo(x + rr, y);
	ctx.arcTo(x + w, y, x + w, y + h, rr);
	ctx.arcTo(x + w, y + h, x, y + h, rr);
	ctx.arcTo(x, y + h, x, y, rr);
	ctx.arcTo(x, y, x + w, y, rr);
	ctx.closePath();
}
function drawCrate(ctx, x, y, t, depth) {
	ctx.save();
	ctx.translate(x, y - depth * .15);
	ctx.fillStyle = "#8a6232";
	ctx.fillRect(4, t * .35, t - 8, t * .55 + depth * .2);
	ctx.fillStyle = "#c4a05a";
	roundRect(ctx, 5, 4, t - 10, t * .62, 4);
	ctx.fill();
	ctx.strokeStyle = "#6a4420";
	ctx.lineWidth = 2;
	ctx.stroke();
	ctx.fillStyle = "#d8b56e";
	ctx.fillRect(8, t * .18, t - 16, 4);
	ctx.fillRect(8, t * .38, t - 16, 4);
	ctx.restore();
}
function drawSpike(ctx, x, y, t, time) {
	const bob = Math.sin(time * 8) * 2;
	ctx.save();
	ctx.translate(x + t / 2, y + t * .72 + bob);
	ctx.fillStyle = "#2f6b3e";
	for (let i = -1; i <= 1; i++) {
		ctx.beginPath();
		ctx.moveTo(i * t * .22 - 6, 0);
		ctx.lineTo(i * t * .22, -t * .55);
		ctx.lineTo(i * t * .22 + 6, 0);
		ctx.fill();
	}
	ctx.fillStyle = "#5dae6c";
	for (let i = -1; i <= 1; i++) {
		ctx.beginPath();
		ctx.moveTo(i * t * .22 - 3, 0);
		ctx.lineTo(i * t * .22, -t * .42);
		ctx.lineTo(i * t * .22 + 3, 0);
		ctx.fill();
	}
	ctx.restore();
}
function drawBoss(ctx, x, y, t, e, time) {
	const s = t * (1.15 + Math.sin(time * 3) * .03);
	ctx.save();
	ctx.translate(x + t / 2, y + t / 2);
	ctx.scale(e.dir === 3 ? -1 : 1, 1);
	ctx.fillStyle = "#3a1c18";
	ctx.beginPath();
	ctx.ellipse(0, s * .28, s * .28, s * .1, 0, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = "#5a241c";
	roundRect(ctx, -s * .28, -s * .38, s * .56, s * .7, 10);
	ctx.fill();
	ctx.fillStyle = "#7a3228";
	roundRect(ctx, -s * .22, -s * .3, s * .44, s * .52, 8);
	ctx.fill();
	ctx.fillStyle = "#e2c04a";
	roundRect(ctx, -s * .2, -s * .5, s * .4, s * .16, 4);
	ctx.fill();
	ctx.fillStyle = "#c43c3c";
	ctx.beginPath();
	ctx.arc(0, -s * .56, s * .08, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = "#f3ede3";
	ctx.beginPath();
	ctx.arc(-s * .1, -s * .12, s * .07, 0, Math.PI * 2);
	ctx.arc(s * .1, -s * .12, s * .07, 0, Math.PI * 2);
	ctx.fill();
	ctx.fillStyle = "#1c1410";
	ctx.beginPath();
	ctx.arc(-s * .08, -s * .11, s * .03, 0, Math.PI * 2);
	ctx.arc(s * .12, -s * .11, s * .03, 0, Math.PI * 2);
	ctx.fill();
	ctx.strokeStyle = "#1c1410";
	ctx.lineWidth = 2;
	ctx.beginPath();
	ctx.arc(0, s * .06, s * .12, .15, Math.PI - .15);
	ctx.stroke();
	ctx.restore();
}
function drawProjectile(ctx, x, y, t, time) {
	ctx.save();
	ctx.translate(x + t / 2, y + t / 2);
	ctx.rotate(time * 8);
	ctx.fillStyle = "#d6ff4a";
	ctx.beginPath();
	ctx.moveTo(0, -t * .22);
	ctx.lineTo(t * .16, 0);
	ctx.lineTo(0, t * .22);
	ctx.lineTo(-t * .16, 0);
	ctx.closePath();
	ctx.fill();
	ctx.restore();
}
function renderSim(ctx, sim, sprites, cssW, cssH, time) {
	ctx.clearRect(0, 0, cssW, cssH);
	const world = WORLDS[sim.level.world];
	const tile = Math.floor(Math.min(cssW / 15, cssH / 11));
	const ox = Math.floor((cssW - tile * 15) / 2);
	const oy = Math.floor((cssH - tile * 11) / 2);
	const shake = sim.trauma * sim.trauma;
	const sx = shake ? (Math.random() * 2 - 1) * 10 * shake : 0;
	const sy = shake ? (Math.random() * 2 - 1) * 8 * shake : 0;
	ctx.save();
	ctx.translate(ox + sx, oy + sy);
	const floor = sprites[`floor-${world.id}`];
	const depth = Math.max(4, tile * .18);
	for (let y = 0; y < 11; y++) for (let x = 0; x < 15; x++) {
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
		ctx.globalAlpha = .35;
		ctx.strokeRect(px + .5, py + .5, tile - 1, tile - 1);
		ctx.globalAlpha = 1;
		if (t === 5) {
			ctx.fillStyle = "rgba(90, 42, 22, 0.45)";
			ctx.beginPath();
			ctx.ellipse(px + tile / 2, py + tile * .62, tile * .34, tile * .16, 0, 0, Math.PI * 2);
			ctx.fill();
		}
		if (t === 4) {
			ctx.fillStyle = "rgba(155, 106, 214, 0.35)";
			ctx.beginPath();
			ctx.ellipse(px + tile / 2, py + tile * .62, tile * .32, tile * .14, 0, 0, Math.PI * 2);
			ctx.fill();
		}
	}
	for (let y = 0; y < 11; y++) for (let x = 0; x < 15; x++) {
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
	const pickups = sim.level.map;
	for (let y = 0; y < 11; y++) {
		const row = pickups[y] ?? "";
		for (let x = 0; x < 15; x++) {
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
				const a = i * Math.PI * 2 / 5 - Math.PI / 2;
				const r = i % 2 === 0 ? tile * .22 : tile * .1;
				ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
			}
			ctx.closePath();
			ctx.fill();
			ctx.restore();
		}
	}
	for (let y = 0; y < 11; y++) for (let x = 0; x < 15; x++) {
		const t = sim.tileAt(x, y);
		const px = x * tile;
		const py = y * tile;
		if (t === 2) drawCrate(ctx, px, py, tile, depth);
		if (t === 3) drawSpike(ctx, px, py, tile, time);
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
		if (e.kind === "boss") {
			if (e.flash > 0) ctx.globalAlpha = .55 + Math.sin(time * 40) * .3;
			drawBoss(ctx, px, py, tile, e, time);
			ctx.globalAlpha = 1;
			drawHp(ctx, px, py, tile, e);
			continue;
		}
		const img = sprites[e.kind === "player" ? e.fruit : e.kind];
		const bob = Math.sin(time * 6 + e.id) * (e.moving ? 2.4 : 1.4);
		const squash = 1 - e.squash * .35;
		const stretch = 1 + e.squash * .28;
		const size = tile * (e.kind === "player" ? 1.08 : 1.02);
		ctx.save();
		ctx.translate(px + tile / 2, py + tile * .62 + bob);
		ctx.scale((e.dir === 3 ? -1 : 1) * (1 / squash), stretch);
		if (e.kind === "player" && e.invuln > 0 && Math.floor(time * 16) % 2 === 0) ctx.globalAlpha = .45;
		if (e.flash > 0) ctx.globalAlpha = .7;
		if (img) ctx.drawImage(img, -size / 2, -size + 6, size, size);
		else {
			ctx.fillStyle = "#888";
			ctx.beginPath();
			ctx.arc(0, -size * .3, size * .3, 0, Math.PI * 2);
			ctx.fill();
		}
		ctx.restore();
		ctx.globalAlpha = 1;
		if (e.kind !== "player" && e.maxHp > 1) drawHp(ctx, px, py, tile, e);
		if (e.kind === "player" && e.playerIndex === 1) {
			ctx.fillStyle = "#8ec5ff";
			ctx.font = `700 ${Math.max(10, tile * .22)}px Nunito, sans-serif`;
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
function drawHp(ctx, px, py, tile, e) {
	const w = tile * .7;
	const h = 5;
	const x = px + (tile - w) / 2;
	const y = py - 6;
	ctx.fillStyle = "rgba(0,0,0,0.45)";
	ctx.fillRect(x, y, w, h);
	ctx.fillStyle = e.kind === "boss" ? "#c43c3c" : "#3f8f5c";
	ctx.fillRect(x, y, w * Math.max(0, e.hp / e.maxHp), h);
}
var nextId = 1;
function makeEntity(partial) {
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
		...partial
	};
}
var Sim = class {
	tiles = [];
	tileLife = [];
	entities = [];
	particles = [];
	level;
	lives = 3;
	score = 0;
	time = 0;
	status = "play";
	hitstop = 0;
	trauma = 0;
	message = null;
	messageT = 0;
	players = 1;
	fruits = ["lemon"];
	paused = false;
	pickups = 0;
	collected = /* @__PURE__ */ new Set();
	hooks;
	constructor(hooks) {
		this.hooks = hooks;
	}
	load(levelIndex, fruits, players, score = 0) {
		nextId = 1;
		const level = LEVELS[levelIndex] ?? LEVELS[0];
		this.level = level;
		this.fruits = fruits;
		this.players = players;
		this.lives = 3;
		this.score = score;
		this.time = 0;
		this.status = "play";
		this.hitstop = 0;
		this.trauma = 0;
		this.paused = false;
		this.entities = [];
		this.particles = [];
		this.collected = /* @__PURE__ */ new Set();
		this.tiles = new Array(165).fill(0);
		this.tileLife = new Array(165).fill(0);
		this.message = level.intro;
		this.messageT = 3.2;
		const spawns = [];
		for (let y = 0; y < 11; y++) {
			const row = level.map[y] ?? "";
			for (let x = 0; x < 15; x++) {
				const ch = row[x] ?? "#";
				const i = y * 15 + x;
				if (ch === "#") this.tiles[i] = 1;
				else if (ch === "X") this.tiles[i] = 2;
				else this.tiles[i] = 0;
				if ("PGQJLCSoB".includes(ch)) spawns.push({
					ch,
					x,
					y
				});
			}
		}
		const p1s = spawns.find((s) => s.ch === "P") ?? {
			x: 1,
			y: 1,
			ch: "P"
		};
		const p2s = spawns.find((s) => s.ch === "Q");
		this.spawnPlayer(0, fruits[0] ?? "lemon", p1s.x, p1s.y);
		if (players > 1) {
			let x = p2s?.x ?? p1s.x + 1;
			let y = p2s?.y ?? p1s.y;
			if (!this.walkable(x, y)) {
				x = p1s.x;
				y = Math.min(9, p1s.y + 1);
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
	spawnPlayer(index, fruit, x, y) {
		this.entities.push(makeEntity({
			kind: "player",
			playerIndex: index,
			fruit,
			gx: x,
			gy: y,
			speed: 5.4,
			hp: 1,
			maxHp: 1,
			invuln: .6,
			dir: 1
		}));
	}
	spawnEnemy(kind, x, y) {
		const info = ENEMY_INFO[kind];
		this.entities.push(makeEntity({
			kind,
			gx: x,
			gy: y,
			speed: info.speed,
			hp: info.hp,
			maxHp: info.hp,
			dir: 3
		}));
	}
	idx(x, y) {
		return y * 15 + x;
	}
	inBounds(x, y) {
		return x >= 0 && y >= 0 && x < 15 && y < 11;
	}
	tileAt(x, y) {
		if (!this.inBounds(x, y)) return 1;
		return this.tiles[this.idx(x, y)] ?? 1;
	}
	setTile(x, y, t, life = 0) {
		if (!this.inBounds(x, y)) return;
		this.tiles[this.idx(x, y)] = t;
		this.tileLife[this.idx(x, y)] = life;
	}
	walkable(x, y, forRoll = false) {
		const t = this.tileAt(x, y);
		if (t === 1) return false;
		if (t === 2) return forRoll;
		return true;
	}
	occupied(x, y, self, ignorePlayers = false) {
		for (const e of this.entities) {
			if (!e.alive || e === self || e.kind === "projectile") continue;
			if (ignorePlayers && e.kind === "player") continue;
			if (self?.kind === "player" && e.kind === "player") continue;
			if (e.gx === x && e.gy === y) return true;
			if (e.moving && e.toX === x && e.toY === y) return true;
		}
		return false;
	}
	nearestPlayer(e) {
		let best = null;
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
	burst(x, y, color, n = 10, kind = "dot") {
		for (let i = 0; i < n; i++) {
			const a = Math.random() * Math.PI * 2;
			const s = 2 + Math.random() * 5;
			this.particles.push({
				x: x + .5,
				y: y + .5,
				vx: Math.cos(a) * s,
				vy: Math.sin(a) * s,
				life: .35 + Math.random() * .35,
				max: .7,
				size: 3 + Math.random() * 4,
				color,
				kind
			});
		}
	}
	startMove(e, dir) {
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
			if (rolling && e.kind === "player") this.hitAt(nx, ny, 2, e);
			else return false;
		}
		e.dir = dir;
		e.moving = true;
		e.fromX = e.gx;
		e.fromY = e.gy;
		e.toX = nx;
		e.toY = ny;
		e.t = 0;
		e.squash = .18;
		return true;
	}
	finishMove(e) {
		e.gx = e.toX;
		e.gy = e.toY;
		e.x = e.gx;
		e.y = e.gy;
		e.moving = false;
		e.t = 0;
		e.squash = .22;
		const tile = this.tileAt(e.gx, e.gy);
		if (e.kind === "player") {
			if (e.rollLeft <= 0 && e.dashing <= 0) e.speed = tile === 5 ? 2.6 : 5.4;
			if (e.dashing > 0) this.hitAt(e.gx, e.gy, 1, e);
			if (e.rollLeft > 0) {
				e.rollLeft--;
				if (e.rollLeft > 0) this.startMove(e, e.dir);
				else e.speed = 5.4;
			}
			for (const g of this.entities) if (g.kind === "gelatin" && g.alive) {
				g.mimic.push({
					dir: e.dir,
					at: this.time
				});
				if (g.mimic.length > 14) g.mimic.shift();
			}
			if ((this.level.map[e.gy] ?? "")[e.gx] === "o") {
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
				e.stun = Math.max(e.stun, .7);
				this.burst(e.gx, e.gy, "#b57ad6", 6);
			}
			if (e.kind === "chocolate") this.setTile(e.gx, e.gy, 5, 5.5);
			if (e.rollLeft > 0) {
				e.rollLeft--;
				if (e.rollLeft > 0) this.startMove(e, e.dir);
			}
		}
	}
	hitAt(x, y, dmg, _src) {
		for (const e of this.entities) {
			if (!e.alive || e.kind === "player" || e.kind === "projectile") continue;
			if (e.gx === x && e.gy === y || e.moving && e.toX === x && e.toY === y) this.damage(e, dmg);
		}
	}
	damage(e, dmg) {
		if (!e.alive) return;
		if (e.kind === "player" && e.invuln > 0) return;
		e.hp -= dmg;
		e.flash = .12;
		e.squash = .35;
		this.hitstop = Math.max(this.hitstop, .05);
		this.trauma = Math.min(1, this.trauma + .28);
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
	kill(e) {
		e.alive = false;
		this.score += e.kind === "boss" ? 1e3 : 120;
		this.burst(e.gx, e.gy, "#f4efe6", 18, "confetti");
		this.hooks.onSfx("kill");
		this.trauma = Math.min(1, this.trauma + .4);
		this.hitstop = .08;
	}
	usePower(p) {
		if (!p.fruit || p.cooldown > 0 || p.stun > 0 || p.rollLeft > 0) return;
		p.cooldown = FRUITS[p.fruit].cooldown;
		this.hooks.onSfx("power");
		this.trauma = Math.min(1, this.trauma + .15);
		if (p.fruit === "lemon") {
			const cells = [
				[p.gx + DX[p.dir], p.gy + DY[p.dir]],
				[p.gx + 2 * DX[p.dir], p.gy + 2 * DY[p.dir]],
				[p.gx + DX[p.dir] + DX[(p.dir + 1) % 4], p.gy + DY[p.dir] + DY[(p.dir + 1) % 4]],
				[p.gx + DX[p.dir] + DX[(p.dir + 3) % 4], p.gy + DY[p.dir] + DY[(p.dir + 3) % 4]]
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
				p.invuln = Math.max(p.invuln, .25);
				this.burst(landX, landY, "#9b6ad6", 10);
				this.hitAt(midX, midY, 1, p);
			}
		} else if (p.fruit === "pineapple") {
			const fx = p.gx + DX[p.dir];
			const fy = p.gy + DY[p.dir];
			const side = p.dir % 2 * 2;
			const cells = [
				[fx, fy],
				[fx + DX[side], fy + DY[side]],
				[fx - DX[side], fy - DY[side]]
			];
			for (const [x, y] of cells) {
				if (!this.inBounds(x, y) || this.tileAt(x, y) === 1) continue;
				this.setTile(x, y, 3, 4.2);
				this.burst(x, y, "#3f8f5c", 6, "spark");
				this.hitAt(x, y, 1, p);
			}
		} else if (p.fruit === "strawberry") {
			p.dashing = 3;
			p.invuln = Math.max(p.invuln, .55);
			p.speed = 11;
			if (!p.moving) this.startMove(p, p.dir);
		}
	}
	toggleCrate(p) {
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
			p.crateCd = .18;
			return;
		}
		if (t !== 0 && t !== 4 && t !== 5) return;
		if (this.occupied(nx, ny, p)) return;
		this.setTile(nx, ny, 2);
		this.burst(nx, ny, "#d7c09a", 5);
		this.hooks.onSfx("crate");
		p.crateCd = .18;
	}
	breakCrate(x, y) {
		if (this.tileAt(x, y) !== 2) return;
		this.setTile(x, y, 0);
		this.burst(x, y, "#c4a574", 8, "spark");
		this.hooks.onSfx("crate");
	}
	shoot(e, dir, speed = 6.2) {
		const nx = e.gx + DX[dir];
		const ny = e.gy + DY[dir];
		if (!this.walkable(nx, ny)) return;
		this.entities.push(makeEntity({
			kind: "projectile",
			gx: e.gx,
			gy: e.gy,
			dir,
			speed,
			owner: e.id,
			hp: 1,
			maxHp: 1
		}));
		const p = this.entities[this.entities.length - 1];
		this.startMove(p, dir);
	}
	thinkEnemy(e) {
		if (e.stun > 0 || e.moving) return;
		const target = this.nearestPlayer(e);
		if (!target) return;
		if (e.kind === "gelatin") {
			while (e.mimic.length && this.time - e.mimic[0].at >= .7) {
				const m = e.mimic.shift();
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
			e.phase = ratio > .66 ? 1 : ratio > .33 ? 2 : 3;
			e.speed = e.phase === 3 ? 2.9 : 2.35;
			if (e.phase >= 3 && !e.spawnedMinions) {
				e.spawnedMinions = true;
				this.spawnEnemy("gummy", 1, 1);
				this.spawnEnemy("gummy", 13, 9);
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
					e.stun = .2;
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
					e.stun = .28;
					return;
				}
				if (this.startMove(e, d)) return;
			}
			e.trapped += .016;
			return;
		}
		const dirs = this.chaseDirs(e, target);
		if (!this.tryDirs(e, dirs)) e.trapped += .016;
		else e.trapped = 0;
	}
	faceToward(e, t) {
		const dx = t.gx - e.gx;
		const dy = t.gy - e.gy;
		if (Math.abs(dx) > Math.abs(dy)) return dx > 0 ? 1 : 3;
		if (dy !== 0) return dy > 0 ? 2 : 0;
		return e.dir;
	}
	chaseDirs(e, t) {
		const dirs = [
			0,
			1,
			2,
			3
		];
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
	fleeDirs(e, t) {
		return this.chaseDirs(e, t).slice().reverse();
	}
	tryDirs(e, dirs) {
		for (const d of dirs) if (this.startMove(e, d)) return true;
		return false;
	}
	step(dt, input) {
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
		for (let i = 0; i < this.tiles.length; i++) if (this.tileLife[i] > 0) {
			this.tileLife[i] -= dt;
			if (this.tileLife[i] <= 0 && (this.tiles[i] === 3 || this.tiles[i] === 4 || this.tiles[i] === 5)) this.tiles[i] = 0;
		}
		const { p1, p2 } = input.poll();
		if (input.pauseEdge) this.paused = true;
		const acts = [p1, p2];
		for (const p of this.entities) {
			if (p.kind !== "player" || !p.alive) continue;
			const a = acts[p.playerIndex ?? 0];
			p.cooldown = Math.max(0, p.cooldown - dt);
			p.crateCd = Math.max(0, p.crateCd - dt);
			p.stun = Math.max(0, p.stun - dt);
			p.invuln = Math.max(0, p.invuln - dt);
			p.flash = Math.max(0, p.flash - dt);
			p.squash = Math.max(0, p.squash - dt * 1.8);
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
				if (this.startMove(p, a.dir)) this.hooks.onSfx("move");
			} else if (a.dir !== null && p.moving) p.dir = a.dir;
			if (input.powerEdge[p.playerIndex ?? 0]) this.usePower(p);
			if (input.crateEdge[p.playerIndex ?? 0]) this.toggleCrate(p);
		}
		for (const e of this.entities) {
			if (!e.alive || e.kind === "player") continue;
			e.stun = Math.max(0, e.stun - dt);
			e.flash = Math.max(0, e.flash - dt);
			e.squash = Math.max(0, e.squash - dt * 1.6);
			e.shotCd = Math.max(0, e.shotCd - dt);
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
		for (const e of this.entities) {
			if (!e.alive || !e.moving) {
				if (e.alive) {
					e.x = e.gx;
					e.y = e.gy;
				}
				continue;
			}
			let spd = e.speed;
			if (e.kind === "player" && this.tileAt(e.toX, e.toY) === 5) spd *= .5;
			e.t += dt * spd;
			const u = Math.min(1, e.t);
			e.x = e.fromX + (e.toX - e.fromX) * u;
			e.y = e.fromY + (e.toY - e.fromY) * u;
			if (e.t >= 1) this.finishMove(e);
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
		if (this.entities.filter((e) => e.alive && e.kind !== "player" && e.kind !== "projectile").length === 0 && this.status === "play") {
			this.status = "win";
			this.score += 250 + Math.max(0, 80 - Math.floor(this.time)) * 5;
			this.hooks.onSfx("win");
		}
	}
	resolveTouches() {
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
					if (Math.abs(p.x - e.x) < .55 && Math.abs(p.y - e.y) < .55) {
						this.damage(p, 1);
						e.alive = false;
					}
				}
				continue;
			}
			if (e.kind === "player") continue;
			for (const p of players) {
				if (p.invuln > 0 || p.rollLeft > 0 || p.dashing > 0) continue;
				if (Math.abs(p.x - e.x) < .62 && Math.abs(p.y - e.y) < .62) this.damage(p, 1);
			}
		}
	}
	hud() {
		const enemies = this.entities.filter((e) => e.alive && e.kind !== "player" && e.kind !== "projectile").length;
		const p1 = this.entities.find((e) => e.kind === "player" && e.playerIndex === 0);
		const p2 = this.entities.find((e) => e.kind === "player" && e.playerIndex === 1);
		const cd = (p) => {
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
			paused: this.paused
		};
	}
	playerPos() {
		const p = this.entities.find((e) => e.kind === "player" && e.alive);
		return {
			x: p?.x ?? 0,
			y: p?.y ?? 0,
			dir: p?.dir ?? 1,
			moving: !!p?.moving,
			speed: p?.moving ? p.speed : 0
		};
	}
};
var FruitEngine = class {
	canvas;
	ctx;
	sim;
	input;
	audio;
	sprites = {};
	raf = 0;
	acc = 0;
	last = 0;
	running = false;
	unbind = null;
	onHud;
	onOver;
	lastStatus = "play";
	hudAcc = 0;
	constructor(canvas, opts) {
		this.canvas = canvas;
		const ctx = canvas.getContext("2d");
		if (!ctx) throw new Error("canvas");
		this.ctx = ctx;
		this.onHud = opts.onHud;
		this.onOver = opts.onOver;
		this.audio = opts.audio;
		this.input = new Input();
		this.sim = new Sim({ onSfx: (name) => {
			this.audio[name].bind(this.audio)();
		} });
	}
	async start(levelIndex, fruits, players, score) {
		this.sprites = await loadSprites();
		this.sim.load(levelIndex, fruits, players, score);
		this.unbind = this.input.attach(window);
		this.running = true;
		this.acc = 0;
		this.last = performance.now();
		this.lastStatus = "play";
		this.wireProbe();
		this.loop(this.last);
	}
	setPaused(v) {
		this.sim.paused = v;
	}
	destroy() {
		this.running = false;
		cancelAnimationFrame(this.raf);
		this.unbind?.();
		if (typeof window !== "undefined") delete window.__controlsTest;
	}
	wireProbe() {
		if (typeof window === "undefined") return;
		window.__controlsTest = {
			getYaw: () => {
				const p = this.sim.playerPos();
				return [
					Math.PI / 2,
					0,
					-Math.PI / 2,
					Math.PI
				][p.dir] ?? 0;
			},
			getSpeed: () => this.sim.playerPos().speed,
			getX: () => this.sim.playerPos().x,
			getY: () => this.sim.playerPos().y,
			setKeys: (codes) => this.input.setKeys(codes)
		};
	}
	loop = (now) => {
		if (!this.running) return;
		let dt = (now - this.last) / 1e3;
		this.last = now;
		if (dt > .1) dt = .1;
		this.acc += dt;
		while (this.acc >= STEP) {
			this.sim.step(STEP, this.input);
			this.acc -= STEP;
		}
		this.fit();
		const rect = this.canvas.getBoundingClientRect();
		renderSim(this.ctx, this.sim, this.sprites, rect.width, rect.height, now / 1e3);
		this.audio.tickMusic(dt, this.sim.level.world === "arena" || this.sim.level.world === "factory");
		this.hudAcc += dt;
		if (this.hudAcc > .08) {
			this.hudAcc = 0;
			this.onHud(this.sim.hud());
		}
		if (this.sim.status !== "play" && this.lastStatus === "play") {
			this.lastStatus = this.sim.status;
			this.onHud(this.sim.hud());
			this.onOver(this.sim.status, this.sim.score);
		}
		this.raf = requestAnimationFrame(this.loop);
	};
	fit() {
		const parent = this.canvas.parentElement;
		const w = parent?.clientWidth ?? 720;
		const h = parent?.clientHeight ?? 528;
		const dpr = Math.min(window.devicePixelRatio || 1, 2);
		if (this.canvas.width !== Math.floor(w * dpr) || this.canvas.height !== Math.floor(h * dpr)) {
			this.canvas.width = Math.floor(w * dpr);
			this.canvas.height = Math.floor(h * dpr);
			this.canvas.style.width = `${w}px`;
			this.canvas.style.height = `${h}px`;
		}
		this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
	}
};
var GameAudio = class {
	ctx = null;
	master = null;
	sfx = null;
	music = null;
	musicTimer = 0;
	musicStep = 0;
	muted = false;
	masterGain = .7;
	sfxGain = .8;
	musicGain = .22;
	unlock() {
		if (!this.ctx) {
			const Ctx = window.AudioContext || window.webkitAudioContext;
			this.ctx = new Ctx({ latencyHint: "interactive" });
			this.master = this.ctx.createGain();
			this.sfx = this.ctx.createGain();
			this.music = this.ctx.createGain();
			this.sfx.connect(this.master);
			this.music.connect(this.master);
			this.master.connect(this.ctx.destination);
			this.applyGains();
		}
		if (this.ctx.state === "suspended") this.ctx.resume();
	}
	resume() {
		if (this.ctx?.state === "suspended") this.ctx.resume();
	}
	setMuted(v) {
		this.muted = v;
		this.applyGains();
	}
	applyGains() {
		const t = this.ctx?.currentTime ?? 0;
		const mute = this.muted ? 0 : 1;
		this.master?.gain.setTargetAtTime(this.masterGain * mute, t, .03);
		this.sfx?.gain.setTargetAtTime(this.sfxGain, t, .03);
		this.music?.gain.setTargetAtTime(this.musicGain, t, .05);
	}
	tone(freq, dur, type, vol, slide = 0) {
		if (!this.ctx || !this.sfx || this.muted) return;
		const t = this.ctx.currentTime;
		const osc = this.ctx.createOscillator();
		const g = this.ctx.createGain();
		osc.type = type;
		osc.frequency.setValueAtTime(freq, t);
		if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), t + dur);
		g.gain.setValueAtTime(1e-4, t);
		g.gain.exponentialRampToValueAtTime(vol, t + .012);
		g.gain.exponentialRampToValueAtTime(1e-4, t + dur);
		osc.connect(g);
		g.connect(this.sfx);
		osc.start(t);
		osc.stop(t + dur + .02);
	}
	move() {
		this.tone(420 + Math.random() * 40, .05, "square", .04);
	}
	crate() {
		this.tone(180, .08, "triangle", .12, -40);
		this.tone(520, .06, "square", .05);
	}
	power() {
		this.tone(660, .1, "sawtooth", .08, 220);
		this.tone(880, .12, "square", .05);
	}
	hit() {
		this.tone(140, .14, "sawtooth", .16, -80);
		this.tone(90, .18, "triangle", .1);
	}
	kill() {
		this.tone(520, .12, "square", .1, 300);
		this.tone(780, .16, "triangle", .07);
	}
	hurt() {
		this.tone(220, .2, "sawtooth", .14, -160);
	}
	win() {
		this.tone(523, .16, "triangle", .12);
		this.tone(659, .18, "triangle", .1);
		this.tone(784, .28, "triangle", .1);
	}
	lose() {
		this.tone(196, .3, "sawtooth", .12, -80);
		this.tone(130, .4, "triangle", .1, -40);
	}
	pickup() {
		this.tone(880, .08, "square", .07, 200);
		this.tone(1320, .1, "triangle", .05);
	}
	tickMusic(dt, intense) {
		if (!this.ctx || !this.music || this.muted) return;
		this.musicTimer += dt;
		const stepDur = intense ? .22 : .32;
		if (this.musicTimer < stepDur) return;
		this.musicTimer = 0;
		const scale = intense ? [
			196,
			233,
			261,
			311,
			349,
			311,
			261,
			233
		] : [
			262,
			294,
			330,
			392,
			330,
			294,
			262,
			196
		];
		const freq = scale[this.musicStep % scale.length];
		this.musicStep++;
		const t = this.ctx.currentTime;
		const osc = this.ctx.createOscillator();
		const g = this.ctx.createGain();
		osc.type = "triangle";
		osc.frequency.value = freq;
		g.gain.setValueAtTime(1e-4, t);
		g.gain.exponentialRampToValueAtTime(.045, t + .02);
		g.gain.exponentialRampToValueAtTime(1e-4, t + stepDur * .9);
		osc.connect(g);
		g.connect(this.music);
		osc.start(t);
		osc.stop(t + stepDur);
	}
};
var KEY = "fruit-rebellion-save";
var VERSION = 1;
var DEFAULTS = {
	version: VERSION,
	unlocked: 0,
	highScore: 0,
	seenHowTo: false,
	muted: false
};
function migrate(raw) {
	const s = {
		...DEFAULTS,
		...raw
	};
	s.version = VERSION;
	return s;
}
function loadSave() {
	if (typeof localStorage === "undefined") return { ...DEFAULTS };
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return { ...DEFAULTS };
		return migrate(JSON.parse(raw));
	} catch {
		return { ...DEFAULTS };
	}
}
function writeSave(data) {
	if (typeof localStorage === "undefined") return;
	try {
		localStorage.setItem(KEY, JSON.stringify({
			...data,
			version: VERSION
		}));
	} catch {}
}
function TouchPad({ onDir, onPower, onCrate }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-end justify-between gap-4 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-2 md:hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid w-40 grid-cols-3 grid-rows-3 gap-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PadBtn, {
					label: "Cima",
					onHold: (v) => onDir(v ? 0 : null),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PadBtn, {
					label: "Esquerda",
					onHold: (v) => onDir(v ? 3 : null),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PadBtn, {
					label: "Direita",
					onHold: (v) => onDir(v ? 1 : null),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PadBtn, {
					label: "Baixo",
					onHold: (v) => onDir(v ? 2 : null),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionBtn, {
				label: "Caixa",
				onHold: onCrate
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionBtn, {
				label: "Poder",
				primary: true,
				onHold: onPower
			})]
		})]
	});
}
function PadBtn({ label, onHold, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		"aria-label": label,
		className: "grid h-12 w-12 place-items-center rounded-md border border-border bg-elevated text-fg",
		onPointerDown: (e) => {
			e.preventDefault();
			e.currentTarget.setPointerCapture(e.pointerId);
			onHold(true);
		},
		onPointerUp: () => onHold(false),
		onPointerCancel: () => onHold(false),
		children
	});
}
function ActionBtn({ label, onHold, primary }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: `h-16 w-16 rounded-full border text-xs font-semibold ${primary ? "border-accent bg-accent text-accent-fg" : "border-border bg-elevated text-fg"}`,
		onPointerDown: (e) => {
			e.preventDefault();
			e.currentTarget.setPointerCapture(e.pointerId);
			onHold(true);
		},
		onPointerUp: () => onHold(false),
		onPointerCancel: () => onHold(false),
		children: label
	});
}
var SPRITE = {
	lemon: "/sprites/lemon.png",
	watermelon: "/sprites/watermelon.png",
	grape: "/sprites/grape.png",
	pineapple: "/sprites/pineapple.png",
	strawberry: "/sprites/strawberry.png"
};
function FruitRebellion() {
	const [save, setSave] = (0, import_react.useState)(() => typeof window === "undefined" ? {
		version: 1,
		unlocked: 0,
		highScore: 0,
		seenHowTo: false,
		muted: false
	} : loadSave());
	const [screen, setScreen] = (0, import_react.useState)("title");
	const [players, setPlayers] = (0, import_react.useState)(1);
	const [levelIndex, setLevelIndex] = (0, import_react.useState)(0);
	const [p1, setP1] = (0, import_react.useState)("lemon");
	const [p2, setP2] = (0, import_react.useState)("strawberry");
	const [picking, setPicking] = (0, import_react.useState)(0);
	const [hud, setHud] = (0, import_react.useState)(null);
	const [paused, setPaused] = (0, import_react.useState)(false);
	const [over, setOver] = (0, import_react.useState)(null);
	const [carryScore, setCarryScore] = (0, import_react.useState)(0);
	const audioRef = (0, import_react.useRef)(null);
	if (!audioRef.current) audioRef.current = new GameAudio();
	const audio = audioRef.current;
	(0, import_react.useEffect)(() => {
		audio.setMuted(save.muted);
	}, [audio, save.muted]);
	(0, import_react.useEffect)(() => {
		const onVis = () => {
			if (!document.hidden) audio.resume();
		};
		document.addEventListener("visibilitychange", onVis);
		return () => document.removeEventListener("visibilitychange", onVis);
	}, [audio]);
	const persist = (next) => {
		setSave(next);
		writeSave(next);
	};
	const unlockAudio = () => audio.unlock();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh overflow-hidden bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "pointer-events-none absolute inset-0 opacity-40",
				style: { backgroundImage: kitchenBg }
			}),
			screen === "title" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
				highScore: save.highScore,
				unlocked: save.unlocked,
				onPlay: () => {
					unlockAudio();
					setScreen("mode");
				},
				onHowTo: () => {
					unlockAudio();
					setScreen("howto");
				}
			}),
			screen === "mode" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ModeSelect, {
				onBack: () => setScreen("title"),
				onPick: (n) => {
					setPlayers(n);
					if (!save.seenHowTo) {
						persist({
							...save,
							seenHowTo: true
						});
						setScreen("howto");
					} else goChars(Math.min(save.unlocked, LEVELS.length - 1));
				}
			}),
			screen === "howto" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowTo, {
				onBack: () => setScreen(players ? "mode" : "title"),
				onContinue: () => goChars(Math.min(save.unlocked, LEVELS.length - 1))
			}),
			screen === "chars" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharSelect, {
				players,
				picking,
				p1,
				p2,
				level: LEVELS[levelIndex],
				onPick: (id) => {
					if (picking === 0) setP1(id);
					else setP2(id);
				},
				onBack: () => setScreen("mode"),
				onConfirm: () => {
					if (players === 2 && picking === 0) setPicking(1);
					else startPlay();
				}
			}),
			screen === "play" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlayView, {
				levelIndex,
				fruits: players === 2 ? [p1, p2] : [p1],
				players,
				score: carryScore,
				audio,
				muted: save.muted,
				hud,
				paused: paused || !!hud?.paused,
				over,
				onHud: setHud,
				onOver: (s, score) => {
					setOver(s);
					setCarryScore(score);
					if (s === "win") {
						const unlocked = Math.max(save.unlocked, levelIndex + 1);
						persist({
							...save,
							unlocked,
							highScore: Math.max(save.highScore, score)
						});
					} else persist({
						...save,
						highScore: Math.max(save.highScore, score)
					});
				},
				onPause: (v) => setPaused(v),
				onMute: () => persist({
					...save,
					muted: !save.muted
				}),
				onMenu: () => {
					setCarryScore(0);
					setScreen("title");
				},
				onRetry: () => {
					setCarryScore(0);
					goChars(levelIndex);
				},
				onNext: () => {
					const next = levelIndex + 1;
					if (next >= LEVELS.length) {
						setScreen("complete");
						return;
					}
					goChars(next);
				}
			}, `${levelIndex}-${p1}-${p2}-${players}`),
			screen === "complete" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Complete, {
				score: carryScore,
				onMenu: () => {
					setCarryScore(0);
					setScreen("title");
				}
			})
		]
	});
}
var kitchenBg = "radial-gradient(ellipse at top, color-mix(in oklab, var(--color-elevated) 70%, transparent), transparent 55%), repeating-linear-gradient(90deg, color-mix(in oklab, var(--color-fg) 4%, transparent) 0 1px, transparent 1px 48px), repeating-linear-gradient(0deg, color-mix(in oklab, var(--color-fg) 4%, transparent) 0 1px, transparent 1px 48px)";
function Panel({ children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `rounded-xl border border-border bg-surface/92 p-6 shadow-[var(--shadow-panel)] ${className}`,
		children
	});
}
function Btn({ children, onClick, variant = "primary", className = "", type = "button" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type,
		onClick,
		className: `inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 font-semibold tracking-tight transition-transform duration-[var(--motion-quick)] ease-[var(--ease-out)] active:scale-[0.98] ${variant === "primary" ? "bg-accent text-accent-fg hover:brightness-110" : variant === "danger" ? "bg-berry text-fg hover:brightness-110" : "bg-elevated text-fg border border-border-strong hover:bg-surface"} ${className}`,
		children
	});
}
function Title({ highScore, unlocked, onPlay, onHowTo }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center gap-8 px-5 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2",
				children: FRUIT_ORDER.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: SPRITE[id],
					alt: "",
					className: "h-16 w-16 object-contain drop-shadow-lg sm:h-20 sm:w-20"
				}, id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-sm font-semibold uppercase tracking-[0.22em] text-muted",
						children: "Campanha cooperativa"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-5xl font-semibold leading-none tracking-[-0.04em] text-fg sm:text-6xl",
						children: "Fruit Rebellion"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-4 max-w-md text-base leading-relaxed text-muted",
						children: "O Rei do Açúcar corrompeu a despensa. Escolha uma fruta, bloqueie caminhos e liberte o reino da comida."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex w-full max-w-sm flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
					onClick: onPlay,
					className: "w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
						className: "size-4",
						strokeWidth: 2.4
					}), "Jogar"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
					variant: "ghost",
					onClick: onHowTo,
					className: "w-full",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleHelp, { className: "size-4" }), "Como jogar"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-subtle",
				children: [
					"Recorde ",
					highScore,
					" · Fase ",
					Math.min(unlocked + 1, LEVELS.length),
					"/",
					LEVELS.length
				]
			})
		]
	});
}
function ModeSelect({ onPick, onBack }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-dvh max-w-2xl flex-col justify-center gap-6 px-5 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onBack,
				className: "inline-flex items-center gap-1 text-sm text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), " Voltar"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl tracking-tight",
				children: "Modo"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onPick(1),
					className: "rounded-lg border border-border bg-surface p-5 text-left transition-colors hover:border-border-strong",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "mb-3 size-6 text-accent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl",
							children: "1 jogador"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: "Campanha solo. Cada fase apresenta um doce novo, depois mistura dois ou três tipos."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onPick(2),
					className: "rounded-lg border border-border bg-surface p-5 text-left transition-colors hover:border-border-strong",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "mb-3 size-6 text-accent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-xl",
							children: "2 jogadores"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: "Cooperativo local. P1 usa WASD, P2 usa as setas. Bloqueiem caminhos juntos."
						})
					]
				})]
			})
		]
	});
}
function HowTo({ onContinue, onBack }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-dvh max-w-xl flex-col justify-center gap-6 px-5 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onBack,
				className: "inline-flex items-center gap-1 text-sm text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), " Voltar"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-3xl tracking-tight",
				children: "Como jogar"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				className: "space-y-4 text-sm leading-relaxed text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Movimento em grade, no estilo labirinto. O objetivo de cada fase é eliminar todos os doces — prendendo-os com caixas, usando o poder da fruta ou desviando até eles se encurralarem." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-fg",
								children: "P1"
							}), " — WASD mover · Espaço poder · E caixa"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-fg",
								children: "P2"
							}), " — Setas mover · Enter poder · Shift direito caixa"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Toque: cruz direcional + Poder + Caixa. Controle também aceito." })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Três vidas por fase. Contato com um doce ou projétil custa uma vida. Inimigos presos por caixas são esmagados." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				onClick: onContinue,
				children: "Escolher fruta"
			})
		]
	});
}
function CharSelect({ players, picking, p1, p2, level, onPick, onConfirm, onBack }) {
	const selected = picking === 0 ? p1 : p2;
	const def = FRUITS[selected];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-dvh max-w-3xl flex-col justify-center gap-6 px-5 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onBack,
				className: "inline-flex items-center gap-1 text-sm text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), " Voltar"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm font-semibold uppercase tracking-[0.18em] text-muted",
					children: [
						WORLDS[level.world].name,
						" · ",
						level.id
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl tracking-tight",
					children: players === 2 ? `Jogador ${picking + 1}, escolha` : "Escolha sua fruta"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						level.name,
						" — ",
						level.intro
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-5 gap-2 sm:gap-3",
				children: FRUIT_ORDER.map((id) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => onPick(id),
						className: `flex min-h-20 flex-col items-center rounded-lg border bg-elevated p-2 transition-colors ${selected === id ? "border-accent" : "border-border hover:border-border-strong"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: SPRITE[id],
							alt: FRUITS[id].name,
							className: "h-12 w-12 object-contain sm:h-16 sm:w-16"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 text-xs font-semibold",
							children: FRUITS[id].name
						})]
					}, id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl",
					children: def.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-subtle",
					children: def.role
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: def.power
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				onClick: onConfirm,
				className: "self-start",
				children: players === 2 && picking === 0 ? "Jogador 2" : "Entrar na fase"
			})
		]
	});
}
function PlayView({ levelIndex, fruits, players, score, audio, muted, hud, paused, over, onHud, onOver, onPause, onMute, onMenu, onRetry, onNext }) {
	const canvasRef = (0, import_react.useRef)(null);
	const engineRef = (0, import_react.useRef)(null);
	const wrapRef = (0, import_react.useRef)(null);
	const onOverRef = (0, import_react.useRef)(onOver);
	const onHudRef = (0, import_react.useRef)(onHud);
	onOverRef.current = onOver;
	onHudRef.current = onHud;
	(0, import_react.useEffect)(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		let cancelled = false;
		const engine = new FruitEngine(canvas, {
			audio,
			onHud: (h) => onHudRef.current(h),
			onOver: (s, sc) => onOverRef.current(s, sc)
		});
		engineRef.current = engine;
		engine.start(levelIndex, fruits, players, score).then(() => {
			if (cancelled) engine.destroy();
		});
		return () => {
			cancelled = true;
			engine.destroy();
			engineRef.current = null;
		};
	}, [
		audio,
		fruits,
		levelIndex,
		players,
		score
	]);
	(0, import_react.useEffect)(() => {
		engineRef.current?.setPaused(paused || !!over);
	}, [paused, over]);
	const lives = hud?.lives ?? 3;
	const level = LEVELS[levelIndex];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "z-10 flex items-center gap-3 border-b border-border bg-bg/80 px-3 py-2 backdrop-blur-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "truncate text-xs font-semibold uppercase tracking-[0.16em] text-muted",
							children: [
								WORLDS[level.world].name,
								" · ",
								level.id
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate font-display text-lg leading-tight",
							children: level.name
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center gap-1",
						"aria-label": "Vidas",
						children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, {
							className: `size-5 ${i < lives ? "fill-berry text-berry" : "text-subtle"}`,
							strokeWidth: 2
						}, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "w-16 text-right font-display text-lg tabular-nums",
						children: hud?.score ?? score
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "hidden text-sm text-muted sm:block",
						children: [hud?.enemies ?? 0, " doces"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid size-11 place-items-center rounded-md border border-border bg-elevated",
						onClick: onMute,
						"aria-label": muted ? "Ativar som" : "Silenciar",
						children: muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid size-11 place-items-center rounded-md border border-border bg-elevated",
						onClick: () => onPause(true),
						"aria-label": "Pausar",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex min-h-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: wrapRef,
					className: "relative min-h-[280px] flex-1 touch-none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
						ref: canvasRef,
						className: "block h-full w-full touch-none bg-bg",
						style: { touchAction: "none" }
					}), hud?.message && !over && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pointer-events-none absolute inset-x-0 top-4 flex justify-center px-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "rounded-md border border-border bg-surface/90 px-4 py-2 text-center text-sm text-fg",
							children: hud.message
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TouchPad, {
					onDir: (d) => {
						const eng = engineRef.current;
						if (eng) eng.input.touchDir = d;
					},
					onPower: (v) => {
						const eng = engineRef.current;
						if (eng) eng.input.touchPower = v;
					},
					onCrate: (v) => {
						const eng = engineRef.current;
						if (eng) eng.input.touchCrate = v;
					}
				})]
			}),
			(paused || over) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 z-20 grid place-items-center bg-bg/70 px-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					className: "w-full max-w-sm text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-3xl",
							children: over === "win" ? "Fase limpa" : over === "lose" ? "Fim de jogo" : "Pausa"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: over === "win" ? "Os doces foram derretidos. Escolha a próxima fruta." : over === "lose" ? "O açúcar venceu desta vez." : "O labirinto espera."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 font-display text-2xl tabular-nums",
							children: hud?.score ?? score
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex flex-col gap-2",
							children: [
								over === "win" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
									onClick: onNext,
									children: levelIndex + 1 >= LEVELS.length ? "Final" : "Próxima fase"
								}),
								over === "lose" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Btn, {
									onClick: onRetry,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), " Tentar de novo"]
								}),
								!over && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
									onClick: () => {
										onPause(false);
										engineRef.current?.setPaused(false);
										if (engineRef.current) engineRef.current.sim.paused = false;
									},
									children: "Continuar"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
									variant: "ghost",
									onClick: onMenu,
									children: "Menu"
								})
							]
						})
					]
				})
			})
		]
	});
}
function Complete({ score, onMenu }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto flex min-h-dvh max-w-lg flex-col items-center justify-center gap-6 px-5 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-4xl tracking-tight",
				children: "Reino libertado"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: "O Rei do Açúcar perdeu o trono. As frutas voltam à despensa."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-3xl tabular-nums",
				children: score
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Btn, {
				onClick: onMenu,
				children: "Menu"
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FruitRebellion, {});
}
//#endregion
export { Home as component };
