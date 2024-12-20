import AdminDashboardHeader from '@/app/admin/dashboard/_components/admin-dashboard-header';
import AdminDashboardSidebar from '@/app/admin/dashboard/_components/admin-dashboard-sidebar';
import { cn } from '@/lib/cn';
import { getCurrentUser } from '@/lib/data/user';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { FC } from 'react';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Manage your store and settings with ease.',
};

interface Props {
  children: React.ReactNode;
}

const AdminDashboardLayout: FC<Props> = async ({ children }) => {
  const headerList = await headers();
  const pathname = headerList.get('x-current-path') || '/';

  const user = await getCurrentUser();

  if (!user) {
    redirect(`/auth/login?return_to=${encodeURIComponent(pathname)}`);
  }

  if (user && !user.email_verified) {
    redirect(`/auth/verify-email?return_to=${encodeURIComponent(pathname)}`);
  }

  return (
    <>
      <AdminDashboardSidebar />
      <AdminDashboardHeader />
      <main
        className={cn(
          'xl:ml-[min(270px,_30vw)] bg-background min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)]'
        )}
      >
        {children}
      </main>
    </>
  );
};

export default AdminDashboardLayout;
