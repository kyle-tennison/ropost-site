import { useRef } from "react";
import { Bot, PackageCheck, Repeat, Truck } from "lucide-react";

import { useSectionProgress } from "../hooks/useScroll";
import { Reveal } from "./Reveal";

const STEPS = [
  {
    Icon: Truck,
    label: "Arrive",
    body: "The vehicle pulls up to the curb like it always has. No dedicated lane, no sidewalk permit, no infrastructure at the house.",
  },
  {
    Icon: Bot,
    label: "Deploy",
    body: "The robot releases from its dock with the package already in its grasp and drives down the walkway — wheels on the flat, legs for the curb and the steps.",
  },
  {
    Icon: PackageCheck,
    label: "Place",
    body: "At the door the arm lowers and releases. Placed, not dropped, and out of the weather where the recipient expects to find it.",
  },
  {
    Icon: Repeat,
    label: "Latch & reload",
    body: "It returns, aligns to the dock, and latches back onto the vehicle. The next package comes off the rack in transit, so it's ready before the next stop is.",
  },
];

export function HowItWorks() {
  const track = useRef<HTMLDivElement>(null);
  const progress = useSectionProgress(track, 0.9, 0.45);

  return (
    <section className="section how" id="how">
      <div className="shell">
        <div className="section__head">
          <Reveal>
            <p className="eyebrow">The loop</p>
            <h2>
              One robot, one vehicle, <em>no idle time.</em>
            </h2>
            <p className="lede">
              The whole design follows from a single constraint: the robot has to get itself back
              on the truck, unassisted, every single time.
            </p>
          </Reveal>
        </div>

        <div className="how__track" ref={track}>
          <ol className="how__steps">
            {STEPS.map(({ Icon, label, body }, i) => {
              // each step's rail fills as the scroll sweeps across the row
              const fill = Math.min(Math.max(progress * STEPS.length - i, 0), 1);

              return (
                <Reveal
                  key={label}
                  as="li"
                  className={`step ${fill > 0.08 ? "is-lit" : ""}`}
                  delay={i * 90}
                >
                  <div className="step__rail">
                    <span className="step__badge">
                      <Icon size={19} strokeWidth={1.5} aria-hidden />
                    </span>
                    <span className="step__num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="step__line" aria-hidden="true">
                      <i style={{ transform: `scaleX(${fill})` }} />
                    </span>
                  </div>
                  <div className="step__body">
                    <h3>{label}</h3>
                    <p>{body}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
