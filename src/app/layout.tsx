import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Fraunces } from 'next/font/google'
import {Special_Elite, Martel} from 'next/font/google'
import { SiteHeader } from '@/components/SiteHeader'

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap' })

const specialElite = Special_Elite({ 
  subsets: ['latin'], 
  variable: '--font-special-elite', 
  weight: '400',
  display: 'swap' 
})

const martel = Martel({ 
  subsets: ['latin'], 
  variable: '--font-martel', 
  weight: ['400', '600', '700', '800'],
  display: 'swap' 
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: 'National Parks', template: '%s | National Parks' },
  description: 'Explore America’s protected landscapes.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${specialElite.variable} `}>
      <body>
              <SiteHeader />
        {children}</body>
    </html>
  );
}
