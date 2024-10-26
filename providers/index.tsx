'use client';

import TailwindIndicator from '@/components/tailwind-indicator';
import dynamic from 'next/dynamic';
import { FC } from 'react';

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
  return (
    <>
      <ThemeProvider defaultTheme="dark">
        <TailwindIndicator />
        {children}
      </ThemeProvider>
    </>
  );
};

export default Providers;
