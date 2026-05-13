"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Est-ce que l’estimation est vraiment gratuite?",
    a: "Oui, 100% gratuit, sans aucune obligation. Jennie Lee prépare votre rapport personnalisé sans frais et sans engagement de votre part.",
  },
  {
    q: "Vais-je recevoir des appels de relance?",
    a: "Jennie Lee vous contactera UNE seule fois pour valider quelques détails et vous remettre votre rapport. Aucune pression, aucun harcèlement.",
  },
  {
    q: "Qu’est-ce qui rend cette estimation différente de Centris ou DuProprio?",
    a: "L’estimation est basée sur les ventes réelles récentes de votre secteur, analysées par une courtière qui connaît le marché de Gatineau. Pas un algorithme générique, mais une vraie analyse humaine.",
  },
  {
    q: "Je ne suis pas certain de vouloir vendre. Est-ce que je peux quand même demander?",
    a: "Absolument. Beaucoup de propriétaires demandent une estimation pour simplement connaître la valeur de leur propriété. Vous pouvez nous demander le rapport même si vous n’envisagez de vendre que dans 1 ou 2 ans.",
  },
  {
    q: "Mes informations sont-elles confidentielles?",
    a: "Oui. Vos données sont strictement confidentielles et ne seront jamais partagées ni vendues. Voir notre politique de confidentialité.",
  },
];

export function FAQ() {
  return (
    <section className="border-t border-border bg-secondary py-14 md:py-20">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <h2 className="text-center text-2xl font-bold tracking-tight text-primary md:text-4xl">
          Questions fréquentes
        </h2>
        <Accordion type="single" collapsible className="mt-10 w-full">
          {faqs.map((item, i) => (
            <AccordionItem key={item.q} value={`item-${i}`}>
              <AccordionTrigger className="text-left">
                {item.q}
              </AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
