import { PRIVAT_ABOS } from "@/data/pricing";
import { useLocation } from "react-router-dom";

export default function StickyCTA() {
  const location = useLocation();
  const lowest = Math.min(...PRIVAT_ABOS.map(p => p.preis));
  
  // Don't show on certain pages
  const hiddenPaths = ['/abo', '/kasse', '/termin'];
  const shouldHide = hiddenPaths.some(path => location.pathname.startsWith(path));
  
  if (!lowest || shouldHide) return null;
  
  return (
    <div className="fixed bottom-3 inset-x-3 md:hidden z-40">
      <a 
        href="/abo" 
        className="block rounded-full bg-primary text-primary-foreground text-center py-3 px-4 shadow-lg font-medium transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        Mitgliedschaft ab {lowest.toFixed(2)} € / Monat
      </a>
    </div>
  );
}