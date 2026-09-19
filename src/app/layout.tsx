import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import { CartProvider } from "@/components/CartProvider";
import { CartDrawer } from "@/components/CartDrawer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { RouteScrollCleanup } from "@/components/RouteScrollCleanup";
import "./globals.css";

/* Display: Didone at full optical range — the hairlines only resolve at
   the very large sizes this design sets them at, so keep the 400/500 cut
   and let `font-optical-sizing` thin the strokes as the type scales up.
   Body: a neutral grotesque held small and quiet underneath it. */
const displaySerif = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-display-serif",
  display: "swap",
});

const bodySans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body-sans",
  display: "swap",
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
      className={`${displaySerif.variable} ${bodySans.variable}`}
    >
      <body className={`${bodySans.className} min-h-screen bg-paper antialiased`}>
        <CartProvider>
          <RouteScrollCleanup />
          {children}
          <CartDrawer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
