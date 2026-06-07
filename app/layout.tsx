import type { Metadata, Viewport } from "next";
import {  Libre_Baskerville, IBM_Plex_Mono,Poppins } from "next/font/google";
import "./globals.css";
import "../styles/theme-animation.css";
import { ClerkProvider } from "@clerk/nextjs";
import StoreProvider from "@/components/providers/store-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { CartSidebar } from "@/components/cart/cart-sidebar";
import { WishlistSidebar } from "@/components/wishlist/wishlist-sidebar";
import { AnnouncementBar } from "@/components/shared/announcement-bar";
import { WhatsappWidget } from "@/components/home/whats-app-widget";
import { Toaster } from "sonner";
import { TokenDebug } from "@/components/debug/token-debug";

const fontSans = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "700"]
});

const fontSerif = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--font-serif",
});

const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"]
});



// --- ADVANCED PWA VIEWPORT CONFIGURATION ---
export const viewport: Viewport = {
  themeColor: [
  { media: "(prefers-color-scheme: light)", color: "#faf7f5" },
  { media: "(prefers-color-scheme: dark)", color: "#1c1917" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // Allows accessibility zooming
  userScalable: true,
  };
  
  // --- GLOBAL SEO METADATA ---
  export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"), // Fixed to support local testing!
  manifest: "/manifest.webmanifest", // Explicitly link the dynamic manifest
  title: {
    default: "Atlascub | Premium Modern Clothing & Drapes",
    template: "%s | Atlascub",
  },
  description: "Discover curated apparel at Atlascub. Premium quality, timeless design, and modern Indian tailoring.",
  keywords: ["premium clothing", "Indian fashion", "linen shirts", "oversized tees", "Atlascub", "festive wear"],
  authors: [{ name: "Atlascub" }],
  creator: "Atlascub",
  publisher: "Atlascub",
  applicationName: "Atlascub Store",
  
  // OpenGraph (Facebook, LinkedIn, Discord previews)
  openGraph: {
  type: "website",
  locale: "en_IN",
  url: "https://www.atlascub.in",
  siteName: "Atlascub",
  title: "Atlascub | Premium Modern Clothing",
  description: "Discover curated apparel at Atlascub. Premium quality, timeless design, and modern tailoring.",
  images: [
  {
  url: "/og-image.png", // The default image shown on social media shares
  width: 1200,
  height: 630,
  alt: "Atlascub Premium Clothing",
  },
  ],
  },
  
  // Twitter Cards
  twitter: {
  card: "summary_large_image",
  title: "Atlascub | Premium Modern Clothing",
  description: "Discover curated apparel at Atlascub. Premium quality, timeless design.",
  creator: "@atlascub", // Your brand's twitter handle
  images: ["/og-image.png"],
  },
  
  // PWA & Apple specific tags
  appleWebApp: {
  capable: true,
  title: "Atlascub",
  statusBarStyle: "default",
  },
  formatDetection: {
  telephone: false, // Prevents iOS from auto-styling numbers
  },
  };


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <ClerkProvider>
        <html lang="en" className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`} suppressHydrationWarning>
          <body className="min-h-screen bg-background font-body antialiased">
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <SmoothCursor/>
              <div className="relative flex min-h-screen flex-col">
                <AnnouncementBar/>
                <Navbar />
                <main className="flex-1 pt-16 md:pt-20">{children}</main>
                <Footer/>

                <CartSidebar />
                <WishlistSidebar />
                <WhatsappWidget/>


                {/* temp */}
                <TokenDebug />
              </div>

              <Toaster position="bottom-right" richColors />
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </StoreProvider>
  );
}
