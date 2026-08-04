import { CONTACT_EMAIL } from "./Contact";

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell footer__inner">
        <a href="#top" className="wordmark" aria-label="Ropost, back to top">
          <img
            src="/media/wordmark-300.webp"
            srcSet="/media/wordmark-300.webp 300w, /media/wordmark-600.webp 600w"
            sizes="132px"
            alt="Ropost"
            width={600}
            height={127}
          />
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
