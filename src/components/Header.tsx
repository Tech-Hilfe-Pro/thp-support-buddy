import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const loc = useLocation();
  useEffect(()=>{ setOpen(false); setSidebarOpen(false); }, [loc]);

  const NavItem = ({ to, children }: { to:string; children:React.ReactNode }) => (
    <NavLink to={to} className={({isActive}) => `px-3 py-2 rounded-lg block ${isActive?"bg-indigo-100 text-indigo-700":"text-slate-600 hover:bg-slate-100 hover:text-black"}`}>{children}</NavLink>
  );

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur bg-white/75 border-b">
        <div className="mx-auto max-w-7xl px-3 lg:px-6 h-14 flex items-center gap-3">
          {/* Desktop: Menu burger button */}
          <button 
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg hover:bg-slate-100 transition-colors"
            onClick={() => setSidebarOpen(true)}
            aria-label="Menü öffnen"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <Link
            to="/"
            className="flex items-center gap-2 shrink-0 whitespace-nowrap"
            aria-label="Tech Hilfe Pro"
          >
            <span className="text-lg font-semibold tracking-tight">Tech Hilfe Pro</span>
          </Link>

          {/* Desktop: Right side CTAs */}
          <div className="ml-auto hidden md:flex items-center gap-2 shrink-0">
            <a href="/mitgliedschaft" className="rounded-xl border px-3 py-2 hover:bg-slate-50 transition-colors">Mitglied werden</a>
            <a href="/termin" className="rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition-colors">Jetzt Termin buchen</a>
            <a aria-label="Anrufen" href="tel:+4915565029989" className="opacity-70 hover:opacity-100 transition-opacity">📞</a>
            <a aria-label="WhatsApp" href="https://wa.me/4915565029989" className="opacity-70 hover:opacity-100 transition-opacity">🟢</a>
          </div>

          {/* Mobile: Menu button */}
          <button className="ml-auto md:hidden rounded-lg border px-3 py-2" onClick={()=>setOpen(v=>!v)} aria-expanded={open}>Menü</button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden border-t bg-white">
            <div className="mx-auto max-w-7xl px-3 py-3 flex flex-col gap-2">
              <NavItem to="/">Startseite</NavItem>
              <NavItem to="/leistungen">Leistungen</NavItem>
              <NavItem to="/pakete-preise">Pakete & Preise</NavItem>
              <NavItem to="/mitgliedschaft">Mitgliedschaft</NavItem>
              <NavItem to="/ueber-uns">Über uns</NavItem>
              <NavItem to="/kontakt">Kontakt</NavItem>
              <a href="/termin" className="rounded-xl bg-blue-600 px-4 py-2 text-white text-center">Jetzt Termin buchen</a>
            </div>
          </div>
        )}
      </header>

      {/* Desktop Sidebar */}
      {sidebarOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 hidden md:block"
            onClick={() => setSidebarOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 hidden md:block animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Menü</h2>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center justify-center transition-colors"
                aria-label="Menü schließen"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <nav className="p-4 flex flex-col gap-1" aria-label="Hauptnavigation">
              <NavItem to="/">Startseite</NavItem>
              <NavItem to="/leistungen">Leistungen</NavItem>
              <NavItem to="/pakete-preise">Pakete & Preise</NavItem>
              <NavItem to="/mitgliedschaft">Mitgliedschaft</NavItem>
              <NavItem to="/ueber-uns">Über uns</NavItem>
              <NavItem to="/kontakt">Kontakt</NavItem>
              
              <div className="mt-4 pt-4 border-t">
                <h3 className="text-sm font-medium text-slate-500 mb-2">Rechtliches</h3>
                <div className="flex flex-col gap-1">
                  <a className="px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-black block transition-colors" href="/recht/impressum">Impressum</a>
                  <a className="px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-black block transition-colors" href="/recht/datenschutz">Datenschutz</a>
                  <a className="px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-black block transition-colors" href="/recht/agb">AGB</a>
                  <a className="px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-black block transition-colors" href="/recht/widerruf">Widerruf</a>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <h3 className="text-sm font-medium text-slate-500 mb-2">Kontakt</h3>
                <div className="flex gap-2">
                  <a aria-label="Anrufen" href="tel:+4915565029989" className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors">📞</a>
                  <a aria-label="WhatsApp" href="https://wa.me/4915565029989" className="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors">🟢</a>
                </div>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  );
}