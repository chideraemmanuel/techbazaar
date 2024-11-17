'use client';

import TailwindIndicator from '@/components/tailwind-indicator';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Toaster } from '@/components/ui/sonner';
import ViewsUpdateProvider from './views-update-provider';

const ThemeProvider = dynamic(
  () =>
    import('@/providers/theme-provider').then((module) => module.ThemeProvider),
  {
    ssr: false,
  }
);

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
            <Toaster richColors />
            <TailwindIndicator />
            {children}
          </ViewsUpdateProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
};

export default Providers;
