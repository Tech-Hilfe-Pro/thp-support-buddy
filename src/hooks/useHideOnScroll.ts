import { useEffect, useRef, useState } from "react";

export function useHideOnScroll(threshold: number = 16) {
  const last = useRef(0);
  const ticking = useRef(false);
  const [hidden, setHidden] = useState(false);
  const prefersReduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReduced) {
      setHidden(false);
      return;
    }
    last.current = window.scrollY || 0;
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const dy = y - last.current;
        if (Math.abs(dy) > threshold) {
          setHidden(dy > 0 && y > 0);
          last.current = y;
        }
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, prefersReduced]);

  return hidden;
}
