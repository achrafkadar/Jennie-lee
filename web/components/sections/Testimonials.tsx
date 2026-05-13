"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

const testimonials = [
  {
    quote:
      "Jennie Lee a été claire du début à la fin. Nous avons eu une estimation réaliste et vendu dans les délais annoncés. Je recommande sans hésiter.",
    name: "Gilles",
    city: "Gatineau",
  },
  {
    quote:
      "Réactive, professionnelle et humaine. Elle a pris le temps d’expliquer le marché et nous a aidés à prendre une décision en confiance.",
    name: "Émilie",
    city: "Aylmer",
  },
  {
    quote:
      "Excellente communication et suivi 7/7. L’estimation correspondait à ce que nous avons finalement obtenu. Service impeccable.",
    name: "Véronique",
    city: "Hull",
  },
];

export function Testimonials() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <h2 className="text-center text-2xl font-bold tracking-tight text-primary md:text-4xl">
          Ce que disent ses clients
        </h2>
        <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              className="min-w-[85vw] shrink-0 snap-center md:min-w-0"
            >
              <Card className="h-full border-border">
                <CardContent className="pt-6">
                  <div className="flex gap-0.5" aria-label="5 sur 5 étoiles">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className="h-4 w-4 fill-accent text-accent"
                        aria-hidden
                      />
                    ))}
                  </div>
                  <CardDescription className="mt-4 line-clamp-4 text-base leading-relaxed text-primary">
                    “{t.quote}”
                  </CardDescription>
                  <p className="mt-4 text-sm font-semibold text-primary">
                    {t.name}, {t.city}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
