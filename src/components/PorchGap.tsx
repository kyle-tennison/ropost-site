import { Footprints, Hourglass, Route } from "lucide-react";

import { Figure } from "./Figure";
import { Reveal } from "./Reveal";

type Trait = {
  Icon: typeof Route;
  title: string;
  body: string;
  cite?: string;
  href?: string;
};

const TRAITS: Trait[] = [
  {
    Icon: Route,
    title: "No road past the curb",
    body: "The truck stops at the curb. Beyond that lies the porch gap, which is currently unsolved.",
  },
  {
    Icon: Footprints,
    title: "Every house is different",
    body: "Steps, gravel, railings, and lawns, in a different arrangement at every address. There is no standard layout to design against.",
  },
  {
    Icon: Hourglass,
    title: "It costs the most time",
    body: "On urban routes the walk dominates the day. Ride-along studies put the share of a driver's time spent parked and walking between 62 and 80 percent.",
    cite: "Dalla Chiara & Goodchild, “The role of walking in last-mile urban deliveries”, Transportation (2025)",
    href: "https://doi.org/10.1007/s11116-025-10633-6",
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
              The last thirty feet has no road. The only machine capable of bridging that gap
              today is the human body. Ropost aims to change that.
            </p>
          </Reveal>
        </div>

        <Reveal className="gap__shot" delay={120}>
          <Figure
            name="curb"
            ratio={1.643}
            alt="A ropost truck parked at the curb with its side open on racked packages, the front door of the house it is delivering to visible across the lawn."
            caption="Rendered CAD model — hardware in development"
          />
        </Reveal>

        <div className="gap__grid">
          {TRAITS.map(({ Icon, title, body, cite, href }, i) => (
            <Reveal key={title} className="card" delay={i * 110}>
              <span className="card__icon">
                <Icon size={20} strokeWidth={1.5} aria-hidden />
              </span>
              <h3>{title}</h3>
              <p>{body}</p>
              {cite && (
                <cite className="card__cite">
                  {href ? (
                    <a href={href} target="_blank" rel="noreferrer noopener">
                      {cite}
                    </a>
                  ) : (
                    cite
                  )}
                </cite>
              )}
            </Reveal>
          ))}
        </div>

        <Reveal className="gap__close" delay={140}>
          <p>
            Sidewalk robots can't climb steps. Drones can't set a package on a porch. Lockers make
            the customer do the walk. None of them cross the gap.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
