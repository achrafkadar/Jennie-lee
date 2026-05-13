"use client";

import { Button } from "@/components/ui/button";
import { scrollToEstimationForm } from "@/lib/scroll";
import { motion } from "framer-motion";

export function FinalCTA() {
  return (
    <section className="bg-primary py-14 text-white md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-3xl px-4 text-center md:px-6"
      >
        <h2 className="text-2xl font-bold tracking-tight md:text-4xl">
          Prêt à connaître la valeur de votre propriété?
        </h2>
        <p className="mt-4 text-lg text-white/90 md:text-xl">
          Recevez votre estimation gratuite en 24h. Aucun engagement.
        </p>
        <Button
          type="button"
          size="lg"
          variant="secondary"
          className="mt-8 h-14 border-0 bg-white px-8 text-base text-primary hover:bg-white/90"
          onClick={scrollToEstimationForm}
        >
          Demander mon estimation gratuite
        </Button>
        <p className="mt-6 text-sm text-white/80">
          Ou appelez directement Jennie Lee:{" "}
          <a className="font-semibold underline" href="tel:+18733535386">
            873-353-5386
          </a>
        </p>
      </motion.div>
    </section>
  );
}
