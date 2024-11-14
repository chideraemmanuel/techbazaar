'use client';

import ErrorComponentWithoutHeader from '@/components/error-component-without-header';
import Logo from '@/components/logo';
import { FC } from 'react';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

const RootError: FC<Props> = ({ error, reset }) => {
  return (
    <>
      <div className="absolute z-10 top-8 left-4 md:left-8">
        <Logo />
      </div>

      <ErrorComponentWithoutHeader />
    </>
  );
};

export default RootError;
