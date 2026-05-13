"use client";

import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoadScript } from "@react-google-maps/api";
import { Loader2 } from "lucide-react";
import { leadFormSchema, type LeadFormValues } from "@/lib/validation";
import { trackLead } from "@/lib/tracking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AddressAutocomplete } from "@/components/AddressAutocomplete";

const libraries: ("places")[] = ["places"];

function LeadFormFields({
  mapsReady,
}: {
  mapsReady: boolean;
}) {
  const [thanksOpen, setThanksOpen] = useState(false);
  const [firstNameThanks, setFirstNameThanks] = useState("");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      prenom: "",
      nom: "",
      telephone: "",
      email: "",
      adresse: "",
      typePropriete: undefined as unknown as LeadFormValues["typePropriete"],
      quandVendre: undefined as unknown as LeadFormValues["quandVendre"],
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_content: "",
      utm_term: "",
      referrer: "",
      page_url: "",
      gclid: "",
      fbclid: "",
    },
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const p = new URLSearchParams(window.location.search);
    const keys = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "gclid",
      "fbclid",
    ] as const;
    keys.forEach((k) => {
      const v = p.get(k);
      if (v) setValue(k, v);
    });
    setValue("referrer", document.referrer || "");
    setValue("page_url", window.location.href);
  }, [setValue]);

  const onSubmit = async (data: LeadFormValues) => {
    setSubmitError(null);
    const event_id = crypto.randomUUID();
    trackLead({
      event_id,
      email: data.email,
      phone: data.telephone,
      first_name: data.prenom,
      last_name: data.nom,
    });
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, event_id }),
    });
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setSubmitError(
        typeof j.error === "string" ? j.error : "Une erreur est survenue."
      );
      return;
    }
    setFirstNameThanks(data.prenom);
    setThanksOpen(true);
  };

  return (
    <>
      <Card
        id="estimation-form"
        className="border-border shadow-md"
        aria-labelledby="form-title"
      >
        <CardHeader className="space-y-1 pb-4">
          <CardTitle id="form-title" className="text-xl md:text-2xl">
            Demandez votre estimation gratuite
          </CardTitle>
          <CardDescription className="text-base">
            Réponse personnalisée en 24h
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <input type="hidden" {...register("utm_source")} />
            <input type="hidden" {...register("utm_medium")} />
            <input type="hidden" {...register("utm_campaign")} />
            <input type="hidden" {...register("utm_content")} />
            <input type="hidden" {...register("utm_term")} />
            <input type="hidden" {...register("referrer")} />
            <input type="hidden" {...register("page_url")} />
            <input type="hidden" {...register("gclid")} />
            <input type="hidden" {...register("fbclid")} />

            <div className="space-y-2">
              <Label htmlFor="prenom">Prénom *</Label>
              <Input id="prenom" {...register("prenom")} aria-invalid={!!errors.prenom} />
              {errors.prenom && (
                <p className="text-sm text-destructive" role="alert">
                  {errors.prenom.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nom">Nom *</Label>
              <Input id="nom" {...register("nom")} aria-invalid={!!errors.nom} />
              {errors.nom && (
                <p className="text-sm text-destructive" role="alert">
                  {errors.nom.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="telephone">Téléphone *</Label>
              <Input
                id="telephone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                {...register("telephone")}
                aria-invalid={!!errors.telephone}
              />
              {errors.telephone && (
                <p className="text-sm text-destructive" role="alert">
                  {errors.telephone.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Courriel *</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="text-sm text-destructive" role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="adresse">Adresse de la propriété *</Label>
              <Controller
                name="adresse"
                control={control}
                render={({ field }) =>
                  mapsReady ? (
                    <AddressAutocomplete
                      id="adresse"
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isSubmitting}
                      aria-invalid={!!errors.adresse}
                    />
                  ) : (
                    <Input
                      id="adresse"
                      autoComplete="street-address"
                      {...field}
                      disabled={isSubmitting}
                      aria-invalid={!!errors.adresse}
                    />
                  )
                }
              />
              {errors.adresse && (
                <p className="text-sm text-destructive" role="alert">
                  {errors.adresse.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="typePropriete">Type de propriété *</Label>
              <Controller
                name="typePropriete"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ? field.value : undefined}
                  >
                    <SelectTrigger id="typePropriete" aria-invalid={!!errors.typePropriete}>
                      <SelectValue placeholder="Choisir…" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maison_unifamiliale">
                        Maison unifamiliale
                      </SelectItem>
                      <SelectItem value="condo">Condo</SelectItem>
                      <SelectItem value="plex">Plex</SelectItem>
                      <SelectItem value="terrain">Terrain</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.typePropriete && (
                <p className="text-sm text-destructive" role="alert">
                  {errors.typePropriete.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="quandVendre">Quand envisagez-vous de vendre? *</Label>
              <Controller
                name="quandVendre"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ? field.value : undefined}
                  >
                    <SelectTrigger id="quandVendre" aria-invalid={!!errors.quandVendre}>
                      <SelectValue placeholder="Choisir…" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0_3_mois">
                        Dans les 3 prochains mois
                      </SelectItem>
                      <SelectItem value="3_6_mois">3 à 6 mois</SelectItem>
                      <SelectItem value="6_12_mois">6 à 12 mois</SelectItem>
                      <SelectItem value="plus_12_mois">Plus de 12 mois</SelectItem>
                      <SelectItem value="curieux">Juste curieux</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.quandVendre && (
                <p className="text-sm text-destructive" role="alert">
                  {errors.quandVendre.message}
                </p>
              )}
            </div>

            {submitError && (
              <p className="text-sm text-destructive" role="alert">
                {submitError}
              </p>
            )}

            <Button
              type="submit"
              size="lg"
              className="h-14 w-full text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" aria-hidden />
                  Envoi en cours…
                </>
              ) : (
                "Recevoir mon estimation gratuite"
              )}
            </Button>
            <p className="text-xs text-muted leading-relaxed">
              En soumettant ce formulaire, vous acceptez d’être contacté par
              Jennie Lee. Vos informations sont confidentielles et ne seront
              jamais partagées.
            </p>
          </form>
        </CardContent>
      </Card>

      {thanksOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="thanks-title"
        >
          <div className="max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 id="thanks-title" className="text-xl font-bold text-primary">
              Merci {firstNameThanks}!
            </h2>
            <p className="mt-3 text-muted leading-relaxed">
              Jennie Lee a bien reçu votre demande. Vous recevrez votre estimation
              dans les 24h. Pour les demandes urgentes, appelez directement le{" "}
              <a className="font-semibold text-primary underline" href="tel:+18733535386">
                873-353-5386
              </a>
              .
            </p>
            <Button className="mt-6 w-full" onClick={() => setThanksOpen(false)}>
              Fermer
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export function HeroForm() {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    return <LeadFormFields mapsReady={false} />;
  }

  return <HeroFormWithMaps apiKey={apiKey} />;
}

function HeroFormWithMaps({ apiKey }: { apiKey: string }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });

  if (loadError) {
    return <LeadFormFields mapsReady={false} />;
  }

  if (!isLoaded) {
    return <FormSkeleton />;
  }

  return <LeadFormFields mapsReady />;
}

function FormSkeleton() {
  return (
    <Card className="animate-pulse border-border">
      <CardHeader>
        <div className="h-6 w-2/3 rounded bg-secondary" />
        <div className="h-4 w-1/2 rounded bg-secondary" />
      </CardHeader>
      <CardContent className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-11 w-full rounded-lg bg-secondary" />
        ))}
      </CardContent>
    </Card>
  );
}
