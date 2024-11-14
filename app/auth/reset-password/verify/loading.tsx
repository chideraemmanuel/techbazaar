import SpinnerWithoutHeader from '@/components/spinner-without-header';
import { FC } from 'react';

interface Props {}

const LoadingPasswordResetVerificationPage: FC<Props> = () => {
  return (
    <>
      <SpinnerWithoutHeader />
    </>
  );
};

export default LoadingPasswordResetVerificationPage;
