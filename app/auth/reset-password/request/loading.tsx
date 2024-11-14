import SpinnerWithoutHeader from '@/components/spinner-without-header';
import { FC } from 'react';

interface Props {}

const LoadingPasswordResetRequestPage: FC<Props> = () => {
  return (
    <>
      <SpinnerWithoutHeader />
    </>
  );
};

export default LoadingPasswordResetRequestPage;
