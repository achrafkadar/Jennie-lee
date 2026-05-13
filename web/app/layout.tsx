import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://flash-immobilier-estimation.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Estimation gratuite — Jennie Lee Desbiens | Courtière immobilière Gatineau",
    template: "%s | Flash Immobilier",
  },
  description:
    "Estimation gratuite de la valeur de votre propriété à Gatineau, Aylmer, Hull et environs. Réponse en 24h par Jennie Lee Desbiens, Flash Immobilier.",
  keywords: [
    "courtière immobilière Gatineau",
    "estimation gratuite",
    "Flash Immobilier",
    "Outaouais",
    "Aylmer",
    "Hull",
  ],
  openGraph: {
    type: "website",
    locale: "fr_CA",
    url: siteUrl,
    siteName: "Flash Immobilier — Jennie Lee Desbiens",
    title: "Estimation gratuite de votre propriété à Gatineau",
    description:
      "Analyse personnalisée basée sur les ventes récentes de votre secteur. Sans engagement.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Estimation gratuite — Gatineau",
    description:
      "Recevez votre analyse en 24h. Jennie Lee Desbiens, Flash Immobilier.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
};

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const ga4Id = process.env.NEXT_PUBLIC_GA4_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        {gtmId ? (
          <Script id="gtm-head" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        ) : null}
        {pixelId ? (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${pixelId}');
fbq('track','PageView');`}
          </Script>
        ) : null}
        {ga4Id ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config','${ga4Id}',{send_page_view:false});`}
            </Script>
          </>
        ) : null}
      </head>
      <body className="min-h-screen font-sans antialiased">
        {gtmId ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        ) : null}
        <AnalyticsProvider />
        {children}
      </body>
    </html>
  );
}
