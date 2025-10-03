export type Post = {
  slug: string;
  title: string;
  date: string;
  tag: "NIS2" | "Windows" | "Cyber" | "Backup";
  excerpt: string;
  content: string;
};

export const POSTS: Post[] = [
  {
    slug: "nis2-kmu-erste-90-tage",
    title: "NIS2: Erste 90 Tage für KMU",
    date: "2025-10-04",
    tag: "NIS2",
    excerpt: "Was NIS2 verlangt und wie Sie starten. Umsetzbare Checkliste mit Nachweisen.",
    content: `
      <h2>Zusammenfassung</h2>
      <p>Die NIS2-Richtlinie verpflichtet Unternehmen in kritischen Sektoren zu neuen Cybersicherheitsmaßnahmen. Dieser Artikel erklärt die ersten Schritte, die Ihr KMU unternehmen sollte.</p>
      
      <h3>Was ist NIS2?</h3>
      <p>NIS2 (Network and Information Security Directive 2) ist eine europäische Richtlinie, die Cybersicherheitsmaßnahmen zum Schutz kritischer Infrastrukturen festlegt.</p>
      
      <h3>Checkliste für die ersten 90 Tage</h3>
      <ul>
        <li>Prüfen, ob Ihr Unternehmen in den Anwendungsbereich von NIS2 fällt</li>
        <li>Einen Informationssicherheitsbeauftragten benennen</li>
        <li>Eine erste Risikoanalyse durchführen</li>
        <li>MFA für alle kritischen Zugänge implementieren</li>
        <li>Einen Incident-Response-Plan aufstellen</li>
        <li>Alle umgesetzten Maßnahmen dokumentieren</li>
      </ul>
      
      <h3>Nächste Schritte</h3>
      <p>Kontaktieren Sie uns für einen kostenlosen NIS2 Quick-Check und erfahren Sie, welche Maßnahmen Ihr Unternehmen konkret benötigt.</p>
    `
  },
  {
    slug: "windows-11-25h2-vorbereiten",
    title: "Windows 11 25H2: Rollout vorbereiten",
    date: "2025-09-28",
    tag: "Windows",
    excerpt: "Ringe, Pausen und wo Sie Live-Probleme einsehen können.",
    content: `
      <h2>Zusammenfassung</h2>
      <p>Windows 11 25H2 bringt erhebliche Verbesserungen, erfordert aber auch eine sorgfältige Rollout-Planung.</p>
      
      <h3>Wichtigste Neuerungen</h3>
      <ul>
        <li>Verbesserungen der Systemleistung</li>
        <li>Neue Sicherheitsfunktionen</li>
        <li>Optimierungen für Touch-Geräte</li>
        <li>Bessere Integration mit Microsoft 365</li>
      </ul>
      
      <h3>Rollout-Strategie mit Ringen</h3>
      <p>Wir empfehlen einen gestaffelten Rollout:</p>
      <ol>
        <li>Ring 1: Testgeräte (1-2 Wochen)</li>
        <li>Ring 2: Early Adopters (2-4 Wochen)</li>
        <li>Ring 3: Allgemeiner Rollout (4+ Wochen)</li>
      </ol>
      
      <h3>Monitoring von Problemen</h3>
      <p>Bleiben Sie informiert über das Windows Release Health Dashboard und unseren Monitoring-Service für KMU.</p>
    `
  },
  {
    slug: "ransomware-2025-wirksame-kontrollen",
    title: "Ransomware 2025: Wirksame Kontrollen",
    date: "2025-09-20",
    tag: "Cyber",
    excerpt: "MFA, Patches, EDR und getestete Backups. Ohne Hype.",
    content: `
      <h2>Zusammenfassung</h2>
      <p>Ransomware bleibt eine der größten Bedrohungen für Unternehmen. Hier sind die Kontrollen, die 2025 wirklich funktionieren.</p>
      
      <h3>Kontrolle 1: Multi-Faktor-Authentifizierung (MFA)</h3>
      <p>99% der Ransomware-Angriffe lassen sich mit MFA verhindern. Das ist kein Nice-to-have, sondern essentiell.</p>
      
      <h3>Kontrolle 2: Patch-Management</h3>
      <p>Halten Sie alle Systeme auf dem neuesten Stand. Angreifer nutzen bekannte Schwachstellen in ungepatchten Systemen aus.</p>
      
      <h3>Kontrolle 3: EDR (Endpoint Detection and Response)</h3>
      <p>EDR-Lösungen erkennen und reagieren auf Bedrohungen in Echtzeit. Verlassen Sie sich nicht nur auf traditionelle Antivirus-Software.</p>
      
      <h3>Kontrolle 4: 3-2-1-Backups</h3>
      <ul>
        <li>3 Kopien Ihrer Daten</li>
        <li>2 verschiedene Medientypen</li>
        <li>1 Kopie offsite</li>
      </ul>
      
      <h3>Kontrolle 5: Benutzerschulung</h3>
      <p>Das schwächste Glied ist oft der Mensch. Investieren Sie in regelmäßige Awareness-Schulungen.</p>
    `
  }
];
