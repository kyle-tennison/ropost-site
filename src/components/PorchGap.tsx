import { Footprints, Hourglass, Route } from "lucide-react";

import { Reveal } from "./Reveal";

const TRAITS = [
  {
    Icon: Route,
    title: "It starts where the road ends",
    body: "The truck can only get as far as the curb. Everything past that point is private property — no lane, no map, no right of way, and nothing built for a vehicle.",
  },
  {
    Icon: Footprints,
    title: "No two are alike",
    body: "Three steps and a railing at one house. A gravel path and a latched gate at the next. The variation is the problem: every porch is a one-off.",
  },
  {
    Icon: Hourglass,
    title: "It's where the day goes",
    body: "Park, get out, walk it up, walk back, climb in. It's a short trip that happens at every stop on the route, and the truck sits idle for all of it.",
  },
];

export function PorchGap() {
  return (
    <section className="section gap" id="gap">
      <div className="shell">
        <div className="section__head">
          <Reveal>
            <p className="eyebrow">The problem</p>
            <h2>
              Nobody's solved the <em>porch gap.</em>
            </h2>
            <p className="lede">
              The porch gap is the last thirty feet of a delivery — the stretch between where the
              truck can park and where the package actually has to end up. Every home delivery
              ends by crossing it, and it is still crossed the same way it was a century ago: a
              person picks up the box and walks.
            </p>
          </Reveal>
        </div>

        <div className="gap__grid">
          {TRAITS.map(({ Icon, title, body }, i) => (
            <Reveal key={title} className="card" delay={i * 110}>
              <span className="card__icon">
                <Icon size={20} strokeWidth={1.5} aria-hidden />
              </span>
              <h3>{title}</h3>
              <p>{body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="gap__close" delay={140}>
          <p>
            Sidewalk robots stop at the curb. Drones stop overhead. Lockers hand the walk back to
            the customer. The gap itself is still crossed on foot.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
