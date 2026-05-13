import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary py-10 md:py-12">
      <div className="mx-auto max-w-6xl space-y-8 px-4 md:px-6">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <Image
              src="/logo-flash.svg"
              alt="Flash Immobilier"
              width={180}
              height={44}
              className="h-10 w-auto"
            />
            <p className="max-w-md text-sm leading-relaxed text-muted">
              <span className="font-semibold text-primary">
                Jennie Lee Desbiens-Laberge
              </span>
              , courtière immobilière résidentielle
            </p>
            <p className="text-sm text-muted">
              Numéro OACIQ : <span className="font-medium text-primary">[À COMPLÉTER]</span>
            </p>
            <p className="text-sm text-muted">
              Agence : Flash Immobilier — 35 Allée de Hambourg, suite 215,
              Gatineau (QC) J9J 4J6
            </p>
            <p className="text-sm">
              <a
                className="font-medium text-primary underline underline-offset-2"
                href="mailto:jennieleedesbiens@gmail.com"
              >
                jennieleedesbiens@gmail.com
              </a>
            </p>
          </div>
          <div className="flex flex-col gap-3 text-sm">
            <a
              className="text-primary underline underline-offset-2"
              href="#politique-confidentialite"
            >
              Politique de confidentialité
            </a>
            <a
              className="text-primary underline underline-offset-2"
              href="#mentions-legales"
            >
              Mentions légales
            </a>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-6 border-t border-border pt-8">
          <Image src="/oaciq-logo.svg" alt="OACIQ" width={100} height={36} />
          <Image src="/centris-logo.svg" alt="Centris" width={100} height={36} />
          <Image src="/mls-logo.svg" alt="MLS" width={100} height={36} />
          <Image
            src="/chambre-immobiliere-outaouais.svg"
            alt="Chambre immobilière de l’Outaouais"
            width={140}
            height={36}
          />
        </div>
        <p id="politique-confidentialite" className="sr-only">
          Politique de confidentialité — contenu à fournir par l’agence.
        </p>
        <p id="mentions-legales" className="sr-only">
          Mentions légales — contenu à fournir par l’agence.
        </p>
        <p className="text-center text-xs text-muted">
          © 2026 Flash Immobilier. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
