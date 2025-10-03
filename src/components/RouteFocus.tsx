import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function RouteFocus() {
  const loc = useLocation();
  useEffect(() => {
    const smooth = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

    const performNavigation = () => {
      if (loc.hash) {
        const el = document.querySelector(loc.hash) as HTMLElement | null;
        if (el) {
          // Asegura foco para AT
          el.setAttribute("tabindex", "-1");
          el.focus({ preventScroll: true });
          el.scrollIntoView({ block: "start", behavior: smooth });
          return;
        }
      }
      // Fallback sin hash
      const main = document.getElementById("main");
      if (main) {
        main.setAttribute("tabindex", "-1");
        main.focus({ preventScroll: true });
        main.scrollIntoView({ block: "start", behavior: smooth });
      } else {
        window.scrollTo({ top: 0, behavior: smooth });
      }
    };

    requestAnimationFrame(performNavigation);
  }, [loc.pathname, loc.hash]);
  return null;
}