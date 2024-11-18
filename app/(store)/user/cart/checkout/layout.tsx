import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Checkout',
  description:
    'Securely complete your purchase and get your gadgets delivered to your doorstep. Fast, easy, and hassle-free checkout.',
};

interface Props {
  children: React.ReactNode;
}

const UserCartCheckoutLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default UserCartCheckoutLayout;
