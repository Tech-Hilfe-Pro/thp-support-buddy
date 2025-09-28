type ICSParams = {
  title: string;
  description: string;
  startISO: string;
  durationMin: number;
  location: string;
};

export function buildICS({ title, description, startISO, durationMin, location }: ICSParams): string {
  const startDate = new Date(startISO);
  const endDate = new Date(startDate.getTime() + durationMin * 60 * 1000);
  
  const formatDateTime = (date: Date): string => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Tech Hilfe Pro//Termin//DE',
    'BEGIN:VEVENT',
    `DTSTART:${formatDateTime(startDate)}`,
    `DTEND:${formatDateTime(endDate)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    `UID:${Date.now()}@techhilfe-pro.de`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ];

  return lines.join('\r\n');
}

export function downloadICS(filename: string, icsString: string) {
  const blob = new Blob([icsString], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}