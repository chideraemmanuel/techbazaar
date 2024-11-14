import SpinnerWithoutHeader from '@/components/spinner-without-header';
import { FC } from 'react';

interface Props {}

const LoadingPasswordResetPage: FC<Props> = () => {
  return (
    <>
      <SpinnerWithoutHeader />
    </>
  );
};

export default LoadingPasswordResetPage;
