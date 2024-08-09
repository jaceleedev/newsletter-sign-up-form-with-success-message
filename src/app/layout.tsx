import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  style: 'normal',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Frontend Mentor | Newsletter signup form with success message',
  description:
    'A responsive newsletter signup form with success message built for a Frontend Mentor challenge.',
  generator: 'Next.js',
  applicationName: 'Newsletter signup form with success message',
  referrer: 'origin-when-cross-origin',
  keywords: [
    'Frontend Mentor Challenge',
    'Newsletter signup form with success message',
    'Next.js',
    'Tailwind CSS',
    'Typescript',
    'Storybook',
    'Vitest',
  ],
  authors: [
    {
      name: 'jaceleedev',
      url: 'https://github.com/jaceleedev/newsletter-sign-up-form-with-success-message.git',
    },
  ],
  creator: 'jaceleedev',
  publisher: 'jaceleedev',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    'https://newsletter-sign-up-form-with-success-message-three-amber.vercel.app'
  ),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Frontend Mentor | Newsletter signup form with success message',
    description:
      'A responsive newsletter signup form with success message built for a Frontend Mentor challenge.',
    url: 'https://newsletter-sign-up-form-with-success-message-three-amber.vercel.app',
    siteName: 'Frontend Mentor | Newsletter signup form with success message',
    images: [
      {
        url: 'https://res.cloudinary.com/dz209s6jk/image/upload/v1685103838/Challenges/rnhx0ccfuqrdx3udhhr8.jpg',
        width: 1440,
        height: 1080,
        alt: 'Newsletter signup form with success desktop preview',
      },
      {
        url: 'https://res.cloudinary.com/dz209s6jk/image/upload/v1685103968/Challenges/oyutcn434w63q3vhs38z.jpg',
        width: 1440,
        height: 1080,
        alt: 'Newsletter signup form with success error state preview',
      },
      {
        url: 'https://res.cloudinary.com/dz209s6jk/image/upload/v1685103968/Challenges/ar4f8wjb3zi0mrirpcve.jpg',
        width: 1440,
        height: 1080,
        alt: 'Newsletter signup form with success success state preview',
      },
      {
        url: 'https://res.cloudinary.com/dz209s6jk/image/upload/v1685104000/Challenges/s1nccdhto3gigyx7p4c2.jpg',
        width: 375,
        height: 842,
        alt: 'Newsletter signup form with success mobile preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frontend Mentor | Newsletter signup form with success message',
    description:
      'A responsive newsletter signup form with success message built for a Frontend Mentor challenge.',
    images: [
      'https://res.cloudinary.com/dz209s6jk/image/upload/v1685103838/Challenges/rnhx0ccfuqrdx3udhhr8.jpg',
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        className={`flex justify-center items-center w-screen min-h-screen bg-pale-navy ${roboto.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
