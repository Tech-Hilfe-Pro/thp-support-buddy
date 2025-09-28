export const COMPANY = {
  owner: "Jose C. Martin Lache",
  brand: "Tech Hilfe Pro",
  street: "Schirmerstr. 7",
  postalCode: "50823",
  city: "Köln",
  email: "info@techhilfepro.de",
  telE164: "+4915565029989",
  telDisplay: "+49 1556 5029989",
  whatsappUrl: "https://wa.me/4915565029989",
  ustId: undefined as string | undefined // Falls später vorhanden: z. B. "DE123456789"
};

export const ADDRESS_LINE = `${COMPANY.street}, ${COMPANY.postalCode} ${COMPANY.city}`;