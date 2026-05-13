"use client";

import { ClipboardList, LineChart, Mail } from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const steps = [
  {
    icon: ClipboardList,
    title: "Remplissez le formulaire",
    body: "30 secondes. Quelques informations sur votre propriété et vos intentions.",
  },
  {
    icon: LineChart,
    title: "Jennie Lee analyse votre secteur",
    body: "Elle prépare un rapport basé sur les 3 dernières ventes comparables dans votre rue ou votre quartier.",
  },
  {
    icon: Mail,
    title: "Recevez votre rapport en 24h",
    body: "Par courriel, avec une explication claire. Aucun engagement, aucune pression.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-primary md:text-4xl">
            Comment obtenir votre estimation gratuite
          </h2>
          <p className="mt-3 text-lg text-muted md:text-xl">
            3 étapes simples, aucune pression
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, body }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <Card className="h-full border-border">
                <CardHeader>
                  <Icon className="h-8 w-8 text-accent" aria-hidden />
                  <CardTitle className="text-xl">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-muted">
                    {body}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
