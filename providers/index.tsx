'use client';

import TailwindIndicator from '@/components/tailwind-indicator';
import { SidebarProvider } from '@/components/ui/sidebar';
import { FC } from 'react';

interface Props {
  children: React.ReactNode;
}

const Providers: FC<Props> = ({ children }) => {
  return (
    <>
      <TailwindIndicator />
      {children}
    </>
  );
};

export default Providers;
