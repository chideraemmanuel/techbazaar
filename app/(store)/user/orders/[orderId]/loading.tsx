import SpinnerWithHeader from '@/components/spinner-with-header';
import { FC } from 'react';

interface Props {}

const LoadingOrderDetailsPage: FC<Props> = () => {
  return (
    <>
      <SpinnerWithHeader />
    </>
  );
};

export default LoadingOrderDetailsPage;
