/**
 * Tech Hilfe Pro - Single Source of Truth für Preise
 * PRIVAT: Haus-IT Start (9,90 €) & Plus (19,90 €)
 * KMU: Basic (14,90 €), Standard (24,90 €), Premium (39,90 €)
 */

export interface PrivatPlan {
  id: string;
  name: string;
  monthly: number;
  onsiteDiscountPct: number;
  claim: string;
  badges: string[];
  bullets: string[];
}

export interface KMUPlanFeatures {
  rmm: boolean;
  patch: boolean;
  backup: 'none' | 'basic' | 'advanced';
  reporting: 'monthly' | 'weekly' | 'daily';
  sla: string;
  onsite: string;
  consulting?: string;
}

export interface KMUPlan {
  id: string;
  name: string;
  subtitle: string;
  pricePerEndpoint: number;
  minMonthly: number;
  discounts: {
    annual: number;
    onsite: number;
  };
  bullets: string[];
  features: KMUPlanFeatures;
}

/**
 * PRIVAT PLANS
 */
export const PRIVAT_PLANS: PrivatPlan[] = [
  {
    id: 'start',
    name: 'Haus-IT Start',
    monthly: 9.90,
    onsiteDiscountPct: 0.15,
    claim: 'Für Haushalte, die Sicherheit und Priorität beim IT-Support möchten.',
    badges: ['Priorität', '–15% Vor-Ort', 'WhatsApp'],
    bullets: [
      '–15% Vor-Ort-Rabatt auf alle Einsätze',
      'Priorisierte Terminvergabe (Ziel: ≤ 48h Antwort)',
      'WhatsApp-Direktkanal für schnelle Anfragen',
      'Update-Erinnerungen & Schritt-für-Schritt-Guides',
      '1× jährlicher Remote-Gesundheitscheck (Basis)',
      'Preisgarantie 12 Monate auf Stundensatz'
    ]
  },
  {
    id: 'plus',
    name: 'Haus-IT Plus',
    monthly: 19.90,
    onsiteDiscountPct: 0.25,
    claim: 'Premium-Vorteile für Familien und Power-User mit schnellerer Reaktion.',
    badges: ['Priority', '–25% Vor-Ort', 'WhatsApp-Priority'],
    bullets: [
      '–25% Vor-Ort-Rabatt auf alle Einsätze',
      'Schnellere Reaktion (Ziel: ≤ 4h Antwort)',
      'Same/Next-Business-Day Termin-Ziel (Best-Effort)',
      '2× jährlicher Remote-Check inkl. Sicherheits-Review',
      'Backup-Plan-Setup (einmalige Einrichtung & Check)',
      'WhatsApp-Priority & bevorzugte Slot-Vergabe'
    ]
  }
];

/**
 * KMU PLANS
 */
export const KMU_PLANS: KMUPlan[] = [
  {
    id: 'kmu-basic',
    name: 'Managed IT-Partner',
    subtitle: 'Basic',
    pricePerEndpoint: 14.90,
    minMonthly: 99,
    discounts: {
      annual: 0.10,
      onsite: 0.25
    },
    bullets: [
      'Remote Monitoring & Management',
      'Automatisches Patch-Management',
      'Inventarverwaltung & Asset-Tracking',
      'Remote-Support bei Problemen',
      'Monatliches Reporting'
    ],
    features: {
      rmm: true,
      patch: true,
      backup: 'none',
      reporting: 'monthly',
      sla: '16h Werktag',
      onsite: 'Nach Bedarf (reguläre Abrechnung mit –25% Rabatt)'
    }
  },
  {
    id: 'kmu-standard',
    name: 'Advanced IT-Pro',
    subtitle: 'Standard',
    pricePerEndpoint: 24.90,
    minMonthly: 179,
    discounts: {
      annual: 0.10,
      onsite: 0.25
    },
    bullets: [
      'Alles aus Basic',
      'Erweiterte Security-Policies & Hardening',
      'Software-Rollout & Deployment',
      'Basis-Backup (lokale Sicherung)',
      'Wöchentliches Reporting',
      'SLA: 4h Reaktion (Werktag)'
    ],
    features: {
      rmm: true,
      patch: true,
      backup: 'basic',
      reporting: 'weekly',
      sla: '4h Werktag',
      onsite: 'Priorisierte Terminvergabe (mit –25% Rabatt)',
      consulting: 'NIS-2 Prep: Gap-Check (optional)'
    }
  },
  {
    id: 'kmu-premium',
    name: 'Enterprise IT-Guard',
    subtitle: 'Premium',
    pricePerEndpoint: 39.90,
    minMonthly: 299,
    discounts: {
      annual: 0.10,
      onsite: 0.25
    },
    bullets: [
      'Alles aus Standard',
      'EDR (Endpoint Detection & Response)',
      'Advanced Backup (Cloud + lokal)',
      'Custom Playbooks & Automation',
      'Tägliches Reporting',
      'SLA: 1h Reaktion / 8h Lösung (24/7)'
    ],
    features: {
      rmm: true,
      patch: true,
      backup: 'advanced',
      reporting: 'daily',
      sla: '1h/8h (24/7)',
      onsite: 'Bevorzugte Slots & schnellere Vor-Ort-Reaktion (mit –25% Rabatt)',
      consulting: 'NIS-2 Prep: Gap-Check + Roadmap (optional)'
    }
  }
];
