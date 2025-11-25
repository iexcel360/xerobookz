import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "XeroBookz Admin Portal",
  description: "Super admin portal for XeroBookz",
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "4096x4096", type: "image/png" },
      { url: "/favicon.png", sizes: "2048x2048", type: "image/png" },
      { url: "/favicon.png", sizes: "1024x1024", type: "image/png" },
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.png", sizes: "256x256", type: "image/png" },
      { url: "/favicon.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.png", sizes: "128x128", type: "image/png" },
      { url: "/favicon.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon.png", sizes: "4096x4096", type: "image/png" },
      { url: "/favicon.png", sizes: "2048x2048", type: "image/png" },
      { url: "/favicon.png", sizes: "1024x1024", type: "image/png" },
      { url: "/favicon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.png", sizes: "256x256", type: "image/png" },
      { url: "/favicon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="4096x4096" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="2048x2048" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="1024x1024" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="256x256" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="128x128" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="64x64" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="4096x4096" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="2048x2048" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="1024x1024" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="256x256" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.png" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
