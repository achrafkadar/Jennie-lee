"use client";

import Link from "next/link";

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
import { MouseSpotlight } from "@/components/ui/mouse-spotlight";
import { Button } from "@/components/ui/button";

const DEFAULT_SCENE =
  "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

export type SplineSceneBasicProps = {
  /** URL `.splinecode` exportée depuis Spline */
  sceneUrl?: string;
  title?: string;
  description?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export function SplineSceneBasic({
  sceneUrl = DEFAULT_SCENE,
  title = "Une expérience à votre image",
  description = "Visualisez votre projet immobilier dans un espace interactif. Une approche moderne pour vous accompagner à Gatineau et en Outaouais.",
  ctaHref = "/#estimation-form",
  ctaLabel = "Recevoir mon estimation",
}: SplineSceneBasicProps) {
  return (
    <Card className="relative h-[min(85vh,720px)] w-full max-w-6xl overflow-hidden border-border/60 bg-primary/[0.96] text-white shadow-xl">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
      <MouseSpotlight className="mix-blend-soft-light" size={280} />

      <div className="relative z-10 flex min-h-[480px] flex-col md:h-full md:flex-row">
        <div className="relative z-10 flex flex-1 flex-col justify-center p-6 md:p-8 lg:p-10">
          <h1 className="bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-neutral-300 md:text-base">
            {description}
          </p>
          {ctaHref ? (
            <Button
              asChild
              className="mt-8 w-fit bg-accent text-primary hover:bg-accent/90"
            >
              <Link href={ctaHref}>{ctaLabel}</Link>
            </Button>
          ) : null}
        </div>

        <div className="relative min-h-[280px] flex-1 md:min-h-0">
          <SplineScene scene={sceneUrl} className="h-full w-full" />
        </div>
      </div>
    </Card>
  );
}
