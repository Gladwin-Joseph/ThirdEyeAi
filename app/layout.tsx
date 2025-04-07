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
      <body
        className={`${lexend.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="min-h-screen bg-background text-foreground">
            <MouseMoveEffect />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}