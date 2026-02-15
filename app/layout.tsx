import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tanzo Gifts — India's First Self-Design Customized Platform",
  description:
    "Design your own personalized gifts with Tanzo Gifts. We are launching India's first self-design customized gift platform. Create unique, one-of-a-kind gifts for your loved ones.",
  keywords: [
    "Tanzo Gifts",
    "custom gifts",
    "personalized gifts",
    "self design",
    "India",
    "gift platform",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0a0a0f" />
      </head>
      <body
        className={`${outfit.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
