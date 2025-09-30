export type Service = {
  id: string;
  zielgruppe: "privat" | "kmu" | "beide";
  titel: string;
  kurz: string;
  zeitMin: number;      // typische Mindestdauer in Minuten
  preisAb: number;      // "ab"-Preis in €
  remote: boolean;      // sinnvoll Remote?
};

export const SERVICES: Service[] = [
  { id:"pc_setup", zielgruppe:"beide", titel:"PC/Mac-Hilfe", kurz:"Einrichtung, Umzug, E-Mail, Drucker.", zeitMin:45, preisAb:39, remote:true },
  { id:"wlan", zielgruppe:"beide", titel:"WLAN-Optimierung", kurz:"Router/Mesh, Reichweite & Stabilität.", zeitMin:60, preisAb:59, remote:false },
  { id:"drucker", zielgruppe:"beide", titel:"Drucker-Setup", kurz:"Einbindung, Treiber, Testdruck.", zeitMin:40, preisAb:49, remote:true },
  { id:"smarttv", zielgruppe:"privat", titel:"Smart-TV/Streaming", kurz:"Apps, Sender, Casting.", zeitMin:45, preisAb:39, remote:true },
  { id:"smarthome", zielgruppe:"privat", titel:"Smart-Home", kurz:"Licht, Sensoren, Assistenten.", zeitMin:60, preisAb:69, remote:false },
  { id:"security", zielgruppe:"beide", titel:"Sicherheits-Check", kurz:"AV, Firewall, Updates, Passwörter.", zeitMin:60, preisAb:59, remote:true },
  { id:"backup", zielgruppe:"beide", titel:"Backups & Cloud", kurz:"3-2-1-Strategie, Cloud-Sync.", zeitMin:60, preisAb:59, remote:true },
  { id:"datarecovery", zielgruppe:"beide", titel:"Datenrettung (basic)", kurz:"Gelöschte Dateien, externe Medien.", zeitMin:60, preisAb:79, remote:false },
  { id:"router", zielgruppe:"beide", titel:"Router & Mesh", kurz:"Neukonfig., Gastnetz, QoS.", zeitMin:60, preisAb:69, remote:false },
  { id:"schulung", zielgruppe:"privat", titel:"Schulung & Einweisung", kurz:"Einfach erklärt, Schritt für Schritt.", zeitMin:45, preisAb:49, remote:true },

  // KMU-spezifisch
  { id:"rmm", zielgruppe:"kmu", titel:"Monitoring & Patching", kurz:"Remote-Überwachung, Updates, Scripts (NinjaOne).", zeitMin:0, preisAb:29, remote:true },
  { id:"m365", zielgruppe:"kmu", titel:"M365 Administration", kurz:"User, Lizenzen, Policies.", zeitMin:0, preisAb:9, remote:true },
  { id:"edr", zielgruppe:"kmu", titel:"EDR/AV gemanagt", kurz:"Endpoint-Schutz & Response.", zeitMin:0, preisAb:7, remote:true },
  { id:"backup_kmu", zielgruppe:"kmu", titel:"Endpoint-Backup", kurz:"Versionierung & Wiederherstellung.", zeitMin:0, preisAb:6, remote:true }
];