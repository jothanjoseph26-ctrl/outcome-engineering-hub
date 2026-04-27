import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  metadataBase: new URL('https://outcomelabs.com'),
  title: {
    default: "Outcome Labs | Revenue Engineering for Growth Companies",
    template: "%s | Outcome Labs",
  },
  description: "We engineer revenue systems using SEO, conversion engineering, and automation. Build systems that generate qualified leads on autopilot.",
  keywords: ["revenue engineering", "SEO", "conversion optimization", "growth marketing", "marketing automation", "demand generation"],
  authors: [{ name: "Outcome Labs" }],
  creator: "Outcome Labs",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://outcomelabs.com",
    siteName: "Outcome Labs",
    title: "Outcome Labs | Revenue Engineering for Growth Companies",
    description: "We engineer revenue systems using SEO, conversion engineering, and automation.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Outcome Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Outcome Labs | Revenue Engineering",
    description: "We engineer revenue systems using SEO, conversion engineering, and automation.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}