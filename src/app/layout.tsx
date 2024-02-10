import './global.css';

import type * as i from 'types';
import { Inter } from 'next/font/google';

import { cn } from 'utils';
import { RootLayout } from 'modules/layouts/RootLayout';

const inter = Inter({ subsets: ['latin'] });

const siteName = 'Realtime scrum voter';
const siteUrl = 'https://realtime-scrum-voter.nl';

export const metadata = {
  title: {
    default: `Home | ${siteName}`,
    template: `%s | ${siteName}`,
  },
  description: 'realtime-scrum-voter',
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: siteName,
    description: 'realtime-scrum-voter',
    url: siteUrl,
    siteName,
    images: [
      {
        url: `${siteUrl}/og.jpg`,
        width: 1920,
        height: 1080,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteName,
    card: 'summary_large_image',
  },
  manifest: '/images/favicon/site.webmanifest',
  icons: {
    icon: '/images/favicon/favicon-32x32.png',
    shortcut: '/images/favicon/favicon.ico',
    apple: '/images/favicon/apple-touch-icon.png',
    other: [
      {
        rel: 'mask-icon',
        url: '/images/favicon/safari-pinned-tab.svg',
      },
    ],
  },
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <html
      lang="en"
      className={cn('text-white bg-blackOff', inter.className)}
    >
      <head />
      <RootLayout>{children}</RootLayout>
    </html>
  );
};

type LayoutProps = {
  children: React.ReactNode;
};

export default Layout;
