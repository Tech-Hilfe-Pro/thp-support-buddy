/**
 * Lógica de filtros para Service Finder
 */

export type DeviceType = 'pc' | 'wlan' | 'drucker' | 'tv' | 'smarthome' | 'handy';
export type ServiceType = 'remote' | 'vor-ort';
export type Urgency = 'normal' | 'heute' | 'wochenende';

export interface WizardState {
  device?: DeviceType;
  type?: ServiceType;
  urgency?: Urgency;
}

export type FilterCategory = 'alle' | 'remote' | 'vor-ort' | 'netzwerk' | 'tv' | 'smarthome';

/**
 * Mapeo dispositivo → slugs de servicios relacionados
 */
export const DEVICE_TO_SERVICES: Record<DeviceType, string[]> = {
  pc: ['computer', 'computer-software', 'windows-11', 'festplatten-datensicherung'],
  wlan: ['heimnetzwerk-wlan'],
  drucker: ['drucker-kopierer-scanner'],
  tv: ['tv-internet-streaming', 'tv-dvd-bluray-video', 'tv-receiver', 'tv-einrichtung'],
  smarthome: ['smarthome-assistenten', 'kueche-haushalt'],
  handy: ['telefon-handy-fax', 'ebook-reader-tablets', 'smartwatch-fitnesstracker'],
};

/**
 * Mapeo categoría de filtro → qué servicios mostrar
 */
export const CATEGORY_MAPPINGS: Record<FilterCategory, (slug: string, remote: boolean) => boolean> = {
  alle: () => true,
  remote: (_, remote) => remote === true,
  'vor-ort': (_, remote) => remote === false,
  netzwerk: (slug) => ['heimnetzwerk-wlan', 'smarthome-assistenten'].includes(slug),
  tv: (slug) => slug.startsWith('tv-') || slug === 'ton-hifi-lautsprecher',
  smarthome: (slug) => ['smarthome-assistenten', 'kueche-haushalt'].includes(slug),
};

/**
 * Obtener servicios recomendados según wizard
 */
export function getRecommendedServices(state: WizardState): string[] {
  if (!state.device) return [];
  
  const base = DEVICE_TO_SERVICES[state.device] || [];
  
  // Si eligió "remote", filtrar solo los que soportan remote
  // (esto se validará luego con los datos reales)
  return base;
}
