type FigureProps = {
  /** Base filename in /media, without width suffix or extension. */
  name: string;
  alt: string;
  /** width / height, so the box is reserved before the image loads. */
  ratio: number;
  caption?: string;
  className?: string;
  /** Eager-load the one above the fold; everything else waits. */
  priority?: boolean;
  sizes?: string;
};

export function Figure({
  name,
  alt,
  ratio,
  caption,
  className = "",
  priority = false,
  sizes = "(max-width: 900px) 100vw, 1200px",
}: FigureProps) {
  return (
    <figure className={`figure ${className}`.trim()}>
      <img
        className="figure__img"
        src={`/media/${name}-1600.webp`}
        srcSet={`/media/${name}-900.webp 900w, /media/${name}-1600.webp 1600w`}
        sizes={sizes}
        alt={alt}
        width={1600}
        height={Math.round(1600 / ratio)}
        style={{ aspectRatio: String(ratio) }}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />
      {caption && <figcaption className="figure__cap">{caption}</figcaption>}
    </figure>
  );
}

type DrawingProps = {
  name: string;
  alt: string;
  ratio: number;
  className?: string;
};

/** CAD line art: single-file, already cream-on-transparent. */
export function Drawing({ name, alt, ratio, className = "" }: DrawingProps) {
  return (
    <img
      className={`drawing ${className}`.trim()}
      src={`/media/${name}.webp`}
      alt={alt}
      width={1100}
      height={Math.round(1100 / ratio)}
      style={{ aspectRatio: String(ratio) }}
      loading="lazy"
      decoding="async"
    />
  );
}
