import { usePageProgress } from "../hooks/useScroll";

/** Hairline read-out of how far down the page you are. */
export function ScrollProgress() {
  const progress = usePageProgress();

  return (
    <div className="progress" aria-hidden="true">
      <span className="progress__bar" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
