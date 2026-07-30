import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import { business } from "./site-data";
import "./globals.css";

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
  keywords: [
    "roof repairs Brisbane",
    "roof leak repair Brisbane",
    "gutter cleaning Brisbane",
    "blocked gutters Brisbane",
    "emergency roof repairs Brisbane",
    "tile roof repairs Brisbane",
    "metal roof repairs Brisbane",
  ],
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
      "Real roof and gutter project evidence for Greater Brisbane homes.",
    images: [
      {
        url: business.logo,
        width: 512,
        height: 512,
        alt: "Mel One Maintenance roof repair logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mel One Roof Repairs Brisbane",
    description:
      "Real roof and gutter project evidence for Greater Brisbane homes.",
    images: [business.logo],
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
    "@type": "Organization",
    "@id": "#mel-one-property-maintenance",
    name: business.brandName,
    legalName: business.legalName,
    logo: business.logo,
    image: business.logo,
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
        <link
          rel="preload"
          href="/images/brisbane-roof-repair-hero.webp"
          as="image"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body className={`${inter.variable} ${oswald.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
