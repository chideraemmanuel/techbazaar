import TailwindIndicator from '@/components/tailwind-indicator';
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
