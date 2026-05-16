import type { Metadata } from "next";
import dynamic from "next/dynamic";

import { Header } from "@/components/sections/Header";
import { Footer } from "@/components/sections/Footer";

const SplineSceneBasic = dynamic(
  () =>
    import("@/components/ui/spline-scene-basic").then((mod) => mod.SplineSceneBasic),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex h-[min(85vh,720px)] w-full max-w-6xl items-center justify-center rounded-xl border border-border/60 bg-primary/[0.96] text-neutral-300"
        aria-busy="true"
        aria-label="Chargement de la scène 3D"
      >
        <span className="loader" />
      </div>
    ),
  }
);

export const metadata: Metadata = {
  title: "Expérience interactive",
  description:
    "Découvrez une présentation immersive. Estimation gratuite — Jennie Lee Desbiens, Gatineau.",
};

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-secondary">
      <Header />
      <section className="mx-auto flex max-w-7xl flex-col items-center px-4 py-10 md:py-16">
        <SplineSceneBasic />
      </section>
      <Footer />
    </main>
  );
}
