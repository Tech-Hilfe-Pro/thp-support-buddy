import { useEffect, useRef, useState } from "react";

export function useHideOnScroll(opts: { threshold?: number } = {}) {
  const { threshold = 16 } = opts; // píxeles de desfase para evitar parpadeos
  const lastY = useRef<number>(0);
  const ticking = useRef(false);
  const [hidden, setHidden] = useState(false);

  // respetar reduce-motion: si está activo, no ocultamos el header
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReduced) {
      setHidden(false);
      return;
    }

    lastY.current = window.scrollY || 0;

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const dy = y - lastY.current;
        if (Math.abs(dy) > threshold) {
          // hacia abajo: ocultar; hacia arriba: mostrar
          setHidden(dy > 0 && y > 0);
          lastY.current = y;
        }
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [prefersReduced, threshold]);

  return hidden;
}
