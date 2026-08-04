import { useRef } from "react";
import { Bot, PackageCheck, Repeat, Truck } from "lucide-react";

import { useSectionProgress } from "../hooks/useScroll";
import { Drawing } from "./Figure";
import { Reveal } from "./Reveal";

const STEPS = [
  {
    Icon: Truck,
    label: "Arrive",
    body: "The truck stops at the curb as it does today. A human delivery driver is still in the loop to adjust the truck or help the robot if needed.",
  },
  {
    Icon: Bot,
    label: "Deploy",
    body: "The robot is in the back, pre-loaded with a package. When the driver arrives, it's released from the truck and drives off to the delivery address.",
  },
  {
    Icon: PackageCheck,
    label: "Place",
    body: "At the door, the robot drops its tailgate, and the package slides out. If it gets stuck, the robot can shimmy it out.",
  },
  {
    Icon: Repeat,
    label: "Latch & reload",
    body: "The robot returns to its truck and latches itself to the robot arm, which lifts it onto the rails. At this point, the driver can depart. While en route to the next address, the robot is automatically reloaded with the next package.",
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
                The design is constrained by one requirement: the robot has to get itself back onto
                the truck at every stop.
              </p>
            </Reveal>
          </div>

          <Reveal className="how__shot" delay={140}>
            <Drawing
              name="cad-bay"
              ratio={1.327}
              alt="CAD section through the truck's cargo bay: the overhead arm lowering a package, the carrier robot docked on its rail with a loaded crate, and shelves of packages either side."
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
