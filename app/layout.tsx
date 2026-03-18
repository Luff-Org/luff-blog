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

// export const metadata: Metadata = {
//   metadataBase: new URL("https://luff-blog-one.vercel.app"),

//   title: "Luff Blog",
//   description: "Modern blog platform",

//   openGraph: {
//     title: "Luff Blog",
//     description: "Modern blog platform",
//     url: "https://luff-blog-one.vercel.app",
//     siteName: "Luff Blog",
//     images: [
//       {
//         url: "/og-image.png",
//         width: 1200,
//         height: 630,
//       },
//     ],
//     locale: "en_US",
//     type: "website",
//   },

//   twitter: {
//     card: "summary_large_image",
//     title: "Luff Blog",
//     description: "Modern blog platform",
//     images: ["/og-image.png"],
//   },
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <meta
          property="og:image"
          content="https://luff-blog-one.vercel.app/og-image.png"
        />
        <meta property="og:title" content="Luff Blog" />
        <meta property="og:description" content="Modern blog platform" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:image"
          content="https://luff-blog-one.vercel.app/og-image.png"
        />
      </head>
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
