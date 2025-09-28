export function formatEUR(n: number): string {
  try { 
    return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(n); 
  } catch { 
    return `${n.toFixed(2)} €`; 
  }
}