/**
 * Zonas de precios basadas en PLZ
 * Sistema de tarifas por zona geográfica
 */

export interface Zone {
  name: string;
  baseRate: number; // EUR/hora
  plzRanges: string[];
}

// Zonas operativas Tech Hilfe Pro
export const ZONES: Zone[] = [
  {
    name: 'Köln Kern',
    baseRate: 79,
    plzRanges: [
      '50667', '50668', '50670', '50672', '50674', '50676', '50677', '50678', '50679',
      '50733', '50735', '50737', '50739',
      '50823', '50825', '50827', '50829',
      '50931', '50933', '50935', '50937', '50939',
      '51061', '51063', '51065', '51067', '51069',
      '51103', '51105', '51107', '51109',
      '51143', '51145', '51147', '51149',
    ],
  },
  {
    name: 'Neuss/Köln Umland',
    baseRate: 85,
    plzRanges: [
      '41460', '41462', '41464', '41466', '41468', // Neuss
      '41469', '41470', '41472', '41473', '41474', '41475', '41476', '41477', '41478', '41479',
      '50169', // Kerpen
      '50171', '50173', '50181', '50189', // Kerpen/Frechen
      '50226', '50259', // Frechen/Pulheim
      '50321', '50354', '50374', '50389', // Brühl/Wesseling
    ],
  },
  {
    name: 'Umland 20-40km',
    baseRate: 95,
    plzRanges: [
      '40212', '40213', '40215', '40217', '40219', '40221', '40223', '40225', '40227', '40229', // Düsseldorf
      '41236', '41238', '41239', // Mönchengladbach
      '41515', '41516', '41517', '41539', // Grevenbroich
      '50126', '50127', '50128', '50129', '50130', '50131', // Bergheim
      '51373', '51375', '51377', '51379', // Leverkusen
      '53111', '53113', '53115', '53117', '53119', '53121', '53123', '53125', '53127', '53129', // Bonn
    ],
  },
];

/**
 * Valida formato PLZ alemana (5 dígitos)
 */
export function isValidPLZ(plz: string): boolean {
  return /^\d{5}$/.test(plz);
}

/**
 * Busca la zona correspondiente a una PLZ
 * @returns Zone o null si no está en área de servicio
 */
export function getZoneByPLZ(plz: string): Zone | null {
  if (!isValidPLZ(plz)) return null;

  for (const zone of ZONES) {
    if (zone.plzRanges.includes(plz)) {
      return zone;
    }
  }

  return null;
}
