"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { scrollToEstimationForm } from "@/lib/scroll";

const stats = [
  { label: "623+", sub: "courtiers dépassés en Outaouais (2023)" },
  { label: "100+", sub: "propriétés vendues" },
  { label: "7/7", sub: "disponibilité" },
  { label: "24h", sub: "délai de réponse garanti" },
];

export function AboutJennieLee() {
  return (
    <section className="border-y border-border bg-secondary py-14 md:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-5 md:gap-14 md:px-6">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-white shadow-sm md:col-span-2"
        >
          <Image
            src="/jennie-lee-hero.jpg"
            alt="Jennie Lee Desbiens-Laberge, courtière immobilière"
            fill
            className="object-cover object-top"
            sizes="(max-width:768px) 100vw, 320px"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="md:col-span-3"
        >
          <p className="inline-flex rounded-full bg-accent px-3 py-1 text-xs font-semibold text-primary md:text-sm">
            Votre courtière à Gatineau
          </p>
          <h2 className="mt-4 text-2xl font-bold tracking-tight text-primary md:text-4xl">
            Jennie Lee Desbiens, votre experte du marché de l’Outaouais
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-muted md:text-lg">
            <p>
              Reconnue parmi les courtières les plus performantes de la région,
              Jennie Lee s’appuie sur des données de marché à jour et une
              expérience concrète des quartiers de Gatineau, Aylmer, Hull et
              environs pour vous guider avec lucidité.
            </p>
            <p>
              Son approche repose sur l’écoute, la transparence et une
              disponibilité 7 jours sur 7 pour répondre à vos questions sans
              vous mettre la pression.
            </p>
            <p>
              Elle place ses clients au centre de chaque transaction et privilégie
              une négociation respectueuse, alignée sur vos objectifs réels.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-border bg-white p-4 text-center shadow-sm"
              >
                <p className="text-2xl font-extrabold text-primary md:text-3xl">
                  {s.label}
                </p>
                <p className="mt-1 text-xs text-muted md:text-sm">{s.sub}</p>
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="secondary"
            className="mt-8 border-primary text-primary hover:bg-secondary"
            onClick={scrollToEstimationForm}
          >
            Demander mon estimation →
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
