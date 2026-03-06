import type { Metadata } from "next";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'swiper/css';
import 'swiper/css/pagination';
import '@/assets/scss/style.scss'

import { Poppins, Noto_Sans_Arabic } from 'next/font/google';
import { I18nProvider } from '@/i18n';
import WhatsAppFloat from '@/components/WhatsAppFloat';

const poppins = Poppins({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

const notoSansArabic = Noto_Sans_Arabic({
  weight: ['400', '500', '600'],
  subsets: ['arabic'],
  variable: '--font-noto-arabic',
});

export const metadata: Metadata = {
  title: "traseallo — Deliver Without Limits",
  description: "Full-scale delivery operations platform connecting merchants, dispatchers, drivers, recipients, and finance into one unified workflow.",
  icons: {
    icon: [
      { url: '/favicon_traseallo/favicon.ico', sizes: 'any' },
      { url: '/favicon_traseallo/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon_traseallo/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: '/favicon_traseallo/apple-touch-icon.png',
  },
  manifest: '/favicon_traseallo/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className={`${poppins.variable} ${notoSansArabic.variable} ${poppins.className}`} suppressHydrationWarning>
        <I18nProvider>
          {children}
          <WhatsAppFloat />
        </I18nProvider>
      </body>
    </html>
  );
}
