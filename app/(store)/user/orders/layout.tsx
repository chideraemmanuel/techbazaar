import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Your orders',
};

interface Props {
  children: React.ReactNode;
}

const UserOrdersLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default UserOrdersLayout;
