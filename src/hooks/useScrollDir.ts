import { useState, useEffect } from "react";

interface UseScrollDirOptions {
  threshold?: number;
  idleDelay?: number;
}

interface ScrollDirResult {
  dir: "up" | "down";
  atTop: boolean;
}

export function useScrollDir({ 
  threshold = 8, 
  idleDelay = 120 
}: UseScrollDirOptions = {}): ScrollDirResult {
  const [dir, setDir] = useState<"up" | "down">("up");
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    let timeoutId: number | null = null;

    const updateScrollDir = () => {
      const scrollY = window.scrollY;
      
      // Check if at top
      setAtTop(scrollY <= 16);

      // Check direction
      const delta = scrollY - lastY;
      
      if (Math.abs(delta) > threshold) {
        if (delta > 0 && dir !== "down") {
          setDir("down");
        } else if (delta < 0 && dir !== "up") {
          setDir("up");
        }
      }

      lastY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        if (timeoutId) {
          cancelAnimationFrame(timeoutId);
        }
        
        timeoutId = requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    const handleScroll = () => {
      // Don't update if menu is open
      if (document.body.classList.contains("menu-open")) {
        return;
      }
      requestTick();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial check
    setAtTop(window.scrollY <= 16);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutId) {
        cancelAnimationFrame(timeoutId);
      }
    };
  }, [threshold, idleDelay, dir]);

  return { dir, atTop };
}
