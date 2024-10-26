import AdminDashboardHeader from '@/components/admin-dashboard-header';
import AdminDashboardSidebar from '@/components/admin-dashboard-sidebar';
import { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Dashboard Overview',
};

interface Props {
  children: React.ReactNode;
}

const AdminDashboardLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <AdminDashboardSidebar />
      <AdminDashboardHeader />
      <main className="xl:ml-[min(270px,_30vw)] min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)] bg-background">
        {children}
      </main>
    </>
  );
};

export default AdminDashboardLayout;
