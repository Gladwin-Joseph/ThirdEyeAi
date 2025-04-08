import "./globals.css";
import { Lexend } from "next/font/google";
import type React from "react";
import type { Metadata } from "next";
import MouseMoveEffect from "@/components/mouse-move-effect";
import { ThemeProvider } from "@/components/theme-provider";

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend"
});

export const metadata: Metadata = {
  title: "ThirdEyeAi",
  description: "ThirdEyeAi",
  generator: "gladwin"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${lexend.variable} antialiased scroll-smooth`}>
        <ThemeProvider>
          <div className="min-h-screen">
            {/* Darker fixed gradient layer */}
            <div className="fixed inset-0 -z-10 light-mode-gradient dark:hidden opacity-100" />
            
            {/* Semi-transparent content layer */}
            <div className="relative bg-white/80 dark:bg-background text-foreground">
              <MouseMoveEffect />
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}