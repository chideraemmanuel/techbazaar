'use client';

import ErrorComponentWithoutHeader from '@/components/error-component-without-header';
import { FC } from 'react';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

const UserRegistrationPageError: FC<Props> = ({ error, reset }) => {
  return (
    <>
      <ErrorComponentWithoutHeader />
    </>
  );
};

export default UserRegistrationPageError;
