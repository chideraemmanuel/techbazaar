import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Checkout',
};

interface Props {
  children: React.ReactNode;
}

const UserCartCheckoutLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default UserCartCheckoutLayout;
