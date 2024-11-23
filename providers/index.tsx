'use client';

import TailwindIndicator from '@/components/tailwind-indicator';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Toaster } from '@/components/ui/sonner';
import ViewsUpdateProvider from './views-update-provider';
import SessionUpdate from './session-update';

const ThemeProvider = dynamic(
  () =>
    import('@/providers/theme-provider').then((module) => module.ThemeProvider),
  {
    ssr: false,
  }
);

const GoogleSignInToast = dynamic(() => import('./google-sign-in-toast'), {
  ssr: false,
});

interface Props {
  children: React.ReactNode;
}

const Providers: FC<Props> = ({ children }) => {
  const client = new QueryClient();

  return (
    <>
      <ThemeProvider defaultTheme="dark">
        <QueryClientProvider client={client}>
          <ViewsUpdateProvider>
            <SessionUpdate />
            <Toaster richColors />
            <GoogleSignInToast />
            <TailwindIndicator />
            {children}
          </ViewsUpdateProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};

export default Providers;
