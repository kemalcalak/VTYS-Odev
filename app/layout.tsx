import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header1 } from "../components/ui/header";
import QueryProvider from "../components/providers/query-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "JWT projesi",
  description: "Ali Kemal - Enes - Emir",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <Header1/>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
