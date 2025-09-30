// Datos extendidos para páginas de servicios individuales
export interface ServiceDetails {
  id: string;
  tip: string;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export const SERVICE_DETAILS: Record<string, ServiceDetails> = {
  pc_setup: {
    id: "pc_setup",
    tip: "Tipp: Vor dem Termin alle Passwörter und Zugangsdaten bereithalten – spart Zeit!",
    faqs: [
      {
        question: "Wie lange dauert eine PC-Einrichtung?",
        answer: "In der Regel 45-90 Minuten, je nach Umfang der Datenübernahme und Softwareinstallation.",
      },
      {
        question: "Können Sie auch Mac-Computer einrichten?",
        answer: "Ja, wir unterstützen sowohl Windows-PCs als auch Apple Mac-Computer.",
      },
      {
        question: "Werden meine Daten beim Umzug gelöscht?",
        answer: "Nein, wir übertragen Ihre Daten sicher vom alten auf den neuen Computer.",
      },
    ],
  },
  wlan: {
    id: "wlan",
    tip: "Tipp: WLAN-Optimierung lohnt sich besonders in größeren Wohnungen und Häusern!",
    faqs: [
      {
        question: "Wie verbessern Sie mein WLAN?",
        answer: "Wir optimieren Ihren Router, platzieren ihn ideal und installieren bei Bedarf Mesh-Systeme für flächendeckendes WLAN.",
      },
      {
        question: "Muss ich neue Hardware kaufen?",
        answer: "Nicht zwingend – oft reicht eine Optimierung. Wir beraten Sie ehrlich, was wirklich nötig ist.",
      },
      {
        question: "Funktioniert das auch mit meinem Anbieter?",
        answer: "Ja, wir arbeiten mit allen gängigen Routern und Anbietern (Telekom, Vodafone, etc.).",
      },
    ],
  },
  drucker: {
    id: "drucker",
    tip: "Tipp: Netzwerkdrucker sparen Zeit – alle Geräte können ohne Kabel drucken!",
    faqs: [
      {
        question: "Welche Druckermarken unterstützen Sie?",
        answer: "Alle gängigen Marken: HP, Canon, Epson, Brother, Samsung und weitere.",
      },
      {
        question: "Kann ich vom Handy drucken?",
        answer: "Ja, wir richten mobiles Drucken über WLAN ein (AirPrint, Google Cloud Print).",
      },
      {
        question: "Was tun bei Druckerproblemen?",
        answer: "Wir beheben Treiberprobleme, Verbindungsfehler und helfen bei Fehlermeldungen.",
      },
    ],
  },
  smarttv: {
    id: "smarttv",
    tip: "Tipp: Mit richtigem Setup können Sie alle Streaming-Dienste bequem vom Sofa nutzen!",
    faqs: [
      {
        question: "Welche Streaming-Dienste richten Sie ein?",
        answer: "Netflix, Amazon Prime, Disney+, YouTube, ARD/ZDF-Mediatheken und viele mehr.",
      },
      {
        question: "Kann ich mein Smartphone mit dem TV verbinden?",
        answer: "Ja, wir richten Casting (Miracast, AirPlay) und Screen Mirroring ein.",
      },
      {
        question: "Funktioniert das auch mit älteren Fernsehern?",
        answer: "Ja, mit Fire TV Stick, Chromecast oder Apple TV können auch ältere Geräte smart werden.",
      },
    ],
  },
  smarthome: {
    id: "smarthome",
    tip: "Tipp: Smart-Home spart Energie und erhöht den Wohnkomfort – ideal für Einsteiger!",
    faqs: [
      {
        question: "Welche Smart-Home-Systeme unterstützen Sie?",
        answer: "Philips Hue, IKEA Tradfri, Amazon Alexa, Google Home, Apple HomeKit und weitere.",
      },
      {
        question: "Ist Smart-Home kompliziert zu bedienen?",
        answer: "Nein, wir richten alles einfach und intuitiv ein – per App oder Sprachbefehl.",
      },
      {
        question: "Können vorhandene Geräte integriert werden?",
        answer: "Ja, oft können bestehende Lampen, Steckdosen und Thermostate smart gemacht werden.",
      },
    ],
  },
  security: {
    id: "security",
    tip: "Tipp: Ein Sicherheits-Check pro Jahr schützt vor den meisten digitalen Bedrohungen!",
    faqs: [
      {
        question: "Was wird beim Sicherheits-Check geprüft?",
        answer: "Antivirus-Status, Firewall, Windows Updates, sichere Passwörter und verdächtige Software.",
      },
      {
        question: "Brauche ich einen kostenpflichtigen Virenscanner?",
        answer: "Nicht zwingend – Windows Defender ist oft ausreichend. Wir beraten Sie individuell.",
      },
      {
        question: "Wie erkenne ich einen Virus?",
        answer: "Langsames System, Pop-ups, unbekannte Programme – bei Verdacht rufen Sie uns an!",
      },
    ],
  },
  backup: {
    id: "backup",
    tip: "Tipp: Die 3-2-1-Regel (3 Kopien, 2 Medien, 1 extern) schützt vor Datenverlust!",
    faqs: [
      {
        question: "Wie oft sollte ich Backups erstellen?",
        answer: "Wichtige Daten täglich, normale Daten wöchentlich – wir automatisieren das für Sie.",
      },
      {
        question: "Welche Cloud-Dienste empfehlen Sie?",
        answer: "OneDrive, Google Drive, Dropbox – je nach Bedarf und Datenschutzanforderung.",
      },
      {
        question: "Kann ich alte Backups wiederherstellen?",
        answer: "Ja, wir helfen beim Wiederherstellen von Daten aus Backups oder Cloud-Speichern.",
      },
    ],
  },
  datarecovery: {
    id: "datarecovery",
    tip: "Tipp: Bei Datenverlust sofort Gerät ausschalten – erhöht Rettungschancen!",
    faqs: [
      {
        question: "Welche Daten können Sie retten?",
        answer: "Gelöschte Dateien, formatierte Laufwerke, defekte USB-Sticks – wir versuchen alles!",
      },
      {
        question: "Wie hoch sind die Erfolgschancen?",
        answer: "Hängt vom Schadensfall ab – oft über 80%, bei physischen Defekten niedriger.",
      },
      {
        question: "Was kostet eine Datenrettung?",
        answer: "Ab 79€ für einfache Fälle (gelöschte Dateien), komplexe Fälle nach Aufwand.",
      },
    ],
  },
  router: {
    id: "router",
    tip: "Tipp: Ein Gastnetzwerk schützt Ihr Hauptnetzwerk vor fremden Geräten!",
    faqs: [
      {
        question: "Was ist ein Mesh-System?",
        answer: "Mehrere Router-Einheiten, die ein nahtloses WLAN-Netz im ganzen Haus bilden.",
      },
      {
        question: "Brauche ich QoS (Quality of Service)?",
        answer: "Ja, wenn Sie viel streamen oder im Homeoffice arbeiten – QoS priorisiert wichtigen Traffic.",
      },
      {
        question: "Wie richte ich ein Gastnetzwerk ein?",
        answer: "Wir konfigurieren ein separates WLAN für Gäste – sicher und einfach zu verwalten.",
      },
    ],
  },
  schulung: {
    id: "schulung",
    tip: "Tipp: Schulungen finden in Ihrem Tempo statt – keine Frage ist zu einfach!",
    faqs: [
      {
        question: "Welche Themen deckt die Schulung ab?",
        answer: "Internet, E-Mail, Apps, Smartphone-Bedienung, Videoanrufe – individuell nach Bedarf.",
      },
      {
        question: "Muss ich technische Vorkenntnisse haben?",
        answer: "Nein, wir erklären alles Schritt für Schritt und in einfachen Worten.",
      },
      {
        question: "Kann die Schulung bei mir zu Hause stattfinden?",
        answer: "Ja, wir kommen zu Ihnen nach Hause – so lernen Sie an Ihren eigenen Geräten.",
      },
    ],
  },
  rmm: {
    id: "rmm",
    tip: "Tipp: Proaktives Monitoring verhindert IT-Ausfälle, bevor sie entstehen!",
    faqs: [
      {
        question: "Was ist Remote Monitoring?",
        answer: "Wir überwachen Ihre Geräte 24/7 und beheben Probleme, bevor sie auffallen.",
      },
      {
        question: "Welche Tools nutzen Sie?",
        answer: "NinjaOne – professionelles RMM für automatisches Patching und Monitoring.",
      },
      {
        question: "Wie oft werden Updates installiert?",
        answer: "Automatisch und regelmäßig – sicherheitsrelevante Patches sofort.",
      },
    ],
  },
  m365: {
    id: "m365",
    tip: "Tipp: Microsoft 365 richtig konfiguriert spart Zeit und schützt Ihre Daten!",
    faqs: [
      {
        question: "Was umfasst M365 Administration?",
        answer: "User-Verwaltung, Lizenz-Zuweisung, Sicherheitsrichtlinien und Support.",
      },
      {
        question: "Können Sie bei Migration helfen?",
        answer: "Ja, wir migrieren E-Mails, Dateien und Kontakte sicher zu Microsoft 365.",
      },
      {
        question: "Was sind Best Practices für M365?",
        answer: "MFA aktivieren, sichere Passwörter, regelmäßige Backups und Schulungen.",
      },
    ],
  },
  edr: {
    id: "edr",
    tip: "Tipp: EDR erkennt und stoppt Bedrohungen in Echtzeit – essenziell für KMU!",
    faqs: [
      {
        question: "Was ist EDR?",
        answer: "Endpoint Detection & Response – fortgeschrittener Schutz gegen Malware und Ransomware.",
      },
      {
        question: "Reicht ein normaler Virenscanner nicht?",
        answer: "Für KMU nicht – EDR bietet erweiterte Erkennung und automatische Reaktion.",
      },
      {
        question: "Was passiert bei einem Angriff?",
        answer: "EDR isoliert betroffene Geräte automatisch und benachrichtigt uns sofort.",
      },
    ],
  },
  backup_kmu: {
    id: "backup_kmu",
    tip: "Tipp: Endpoint-Backups retten Ihr Business bei Ransomware-Angriffen!",
    faqs: [
      {
        question: "Was wird gesichert?",
        answer: "Alle Dateien, Einstellungen und Systemzustände der Endgeräte.",
      },
      {
        question: "Wie oft erfolgt das Backup?",
        answer: "Täglich automatisch – mit Versionierung für Wiederherstellung älterer Dateien.",
      },
      {
        question: "Wo werden die Backups gespeichert?",
        answer: "In der Cloud (verschlüsselt) und optional auf lokalen Servern (Hybrid).",
      },
    ],
  },
};
