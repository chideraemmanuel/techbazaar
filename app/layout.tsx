import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Providers from '@/providers';

const geistSans = localFont({
  src: '../assets/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../assets/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});
const sfProDisplay = localFont({
  src: [
    {
      path: '../assets/fonts/sf-pro-display/SFProDisplay-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../assets/fonts/sf-pro-display/SFProDisplay-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../assets/fonts/sf-pro-display/SFProDisplay-Semibold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../assets/fonts/sf-pro-display/SFProDisplay-Bold.woff',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-SFProDisplay',
});

export const metadata: Metadata = {
  title: {
    default: 'Shop the Best Gadgets Online | TechBazaar',
    template: '%s | TechBazaar',
  },
  description:
    'Discover the latest gadgets at unbeatable prices. From smartphones, to laptops, to tablets, to gaming consoles and more! Shop for all your tech needs in one place.',
  keywords: [
    'Gadgets online store',
    'Buy gadgets online',
    'Latest gadgets for sale',
    'Affordable tech gadgets',
    'Online gadget shopping',
    'Smart devices',
    'Tech essentials',
    'Best gadget deals',
    'Electronics and gadgets',
  ],
  twitter: {
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sfProDisplay.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
