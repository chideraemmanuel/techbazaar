import SpinnerWithoutHeader from '@/components/spinner-without-header';
import { FC } from 'react';

interface Props {}

const LoadingEmailVerificationPage: FC<Props> = () => {
  return (
    <>
      <SpinnerWithoutHeader />
    </>
  );
};

export default LoadingEmailVerificationPage;
