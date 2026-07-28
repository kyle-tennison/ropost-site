import { useRef } from "react";

import { useScrollVar } from "../hooks/useScroll";
import { Reveal } from "./Reveal";

export function Hero() {
  const inner = useRef<HTMLDivElement>(null);
  useScrollVar(inner);

  return (
    <section className="hero" id="top">
      <div className="shell hero__inner" ref={inner}>
        <Reveal delay={80}>
          <p className="eyebrow">Autonomous last-thirty-feet delivery</p>

          <h1 className="hero__title">
            A robot and a truck,
            <br />
            <em>built as one loop.</em>
          </h1>
        </Reveal>

        <Reveal className="hero__foot" delay={180}>
          <p className="lede hero__lede">
            ropost is both halves: a legged robot with wheels for feet, and a delivery truck
            modified to carry, dock, and reload it. The robot deploys at the curb, sets the
            package at the door, and latches back on — then pulls the next package off the rack
            while the truck is already driving to the next stop.
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

      <div className="hero__ticker" aria-hidden="true">
        <div className="hero__ticker-track">
          {Array.from({ length: 2 }, (_, i) => (
            <span key={i}>
              <span>Drive where it can</span>
              <span>Walk where it must</span>
              <span>Place, don't drop</span>
              <span>Latch, reload, repeat</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
