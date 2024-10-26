import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'All products',
};

interface Props {
  children: React.ReactNode;
}

const AdminDashboardProductsPage: FC<Props> = ({ children }) => {
  return <>{children}</>;
};

export default AdminDashboardProductsPage;
