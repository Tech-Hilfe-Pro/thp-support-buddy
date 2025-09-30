/**
 * Tech Hilfe Pro - Preise (fest hardcodiert)
 */

export interface PrivatPlan {
  id: string;
  name: string;
  preis: number;
  rabattVorOrt: number;
  features: string[];
}

export interface KMUPlan {
  id: string;
  name: string;
  preisProEndpoint: number;
  mindestumsatz: number;
  features: string[];
}

export interface PrivatPlanExtended extends PrivatPlan {
  claim: string;
  badges: string[];
}

export const PRIVAT_PLANS: PrivatPlanExtended[] = [
  {
    id: 'start',
    name: 'Haus-IT Start',
    preis: 9.90,
    rabattVorOrt: 0.15,
    claim: 'Für Haushalte, die Sicherheit und Priorität beim IT-Support möchten.',
    badges: ['Priorität', '–15% Vor-Ort', 'WhatsApp'],
    features: [
      '–15% Vor-Ort-Rabatt',
      'Termin-Priorität (Antwort ≤ 48h)',
      'WhatsApp-Direktkanal',
      'Update-Reminder & Schritt-für-Schritt-Guides',
      '1× jährlicher Remote-Gesundheitscheck',
      'Preisgarantie 12 Monate'
    ]
  },
  {
    id: 'plus',
    name: 'Haus-IT Plus',
    preis: 19.90,
    rabattVorOrt: 0.25,
    claim: 'Premium-Vorteile für Familien und Power-User mit schnellerer Reaktion.',
    badges: ['Priority', '–25% Vor-Ort', 'WhatsApp-Priority'],
    features: [
      '–25% Vor-Ort-Rabatt',
      'Schnellere Reaktion (Antwort ≤ 4h)',
      'Same/Next-Business-Day (Best-Effort)',
      '2× jährlicher Sicherheits-Check (remote)',
      'Backup-Plan-Setup (einmalig)',
      'WhatsApp-Priority'
    ]
  }
];

export const KMU_PLANS: KMUPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    preisProEndpoint: 14.90,
    mindestumsatz: 99,
    features: [
      'Remote-Monitoring & Verwaltung (RMM)',
      'Automatisches Patch-Management',
      'Inventarverwaltung',
      'Remote-Support',
      'Standard-Reporting'
    ]
  },
  {
    id: 'standard',
    name: 'Standard',
    preisProEndpoint: 24.90,
    mindestumsatz: 179,
    features: [
      'Alles aus Basic',
      'Erweiterte Security-Policies',
      'Software-Rollout',
      'Basis-Backup',
      'SLA: 4h Reaktion / 16h Lösung',
      'Monatliches Review'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    preisProEndpoint: 39.90,
    mindestumsatz: 299,
    features: [
      'Alles aus Standard',
      'EDR / Endpoint-Backup',
      'Custom Playbooks & Automation',
      '1× Vor-Ort pro Monat inkludiert',
      'SLA: 1h Reaktion / 8h Lösung',
      'Wöchentliches Review'
    ]
  }
];
