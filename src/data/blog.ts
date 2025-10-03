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
    excerpt: "Was NIS2 fordert, wer betroffen ist und wie Sie mit einer 10-Punkte-Checkliste starten – mit verlinkten Primärquellen.",
    content: `
<h2>Worum geht's?</h2>
<p><strong>NIS2</strong> hebt den EU-Mindeststandard für Cybersicherheit in 18 Sektoren an. Die Richtlinie wurde bis <strong>17.10.2024</strong> in nationales Recht überführt. Ergebnis: klare Mindestmaßnahmen, Meldepflichten und Nachweise – auch für viele KMU als „wichtige" Einrichtungen.</p>
<p>Die <strong>Durchführungsverordnung (EU) 2024/2690</strong> präzisiert technische/methodische Anforderungen. ENISA liefert dazu <em>praxisnahe Evidence-Beispiele</em> und Mappings, damit Sie wissen, was Sie belegen müssen.</p>

<h2>Wer ist betroffen?</h2>
<p>Der Anwendungsbereich wurde deutlich erweitert (u. a. Größe-Schwellen, mehr Sektoren). Prüfen Sie früh, ob Sie unter „wesentlich" oder „wichtig" fallen und ob Ihre Dienstleister (Cloud, MSP/MSSP, Rechenzentrum) ebenfalls in Scope sind.</p>

<h2>Ihr 90-Tage-Plan (kurz & machbar)</h2>
<ol>
  <li><strong>Rolle & Meldeweg festlegen</strong> (Verantwortliche Person, Sicherheits-Mailbox).</li>
  <li><strong>Asset-Inventar & Abhängigkeiten</strong> (Systeme, Daten, Drittparteien).</li>
  <li><strong>Sicherheits- & Risikopolitik</strong> (10–12 Seiten, unterschrieben; Risikoregister).</li>
  <li><strong>Patching & Hardening</strong> (Prozess + Nachweise aus 2 Zyklen).</li>
  <li><strong>Backups nach 3-2-1</strong> inkl. dokumentiertem Restore-Test und RPO/RTO.</li>
  <li><strong>MFA & Least Privilege</strong> für kritische Zugänge; Ausnahmen begründen.</li>
  <li><strong>EDR/AV + Logs</strong> mit Basis-Aufbewahrung; 1 Übung dokumentieren.</li>
  <li><strong>Lieferkette</strong>: Mindest-Sicherheitsklauseln/SLA, Subprozessorenliste.</li>
  <li><strong>Incident Response</strong>: Handbuch + 30-Minuten-Trockenübung.</li>
  <li><strong>Bewusstsein</strong>: Kurzschulung, Anwesenheit protokollieren.</li>
</ol>

<h2>Weiterführende Quellen</h2>
<ul>
  <li><a href="https://digital-strategy.ec.europa.eu/en/policies/nis2-directive" target="_blank" rel="noopener">EU-Seite: NIS2 Überblick</a></li>
  <li><a href="https://eur-lex.europa.eu/eli/reg_impl/2024/2690/oj/eng" target="_blank" rel="noopener">EUR-Lex: Durchführungsverordnung (EU) 2024/2690</a></li>
  <li><a href="https://www.enisa.europa.eu/publications/nis2-technical-implementation-guidance" target="_blank" rel="noopener">ENISA: Technische Umsetzung & Evidence-Beispiele</a></li>
</ul>

<p><strong>Nächster Schritt:</strong> Quick-Check NIS2 (10 Min.) → PDF-Ergebnis + Termin.</p>
    `
  },
  {
    slug: "backups-321-ohne-drama",
    title: "Backups ohne Drama: Die 3-2-1-Regel verständlich erklärt",
    date: "2025-10-04",
    tag: "Backup",
    excerpt: "3 Kopien, 2 unterschiedliche Medien, 1 Kopie außer Haus. Plus: Restore-Tests, RPO/RTO und Varianten für KMU.",
    content: `
<h2>Die Faustregel in Klartext</h2>
<p><strong>3-2-1</strong> bedeutet: <strong>3</strong> Kopien Ihrer Daten (1 produktiv + 2 Backups), <strong>2</strong> Medien (z. B. NAS & Cloud) und <strong>1</strong> Kopie <strong>off-site</strong>. So überleben Daten Bedienfehler, Defekte und Ransomware.</p>

<h2>So setzen KMU das pragmatisch um</h2>
<ul>
  <li><strong>Variante A:</strong> Vor-Ort-NAS + Cloud-Backup (täglich), Aufbewahrung 30–90 Tage.</li>
  <li><strong>Variante B:</strong> Nur Cloud mit <em>unveränderlichem</em> „Vault" (Write-Once) für Ransomware-Schutz.</li>
  <li><strong>Planen statt hoffen:</strong> <strong>RPO/RTO</strong> festlegen (wie viel Datenverlust/Stillstand ist akzeptabel?) und <strong>monatlich Restore testen</strong>.</li>
</ul>

<h2>Checkliste für Nachweise</h2>
<ul>
  <li>Backup-Plan (Zeitplan, Aufbewahrung, Verantwortliche).</li>
  <li>Protokoll erfolgreicher Restore-Tests (Screenshots, Prüfsummen).</li>
  <li>Off-site-Nachweis und Trennung vom Produktivnetz.</li>
</ul>

<h2>Weiterführende Quellen</h2>
<ul>
  <li><a href="https://www.cisa.gov/back-business-data" target="_blank" rel="noopener">CISA: Back Up Business Data (3-2-1)</a></li>
  <li><a href="/docs/data_backup_options.pdf" target="_blank" rel="noopener">CISA PDF: Data Backup Options</a></li>
</ul>

<p><strong>Nächster Schritt:</strong> Blueprint „Backup für KMU" anfordern + Termin buchen.</p>
    `
  },
  {
    slug: "windows-11-25h2-was-it-wissen-sollte",
    title: "Windows 11 25H2: Was IT jetzt wissen sollte",
    date: "2025-10-04",
    tag: "Windows",
    excerpt: "Enablement-Update auf Basis 24H2: kleiner Rollout, neuer Support-Zyklus. Rings, Health-Hub & Rollback.",
    content: `
<h2>Status & Einordnung</h2>
<p><strong>Windows 11, Version 25H2</strong> wird als <em>Enablement-Update</em> verteilt: kleiner Download, gleicher Code-Zweig wie 24H2, aber <strong>neuer Support-Timer</strong>. Rollout in Wellen; bekannte Probleme stehen im <em>Release Health</em> Hub.</p>

<h2>Empfohlener Rollout-Plan</h2>
<ol>
  <li><strong>Ringe:</strong> Test → Pilot → Breiter Rollout (7–14 Tage Beobachtung je Stufe).</li>
  <li><strong>Release-Health prüfen</strong> und Safeguards respektieren, bevor breit ausgerollt wird.</li>
  <li><strong>Rollback-Pfad</strong> vorbereiten (Deinstallations-Fenster + Backup, Kommunikation an Nutzer).</li>
  <li><strong>Verifikation:</strong> nach jedem Ring Telemetrie/Helpdesk prüfen und bekannte Issues gegensteuern.</li>
</ol>

<h2>Weiterführende Quellen</h2>
<ul>
  <li><a href="https://learn.microsoft.com/en-us/windows/release-health/status-windows-11-25h2" target="_blank" rel="noopener">Microsoft: Windows 11 25H2 – Release Health</a></li>
  <li><a href="https://learn.microsoft.com/en-us/windows/whats-new/whats-new-windows-11-version-25h2" target="_blank" rel="noopener">Microsoft: What's new in 25H2 (IT Pros)</a></li>
  <li><a href="https://support.microsoft.com/en-us/topic/windows-11-version-25h2-update-history-99c7f493-df2a-4832-bd2d-6706baa0dec0" target="_blank" rel="noopener">Microsoft: 25H2 Update History</a></li>
</ul>

<p><strong>Nächster Schritt:</strong> Phasenplan 25H2 anfordern + Endpoint-Health-Check.</p>
    `
  }
];
