import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "World Countries App",
  description: "Get quick info about countries around the globe!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen container mx-auto`}
      >
        <header className="flex flex-row content-between p-4 ">
          <Link href={"/"} className="text-4xl font-bold">
            Countries App
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}
