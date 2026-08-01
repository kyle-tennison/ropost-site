import { useRef } from "react";
import { Bot, PackageCheck, Repeat, Truck } from "lucide-react";

import { useSectionProgress } from "../hooks/useScroll";
import { Figure } from "./Figure";
import { Reveal } from "./Reveal";

const STEPS = [
  {
    Icon: Truck,
    label: "Arrive",
    body: "The truck stops at the curb as it does today. No dedicated lane, no permit, nothing installed at the house.",
  },
  {
    Icon: Bot,
    label: "Deploy",
    body: "The robot releases from its dock with the package already in its grasp. Wheels on the flat, legs for the curb and the steps.",
  },
  {
    Icon: PackageCheck,
    label: "Place",
    body: "At the door the arm lowers and releases the package. It is placed rather than dropped, under cover where there is any.",
  },
  {
    Icon: Repeat,
    label: "Latch & reload",
    body: "It returns, aligns to the dock, and latches on. The next package comes off the rack in transit, so it's ready before the truck stops.",
  },
];

export function HowItWorks() {
  const track = useRef<HTMLDivElement>(null);
  const progress = useSectionProgress(track, 0.9, 0.45);

  return (
    <section className="section how" id="how">
      <div className="shell">
        <div className="how__intro">
          <div className="section__head">
            <Reveal>
              <p className="eyebrow">How it works</p>
              <h2>
                One robot, one vehicle, <em>less idle time.</em>
              </h2>
              <p className="lede">
                The design is constrained by one requirement: the robot has to return to the truck
                and dock without help.
              </p>
            </Reveal>
          </div>

          <Reveal className="how__shot" delay={140}>
            <Figure
              name="curb"
              ratio={1.643}
              sizes="(max-width: 880px) 100vw, 480px"
              alt="A ropost truck parked at the curb with its side open on racked packages and the loading arm extended, the front door of the house it is delivering to visible across the lawn."
              caption="Rendered CAD model"
            />
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
