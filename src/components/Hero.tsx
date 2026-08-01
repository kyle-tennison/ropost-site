import { useRef } from "react";

import { useScrollVar } from "../hooks/useScroll";
import { Figure } from "./Figure";
import { Reveal } from "./Reveal";

export function Hero() {
  const inner = useRef<HTMLDivElement>(null);
  useScrollVar(inner);

  return (
    <section className="hero" id="top">
      <div className="shell hero__inner" ref={inner}>
        <div className="hero__copy">
          <Reveal delay={80}>
            <p className="eyebrow">Autonomous last-thirty-feet delivery</p>

            <h1 className="hero__title">
              The truck solved the mile.
              <br />
              <em>Nobody solved the walk.</em>
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

        <Reveal className="hero__art" delay={280}>
          <Figure
            name="deploy"
            ratio={1.616}
            priority
            alt="A ropost delivery truck at the curb with its side open, a robot arm inside reaching for a package on the rack, and the carrier robot stepping down onto the street on wheeled legs."
            caption="Rendered CAD model — hardware in development"
          />
        </Reveal>
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
