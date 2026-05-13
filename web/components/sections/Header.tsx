"use client";

import Image from "next/image";
import { Phone } from "lucide-react";
import { motion } from "framer-motion";

export function Header() {
  return (
    <motion.header
      initial={{ y: -8, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="sticky top-0 z-40 h-[60px] md:h-[70px] border-b border-border bg-white/80 backdrop-blur-md"
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 md:px-6">
        <div className="flex shrink-0 items-center" aria-hidden="false">
          <Image
            src="/logo-flash.svg"
            alt="Flash Immobilier"
            width={160}
            height={40}
            className="h-8 w-auto md:h-9"
            priority
          />
        </div>
        <a
          href="tel:+18733535386"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary md:text-base"
          aria-label="Appeler le 873-353-5386"
        >
          <Phone className="h-4 w-4 text-accent" aria-hidden />
          <span>873-353-5386</span>
        </a>
      </div>
    </motion.header>
  );
}
