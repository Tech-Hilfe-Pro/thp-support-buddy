import { Link } from "react-router-dom";
import MobileMenu from "@/components/nav/MobileMenu";
import { useHideOnScroll } from "@/hooks/useHideOnScroll";

export default function Header() {
  const hidden = useHideOnScroll({ threshold: 14 }); // sensación más fluida

  return (
    <>
      <a className="skip-link" href="#main">
        Zum Inhalt springen
      </a>

      <header className={`thp-header ${hidden ? "thp-header--hidden" : ""}`}>
        <div className="container flex items-center justify-between gap-4 py-3">
          <Link to="/" className="brand" aria-label="Tech Hilfe Pro – Startseite">
            Tech <span className="brand-orange">Hilfe</span> Pro
          </Link>
          <nav className="hidden md:flex items-center gap-2">
            <Link to="/nis2" className="nav-link">NIS2</Link>
            <Link to="/preise" className="nav-link">Preise</Link>
            <Link to="/leistungen" className="nav-link">Leistungen</Link>
            <Link to="/blog" className="nav-link">Blog</Link>
          </nav>
          <MobileMenu />
        </div>
      </header>
    </>
  );
}