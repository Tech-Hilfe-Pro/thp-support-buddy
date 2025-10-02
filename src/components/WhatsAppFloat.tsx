import { CONTACT } from "@/lib/constants";

export default function WhatsAppFloat() {
  return (
    <a
      href={CONTACT.WHATSAPP_URL}
      className="whatsapp-fab"
      aria-label="Per WhatsApp kontaktieren – Tech Hilfe Pro"
      target="_blank"
      rel="noopener"
    >
      <img
        src="/brand/whatsapp-thp.svg"
        alt=""
        aria-hidden="true"
        className="whatsapp-icon"
        decoding="async"
        loading="eager"
      />
    </a>
  );
}
