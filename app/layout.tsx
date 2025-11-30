import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://oiweb.pages.dev"),
  title: "OiWeb Tools",
  description:
    "ビジネスで役立つ実用的なWebツールを無料でご利用いただけます。全角半角変換など、業務効率を向上させるツールを提供しています。",
  keywords: [
    "オンラインツール",
    "Webツール",
    "全角半角変換",
    "無料ツール",
    "ビジネスツール",
  ],
  authors: [{ name: "My Tools" }],
  creator: "My Tools",
  publisher: "My Tools",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://oiweb.pages.dev",
    siteName: "My Tools",
    title: "My Tools - ビジネスで役立つオンラインツール集",
    description:
      "ビジネスで役立つ実用的なWebツールを無料でご利用いただけます。全角半角変換など、業務効率を向上させるツールを提供しています。",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "My Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "My Tools - ビジネスで役立つオンラインツール集",
    description:
      "ビジネスで役立つ実用的なWebツールを無料でご利用いただけます。全角半角変換など、業務効率を向上させるツールを提供しています。",
    images: ["/og-image.png"],
    creator: "@mytools",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "8Rr1MCX7eO-FnAgd4AFwa4ET8CWf154QS60R-X_K_ho",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
