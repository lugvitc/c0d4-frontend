import type { Metadata } from "next";
import { Kode_Mono } from "next/font/google";
import Navbar from "./components/navbar/Navbar";
import "./globals.css";

const kodeMono = Kode_Mono({
  variable: "--font-kode-mono",
  subsets: ["latin"],
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
        className={`${kodeMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
