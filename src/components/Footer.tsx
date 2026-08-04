import { CONTACT_EMAIL } from "./Contact";

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <a href="#top" className="wordmark">
          Ropost<span className="wordmark__dot" />
        </a>

        <p className="footer__tag">Robots for the last thirty feet.</p>

        <div className="footer__meta">
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          <span>© {new Date().getFullYear()} Ropost</span>
        </div>
      </div>
    </footer>
  );
}
