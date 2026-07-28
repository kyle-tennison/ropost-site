import { Boxes, Drone, TrafficCone } from "lucide-react";

import { Reveal } from "./Reveal";

const WORKAROUNDS = [
  {
    Icon: TrafficCone,
    title: "Sidewalk robots stop at the curb",
    body: "They're built for flat, mapped pavement. One step, a steep lawn, or a closed gate ends the route — and the parcel gets carried the rest of the way by hand.",
  },
  {
    Icon: Drone,
    title: "Drones solve distance, not the door",
    body: "Clearing traffic is the easy part. Something still has to come down into a yard it can't see well, under a payload ceiling and an airspace approval.",
  },
  {
    Icon: Boxes,
    title: "Lockers hand the walk to the customer",
    body: "Pickup points and parcel boxes work, but by moving the last thirty feet onto the recipient. The trip doesn't disappear. It changes who makes it.",
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
              Everyone has routed <em>around it.</em>
            </h2>
            <p className="lede">
              Every parcel delivered to a home ends the same way: someone gets out of the vehicle
              and walks. Sortation, routing, and long-haul have each been rebuilt around
              automation. The final thirty feet has not — and the approaches aimed at it have
              mostly found ways to avoid it instead.
            </p>
          </Reveal>
        </div>

        <div className="gap__grid">
          {WORKAROUNDS.map(({ Icon, title, body }, i) => (
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
            The one step nobody has automated is the step every delivery ends with.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
