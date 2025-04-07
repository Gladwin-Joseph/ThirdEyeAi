'use client';
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "@/components/theme-provider";

export default function Navbar() {
  const { theme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          {theme === 'dark' ? (
            <Image
              src="/download-cropped (2).svg"
              alt="ThirdEye AI Logo"
              width={120}
              height={40}
              priority
            />
          ) : (
            <Image
              src="/cobalt.svg"
              alt="ThirdEye AI Logo"
              width={100}
              height={40}
              priority
            />
          )}
        </Link>
        <nav className="flex flex-1 items-center justify-end space-x-6 text-sm font-medium">
          <Link href="#about" className="transition-colors hover:text-primary">
            About
          </Link>
          <Link href="#contact" className="transition-colors hover:text-primary">
            Contact
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}