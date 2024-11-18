import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Your cart',
  description:
    'Review the items in your cart and get ready to check out. Shop your favorite gadgets and complete your purchase today!',
};

interface Props {
  children: React.ReactNode;
}

const UserCartLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default UserCartLayout;
