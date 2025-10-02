import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useScrollDir } from "@/hooks/useScrollDir";
import { CONTACT } from "@/lib/constants";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const loc = useLocation();
  const { dir, atTop } = useScrollDir({ threshold: 8, idleDelay: 120 });
  
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const desktopMenuRef = useRef<HTMLDivElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const desktopTriggerRef = useRef<HTMLButtonElement>(null);

  // Close menus on route change
  useEffect(() => { 
    setOpen(false); 
    setSidebarOpen(false); 
  }, [loc]);

  // Focus trap and accessibility for mobile menu
  useEffect(() => {
    if (!open) return;

    const menuEl = mobileMenuRef.current;
    if (!menuEl) return;

    // Apply scroll-lock
    document.body.classList.add("menu-open");

    // Apply inert to rest of the page
    const main = document.querySelector("main");
    const header = document.querySelector("header");
    if (main) main.setAttribute("inert", "true");
    // Header is kept interactive except we hide the main content behind
    
    // Focus first focusable element
    const focusables = menuEl.querySelectorAll<HTMLElement>(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusables[0];
    const lastFocusable = focusables[focusables.length - 1];

    if (firstFocusable) {
      requestAnimationFrame(() => firstFocusable.focus());
    }

    // Focus trap
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }

      if (e.key === "Tab") {
        if (e.shiftKey) {
          // Shift+Tab on first element -> go to last
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable?.focus();
          }
        } else {
          // Tab on last element -> go to first
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable?.focus();
          }
        }
      }
    };

    // Close on scroll
    const handleScroll = () => {
      setOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.body.classList.remove("menu-open");
      if (main) main.removeAttribute("inert");
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("scroll", handleScroll);
      
      // Return focus to trigger
      mobileTriggerRef.current?.focus();
    };
  }, [open]);

  // Focus trap and accessibility for desktop sidebar
  useEffect(() => {
    if (!sidebarOpen) return;

    const menuEl = desktopMenuRef.current;
    if (!menuEl) return;

    // Apply scroll-lock
    document.body.classList.add("menu-open");

    // Apply inert to rest of the page
    const main = document.querySelector("main");
    if (main) main.setAttribute("inert", "true");

    // Focus close button
    const closeBtn = menuEl.querySelector<HTMLElement>('button[aria-label="Menü schließen"]');
    if (closeBtn) {
      requestAnimationFrame(() => closeBtn.focus());
    }

    // Focus trap
    const focusables = menuEl.querySelectorAll<HTMLElement>(
      'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusables[0];
    const lastFocusable = focusables[focusables.length - 1];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSidebarOpen(false);
        return;
      }

      if (e.key === "Tab") {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            e.preventDefault();
            lastFocusable?.focus();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            e.preventDefault();
            firstFocusable?.focus();
          }
        }
      }
    };

    // Close on scroll
    const handleScroll = () => {
      setSidebarOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      document.body.classList.remove("menu-open");
      if (main) main.removeAttribute("inert");
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("scroll", handleScroll);
      
      // Return focus to trigger
      desktopTriggerRef.current?.focus();
    };
  }, [sidebarOpen]);

  const NavItem = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 rounded-lg block min-h-[44px] flex items-center ${
          isActive
            ? "bg-thp-hover text-thp-primary"
            : "text-slate-600 hover:bg-slate-100 hover:text-black"
        }`
      }
    >
      {children}
    </NavLink>
  );

  const menuOpen = open || sidebarOpen;
  const isVisible = dir === "up" || atTop || menuOpen;
  const isHidden = dir === "down" && !atTop && !menuOpen;

  return (
    <>
      {/* Skip to content link for accessibility */}
      <a className="skip-link" href="#main">
        Zum Inhalt springen
      </a>

      <header 
        className="fixed top-0 left-0 right-0 z-50 header-glass"
        data-visible={isVisible}
        data-hidden={isHidden}
      >
        <div className="mx-auto max-w-7xl px-3 lg:px-6 h-14 flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0 whitespace-nowrap ml-auto md:ml-0"
          >
            <img src="/brand/logo-32.webp" alt="" width="24" height="24" className="w-6 h-6" />
            <span className="site-title text-lg font-semibold tracking-tight">
              Tech <span className="brand-hilfe">hilfe</span> Pro
            </span>
          </Link>

          {/* Desktop: Menu burger button */}
          <button
            ref={desktopTriggerRef}
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-100 transition-colors ml-auto"
            onClick={() => setSidebarOpen(true)}
            aria-label="Menü öffnen"
            aria-expanded={sidebarOpen}
            aria-controls="desktop-menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Mobile: Menu button */}
          <button
            ref={mobileTriggerRef}
            className="ml-auto md:hidden rounded-lg border px-3 py-2 min-h-[44px]"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Menü öffnen"
          >
            Menü
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <aside
            ref={mobileMenuRef}
            role="dialog"
            aria-modal="true"
            id="mobile-menu"
            className="md:hidden border-t bg-white menu"
          >
            <nav className="mx-auto max-w-7xl px-3 py-3 flex flex-col gap-2" aria-label="Hauptnavigation">
              <NavItem to="/leistungen">Leistungen</NavItem>
              <NavItem to="/kmu">KMU</NavItem>
              <NavItem to="/preise">Preise</NavItem>
              <NavItem to="/faq">FAQ</NavItem>
              <NavItem to="/kontakt">Kontakt</NavItem>
              <a
                href={CONTACT.WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 text-sm text-muted-foreground hover:text-primary min-h-[44px] flex items-center rounded-lg"
              >
                {CONTACT.WHATSAPP_LABEL}
              </a>
              <a
                href="/termin"
                className="rounded-xl bg-thp-cta px-4 py-2 text-white text-center hover:bg-thp-cta/90 transition-colors min-h-[44px] flex items-center justify-center"
              >
                Jetzt Kontakt aufnehmen
              </a>
            </nav>
          </aside>
        )}
      </header>

      {/* Desktop Sidebar */}
      {sidebarOpen && (
        <>
          {/* Backdrop */}
          <div
            className="drawer-backdrop fixed inset-0 bg-black bg-opacity-45 z-50 hidden md:block"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />

          {/* Sidebar */}
          <aside
            ref={desktopMenuRef}
            role="dialog"
            aria-modal="true"
            id="desktop-menu"
            className="fixed top-0 right-0 h-full w-80 max-w-full bg-white shadow-xl z-50 hidden md:block animate-in slide-in-from-right duration-300 overflow-y-auto menu"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Menü</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="w-10 h-10 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors"
                aria-label="Menü schließen"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="p-4 flex flex-col gap-1" aria-label="Hauptnavigation">
              <NavItem to="/leistungen">Leistungen</NavItem>
              <NavItem to="/kmu">KMU</NavItem>
              <NavItem to="/preise">Preise</NavItem>
              <NavItem to="/faq">FAQ</NavItem>
              <NavItem to="/kontakt">Kontakt</NavItem>
              <a
                href={CONTACT.WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-black block transition-colors min-h-[44px] flex items-center"
              >
                {CONTACT.WHATSAPP_LABEL}
              </a>

              <div className="mt-4 pt-4 border-t">
                <h3 className="text-sm font-medium text-slate-500 mb-2">Rechtliches</h3>
                <div className="flex flex-col gap-1">
                  <a
                    className="px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-black block transition-colors min-h-[44px] flex items-center"
                    href="/recht/impressum"
                  >
                    Impressum
                  </a>
                  <a
                    className="px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-black block transition-colors min-h-[44px] flex items-center"
                    href="/recht/datenschutz"
                  >
                    Datenschutz
                  </a>
                  <a
                    className="px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-black block transition-colors min-h-[44px] flex items-center"
                    href="/recht/agb"
                  >
                    AGB
                  </a>
                  <a
                    className="px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-black block transition-colors min-h-[44px] flex items-center"
                    href="/recht/widerruf"
                  >
                    Widerruf
                  </a>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t">
                <h3 className="text-sm font-medium text-slate-500 mb-2">Kontakt</h3>
                <div className="flex gap-2">
                  <a
                    aria-label="Anrufen"
                    href={CONTACT.PHONE_TEL}
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    📞
                  </a>
                  <a
                    aria-label="WhatsApp schreiben"
                    href={CONTACT.WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    🟢
                  </a>
                </div>
              </div>
            </nav>
          </aside>
        </>
      )}
    </>
  );
}