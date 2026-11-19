import { useEffect, type RefObject } from "react";

/**
 * Moves a horizontal scroll track in step with the page's vertical scroll.
 * Progress runs from the track entering the bottom of the viewport to leaving the top.
 */
export function useScrollLinkedTrack(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    element.classList.add("scroll-linked-track");
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = element.scrollWidth - element.clientWidth;
      if (max <= 0) return;
      const rect = element.getBoundingClientRect();
      const viewport = window.innerHeight;
      // Start moving when the track is 85% down the screen, finish when it reaches 15%.
      const start = viewport * 0.85;
      const end = viewport * 0.15 - rect.height;
      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      element.scrollLeft = progress * max;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
      element.classList.remove("scroll-linked-track");
    };
  }, [ref]);
}
