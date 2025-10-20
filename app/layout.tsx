import type { Metadata } from "next";
import { Kode_Mono } from "next/font/google";
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
      <body className={`${kodeMono.variable} antialiased`}>
        <video
          className="fixed -z-10 h-full w-full object-cover blur-sm"
          autoPlay
          loop
          muted
        >
          <source src="/background.mp4" type="video/mp4" />
        </video>
        {children}
      </body>
    </html>
  );
}
