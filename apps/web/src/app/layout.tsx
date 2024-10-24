import '@/styles/globals.css';

import { type Metadata } from 'next';

import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import ProgressBarProvider from '@/components/providers/progress-bar-provider';
import ReactQueryProvider from '@/components/providers/react-query-provider';
import { SessionProvider } from '@/components/providers/session-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';
import ToastContainer from '@/components/shared/toast-container';

export const metadata: Metadata = {
  title: 'Telegram Clone',
};

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute='class'
          themes={['light', 'dark']}
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <SessionProvider>
              <ProgressBarProvider>{children}</ProgressBarProvider>
            </SessionProvider>
          </ReactQueryProvider>

          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
