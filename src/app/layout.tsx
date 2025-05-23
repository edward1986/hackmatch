import type {Metadata} from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { MainLayout } from '@/components/layout/main-layout';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'HackMatch - AI Powered Hackathons',
  description: 'Host and participate in virtual hackathons with AI-powered team matchmaking and judging.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          GeistSans.variable,
          GeistMono.variable
        )}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
