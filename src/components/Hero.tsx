import { useRef } from "react";

import { useScrollVar } from "../hooks/useScroll";
import { Reveal } from "./Reveal";

export function Hero() {
  const inner = useRef<HTMLDivElement>(null);
  useScrollVar(inner);

  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden="true">
        <img
          className="hero__bg-img"
          src="/media/hero-1600.webp"
          srcSet="/media/hero-1000.webp 1000w, /media/hero-1600.webp 1600w, /media/hero-2400.webp 2400w"
          sizes="100vw"
          alt=""
          width={2400}
          height={1038}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="hero__scrim" />
      </div>

      <div className="shell hero__inner" ref={inner}>
        <div className="hero__copy">
          <Reveal delay={80}>
            <p className="eyebrow">Filling the porch gap</p>

            <h1 className="hero__title">
              Building delivery robots
              <br />
              <em>that scale.</em>
            </h1>
          </Reveal>

          <Reveal className="hero__foot" delay={180}>
            <p className="lede hero__lede">
              Ropost is filling the gap between delivery trucks and front doors using autonomous
              carrier robots. Scroll to see how we do it.
            </p>

            <div className="hero__actions">
              <a className="btn" href="#contact">
                Talk to us
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </a>
              <a className="btn btn--ghost" href="#how">
                See how it works
              </a>
            </div>
          </Reveal>
        </div>

        <p className="hero__disclosure">Rendered CAD model</p>
      </div>

      <div className="hero__ticker" aria-hidden="true">
        <div className="hero__ticker-track">
          {Array.from({ length: 2 }, (_, i) => (
            <span key={i}>
              <span>Wheels for flat ground</span>
              <span>Legs for curbs and steps</span>
              <span>Docks to the truck</span>
              <span>Reloads in transit</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
