import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import { WishlistProvider } from "@/components/WishlistProvider";
import { CartDrawer } from "@/components/CartDrawer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { RouteScrollCleanup } from "@/components/RouteScrollCleanup";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { INTRO_PRE_PAINT } from "@/lib/intro";
import "./globals.css";

/**
 * Two faces, two CSS variables. Everything downstream reads `--font-display`
 * or `--font-body` (declared in globals.css), so swapping a typeface means
 * editing this file and the two token lines there — nothing else.
 *
 * `adjustFontFallback` is left at its default (true) so Next generates a
 * metric-matched local fallback and the swap costs no layout shift.
 */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  // Instrument Serif ships a single weight. There is no bold to ask for.
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display-src",
  display: "swap",
  // The hero headline is the LCP text — this is the one face worth preloading.
  preload: true,
});

const inter = Inter({
  subsets: ["latin"],
  // No `weight` → the variable font, giving us the full 400–600 range.
  variable: "--font-body-src",
  display: "swap",
  // Body/UI type is not the LCP element; preloading it would compete with
  // the hero image and the display face for early bandwidth.
  preload: false,
});

export const metadata: Metadata = {
  title: "Kundan — Timeless Jewellery Crafted For Forever",
  description:
    "A premium jewellery boutique. Designed to celebrate moments, crafted to last generations.",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/icon.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      /* The pre-paint script below sets data-intro on this element. */
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${inter.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_PRE_PAINT }} />
      </head>
      <body className="min-h-screen bg-paper antialiased">
        <MotionProvider>
          <CartProvider>
          <WishlistProvider>
            <RouteScrollCleanup />
            {children}
            <CartDrawer />
            <WhatsAppButton />
          </WishlistProvider>
          </CartProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
