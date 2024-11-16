import SpinnerWithHeader from '@/components/spinner-with-header';
import { FC } from 'react';

interface Props {}

const LoadingHomepage: FC<Props> = () => {
  return (
    <>
      <SpinnerWithHeader />
    </>
  );
};

export default LoadingHomepage;
