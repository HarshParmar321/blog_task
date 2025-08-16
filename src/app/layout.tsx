import React from 'react';
import '../styles/index.css';
import Script from 'next/script';
import Header from '../components/common/Header';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: 'Suvit Blog',
  description: 'A boilerplate project with Next.js and Tailwind CSS',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>
          {children}
        </main>
        <Script type="module" src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fharshasa8323back.builtwithrocket.new&_be=https%3A%2F%2Fapplication.rocket.new&_v=0.1.6" strategy="lazyOnload" />
      </body>
    </html>
  );
}
