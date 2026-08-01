"""
Prepares the renders and CAD screenshots for the web.

Photos become WebP at two widths. CAD line art is black-on-white, which is
useless on a dark page, so it gets recoloured: the drawn ink becomes the alpha
channel of a flat cream fill, giving cream lines on transparency.
"""

import pathlib
import subprocess
import sys

from PIL import Image, ImageChops, ImageFilter, ImageOps

RENDERS = pathlib.Path("/Users/kyletennison/Desktop/ropost-renders")
CAD = pathlib.Path("/Users/kyletennison/Desktop/ropost-cad")

CREAM = (248, 242, 233)
WIDTHS = (1600, 900)


def webp(img: Image.Image, dest: pathlib.Path, width: int, quality=76):
    h = round(img.height * width / img.width)
    out = img.convert("RGB").resize((width, h), Image.LANCZOS)
    tmp = dest.with_suffix(".tmp.png")
    out.save(tmp)
    subprocess.run(
        ["cwebp", "-quiet", "-q", str(quality), "-m", "6", str(tmp), "-o", str(dest)],
        check=True,
    )
    tmp.unlink()
    return dest.stat().st_size


def photo(src: pathlib.Path, stem: str, out: pathlib.Path, crop=None, widths=WIDTHS, quality=76):
    img = Image.open(src)
    if crop:
        img = img.crop(crop)
    for w in widths:
        if w > img.width:
            continue
        size = webp(img, out / f"{stem}-{w}.webp", w, quality=quality)
        print(f"  {stem}-{w}.webp  {size/1024:>6.0f} KB")


def soften_right(alpha: Image.Image, span: float, blur: float) -> Image.Image:
    """
    Ease the ink out across the rightmost `span` of the frame, so a crop that
    slices through geometry dissolves instead of ending on a hard vertical.
    The same ramp drives a blur, so the fading end also goes soft.
    """
    w, h = alpha.size
    start = int(w * (1 - span))

    row = Image.new("L", (w, 1))
    px = row.load()
    for x in range(w):
        if x < start:
            px[x, 0] = 255
        else:
            t = (x - start) / max(1, w - start)
            px[x, 0] = int(255 * (1 - t) ** 1.6)  # ease out
    ramp = row.resize((w, h))

    # sharp where the ramp is solid, blurred where it falls away
    blurred = alpha.filter(ImageFilter.GaussianBlur(blur))
    alpha = Image.composite(alpha, blurred, ramp)

    return ImageChops.multiply(alpha, ramp)


def lineart(
    src: pathlib.Path,
    stem: str,
    out: pathlib.Path,
    crop=None,
    width=1100,
    fade_right=0.0,
    blur_right=7.0,
):
    """Black ink on white -> cream ink on transparent."""
    raw = Image.open(src)

    # some exports carry an alpha channel; flatten onto white first, or the
    # transparent regions read as black ink and the whole frame fills in
    if raw.mode in ("RGBA", "LA", "P"):
        raw = raw.convert("RGBA")
        plate = Image.new("RGBA", raw.size, (255, 255, 255, 255))
        plate.alpha_composite(raw)
        raw = plate

    img = raw.convert("L")
    if crop:
        img = img.crop(crop)

    # ink is dark; invert so ink is bright, then use that as opacity
    alpha = ImageOps.invert(img)

    # drop the near-white paper noise so the background is truly clear
    alpha = alpha.point(lambda v: 0 if v < 26 else min(255, int(v * 1.35)))

    bbox = alpha.getbbox()
    if bbox:
        alpha = alpha.crop(bbox)

    h = round(alpha.height * width / alpha.width)
    alpha = alpha.resize((width, h), Image.LANCZOS)

    # after resizing, so the blur radius is in final pixels
    if fade_right:
        alpha = soften_right(alpha, fade_right, blur_right)

    canvas = Image.new("RGBA", alpha.size, CREAM + (0,))
    canvas.putalpha(alpha)

    # webp carries the alpha at a fraction of png's weight for line work
    dest = out / f"{stem}.webp"
    tmp = out / f"{stem}.tmp.png"
    canvas.save(tmp)
    subprocess.run(
        ["cwebp", "-quiet", "-q", "82", "-m", "6", "-alpha_q", "90", str(tmp), "-o", str(dest)],
        check=True,
    )
    tmp.unlink()
    print(f"  {stem}.webp  {dest.stat().st_size/1024:>6.0f} KB  ({alpha.size[0]}x{alpha.size[1]})")


def main(outdir):
    out = pathlib.Path(outdir)
    out.mkdir(parents=True, exist_ok=True)

    # The doorstep renders are deliberately unused: they show the same
    # package-release pose as the cad-dropoff line drawing, which reads better.
    print("photos:")
    # hero background: sits behind text under a scrim, so it can take a lower
    # quality than the inline figures without showing
    photo(
        RENDERS / "wide-unload.png",
        "hero",
        out,
        widths=(2400, 1600, 1000),
        quality=70,
    )
    photo(RENDERS / "in-truck.png", "dock", out)

    print("line art:")
    lineart(CAD / "package-dropoff.png", "cad-dropoff", out)

    # filename carries a narrow no-break space (U+202F) before "PM", so glob it
    loading = next(CAD.glob("Screenshot*.png"))
    # the CAD viewport's monitor sits past x=1240; cropping there also lets the
    # loading arm run off the edge, which reads better than clipping its elbow.
    # The fade keeps that exit soft — 22% leaves the elbow joint sharp and only
    # dissolves the arm where it actually meets the crop.
    lineart(
        loading,
        "cad-load",
        out,
        crop=(0, 0, 1240, 1302),
        fade_right=0.22,
        blur_right=7,
    )


if __name__ == "__main__":
    main(sys.argv[1])
