#!/usr/bin/env python3
"""Flood-fill chroma key from image borders, then emit square transparent PNGs."""
from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

RAW = Path("/workspace/assets/sprites")
OUT = Path("/workspace/public/sprites")
OUT.mkdir(parents=True, exist_ok=True)

NAMES = [
    "lemon",
    "watermelon",
    "grape",
    "pineapple",
    "strawberry",
    "gummy",
    "lollipop",
    "gelatin",
    "chocolate",
    "sour",
]


def flood_background(arr: np.ndarray, thresh: float = 48.0) -> np.ndarray:
    h, w = arr.shape[:2]
    rgb = arr[:, :, :3].astype(np.float32)
    bg = (rgb[6, 6] + rgb[6, w - 7] + rgb[h - 7, 6] + rgb[h - 7, w - 7]) * 0.25
    dist = np.sqrt(((rgb - bg) ** 2).sum(axis=2))
    similar = dist < thresh

    try:
        from scipy import ndimage  # type: ignore

        labeled, _ = ndimage.label(similar)
        border = np.unique(
            np.concatenate([labeled[0], labeled[-1], labeled[:, 0], labeled[:, -1]])
        )
        border = border[border != 0]
        mask = np.isin(labeled, border)
        mask = ndimage.binary_dilation(mask, iterations=3)
        fringe = ndimage.binary_dilation(mask, iterations=4) & ~mask
        mask = mask | (fringe & (dist < 72))

    except Exception:
        # Downsampled BFS fallback
        step = 2
        small = similar[::step, ::step]
        sh, sw = small.shape
        vis = np.zeros_like(small, dtype=bool)
        stack = []
        for x in range(sw):
            if small[0, x]:
                stack.append((0, x))
            if small[sh - 1, x]:
                stack.append((sh - 1, x))
        for y in range(sh):
            if small[y, 0]:
                stack.append((y, 0))
            if small[y, sw - 1]:
                stack.append((y, sw - 1))
        while stack:
            y, x = stack.pop()
            if y < 0 or x < 0 or y >= sh or x >= sw or vis[y, x] or not small[y, x]:
                continue
            vis[y, x] = True
            stack.extend(((y - 1, x), (y + 1, x), (y, x - 1), (y, x + 1)))
        mask = np.repeat(np.repeat(vis, step, 0), step, 1)[:h, :w]

    alpha = np.where(mask, 0, 255).astype(np.uint8)
    # Soften remaining near-bg pixels
    near = (dist < thresh * 1.35) & mask
    alpha[near] = 0
    arr[:, :, 3] = alpha
    return arr


def process_one(name: str) -> None:
    src = RAW / f"{name}-raw.jpg"
    im = Image.open(src).convert("RGBA")
    arr = flood_background(np.array(im))
    out = Image.fromarray(arr, "RGBA")
    # Erode alpha slightly to kill halo
    a = out.split()[3].filter(ImageFilter.MinFilter(3))
    out.putalpha(a)
    bbox = out.getbbox()
    if not bbox:
        raise SystemExit(f"empty after chroma: {name}")
    pad = 14
    x0, y0, x1, y1 = bbox
    x0, y0 = max(0, x0 - pad), max(0, y0 - pad)
    x1, y1 = min(out.width, x1 + pad), min(out.height, y1 + pad)
    cropped = out.crop((x0, y0, x1, y1))
    s = max(cropped.width, cropped.height)
    canvas = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    canvas.paste(cropped, ((s - cropped.width) // 2, (s - cropped.height) // 2), cropped)
    canvas = canvas.resize((256, 256), Image.Resampling.LANCZOS)
    dest = OUT / f"{name}.png"
    canvas.save(dest, "PNG")
    opaque = (np.array(canvas)[:, :, 3] > 8).mean()
    print(f"wrote {dest} bbox={bbox} opaque={opaque:.2f}")


def make_floors() -> None:
    size = 64

    def save(name: str, rgb: np.ndarray) -> None:
        Image.fromarray(np.clip(rgb, 0, 255).astype(np.uint8), "RGB").save(OUT / f"{name}.png")
        print(f"wrote floor {name}")

    def noise_tile(color: tuple[int, int, int], sigma: float, seed: int) -> np.ndarray:
        r = np.random.default_rng(seed)
        n = r.normal(0, sigma, (size, size, 1))
        return np.array(color, dtype=np.float32) + n

    save("floor-fridge", noise_tile((214, 232, 242), 5.5, 1))

    wood = np.zeros((size, size, 3), dtype=np.float32)
    for x in range(size):
        t = (x % 16) / 16.0
        stripe = 12 * np.sin(t * np.pi)
        wood[:, x] = (196 + stripe, 150 + stripe * 0.6, 96 + stripe * 0.3)
    wood += np.random.default_rng(2).normal(0, 4, wood.shape)
    save("floor-pantry", wood)

    save("floor-freezer", noise_tile((226, 244, 246), 4.0, 3))

    chk = np.zeros((size, size, 3), dtype=np.float32)
    a, b = (244, 196, 210), (250, 236, 230)
    cell = 16
    for y in range(size):
        for x in range(size):
            chk[y, x] = a if ((x // cell) + (y // cell)) % 2 == 0 else b
    chk += np.random.default_rng(4).normal(0, 3, chk.shape)
    save("floor-factory", chk)

    save("floor-arena", noise_tile((62, 38, 32), 7.0, 5))


if __name__ == "__main__":
    for n in NAMES:
        process_one(n)
    make_floors()
