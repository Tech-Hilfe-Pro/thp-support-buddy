/**
 * Tech Hilfe Pro - 17 Services mit festen Slugs
 */

export interface ServiceData {
  id: string;
  slug: string;
  nameDe: string;
  descriptionShort: string;
  remoteAvailable: boolean;
  zielgruppe: 'privat' | 'kmu' | 'beide';
}

export const SERVICES_DATA: ServiceData[] = [
  {
    id: '1',
    slug: 'computer',
    nameDe: 'Computer-Reparatur & Wartung',
    descriptionShort: 'PC & Mac-Probleme beheben, Wartung, Upgrades',
    remoteAvailable: true,
    zielgruppe: 'beide'
  },
  {
    id: '2',
    slug: 'computer-software',
    nameDe: 'Software-Installation & Updates',
    descriptionShort: 'Programme installieren, Updates, Lizenzierung',
    remoteAvailable: true,
    zielgruppe: 'beide'
  },
  {
    id: '3',
    slug: 'drucker-kopierer-scanner',
    nameDe: 'Drucker, Kopierer & Scanner',
    descriptionShort: 'Einrichtung, Treiber, Netzwerk-Drucker',
    remoteAvailable: true,
    zielgruppe: 'beide'
  },
  {
    id: '4',
    slug: 'ebook-reader-tablets',
    nameDe: 'E-Book-Reader & Tablets',
    descriptionShort: 'Setup, Apps, Synchronisation',
    remoteAvailable: true,
    zielgruppe: 'privat'
  },
  {
    id: '5',
    slug: 'festplatten-datensicherung',
    nameDe: 'Festplatten & Datensicherung',
    descriptionShort: 'Backup-Lösungen, Datenrettung, Speicher-Upgrade',
    remoteAvailable: false,
    zielgruppe: 'beide'
  },
  {
    id: '6',
    slug: 'heimnetzwerk-wlan',
    nameDe: 'Heimnetzwerk & WLAN',
    descriptionShort: 'Router-Setup, WLAN-Optimierung, Mesh-Systeme',
    remoteAvailable: true,
    zielgruppe: 'beide'
  },
  {
    id: '7',
    slug: 'konsolen-vr',
    nameDe: 'Spielekonsolen & VR',
    descriptionShort: 'Setup, Online-Zugang, VR-Brillen einrichten',
    remoteAvailable: false,
    zielgruppe: 'privat'
  },
  {
    id: '8',
    slug: 'kueche-haushalt',
    nameDe: 'Küche & Haushaltsgeräte',
    descriptionShort: 'Smart-Kitchen, vernetzte Haushaltsgeräte',
    remoteAvailable: false,
    zielgruppe: 'privat'
  },
  {
    id: '9',
    slug: 'smarthome-assistenten',
    nameDe: 'SmartHome & Assistenten',
    descriptionShort: 'Alexa, Google Home, Philips Hue, Automation',
    remoteAvailable: true,
    zielgruppe: 'beide'
  },
  {
    id: '10',
    slug: 'smartwatch-fitnesstracker',
    nameDe: 'Smartwatch & Fitnesstracker',
    descriptionShort: 'Einrichtung, Apps, Gesundheitsdaten',
    remoteAvailable: true,
    zielgruppe: 'privat'
  },
  {
    id: '11',
    slug: 'telefon-handy-fax',
    nameDe: 'Telefon, Handy & Fax',
    descriptionShort: 'Smartphone-Hilfe, Kontakte, Apps, Fax-Setup',
    remoteAvailable: true,
    zielgruppe: 'beide'
  },
  {
    id: '12',
    slug: 'ton-hifi-lautsprecher',
    nameDe: 'Ton, HiFi & Lautsprecher',
    descriptionShort: 'Audio-Setup, Soundbars, Multiroom',
    remoteAvailable: false,
    zielgruppe: 'privat'
  },
  {
    id: '13',
    slug: 'tv-dvd-bluray-video',
    nameDe: 'TV, DVD, Blu-ray & Video',
    descriptionShort: 'Fernseher anschließen, Player einrichten',
    remoteAvailable: false,
    zielgruppe: 'privat'
  },
  {
    id: '14',
    slug: 'tv-internet-streaming',
    nameDe: 'TV-Internet & Streaming',
    descriptionShort: 'Smart-TV, Netflix, Disney+, Prime Video',
    remoteAvailable: true,
    zielgruppe: 'privat'
  },
  {
    id: '15',
    slug: 'tv-receiver',
    nameDe: 'TV-Receiver & Kabel',
    descriptionShort: 'Receiver einrichten, Sendersuche, HD+',
    remoteAvailable: false,
    zielgruppe: 'privat'
  },
  {
    id: '16',
    slug: 'tv-einrichtung',
    nameDe: 'TV-Ersteinrichtung',
    descriptionShort: 'Neuen Fernseher komplett einrichten',
    remoteAvailable: false,
    zielgruppe: 'privat'
  },
  {
    id: '17',
    slug: 'windows-11',
    nameDe: 'Windows 11 & Updates',
    descriptionShort: 'Installation, Updates, Migration',
    remoteAvailable: true,
    zielgruppe: 'beide'
  }
];

export function getServiceBySlug(slug: string): ServiceData | null {
  return SERVICES_DATA.find(s => s.slug === slug) || null;
}

export function getServiceById(id: string): ServiceData | null {
  return SERVICES_DATA.find(s => s.id === id) || null;
}
