export type Quote = {
  serviceId: string;
  serviceTitle: string;
  plz: string;
  urgency: "normal" | "heute" | "jetzt";
  subscription: boolean;
  onsiteMinutes: number;
  breakdown: {
    arbeitszeitBrutto: number;
    rabattAbo: number;
    arbeitszeitNetto: number;
    anfahrt: number;
  };
  total: number;
  zeitfenster: string;
  createdAtISO: string;
};

export function saveQuoteToStorage(q: Quote) {
  localStorage.setItem("thp_quote", JSON.stringify(q));
}

export function readQuoteFromStorage(): Quote | null {
  try {
    const raw = localStorage.getItem("thp_quote");
    return raw ? JSON.parse(raw) as Quote : null;
  } catch { 
    return null; 
  }
}

export function clearQuoteInStorage() {
  localStorage.removeItem("thp_quote");
}