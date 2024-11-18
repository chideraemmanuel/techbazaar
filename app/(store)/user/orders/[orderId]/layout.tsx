import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Order Details',
  description:
    'View the details of your recent order, including status, items, and delivery updates. Manage your purchases with ease.',
};

interface Props {
  children: React.ReactNode;
}

const OrderDetailsLayout: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default OrderDetailsLayout;
