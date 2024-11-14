'use client';

import ErrorComponentWithHeader from '@/components/error-component-with-header';
import { FC } from 'react';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

const UserCartPageError: FC<Props> = ({ error, reset }) => {
  return (
    <>
      <ErrorComponentWithHeader />
    </>
  );
};

export default UserCartPageError;
