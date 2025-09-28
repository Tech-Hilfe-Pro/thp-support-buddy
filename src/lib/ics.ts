function crlf(lines: string[]) { return lines.join("\r\n") + "\r\n"; }
function pad(n: number) { return n.toString().padStart(2, "0"); }
function toUTC(dt: Date) {
  return `${dt.getUTCFullYear()}${pad(dt.getUTCMonth()+1)}${pad(dt.getUTCDate())}T${pad(dt.getUTCHours())}${pad(dt.getUTCMinutes())}${pad(dt.getUTCSeconds())}Z`;
}
function uid() { return (crypto && "randomUUID" in crypto ? crypto.randomUUID() : Math.random().toString(36).slice(2)) + "@techhilfepro"; }

export function buildICS(opts: { title: string; description?: string; startISO: string; durationMin: number; location?: string; }): string {
  const start = new Date(opts.startISO);
  const dtStart = toUTC(start);
  const dtEnd = toUTC(new Date(start.getTime() + opts.durationMin * 60000));
  const now = toUTC(new Date());
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Tech Hilfe Pro//DE",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid()}`,
    `DTSTAMP:${now}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${opts.title || "Tech Hilfe Pro – Termin"}`,
    `DESCRIPTION:${(opts.description || "").replace(/\r?\n/g, "\\n")}`,
    `LOCATION:${(opts.location || "").replace(/\r?\n/g, " ")}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ];
  return crlf(lines);
}

export function downloadICS(filename: string, ics: string) {
  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename.endsWith(".ics") ? filename : `${filename}.ics`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}