export const STRIPE_LINKS = {
  privat: {
    basic: "", // Stripe Payment Link für Home-Office+ Basic
    plus: "",  // Stripe Payment Link für Home-Office+ Plus
  },
  kmu: {
    grow: "", // Stripe Payment Link für KMU Grow  
    pro: "",  // Stripe Payment Link für KMU Pro
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