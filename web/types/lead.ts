export type PropertyType =
  | "maison_unifamiliale"
  | "condo"
  | "plex"
  | "terrain"
  | "autre";

export type SellTimeline =
  | "0_3_mois"
  | "3_6_mois"
  | "6_12_mois"
  | "plus_12_mois"
  | "curieux";

export interface LeadPayload {
  prenom: string;
  nom: string;
  telephone: string;
  email: string;
  adresse: string;
  typePropriete: PropertyType;
  quandVendre: SellTimeline;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  page_url?: string;
  gclid?: string;
  fbclid?: string;
  event_id: string;
}
