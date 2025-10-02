const WA_URL = "https://wa.me/4915565029989";

export default function WhatsAppFloat() {
  return (
    <a
      href={WA_URL}
      className="whatsapp-fab"
      aria-label="WhatsApp öffnen"
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
