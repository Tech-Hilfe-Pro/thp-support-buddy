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

export const PRIVAT_PLANS: PrivatPlan[] = [
  {
    id: 'start',
    name: 'Haus-IT Start',
    preis: 9.90,
    rabattVorOrt: 0.15,
    features: [
      'Monatlich kündbar',
      '–15% auf Vor-Ort-Einsätze',
      'Remote-Support',
      'Telefonische Beratung'
    ]
  },
  {
    id: 'plus',
    name: 'Haus-IT Plus',
    preis: 19.90,
    rabattVorOrt: 0.25,
    features: [
      'Monatlich kündbar',
      '–25% auf Vor-Ort-Einsätze',
      'Remote-Support',
      'Telefonische Beratung',
      'Quartalscheck',
      'Backup-Beratung'
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
