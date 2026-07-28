import { useEffect, useState, type RefObject } from "react";

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Subscribes a measuring function to scroll + resize, throttled to one frame. */
function onScrollFrame(measure: () => void) {
  let frame = 0;
  const schedule = () => {
    if (!frame) {
      frame = requestAnimationFrame(() => {
        frame = 0;
        measure();
      });
    }
  };

  measure();
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);

  return () => {
    if (frame) cancelAnimationFrame(frame);
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
  };
}

/** How far down the whole document we are, 0 → 1. */
export function usePageProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(
    () =>
      onScrollFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0);
      }),
    [],
  );

  return progress;
}

/**
 * How far an element has travelled through the viewport, 0 → 1.
 * Hits 0 when its top reaches `from` down the viewport, and 1 when its
 * bottom reaches `to`.
 */
export function useSectionProgress(ref: RefObject<HTMLElement | null>, from = 0.85, to = 0.55) {
  const [progress, setProgress] = useState(0);

  useEffect(
    () =>
      onScrollFrame(() => {
        const node = ref.current;
        if (!node) return;

        const rect = node.getBoundingClientRect();
        const vh = window.innerHeight;
        const span = vh * (from - to) + rect.height;
        if (span <= 0) return;

        setProgress(Math.min(Math.max((vh * from - rect.top) / span, 0), 1));
      }),
    [ref, from, to],
  );

  return progress;
}

/**
 * Publishes raw scroll depth onto the element as `--scroll`, for CSS-side
 * parallax. Stays at 0 when the visitor has asked for reduced motion.
 */
export function useScrollVar(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (reducedMotion()) return;

    return onScrollFrame(() => {
      ref.current?.style.setProperty("--scroll", String(window.scrollY));
    });
  }, [ref]);
}
