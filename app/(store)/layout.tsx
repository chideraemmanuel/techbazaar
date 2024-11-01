import StoreHeader from '@/app/(store)/_components/store-header';
import { FC } from 'react';

interface Props {
  children: React.ReactNode;
}

const StoreLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <div>
        <StoreHeader />

        <main>{children}</main>
      </div>
    </>
  );
};

export default StoreLayout;
