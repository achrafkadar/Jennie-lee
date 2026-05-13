"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroForm } from "@/components/sections/HeroForm";
import { scrollToEstimationForm } from "@/lib/scroll";

export function Hero() {
  return (
    <section className="border-b border-border bg-white py-10 md:py-16" id="hero">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-5 md:gap-12 md:px-6 lg:gap-16">
        <div className="md:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="space-y-6"
          >
            <p className="inline-flex rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-primary">
              Estimation gratuite — Réponse en 24h
            </p>
            <h1 className="text-balance text-3xl font-extrabold tracking-tight text-primary md:text-5xl lg:text-6xl">
              Combien vaut VRAIMENT votre maison à Gatineau en 2026?
            </h1>
            <p className="text-lg text-muted md:text-xl">
              Recevez une analyse personnalisée basée sur les ventes réelles des
              90 derniers jours dans votre secteur. Préparée par Jennie Lee
              Desbiens, courtière immobilière à Flash Immobilier.
            </p>
            <ul className="space-y-3">
              {[
                "100% gratuit, sans engagement",
                "Rapport personnalisé en 24h",
                "Confidentialité totale garantie",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-base text-primary">
                  <CheckCircle2
                    className="mt-0.5 h-5 w-5 shrink-0 text-success"
                    aria-hidden
                  />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className="pt-2 lg:hidden">
              <Button
                type="button"
                size="lg"
                className="w-full"
                onClick={scrollToEstimationForm}
              >
                Obtenir mon estimation
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="md:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08 }}
            className="space-y-4 lg:sticky lg:top-24"
          >
            <div className="relative mx-auto hidden aspect-[3/4] max-h-[220px] w-[160px] overflow-hidden rounded-2xl border border-border shadow-sm lg:block">
              <Image
                src="/jennie-lee-hero.jpg"
                alt="Jennie Lee Desbiens, courtière immobilière"
                fill
                className="object-cover object-top"
                sizes="160px"
                priority
              />
            </div>
            <HeroForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
