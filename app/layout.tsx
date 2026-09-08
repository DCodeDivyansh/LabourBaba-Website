'use client";'
import type { Metadata } from "next";
import "./globals.css";
import FCMProvider from "@/components/FCMProvider";

export const metadata: Metadata = {
  title: "labourbaba - Find Trusted Workers and Skilled Professionals",
  description:
    "Find trusted workers, book skilled professionals, and hire local services quickly and easily.",

  keywords: [
    "Labour Baba",
    "LabourBaba",
    "Viraj Sarthi",
    "labour booking",
    "find workers",
    "hire workers",
    "local workers",
    "electrician",
    "plumber",
    "carpenter",
    "painter",
    "construction worker",
    "home services",
    "skilled labour",
    "daily wage workers",
    "worker marketplace",
    "service booking",
    "job platform",
    "India",
    "Next.js",
  ],

  authors: [{ name: "labourbaba" }],
  creator: "labourbaba",
  applicationName: "labourbaba",

  icons: {
    icon: "/logo.png",
    shortcut: "/favicon.ico",
  },

  openGraph: {
    title: "labourbaba - Find Trusted Workers and Skilled Professionals",
    description:
      "Book trusted workers and skilled professionals near you.",
    url: "https://labourbaba.in/",
    siteName: "labourbaba",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "labourbaba",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "labourbaba",
    description:
      "Book trusted workers and skilled professionals near you.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FCMProvider>
          <div className="mobile-container">
            {children}
          </div>
        </FCMProvider>
      </body>
    </html>
  );
}
