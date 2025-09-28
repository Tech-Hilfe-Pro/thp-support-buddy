import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function RouteFocus() {
  const loc = useLocation();
  useEffect(() => {
    const el = document.getElementById("main");
    if (el) {
      (el as HTMLElement).setAttribute("tabindex","-1");
      (el as HTMLElement).focus({ preventScroll: true });
      el.scrollIntoView({ block:"start", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    }
  }, [loc.pathname, loc.hash]);
  return null;
}