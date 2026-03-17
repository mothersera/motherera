import type { Metadata } from "next";
import { Inter, Playfair_Display, Geist } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/providers/SessionProvider";
import { FirebaseProvider } from "@/components/providers/FirebaseProvider";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";
import Navbar from "../components/layout/Navbar";
import { CurrencyProvider } from "@/components/providers/CurrencyProvider";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "Mother Era | Guided Journey Through Motherhood",
  description: "Premium maternal & child health platform for Indian mothers.",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-stone-50 text-stone-900 antialiased`}>
        <SessionProvider>
          <FirebaseProvider>
            <CurrencyProvider>
              <CartProvider>
                <Navbar />
                <CartDrawer />
                <main className="min-h-screen">
                  {children}
                </main>
              </CartProvider>
            </CurrencyProvider>
          </FirebaseProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
