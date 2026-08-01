"""Outline the ropost wordmark from the same Fraunces axes the site uses."""

import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.misc.transform import Transform

SRC = "Fraunces.ttf"
INST = "Fraunces-inst.ttf"

# matches .wordmark: font-variation-settings "SOFT" 80, "WONK" 1; weight 500;
# optical size tracks the ~23px nav rendering
AXES = {"wght": 500, "SOFT": 80, "WONK": 1, "opsz": 24}
LETTERSPACING_EM = -0.03  # CSS letter-spacing on .wordmark

# palette
BACKDROP = "#1E150E"  # --ink-900, the page backdrop
CREAM = "#F8F2E9"  # --cream
TAPE = "#E8B174"  # --tape, the dot

# the dot, expressed against the 1.45rem font size it sits beside
DOT_DIAM_EM = 6 / 23.2
DOT_GAP_EM = 4 / 23.2


def instantiate():
    font = TTFont(SRC)
    instancer.instantiateVariableFont(font, AXES, inplace=True, updateFontNames=False)
    font.save(INST)
    return TTFont(INST)


def shape(text):
    """Return [(glyph_id, x_offset, y_offset, x_advance)] with real kerning."""
    with open(INST, "rb") as fh:
        data = fh.read()
    face = hb.Face(data)
    font = hb.Font(face)
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(font, buf)
    return [
        (info.codepoint, pos.x_offset, pos.y_offset, pos.x_advance)
        for info, pos in zip(buf.glyph_infos, buf.glyph_positions)
    ]


def outline(text):
    """Glyph paths for `text` plus the true ink bounds, in font units."""
    font = instantiate()
    upem = font["head"].unitsPerEm
    glyph_set = font.getGlyphSet()
    order = font.getGlyphOrder()
    tracking = LETTERSPACING_EM * upem

    paths, cursor = [], 0.0
    xmin = ymin = float("inf")
    xmax = ymax = float("-inf")

    runs = shape(text)
    for i, (gid, dx, dy, adv) in enumerate(runs):
        glyph = glyph_set[order[gid]]

        pen = SVGPathPen(glyph_set)
        glyph.draw(pen)
        d = pen.getCommands()
        if d:
            paths.append(f'<path d="{d}" transform="translate({cursor + dx:.1f} {dy:.1f})"/>')

            bounds = BoundsPen(glyph_set)
            glyph.draw(TransformPen(bounds, Transform().translate(cursor + dx, dy)))
            if bounds.bounds:
                bx0, by0, bx1, by1 = bounds.bounds
                xmin, ymin = min(xmin, bx0), min(ymin, by0)
                xmax, ymax = max(xmax, bx1), max(ymax, by1)

        cursor += adv
        if i < len(runs) - 1:  # no trailing track
            cursor += tracking

    return {
        "paths": "\n      ".join(paths),
        "advance": cursor,
        "ink": (xmin, ymin, xmax, ymax),
        "upem": upem,
    }


def lockup(text, dot_scale=1.0):
    """
    Glyph paths + dot, with the ink bounds of the whole lockup.

    The dot is sized absolutely, which is right for the wordmark — it matches
    the live nav exactly. But `ropost` is 1643 units tall (the `t` ascender)
    where a lone `r` is only 961, so the same dot reads half again as large
    beside a single letter. `dot_scale` brings the icon back into proportion.
    """
    o = outline(text)
    upem = o["upem"]
    xmin, ymin, xmax, ymax = o["ink"]

    dot_r = DOT_DIAM_EM * upem / 2 * dot_scale
    dot_cx = o["advance"] + DOT_GAP_EM * upem * dot_scale + dot_r
    dot_cy = dot_r  # bottom of the dot sits on the baseline

    # union the dot into the ink box
    xmax = max(xmax, dot_cx + dot_r)
    ymin = min(ymin, dot_cy - dot_r)
    ymax = max(ymax, dot_cy + dot_r)

    return o["paths"], (xmin, ymin, xmax, ymax), (dot_cx, dot_cy, dot_r), upem


def svg(paths, ink, dot, box_w, box_h, width_attr, height_attr, background=BACKDROP):
    """Places the ink box dead-centre in the output box."""
    xmin, ymin, xmax, ymax = ink
    dot_cx, dot_cy, dot_r = dot

    # translate so the ink's centre lands on the box's centre; the inner
    # scale(1 -1) flips font Y-up coords into SVG Y-down
    off_x = (box_w - (xmax - xmin)) / 2 - xmin
    off_y = (box_h - (ymax - ymin)) / 2 + ymax

    plate = f'\n  <rect width="{box_w:.0f}" height="{box_h:.0f}" fill="{background}"/>' if background else ""

    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {box_w:.0f} {box_h:.0f}" width="{width_attr}" height="{height_attr}" role="img" aria-label="ropost">
  <title>ropost</title>{plate}
  <g transform="translate({off_x:.1f} {off_y:.1f}) scale(1 -1)">
    <g fill="{CREAM}">
      {paths}
    </g>
    <circle cx="{dot_cx:.1f}" cy="{dot_cy:.1f}" r="{dot_r:.1f}" fill="{TAPE}"/>
  </g>
</svg>
"""


def build_wordmark():
    paths, ink, dot, upem = lockup("ropost")
    ink_w, ink_h = ink[2] - ink[0], ink[3] - ink[1]

    pad = 0.78 * ink_h
    box_w, box_h = ink_w + pad * 2, ink_h + pad * 2
    scale = 220 / box_h  # render around 220px tall by default

    return svg(paths, ink, dot, box_w, box_h, f"{box_w * scale:.0f}", f"{box_h * scale:.0f}")


def build_mark():
    """Square icon: the 'r' with the dot."""
    # 961/1643 — matches the dot-to-letter ratio the wordmark reads at
    paths, ink, dot, upem = lockup("r", dot_scale=0.585)
    ink_w, ink_h = ink[2] - ink[0], ink[3] - ink[1]

    side = max(ink_w, ink_h) * 1.62
    return svg(paths, ink, dot, side, side, "512", "512")


def build_transparent(text, dot_scale=1.0, height_px=220):
    """
    No plate, cropped tight to the ink. Whatever places this asset owns the
    padding, so the box is exactly the artwork.
    """
    paths, ink, dot, upem = lockup(text, dot_scale=dot_scale)
    ink_w, ink_h = ink[2] - ink[0], ink[3] - ink[1]
    scale = height_px / ink_h

    return svg(
        paths,
        ink,
        dot,
        ink_w,
        ink_h,
        f"{ink_w * scale:.0f}",
        f"{ink_h * scale:.0f}",
        background=None,
    )


if __name__ == "__main__":
    import pathlib
    import sys

    out = pathlib.Path(sys.argv[1])
    out.mkdir(parents=True, exist_ok=True)
    (out / "ropost-wordmark.svg").write_text(build_wordmark())
    (out / "ropost-mark.svg").write_text(build_mark())
    (out / "ropost-wordmark-transparent.svg").write_text(build_transparent("ropost"))
    (out / "ropost-mark-transparent.svg").write_text(
        build_transparent("r", dot_scale=0.585, height_px=180)
    )
    print("wrote", out)
