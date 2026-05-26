import type { Metadata } from "next";
import {  Libre_Baskerville, IBM_Plex_Mono,Poppins } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import StoreProvider from "@/components/providers/store-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/navbar";

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

export const metadata: Metadata = {
  title: "Atlascub — Premium Clothing",
  description: "Discover curated apparel at Atlascub. Premium quality, timeless design.",
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
              <div className="relative flex min-h-screen flex-col">
                <Navbar />
                <main className="flex-1 pt-16 md:pt-20">{children}</main>
              </div>
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </StoreProvider>
  );
}
