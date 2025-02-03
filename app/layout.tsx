import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'DIVER App',
  description: 'Estudando Teoria Socicultural',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='antialiased bg-[#F8F3E0] font-new-zen'>
        <Toaster
          richColors
          position='top-right'
          toastOptions={
            {
              // unstyled: true,
            }
          }
        />
        {children}
      </body>
    </html>
  );
}
