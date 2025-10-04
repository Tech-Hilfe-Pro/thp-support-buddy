import { useEffect, useRef, useState } from "react";

/** Oculta al bajar y muestra al subir, pero NUNCA por debajo de minY (visibilidad inicial garantizada). */
export function useHideOnScroll(opts: { threshold?: number; minY?: number } = {}) {
  const threshold = opts.threshold ?? 16; // filtro de "ruido"
  const minY = opts.minY ?? 32;           // no ocultar por debajo de 32 px
  const last = useRef(0);
  const ticking = useRef(false);
  const [hidden, setHidden] = useState(false);
  const prefersReduced = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

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

        // Visibilidad inicial: por debajo de minY, jamás ocultar
        if (y < minY) {
          setHidden(false);
          last.current = y;
          ticking.current = false;
          return;
        }

        if (Math.abs(dy) > threshold) {
          setHidden(dy > 0); // bajar = ocultar, subir = mostrar
          last.current = y;
        }
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold, minY, prefersReduced]);

  return hidden;
}
