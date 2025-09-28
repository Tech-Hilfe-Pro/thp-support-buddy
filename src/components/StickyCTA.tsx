import { getLowestPrice } from "@/data/memberships";
import { useLocation } from "react-router-dom";

export default function StickyCTA() {
  const location = useLocation();
  const lowest = getLowestPrice();
  
  // Don't show on certain pages
  const hiddenPaths = ['/abo', '/kasse', '/termin'];
  const shouldHide = hiddenPaths.some(path => location.pathname.startsWith(path));
  
  if (!lowest || shouldHide) return null;
  
  return (
    <div className="fixed bottom-3 inset-x-3 md:hidden z-40">
      <a 
        href="/abo" 
        className="block rounded-full bg-primary text-primary-foreground text-center py-3 px-4 shadow-lg font-medium"
      >
        Mitgliedschaft ab {lowest.toFixed(2)} € / Monat
      </a>
    </div>
  );
}