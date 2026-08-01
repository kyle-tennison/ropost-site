import { useEffect, useRef, useState } from "react";

type LoopVideoProps = {
  name: string;
  poster: string;
  ratio: number;
  alt: string;
  caption: string;
};

/**
 * Autoplaying ambient loop. The clip already carries its own beat — it holds
 * on the final frame, dissolves back to the first, and only then repeats — so
 * this just needs to play it end to end.
 */
export function LoopVideo({ name, poster, ratio, alt, caption }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduced(query.matches);
      const el = ref.current;
      if (!el) return;
      if (query.matches) {
        el.pause();
        el.currentTime = 0;
      } else {
        // autoplay can be refused; nothing breaks, the poster just stays
        void el.play().catch(() => {});
      }
    };

    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  return (
    <figure className="figure clip">
      <video
        ref={ref}
        className="figure__img clip__video"
        poster={`/media/${poster}`}
        width={1176}
        height={Math.round(1176 / ratio)}
        style={{ aspectRatio: String(ratio) }}
        autoPlay={!reduced}
        loop
        muted
        playsInline
        preload="metadata"
        controls={reduced}
        aria-label={alt}
      >
        <source src={`/media/${name}.webm`} type="video/webm" />
        <source src={`/media/${name}.mp4`} type="video/mp4" />
      </video>
      <figcaption className="figure__cap">{caption}</figcaption>
    </figure>
  );
}
