import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from "@vercel/speed-insights/next"
import Navbar from "@/components/common/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google"
import { Indie_Flower } from "next/font/google"

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

const inter = Inter({ subsets: ["latin"] })
const indieFlower = Indie_Flower({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-indie-flower',
})

export const metadata: Metadata = {
  title: "Sreejith Sreejayan - Portfolio",
  description: "Portfolio of Sreejith Sreejayan, a passionate developer and designer.",
  authors: [{ name: "Sreejith Sreejayan" }],
  keywords: ["portfolio", "developer", "designer", "sreejith", "sreejayan"],
  openGraph: {
    title: "Sreejith Sreejayan - Portfolio",
    description: "Portfolio of Sreejith Sreejayan, a passionate developer and designer.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Sreejith Sreejayan",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/profile-pic.jpg`,
        width: 400,
        height: 400,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sreejith Sreejayan - Portfolio",
    description: "Portfolio of Sreejith Sreejayan, a passionate developer and designer.",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/images/profile-pic.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.className} ${indieFlower.variable} antialiased transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
