import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/navbar";
import { AnimatedBackground } from "@/components/animated-background";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Luff Blog",
  description: "Modern blog platform",

  openGraph: {
    title: "Luff Blog",
    description: "Modern blog platform",
    url: "https://luff-blog-one.vercel.app",
    siteName: "Luff Blog",
    images: [
      {
        url: "https://luff-blog-one.vercel.app/og-image.png", 
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Luff Blog",
    description: "Modern blog platform",
    images: ["https://luff-blog-one.vercel.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${outfit.variable} font-sans min-h-screen bg-background text-foreground antialiased`}
      >
        <Providers>
          <AnimatedBackground />
          <Navbar />
          <main className="relative z-10 pt-20">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
