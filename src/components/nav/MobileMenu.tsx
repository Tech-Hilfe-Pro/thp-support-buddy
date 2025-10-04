import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function MobileMenu(){
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const loc = useLocation();

  // Cerrar al cambiar de ruta
  useEffect(()=>{ setOpen(false); }, [loc.pathname]);

  // Cerrar al hacer scroll, tocar/click fuera, o pulsar Escape
  useEffect(()=>{
    const onDoc = (e: MouseEvent | TouchEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onScroll = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); btnRef.current?.focus(); } };

    document.addEventListener("click", onDoc, true);
    document.addEventListener("touchstart", onDoc, true);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("click", onDoc, true);
      document.removeEventListener("touchstart", onDoc, true);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Al abrir: enfocar primer item; al cerrar: devolver foco al botón
  useEffect(()=>{
    if (open) {
      // Dar tiempo a pintar la transición antes de enfocar
      requestAnimationFrame(()=>{
        const items = getMenuItems();
        items[0]?.focus();
      });
    } else {
      btnRef.current?.focus();
    }
  }, [open]);

  // Cerrar si el foco sale del menú (navegación con Tab)
  useEffect(()=>{
    const onFocusOut = (e: FocusEvent) => {
      if (!rootRef.current) return;
      const next = e.relatedTarget as Node | null;
      if (next && rootRef.current.contains(next)) return;
      setOpen(false);
    };
    const node = menuRef.current;
    node?.addEventListener("focusout", onFocusOut);
    return ()=> node?.removeEventListener("focusout", onFocusOut);
  }, []);

  const getMenuItems = () => {
    const n = menuRef.current;
    return n ? Array.from(n.querySelectorAll<HTMLElement>('[role="menuitem"]')) : [];
  };

  // Navegación por teclado dentro del menú (Flechas, Home, End)
  const onMenuKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const items = getMenuItems();
    if (!items.length) return;

    const i = items.indexOf(document.activeElement as HTMLElement);
    let nextIndex = i;

    switch (e.key) {
      case "ArrowDown": e.preventDefault(); nextIndex = i < items.length - 1 ? i + 1 : 0; break;
      case "ArrowUp":   e.preventDefault(); nextIndex = i > 0 ? i - 1 : items.length - 1; break;
      case "Home":      e.preventDefault(); nextIndex = 0; break;
      case "End":       e.preventDefault(); nextIndex = items.length - 1; break;
      default: return;
    }
    items[nextIndex]?.focus();
  };

  return (
    <div ref={rootRef} className="md:hidden relative">
      <button
        ref={btnRef}
        className="hamb-btn"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="mnav"
        onClick={() => setOpen(v => !v)}
        aria-label="Menú öffnen"
      >
        ☰
      </button>

      <div
        id="mnav"
        ref={menuRef}
        role="menu"
        className={`hamb-menu ${open ? "is-open" : ""}`}
        aria-label="Hauptmenü"
        onKeyDown={onMenuKeyDown}
      >
        <Link role="menuitem" to="/nis2" className="hamb-item" tabIndex={open ? 0 : -1}>NIS2</Link>
        <Link role="menuitem" to="/preise" className="hamb-item" tabIndex={open ? 0 : -1}>Preise</Link>
        <Link role="menuitem" to="/leistungen" className="hamb-item" tabIndex={open ? 0 : -1}>Leistungen</Link>
        <Link role="menuitem" to="/blog" className="hamb-item" tabIndex={open ? 0 : -1}>Blog</Link>
        <div className="hamb-sep" aria-hidden="true" />
        <Link role="menuitem" to="/sitemap" className="hamb-item" tabIndex={open ? 0 : -1}>Sitemap</Link>
        <Link role="menuitem" to="/faq" className="hamb-item" tabIndex={open ? 0 : -1}>FAQ</Link>
        <Link role="menuitem" to="/recht/agb" className="hamb-item" tabIndex={open ? 0 : -1}>AGB</Link>
        <Link role="menuitem" to="/recht/impressum" className="hamb-item" tabIndex={open ? 0 : -1}>Impressum</Link>
        <Link role="menuitem" to="/recht/datenschutz" className="hamb-item" tabIndex={open ? 0 : -1}>Datenschutz</Link>
      </div>
    </div>
  );
}
