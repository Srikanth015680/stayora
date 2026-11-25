
import type { Metadata } from "next";
import { Suspense } from "react";
import { Playfair_Display, DM_Sans } from "next/font/google";

import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stayora",
  description: "Find your perfect stay with Stayora.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense
            fallback={
              <header className="sticky top-0 z-40 border-b border-ink-200/80 bg-surface/95">
                <nav className="mx-auto flex max-w-7xl items-center px-4 py-4">
                  <span className="text-lg font-bold text-brand-500">
                    Stayora
                  </span>
                </nav>
              </header>
            }
          >
            <Navbar />
          </Suspense>

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
