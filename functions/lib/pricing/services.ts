/**
 * Catálogo de 17 servicios (Leistungen) Tech Hilfe Pro
 * IDs, slugs y nombres exactos según especificación
 * Con remoteAvailable y descriptionShort de 2–3 líneas
 */

import { Service } from './types.ts';

export const SERVICES: Service[] = [
  {
    id: '1',
    slug: 'computer',
    nameDe: 'Computer',
    descriptionShort: 'PC-Einrichtung, Wartung und Problemlösung für Desktop-Computer aller Marken.',
    remoteAvailable: true,
  },
  {
    id: '2',
    slug: 'computer-software',
    nameDe: 'Computer-Software',
    descriptionShort: 'Installation und Konfiguration von Betriebssystemen, Office-Software und Anwendungen.',
    remoteAvailable: true,
  },
  {
    id: '3',
    slug: 'drucker-kopierer-scanner',
    nameDe: 'Drucker, Kopierer & Scanner',
    descriptionShort: 'Einrichtung und Fehlerbehebung für Drucker, Multifunktionsgeräte und Scanner.',
    remoteAvailable: false,
  },
  {
    id: '4',
    slug: 'ebook-reader-tablets',
    nameDe: 'E-Book-Reader & Tablets',
    descriptionShort: 'Hilfe bei der Einrichtung und Nutzung von Tablets, iPads und E-Readern.',
    remoteAvailable: true,
  },
  {
    id: '5',
    slug: 'festplatten-datensicherung',
    nameDe: 'Festplatten & Datensicherung',
    descriptionShort: 'Datenrettung, Backup-Lösungen und Festplatten-Upgrades für sichere Datenspeicherung.',
    remoteAvailable: false,
  },
  {
    id: '6',
    slug: 'heimnetzwerk-wlan',
    nameDe: 'Heimnetzwerk & WLAN',
    descriptionShort: 'Optimierung Ihres WLAN-Netzwerks, Router-Konfiguration und Mesh-Systeme.',
    remoteAvailable: true,
  },
  {
    id: '7',
    slug: 'konsolen-vr',
    nameDe: 'Konsolen & VR',
    descriptionShort: 'Einrichtung von Spielekonsolen, VR-Headsets und Gaming-Zubehör.',
    remoteAvailable: false,
  },
  {
    id: '8',
    slug: 'kueche-haushalt',
    nameDe: 'Küche & Haushalt',
    descriptionShort: 'Installation smarter Küchengeräte und vernetzter Haushaltstechnik.',
    remoteAvailable: false,
  },
  {
    id: '9',
    slug: 'smarthome-assistenten',
    nameDe: 'Smart-Home & Assistenten',
    descriptionShort: 'Einrichtung von Alexa, Google Home und Smart-Home-Steuerungssystemen.',
    remoteAvailable: false,
  },
  {
    id: '10',
    slug: 'smartwatch-fitnesstracker',
    nameDe: 'Smartwatch & Fitnesstracker',
    descriptionShort: 'Konfiguration von Smartwatches, Fitnesstrackern und Gesundheits-Apps.',
    remoteAvailable: true,
  },
  {
    id: '11',
    slug: 'telefon-handy-fax',
    nameDe: 'Telefon, Handy & Fax',
    descriptionShort: 'Hilfe bei Smartphones, Festnetztelefonen und Faxgeräten.',
    remoteAvailable: true,
  },
  {
    id: '12',
    slug: 'ton-hifi-lautsprecher',
    nameDe: 'Ton, HiFi & Lautsprecher',
    descriptionShort: 'Einrichtung von Audio-Systemen, Soundbars und vernetzten Lautsprechern.',
    remoteAvailable: false,
  },
  {
    id: '13',
    slug: 'tv-dvd-bluray-video',
    nameDe: 'TV, DVD, Blu-ray & Video',
    descriptionShort: 'Installation und Konfiguration von Fernsehern, DVD-Playern und Heimkino-Systemen.',
    remoteAvailable: false,
  },
  {
    id: '14',
    slug: 'tv-internet-streaming',
    nameDe: 'TV-Internet & Streaming',
    descriptionShort: 'Einrichtung von Streaming-Diensten wie Netflix, Amazon Prime und Disney+.',
    remoteAvailable: true,
  },
  {
    id: '15',
    slug: 'tv-receiver',
    nameDe: 'TV-Receiver',
    descriptionShort: 'Konfiguration von Satelliten-, Kabel- und DVB-T2-Receivern.',
    remoteAvailable: false,
  },
  {
    id: '16',
    slug: 'tv-einrichtung',
    nameDe: 'TV-Einrichtung',
    descriptionShort: 'Komplette Einrichtung Ihres Fernsehers inkl. Sender-Sortierung und Apps.',
    remoteAvailable: false,
  },
  {
    id: '17',
    slug: 'windows-11',
    nameDe: 'Windows 11',
    descriptionShort: 'Installation, Updates und Optimierung von Windows 11 Systemen.',
    remoteAvailable: true,
  },
];

export function getServiceById(id: string): Service | null {
  return SERVICES.find((s) => s.id === id) || null;
}

export function getServiceBySlug(slug: string): Service | null {
  return SERVICES.find((s) => s.slug === slug) || null;
}
