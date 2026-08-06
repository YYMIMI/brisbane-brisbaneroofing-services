import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import { business, serviceRegions } from "./site-data";
import "./globals.css";
import GoogleAnalytics from "./google-analytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  title: {
    default: "Roof Repairs Brisbane | Mel One",
    template: "%s | Mel One",
  },
  description:
    "Mel One Maintenance roof repair and gutter cleaning enquiries across Greater Brisbane for leaks, blocked gutters, tile and metal roofs, inspections and storm damage.",
  applicationName: "Mel One Roof Repairs Brisbane",
  category: "Roof repair services",
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96.png", sizes: "96x96", type: "image/png" },
      {
        url: "/brand/mel-one-roof-logo-192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
    shortcut: "/favicon-48.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: business.siteUrl,
    locale: "en_AU",
    siteName: "Mel One Roof Repairs Brisbane",
    title: "Mel One Roof Repairs Brisbane",
    description:
      "Real roof and gutter project photos for Greater Brisbane homes.",
    images: [
      {
        url: "/images/brisbane-roof-repair-hero.webp",
        width: 1536,
        height: 960,
        alt: "Completed Brisbane tile roof restoration project",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mel One Roof Repairs Brisbane",
    description:
      "Real roof and gutter project photos for Greater Brisbane homes.",
    images: ["/images/brisbane-roof-repair-hero.webp"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071a2b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "HomeAndConstructionBusiness"],
    "@id": `${business.siteUrl}/#organization`,
    name: business.entityName,
    alternateName: [business.brandName, business.siteName],
    legalName: business.legalName,
    url: business.siteUrl,
    sameAs: [business.googleMapsUrl],
    hasMap: business.googleMapsUrl,
    logo: `${business.siteUrl}${business.logo}`,
    image: `${business.siteUrl}${business.logo}`,
    telephone: business.phone,
    email: business.email,
    taxID: business.abn,
    identifier: [
      {
        "@type": "PropertyValue",
        propertyID: "ABN",
        value: business.abn,
      },
      {
        "@type": "PropertyValue",
        propertyID: "ACN",
        value: business.acn,
      },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      postalCode: business.address.postcode,
      addressCountry: business.address.country,
    },
    areaServed: [
      {
        "@type": "Place",
        name: business.serviceAreaFocus,
        hasMap: business.googleMapsUrl,
      },
      {
        "@type": "AdministrativeArea",
        name: business.serviceArea,
      },
      ...serviceRegions.map((region) => ({
        "@type": "AdministrativeArea",
        name: region.name,
      })),
    ],
    contactPoint: {
      "@type": "ContactPoint",
      name: business.contactName,
      telephone: business.phone,
      email: business.email,
      contactType: "customer service",
      areaServed: "AU-QLD",
      availableLanguage: "English",
    },
  };

  return (
    <html lang="en-AU">
      <head>
        <meta name="codex-preview" content="development" />
      </head>
      <body className={`${inter.variable} ${oswald.variable}`}>
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
