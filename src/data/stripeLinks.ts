export const STRIPE_LINKS = {
  privat: {
    s: "", // Stripe Payment Link für Paket-S
    m: "", // Stripe Payment Link für Paket-M  
    l: "", // Stripe Payment Link für Paket-L
  },
  kmu: {
    starter: "", // Stripe Payment Link für KMU Starter
    grow: "",    // Stripe Payment Link für KMU Grow
    pro: "",     // Stripe Payment Link für KMU Pro
  }
};

export function getStripeLink(kind: "privat" | "kmu", key: string): string | null {
  const links = STRIPE_LINKS[kind] as Record<string, string>;
  const link = links[key];
  
  // Nur gültige Stripe Payment Links zurückgeben
  if (link && link.startsWith("https://buy.stripe.com/")) {
    return link;
  }
  
  return null;
}