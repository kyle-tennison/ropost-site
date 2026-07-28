import { useState, type FormEvent } from "react";

import { Reveal } from "./Reveal";

export const CONTACT_EMAIL = "hello@ropost.ai";

export function Contact() {
  const [email, setEmail] = useState("");

  // No backend yet — hand the message off to the visitor's own mail client.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = encodeURIComponent("Hello from ropost.ai");
    const body = encodeURIComponent(
      `Reply to: ${email}\n\nA bit about me / what I'm interested in:\n`,
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  }

  return (
    <section className="section contact" id="contact">
      <div className="shell contact__inner">
        <Reveal>
          <p className="eyebrow">Where we are</p>
          <h2>
            Early enough to <em>build it right.</em>
          </h2>
          <p className="lede contact__lede">
            The design is in development. We're talking now with fleet operators and logistics
            teams who feel the last thirty feet in their numbers, with investors who like hard
            mechanical problems, and with roboticists who'd rather build the thing than simulate
            it.
          </p>

          <form className="contact__form" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="email">
              Your email address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              placeholder="you@company.com"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="btn" type="submit">
              Start the thread
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </button>
          </form>

          <p className="contact__note">
            Opens your mail app — or write us directly at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
