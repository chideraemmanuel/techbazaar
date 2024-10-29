import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Your cart',
};

interface Props {
  children: React.ReactNode;
}

const UserCartLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default UserCartLayout;
