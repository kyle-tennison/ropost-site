import { Reveal } from "./Reveal";

const CAPABILITIES = [
  {
    title: "Hybrid wheel-legs",
    body: "Legs with a driven wheel at each foot. It rolls across pavement at speed and switches to walking only when the ground demands it — a curb, a step, gravel, a snowbank.",
  },
  {
    title: "Self-latching dock",
    body: "Alignment is the robot's problem, not the driver's. It finds the dock, mates to it, and rides secured — the same interface it powers and charges through.",
  },
  {
    title: "A human in the loop",
    body: "The driver keeps driving. An operator watches the robot's feeds and takes control for the odd case, so autonomy earns its scope one route at a time.",
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
            <Reveal key={title} className="cap" delay={i * 90}>
              <h3>{title}</h3>
              <p>{body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="system__quote" delay={160}>
          <blockquote>
            “Most delivery robots are designed to arrive. This one is designed to come back.”
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
