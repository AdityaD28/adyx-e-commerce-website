import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/cart/CartSidebar";
import SessionProviderWrapper from "@/components/providers/SessionProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "AdyX - Premium Fashion & Lifestyle",
  description: "Discover premium fashion and lifestyle products at AdyX. Shop the latest collections of clothing, accessories, and shoes for men and women.",
  keywords: "fashion, clothing, accessories, shoes, premium, lifestyle, men, women",
  authors: [{ name: "AdyX Team" }],
  creator: "AdyX",
  publisher: "AdyX",
  openGraph: {
    type: "website",
    title: "AdyX - Premium Fashion & Lifestyle",
    description: "Discover premium fashion and lifestyle products at AdyX.",
    siteName: "AdyX",
  },
  twitter: {
    card: "summary_large_image",
    title: "AdyX - Premium Fashion & Lifestyle",
    description: "Discover premium fashion and lifestyle products at AdyX.",
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <SessionProviderWrapper>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <CartSidebar />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
