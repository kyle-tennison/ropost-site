import { Footprints, Hourglass, PackageOpen } from "lucide-react";

import { Reveal } from "./Reveal";

const FRICTIONS = [
  {
    Icon: Footprints,
    title: "The terrain is never flat",
    body: "A curb, a lawn, two steps, a planter in the way. Sidewalk robots stall at the first riser; legged robots burn energy crossing pavement they could have rolled.",
  },
  {
    Icon: PackageOpen,
    title: "The handoff has to be gentle",
    body: "The last motion of a delivery is setting something down. Get it wrong and you've replaced a driver with a claims department.",
  },
  {
    Icon: Hourglass,
    title: "The vehicle waits",
    body: "Every minute the driver is on a walkway, the vehicle sits idle at the curb. The loading step and the driving step fight each other for the same clock.",
  },
];

export function PorchGap() {
  return (
    <section className="section gap" id="gap">
      <div className="shell">
        <div className="section__head">
          <Reveal>
            <p className="eyebrow">The porch gap</p>
            <h2>
              Automation stops <em>at the curb.</em>
            </h2>
            <p className="lede">
              Sortation, routing, and long-haul keep getting better. The final thirty feet — curb
              to doorstep — is still a person walking a box up a path. It is the slowest, most
              expensive part of the route, and it's the part that decides whether the package ends
              up at the door or in the rain.
            </p>
          </Reveal>
        </div>

        <div className="gap__grid">
          {FRICTIONS.map(({ Icon, title, body }, i) => (
            <Reveal key={title} className="card" delay={i * 110}>
              <span className="card__icon">
                <Icon size={20} strokeWidth={1.5} aria-hidden />
              </span>
              <h3>{title}</h3>
              <p>{body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
