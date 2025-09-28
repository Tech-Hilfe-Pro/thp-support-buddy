import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  useEffect(()=>{ setOpen(false); }, [loc]);

  const NavItem = ({ to, children }: { to:string; children:React.ReactNode }) => (
    <NavLink to={to} className={({isActive}) => `px-2 py-1 rounded-lg ${isActive?"text-black":"text-slate-600 hover:text-black"}`}>{children}</NavLink>
  );

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/75 border-b">
      <div className="mx-auto max-w-7xl px-3 lg:px-6 h-14 flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 min-w-0">
          <img src="/brand/logo.svg" alt="Tech Hilfe Pro" className="h-7 w-auto"
               onError={(e:any)=>{ e.currentTarget.src="/brand/favicon.svg"; }} />
          <span className="font-semibold whitespace-nowrap">Tech Hilfe Pro</span>
        </Link>

        <nav className="ml-2 hidden md:flex min-w-0 flex-1 items-center overflow-x-auto no-scrollbar" aria-label="Hauptnavigation">
          <div className="flex flex-nowrap items-center gap-2">
            <NavItem to="/">Startseite</NavItem>
            <NavItem to="/leistungen">Leistungen</NavItem>
            <NavItem to="/pakete-preise">Pakete & Preise</NavItem>
            <NavItem to="/mitgliedschaft">Mitgliedschaft</NavItem>
            <NavItem to="/ueber-uns">Über uns</NavItem>
            <NavItem to="/kontakt">Kontakt</NavItem>
            <div className="relative group">
              <span className="px-2 py-1 text-slate-600">Rechtliches ▾</span>
              <div className="invisible group-hover:visible absolute mt-2 rounded-xl border bg-white shadow p-2 text-sm">
                <a className="block px-2 py-1 hover:bg-slate-100 rounded" href="/recht/impressum">Impressum</a>
                <a className="block px-2 py-1 hover:bg-slate-100 rounded" href="/recht/datenschutz">Datenschutz</a>
                <a className="block px-2 py-1 hover:bg-slate-100 rounded" href="/recht/agb">AGB</a>
                <a className="block px-2 py-1 hover:bg-slate-100 rounded" href="/recht/widerruf">Widerruf</a>
              </div>
            </div>
          </div>
        </nav>

        <div className="ml-auto hidden md:flex items-center gap-2">
          <a href="/mitgliedschaft" className="rounded-xl border px-3 py-2">Mitglied werden</a>
          <a href="/termin" className="rounded-xl bg-blue-600 px-4 py-2 text-white">Jetzt Termin buchen</a>
          <a aria-label="Anrufen" href="tel:+4915565029989" className="opacity-70 hover:opacity-100">📞</a>
          <a aria-label="WhatsApp" href="https://wa.me/4915565029989" className="opacity-70 hover:opacity-100">🟢</a>
        </div>

        <button className="ml-auto md:hidden rounded-lg border px-3 py-2" onClick={()=>setOpen(v=>!v)} aria-expanded={open}>Menü</button>
      </div>

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
  );
}