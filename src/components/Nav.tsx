import { useEffect, useState } from "react";

const LINKS = [
  { href: "#gap", label: "The gap" },
  { href: "#how", label: "How it works" },
  { href: "#system", label: "The system" },
];

export function Nav() {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${stuck ? "is-stuck" : ""}`}>
      <div className="shell nav__inner">
        <a href="#top" className="wordmark" aria-label="ropost, home">
          ropost<span className="wordmark__dot" />
        </a>

        <nav className="nav__links" aria-label="Sections">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a className="btn nav__cta" href="#contact">
          Get in touch
        </a>
      </div>
    </header>
  );
}
