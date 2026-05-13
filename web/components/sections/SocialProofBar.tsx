"use client";

import { Award, Building2, CalendarCheck, Trophy } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  {
    icon: Trophy,
    text: "Plus de 100 transactions complétées",
  },
  {
    icon: Award,
    text: "Membre OACIQ",
  },
  {
    icon: Building2,
    text: "Top 41 / 623 courtiers en Outaouais (2023)",
  },
  {
    icon: CalendarCheck,
    text: "Disponible 7 jours sur 7",
  },
];

export function SocialProofBar() {
  return (
    <section className="border-b border-border bg-secondary py-8 md:py-10">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(({ icon: Icon, text }, i) => (
            <motion.div
              key={text}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              className="flex items-start gap-3"
            >
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden />
              <p className="text-sm font-semibold leading-snug text-primary md:text-base">
                {text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
