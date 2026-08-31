#!/usr/bin/env python3
"""Compose Fruit Rebellion share cards from in-game key art (generation quota exhausted)."""

from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path("/workspace")
GROK = ROOT / ".grok"
CRATE = ROOT / "artifacts/imagine_images/1ab6a607-d2c0-4f53-9947-b69ee5b506ae.jpg"
FONT_DISPLAY = GROK / "fonts/LilitaOne-Regular.ttf"
FONT_TAG = GROK / "fonts/Fredoka-Bold.ttf"

ESPRESSO = (28, 20, 16)
CREAM = (243, 237, 227)
LEAF = (63, 143, 92)
BERRY = (196, 60, 60)
CITRUS = (226, 192, 74)


def cover_crop(im: Image.Image, w: int, h: int, anchor_y: float = 0.42) -> Image.Image:
    """Scale to cover, then crop. anchor_y is the focus (0=top, 1=bottom)."""
    src_w, src_h = im.size
    scale = max(w / src_w, h / src_h)
    nw, nh = int(round(src_w * scale)), int(round(src_h * scale))
    im = im.resize((nw, nh), Image.Resampling.LANCZOS)
    x0 = (nw - w) // 2
    max_y = nh - h
    y0 = int(round(anchor_y * nh - h / 2))
    y0 = max(0, min(max_y, y0))
    return im.crop((x0, y0, x0 + w, y0 + h))


def radial_scrim(size: tuple[int, int], strength: float, rx: float, ry: float) -> Image.Image:
    w, h = size
    y, x = np.ogrid[:h, :w]
    cx, cy = w / 2.0, h / 2.0
    dist = ((x - cx) / (w * rx)) ** 2 + ((y - cy) / (h * ry)) ** 2
    mask = np.clip(1.0 - dist, 0.0, 1.0) ** 1.15
    alpha = (mask * strength * 255).astype(np.uint8)
    layer = Image.new("RGBA", size, (*ESPRESSO, 0))
    layer.putalpha(Image.fromarray(alpha, mode="L"))
    return layer


def left_scrim(size: tuple[int, int], strength: float = 0.55) -> Image.Image:
    w, h = size
    x = np.linspace(1.0, 0.0, w)
    # Strong on the left half, gone by ~70%
    ramp = np.clip((0.70 - np.linspace(0.0, 1.0, w)) / 0.70, 0.0, 1.0) ** 0.85
    alpha = (ramp * strength * 255).astype(np.uint8)
    alpha_img = Image.fromarray(np.tile(alpha, (h, 1)), mode="L")
    layer = Image.new("RGBA", size, (*ESPRESSO, 0))
    layer.putalpha(alpha_img)
    return layer


def fit_font(path: Path, text: str, max_width: int, start: int, min_size: int = 28) -> ImageFont.FreeTypeFont:
    size = start
    font = ImageFont.truetype(str(path), size)
    while size > min_size:
        font = ImageFont.truetype(str(path), size)
        bbox = font.getbbox(text)
        if bbox[2] - bbox[0] <= max_width:
            return font
        size -= 2
    return font


def text_size(font: ImageFont.FreeTypeFont, text: str) -> tuple[int, int, tuple[int, int, int, int]]:
    bbox = font.getbbox(text)
    return bbox[2] - bbox[0], bbox[3] - bbox[1], bbox


def draw_lockup(
    canvas: Image.Image,
    lines: list[tuple[str, ImageFont.FreeTypeFont]],
    cx: int,
    top: int,
    fill=CREAM,
    stroke=CITRUS,
    shadow=ESPRESSO,
    stroke_w: int = 10,
    shadow_off: tuple[int, int] = (4, 6),
    gap: int = 8,
) -> int:
    """Draw centered (or left-aligned if cx is None-like via left x) stacked lines. Returns bottom y."""
    overlay = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    y = top
    widths = []
    for text, font in lines:
        w, h, bbox = text_size(font, text)
        widths.append((text, font, w, h, bbox))
    for text, font, w, h, bbox in widths:
        x = int(cx - w / 2 - bbox[0])
        # shadow
        draw.text(
            (x + shadow_off[0], y + shadow_off[1] - bbox[1]),
            text,
            font=font,
            fill=(*shadow, 220),
            stroke_width=stroke_w + 2,
            stroke_fill=(*shadow, 220),
        )
        draw.text(
            (x, y - bbox[1]),
            text,
            font=font,
            fill=(*fill, 255),
            stroke_width=stroke_w,
            stroke_fill=(*stroke, 255),
        )
        y += h + gap
    canvas.alpha_composite(overlay)
    return y


def draw_lockup_left(
    canvas: Image.Image,
    lines: list[tuple[str, ImageFont.FreeTypeFont]],
    left: int,
    top: int,
    fill=CREAM,
    stroke=CITRUS,
    shadow=ESPRESSO,
    stroke_w: int = 7,
    shadow_off: tuple[int, int] = (3, 4),
    gap: int = 4,
) -> int:
    overlay = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    y = top
    for text, font in lines:
        w, h, bbox = text_size(font, text)
        x = left - bbox[0]
        draw.text(
            (x + shadow_off[0], y + shadow_off[1] - bbox[1]),
            text,
            font=font,
            fill=(*shadow, 220),
            stroke_width=stroke_w + 2,
            stroke_fill=(*shadow, 220),
        )
        draw.text(
            (x, y - bbox[1]),
            text,
            font=font,
            fill=(*fill, 255),
            stroke_width=stroke_w,
            stroke_fill=(*stroke, 255),
        )
        y += h + gap
    canvas.alpha_composite(overlay)
    return y


def compose_og() -> Image.Image:
    crate = Image.open(CRATE).convert("RGB")
    bg = cover_crop(crate, 1200, 630, anchor_y=0.42)
    canvas = bg.convert("RGBA")
    canvas.alpha_composite(radial_scrim((1200, 630), strength=0.40, rx=0.38, ry=0.36))

    fruit = fit_font(FONT_DISPLAY, "FRUIT", 720, 168)
    rebellion = fit_font(FONT_DISPLAY, "REBELLION", 760, 118)
    tag = fit_font(FONT_TAG, "VS THE SUGAR KING", 560, 36)

    fw, fh, _ = text_size(fruit, "FRUIT")
    rw, rh, _ = text_size(rebellion, "REBELLION")
    tw, th, _ = text_size(tag, "VS THE SUGAR KING")
    gap1, gap2 = 6, 18
    block_h = fh + gap1 + rh + gap2 + th
    top = int((630 - block_h) / 2) - 8  # slightly above true center so crop-safe

    draw_lockup(canvas, [("FRUIT", fruit), ("REBELLION", rebellion)], 600, top, stroke_w=11, gap=gap1)
    # tagline: smaller, cream, leaf-green stroke, no huge outline
    tag_top = top + fh + gap1 + rh + gap2
    draw_lockup(
        canvas,
        [("VS THE SUGAR KING", tag)],
        600,
        tag_top,
        fill=CREAM,
        stroke=LEAF,
        stroke_w=4,
        shadow_off=(2, 3),
        gap=0,
    )
    return canvas.convert("RGB")


def compose_banner() -> Image.Image:
    crate = Image.open(CRATE).convert("RGB")
    bg = cover_crop(crate, 1200, 264, anchor_y=0.40)
    canvas = bg.convert("RGBA")
    canvas.alpha_composite(left_scrim((1200, 264), strength=0.62))

    fruit = fit_font(FONT_DISPLAY, "FRUIT", 500, 78)
    rebellion = fit_font(FONT_DISPLAY, "REBELLION", 520, 58)
    fw, fh, _ = text_size(fruit, "FRUIT")
    rw, rh, _ = text_size(rebellion, "REBELLION")
    # Left-most 50% × top-most 80%; raise above midline (132)
    left = 48
    top = 28
    draw_lockup_left(
        canvas,
        [("FRUIT", fruit), ("REBELLION", rebellion)],
        left,
        top,
        stroke_w=7,
        gap=2,
    )
    return canvas.convert("RGB")


def main() -> None:
    og = compose_og()
    banner = compose_banner()
    og_path = GROK / "og-raw.png"
    banner_path = GROK / "x-banner-raw.png"
    og.save(og_path, "PNG")
    banner.save(banner_path, "PNG")
    print("og", og.size, og_path)
    print("banner", banner.size, banner_path)


if __name__ == "__main__":
    main()
