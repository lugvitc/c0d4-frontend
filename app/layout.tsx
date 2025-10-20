import type { Metadata } from "next";
import { Jura, Kode_Mono, Orbitron } from "next/font/google";
import "./globals.css";

const kodeMono = Kode_Mono({
  variable: "--font-kode-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const jura = Jura({
  variable: "--font-jura",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Cyber-0-Day 4.0",
  description: "The LUGVITC Flagship CTF Event",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${kodeMono.variable} ${jura.variable} ${orbitron.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
