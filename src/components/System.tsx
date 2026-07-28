import { Reveal } from "./Reveal";

const CAPABILITIES = [
  {
    title: "Wheels where the feet go",
    body: "Legs with a driven wheel at each foot. It rolls across pavement at speed and switches to walking only when the ground demands it — a curb, a step, gravel, a snowbank.",
  },
  {
    title: "Placed, not dropped",
    body: "Compliant joints and force-aware placement, so the final motion of every delivery is a soft one — on a mat, a bench, or a step.",
  },
  {
    title: "Self-latching dock",
    body: "Alignment is the robot's problem, not the driver's. It finds the dock, mates to it, and rides secured — the same interface it powers and charges through.",
  },
  {
    title: "Reload in transit",
    body: "Docked and moving, the robot pulls the next package off the rack. Loading stops competing with driving for the same minute.",
  },
  {
    title: "A human still in the loop",
    body: "The driver keeps driving; an operator can see what the robot sees and step in for the odd case. Autonomy earns its scope one route at a time.",
  },
];

export function System() {
  return (
    <section className="section system" id="system">
      <div className="shell">
        <div className="section__head">
          <Reveal>
            <p className="eyebrow">The system</p>
            <h2>
              A drive-walk hybrid, built around <em>going back.</em>
            </h2>
          </Reveal>
        </div>

        <div className="system__grid">
          {CAPABILITIES.map(({ title, body }, i) => (
            <Reveal key={title} className="cap" delay={(i % 3) * 90}>
              <h3>{title}</h3>
              <p>{body}</p>
            </Reveal>
          ))}

          <Reveal className="cap cap--quote" delay={180}>
            <blockquote>
              “Most delivery robots are designed to arrive. This one is designed to come back.”
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
