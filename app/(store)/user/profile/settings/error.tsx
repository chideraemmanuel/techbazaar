'use client';

import ErrorComponentWithHeader from '@/components/error-component-with-header';
import { FC } from 'react';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

const ProfileSettingsPageError: FC<Props> = ({ error, reset }) => {
  return (
    <>
      <ErrorComponentWithHeader />
    </>
  );
};

export default ProfileSettingsPageError;
