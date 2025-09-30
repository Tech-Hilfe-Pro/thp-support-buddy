import { MessageCircle } from "lucide-react";

export default function WhatsAppFab() {
  const handleClick = () => {
    window.open('https://wa.me/4922198652990', '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20BA59] text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      aria-label="WhatsApp kontaktieren"
    >
      <MessageCircle className="w-6 h-6" />
    </button>
  );
}
