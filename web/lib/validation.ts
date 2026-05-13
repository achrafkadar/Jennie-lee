import { z } from "zod";

const caPhoneRegex =
  /^(\+?1[\s.-]?)?\(?([0-9]{3})\)?[\s.-]?([0-9]{3})[\s.-]?([0-9]{4})$/;

export const leadFormSchema = z.object({
  prenom: z.string().min(1, "Le prénom est requis").max(80),
  nom: z.string().min(1, "Le nom est requis").max(80),
  telephone: z
    .string()
    .min(10, "Numéro invalide")
    .regex(caPhoneRegex, "Format téléphone canadien attendu"),
  email: z.string().email("Courriel invalide"),
  adresse: z.string().min(5, "L’adresse est requise").max(500),
  typePropriete: z.enum(
    ["maison_unifamiliale", "condo", "plex", "terrain", "autre"],
    { message: "Choisissez un type de propriété" }
  ),
  quandVendre: z.enum(
    ["0_3_mois", "3_6_mois", "6_12_mois", "plus_12_mois", "curieux"],
    { message: "Ce champ est requis" }
  ),
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
  utm_content: z.string().optional(),
  utm_term: z.string().optional(),
  referrer: z.string().optional(),
  page_url: z.string().optional(),
  gclid: z.string().optional(),
  fbclid: z.string().optional(),
});

export const leadPayloadSchema = leadFormSchema.extend({
  event_id: z.string().uuid(),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;
export type LeadPayloadValues = z.infer<typeof leadPayloadSchema>;
