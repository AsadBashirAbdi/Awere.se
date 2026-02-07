import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ThemeProvider } from "@/components/site/ThemeProvider";
import { Container } from "@/components/site/Container";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://awere.se"),
  title: "AWERE — We build systems, not just websites.",
  description:
    "AWERE designs and implements high-performance digital products for teams who value technical precision.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "AWERE — We build systems, not just websites.",
    description:
      "AWERE designs and implements high-performance digital products for teams who value technical precision.",
    url: "https://awere.se",
    siteName: "AWERE",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AWERE — We build systems, not just websites.",
    description:
      "AWERE designs and implements high-performance digital products for teams who value technical precision.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="studio">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased app-shell`}
      >
        <ThemeProvider>
          <Header />
          <main className="app-main">
            <Container>{children}</Container>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
