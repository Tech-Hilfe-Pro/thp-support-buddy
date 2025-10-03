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
    slug: "email-domain-schutz-spf-dkim-dmarc-kmu",
    title: "E-Mail-Domänenschutz für KMU: SPF, DKIM und DMARC in 60 Minuten",
    date: "2025-10-04",
    tag: "Cyber",
    excerpt: "Schützen Sie Ihre Absender-Domain vor Spoofing: SPF korrekt setzen, DKIM signieren und DMARC schrittweise von p=none zu p=quarantine/reject – mit Reporting.",
    content: `
<h2>Warum das wichtig ist</h2>
<p>SPF, DKIM und DMARC verhindern, dass Angreifer Ihre Domäne fälschen. So sinkt das Risiko von Phishing, Markenmissbrauch und Zustellproblemen.</p>

<h2>Was ist was?</h2>
<ul>
  <li><strong>SPF</strong>: Welche Server dürfen für Ihre Domäne senden.</li>
  <li><strong>DKIM</strong>: Kryptografische Signatur Ihrer E-Mails.</li>
  <li><strong>DMARC</strong>: Richtlinie und Reporting (Ausrichtung von SPF/DKIM mit dem From:-Header).</li>
</ul>

<h2>60-Minuten-Plan</h2>
<ol>
  <li>SPF-Record prüfen/setzen (<code>v=spf1 include:... -all</code>), keine Duplikate.</li>
  <li>DKIM aktivieren (Selector, 2048 Bit, Rotation planen).</li>
  <li>DMARC mit <code>p=none</code> starten und <code>rua=</code> Reporting einrichten.</li>
  <li>Berichte 2–4 Wochen auswerten, Inkonsistenzen beheben.</li>
  <li>Auf <code>p=quarantine</code> und später <code>p=reject</code> anheben.</li>
</ol>

<h2>Häufige Fehler</h2>
<ul>
  <li>Mehrere SPF-Records (ungültig). Stattdessen Eintrag konsolidieren.</li>
  <li>DKIM-Key zu kurz; fehlende Rotation.</li>
  <li>DMARC ohne Reporting – fliegen blind.</li>
</ul>

<h2>Quellen</h2>
<ul>
  <li><a href="https://www.bsi.bund.de/DE/Themen/Verbraucherinnen-und-Verbraucher/Informationen-und-Empfehlungen/Onlinekommunikation/E-Mail-Sicherheit/technischer-Hintergrund-E-Mail-Sicherheit/technischer-Hintergrund-E-Mail-Sicherheit_node.html" target="_blank" rel="noopener">BSI: Technischer Hintergrund E-Mail-Sicherheit</a></li>
  <li><a href="https://www.bsi.bund.de/SharedDocs/Downloads/EN/BSI/Publications/TechGuidelines/TR03182/BSI-TR-03182.pdf" target="_blank" rel="noopener">BSI TR-03182: E-Mail Authentication</a></li>
  <li><a href="https://dmarc.org/overview/" target="_blank" rel="noopener">DMARC.org: Overview</a></li>
  <li><a href="https://dmarc.org/resources/specification/" target="_blank" rel="noopener">DMARC: Spezifikationen</a></li>
</ul>

<p><strong>CTA:</strong> DMARC-Quick-Check + Einrichtungspaket anfragen.</p>
    `
  },
  {
    slug: "passkeys-fido2-webauthn-fuer-kmu",
    title: "Passkeys & FIDO2 für KMU: Phishing-resistente Anmeldung verständlich erklärt",
    date: "2025-10-04",
    tag: "Cyber",
    excerpt: "Warum Passkeys heute die benutzerfreundlichste, phishing-resistente MFA sind – und wie Sie sie in drei Schritten einführen.",
    content: `
<h2>Was sind Passkeys?</h2>
<p>Passkeys nutzen <strong>kryptografische Schlüsselpaare</strong> statt Passwörter. Der private Schlüssel bleibt beim Nutzer, der öffentliche liegt beim Dienst. Phishing-Angriffe durch Weitergabe von Codes werden damit erheblich erschwert.</p>

<h2>Best Practices für KMU</h2>
<ol>
  <li><strong>Pilot</strong> mit Admins und IT-affinen Nutzergruppen (Security Keys + Plattform-Passkeys).</li>
  <li><strong>Rollout</strong> auf kritische Anwendungen (VPN, E-Mail, Portale), SMS/Voice-OTP vermeiden.</li>
  <li><strong>Recovery</strong>: Backup-Keys, Wiederherstellungsprozess, Fallbacks mit Risikoabwägung.</li>
</ol>

<h2>Technische Referenzen</h2>
<ul>
  <li><a href="https://www.w3.org/TR/webauthn-3/" target="_blank" rel="noopener">W3C WebAuthn Level 3</a></li>
  <li><a href="https://csrc.nist.gov/pubs/sp/800/63/b/upd2/final" target="_blank" rel="noopener">NIST SP 800-63B (Authentifizierung)</a></li>
  <li><a href="https://www.cisa.gov/sites/default/files/publications/fact-sheet-implementing-phishing-resistant-mfa-508c.pdf" target="_blank" rel="noopener">CISA: Phishing-resistente MFA</a></li>
  <li><a href="https://www.enisa.europa.eu/sites/default/files/publications/Joint%20Publication%20-%20Enhanced%20Resilience_v.1.0-FINAL.pdf" target="_blank" rel="noopener">ENISA/CERT-EU: Resilienz – MFA ohne SMS/Voice</a></li>
</ul>

<p><strong>CTA:</strong> Passkey-Pilot starten (Admin & Führung), danach Rollout-Plan buchen.</p>
    `
  },
  {
    slug: "sicheres-heimnetz-remote-work",
    title: "Sicheres Heimnetz für Remote-Work: Router, WLAN und IoT in 30 Minuten",
    date: "2025-10-04",
    tag: "Cyber",
    excerpt: "WPA3 aktivieren, Gäste-WLAN trennen, Router aktuell halten und IoT isolieren. So wird das Heimnetz robust – ohne Fachchinesisch.",
    content: `
<h2>Die schnelle Checkliste</h2>
<ul>
  <li><strong>Router-Updates</strong> einschalten und regelmäßig einspielen.</li>
  <li><strong>Admin-Passwort</strong> lang & einzigartig; Fernzugriff nur bei Bedarf.</li>
  <li><strong>WPA3</strong> aktivieren, <strong>WPS</strong> deaktivieren.</li>
  <li><strong>Gäste-WLAN</strong> getrennt vom Arbeitsnetz, eigenes Passwort.</li>
  <li><strong>IoT trennen</strong>: Smart-Home ins Gäste- oder separates Netz.</li>
  <li><strong>VPN/HTTPS</strong> für Firmendienste, Phishing-Vorsicht.</li>
</ul>

<h2>Schritt-für-Schritt Hilfen</h2>
<ul>
  <li><a href="https://www.bsi.bund.de/SharedDocs/Downloads/DE/BSI/Publikationen/Broschueren/Wegweiser_Checklisten_Flyer/Wegweiser_kompakt_Router_einrichten.pdf" target="_blank" rel="noopener">BSI: Router & WLAN einrichten (Wegweiser)</a></li>
  <li><a href="https://www.bsi.bund.de/DE/Themen/Verbraucherinnen-und-Verbraucher/Informationen-und-Empfehlungen/Cyber-Sicherheitsempfehlungen/Router-WLAN-VPN/Schritt-fuer-Schritt-zum-Gaeste-WLAN/Schritt-fuer-Schritt-zum-Gaeste-WLAN_node.html" target="_blank" rel="noopener">BSI: Gäste-WLAN</a></li>
  <li><a href="/docs/Security_when_working_remotely_Train_the_trainer_guide.pdf" target="_blank" rel="noopener">ENISA: Sicher arbeiten von zuhause</a></li>
</ul>

<p><strong>CTA:</strong> Heimnetz-Check buchen (30 Min., remote) + Maßnahmenplan erhalten.</p>
    `
  },
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
