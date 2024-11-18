import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Your orders',
  description:
    'View your order history and track the status of your recent purchases. Keep tabs on your favorite gadgets.',
};

interface Props {
  children: React.ReactNode;
}

const UserOrdersLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default UserOrdersLayout;
