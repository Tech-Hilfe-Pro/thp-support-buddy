export const PRIVAT_ABOS = [
  { id:"S", name:"Senioren-S",  preis:9.90,  minuten:30,  rabattVorOrt:0.20, features:["30 Min Remote/Monat","20% Rabatt Vor-Ort","Quartals-Sicherheitscheck"]},
  { id:"M", name:"Senioren-M",  preis:16.90, minuten:45,  rabattVorOrt:0.20, features:["45 Min Remote/Monat","20% Rabatt Vor-Ort","WLAN-Check jährlich"]},
  { id:"L", name:"Senioren-L",  preis:24.90, minuten:60,  rabattVorOrt:0.20, features:["60 Min Remote/Monat","20% Rabatt Vor-Ort","AV gemanagt"]},
];

export const PRIVAT_ON_DEMAND = {
  erstdiagnose: { preis:39, dauerMin:30, text:"Erstdiagnose Remote (30 Min). Danach 15-Min-Blöcke." },
  folgeblock: { preis:9.90, blockMin:15 },
  vorOrtHinweis: "Vor-Ort ab 45 Min; Anfahrt je PLZ-Zone; Ohne ausgewiesene USt. gem. §19 UStG, falls zutreffend."
};

export const KMU_TIERS = [
  { id:"starter", name:"Starter", preisProGeraet:29, features:["Monitoring & Remote-Support","Patch-Management","Monatsbericht"]},
  { id:"grow",    name:"Grow",    preisProGeraet:49, features:["+ Hardening/Policies","Inventar & SW-Rollout","Reaktionszeit < 8h"]},
  { id:"pro",     name:"Pro",     preisProGeraet:79, features:["SLA 4h","1x Vor-Ort/Monat inkl.","Endpoint-Backup basic"]},
];