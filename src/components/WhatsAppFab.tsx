import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

export default function WhatsAppFab() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Detect when menu is open by checking body class
    const observer = new MutationObserver(() => {
      setMenuOpen(document.body.classList.contains("menu-open"));
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    window.open("https://wa.me/4915565029989", "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-thp-success hover:opacity-90 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      aria-label="WhatsApp kontaktieren"
      aria-hidden={menuOpen}
      tabIndex={menuOpen ? -1 : 0}
      style={{
        pointerEvents: menuOpen ? "none" : "auto",
        opacity: menuOpen ? 0.25 : 1,
      }}
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
}
