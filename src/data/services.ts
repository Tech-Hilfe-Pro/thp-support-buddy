/**
 * Catálogo completo de servicios con detalles, bullets y FAQs
 * Compatible con estructura existente (titel, zeitMin) + nuevos campos
 */

export type Service = {
  id: string;
  slug: string;
  category: 'remote' | 'vor-ort' | 'netzwerk' | 'drucker' | 'tv' | 'smarthome' | 'handy';
  title: string;
  titel: string; // Alias para compatibilidad
  benefit: string;
  bullets: string[];
  description?: string;
  examples?: string[];
  remoteAvailable: boolean;
  remote: boolean; // Alias para compatibilidad
  zielgruppe: 'privat' | 'kmu' | 'beide';
  zeitMin: number; // Duración típica en minutos
  preisAb: number; // Precio "ab" en €
  faq?: { q: string; a: string }[];
};

export const SERVICES: Service[] = [
  {
    id: '1',
    slug: 'computer',
    category: 'remote',
    title: 'Computer-Reparatur & Wartung',
    titel: 'Computer-Reparatur & Wartung',
    benefit: 'Ihr PC oder Mac läuft wieder rund',
    bullets: [
      'Fehlerdiagnose und Problembehebung',
      'System-Wartung und Optimierung',
      'Hardware-Upgrades (RAM, SSD)',
      'Virenentfernung und Sicherheits-Check',
    ],
    description: 'Wir beheben PC- und Mac-Probleme schnell und zuverlässig – remote oder vor Ort.',
    examples: ['Langsamer Start', 'Abstürze', 'Fehlermeldungen'],
    remoteAvailable: true,
    remote: true,
    zielgruppe: 'beide',
    zeitMin: 60,
    preisAb: 49,
    faq: [
      { q: 'Wie schnell können Sie helfen?', a: 'Remote meist innerhalb von 2 Stunden, vor Ort am selben oder nächsten Tag.' },
      { q: 'Was kostet die Reparatur?', a: 'Ab 49€. Genaue Kosten nennen wir nach Diagnose.' },
    ],
  },
  {
    id: '2',
    slug: 'computer-software',
    category: 'remote',
    title: 'Software-Installation & Updates',
    titel: 'Software-Installation & Updates',
    benefit: 'Alle Programme laufen aktuell und sicher',
    bullets: [
      'Programme installieren und konfigurieren',
      'Windows/macOS Updates',
      'Lizenz-Verwaltung',
      'Treiber-Updates',
    ],
    remoteAvailable: true,
    remote: true,
    zielgruppe: 'beide',
    zeitMin: 45,
    preisAb: 39,
  },
  {
    id: '3',
    slug: 'drucker-kopierer-scanner',
    category: 'drucker',
    title: 'Drucker, Kopierer & Scanner',
    titel: 'Drucker, Kopierer & Scanner',
    benefit: 'Drucken, scannen, kopieren – alles funktioniert',
    bullets: [
      'Drucker ins Netzwerk einbinden',
      'Treiber installieren',
      'Testdruck und Kalibrierung',
      'Fehlerbehebung (Papierstau, Streifen)',
    ],
    remoteAvailable: true,
    remote: true,
    zielgruppe: 'beide',
    zeitMin: 40,
    preisAb: 49,
    faq: [
      { q: 'Muss ich den Drucker mitbringen?', a: 'Nein, wir kommen zu Ihnen oder helfen remote.' },
    ],
  },
  {
    id: '6',
    slug: 'heimnetzwerk-wlan',
    category: 'netzwerk',
    title: 'Heimnetzwerk & WLAN',
    titel: 'Heimnetzwerk & WLAN',
    benefit: 'Stabiles WLAN in jedem Raum',
    bullets: [
      'Router-Setup und Optimierung',
      'WLAN-Reichweite verbessern',
      'Mesh-Systeme einrichten',
      'Gastnetzwerk und Kindersicherung',
    ],
    remoteAvailable: true,
    remote: true,
    zielgruppe: 'beide',
    zeitMin: 60,
    preisAb: 59,
    faq: [
      { q: 'Brauche ich einen neuen Router?', a: 'Nicht immer. Oft reicht eine bessere Konfiguration.' },
      { q: 'Was ist ein Mesh-System?', a: 'Mehrere WLAN-Punkte, die ein nahtloses Netz bilden.' },
    ],
  },
  {
    id: '9',
    slug: 'smarthome-assistenten',
    category: 'smarthome',
    title: 'SmartHome & Assistenten',
    titel: 'SmartHome & Assistenten',
    benefit: 'Ihr Zuhause wird intelligent',
    bullets: [
      'Alexa, Google Home einrichten',
      'Philips Hue, smarte Steckdosen',
      'Szenen und Automatisierungen',
      'Sprachsteuerung konfigurieren',
    ],
    remoteAvailable: true,
    remote: true,
    zielgruppe: 'beide',
    zeitMin: 60,
    preisAb: 69,
  },
  {
    id: '11',
    slug: 'telefon-handy-fax',
    category: 'handy',
    title: 'Telefon, Handy & Fax',
    titel: 'Telefon, Handy & Fax',
    benefit: 'Smartphone-Hilfe für alle Altersgruppen',
    bullets: [
      'Neues Handy einrichten',
      'Kontakte übertragen',
      'Apps installieren und erklären',
      'Sicherheit und Datenschutz',
    ],
    remoteAvailable: true,
    remote: true,
    zielgruppe: 'beide',
    zeitMin: 45,
    preisAb: 49,
  },
  {
    id: '14',
    slug: 'tv-internet-streaming',
    category: 'tv',
    title: 'TV-Internet & Streaming',
    titel: 'TV-Internet & Streaming',
    benefit: 'Netflix, Disney+, Prime – alles läuft',
    bullets: [
      'Smart-TV einrichten',
      'Streaming-Apps installieren',
      'Casting und AirPlay',
      'Sender sortieren',
    ],
    remoteAvailable: true,
    remote: true,
    zielgruppe: 'privat',
    zeitMin: 45,
    preisAb: 39,
    faq: [
      { q: 'Kann ich auch ohne Smart-TV streamen?', a: 'Ja, mit Fire TV Stick, Chromecast oder Apple TV.' },
    ],
  },
  {
    id: '17',
    slug: 'windows-11',
    category: 'remote',
    title: 'Windows 11 & Updates',
    titel: 'Windows 11 & Updates',
    benefit: 'Sicheres und aktuelles Windows',
    bullets: [
      'Windows 11 Installation',
      'Migration von Windows 10',
      'Update-Probleme beheben',
      'Treiber-Updates',
    ],
    remoteAvailable: true,
    remote: true,
    zielgruppe: 'beide',
    zeitMin: 60,
    preisAb: 49,
  },
  {
    id: '5',
    slug: 'festplatten-datensicherung',
    category: 'vor-ort',
    title: 'Festplatten & Datensicherung',
    titel: 'Festplatten & Datensicherung',
    benefit: 'Ihre Daten sind sicher',
    bullets: [
      'Backup-Lösungen einrichten',
      'Datenrettung von defekten Platten',
      'Speicher-Upgrade (SSD)',
      'Cloud-Sync (Dropbox, OneDrive)',
    ],
    remoteAvailable: false,
    remote: false,
    zielgruppe: 'beide',
    zeitMin: 60,
    preisAb: 79,
  },
  {
    id: '4',
    slug: 'ebook-reader-tablets',
    category: 'handy',
    title: 'E-Book-Reader & Tablets',
    titel: 'E-Book-Reader & Tablets',
    benefit: 'Lesen und surfen – einfach gemacht',
    bullets: [
      'Tablet oder E-Reader einrichten',
      'Apps und Bücher laden',
      'WLAN und Accounts verbinden',
      'Bedienung erklären',
    ],
    remoteAvailable: true,
    remote: true,
    zielgruppe: 'privat',
    zeitMin: 45,
    preisAb: 39,
  },
];

export function getServiceBySlug(slug: string): Service | null {
  return SERVICES.find((s) => s.slug === slug) || null;
}

export function getServiceById(id: string): Service | null {
  return SERVICES.find((s) => s.id === id) || null;
}
