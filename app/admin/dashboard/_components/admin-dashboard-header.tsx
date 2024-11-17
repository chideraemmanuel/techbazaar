import { FC } from 'react';
import Logo from '@/components/logo';
import AdminDashboardMobileNavigation from './admin-dashboard-mobile-navigation';
import AdminDashboardHeaderUserDropdown from './admin-dashboard-header-account-dropdown';

interface Props {}

const AdminDashboardHeader: FC<Props> = async () => {
  return (
    <>
      <header className="sticky top-0 z-10 h-16 md:h-20 border-b xl:ml-[min(270px,_30vw)] px-6 bg-background">
        <div className="flex items-center justify-between gap-4 h-full">
          <div className="xl:hidden">
            <AdminDashboardMobileNavigation />
          </div>

          <div className="xl:hidden">
            <Logo />
          </div>

          <div className="xl:ml-auto flex flex-row lg:flex-row-reverse items-center gap-2 md:gap-3">
            <AdminDashboardHeaderUserDropdown />
          </div>
        </div>
      </header>
    </>
  );
};

export default AdminDashboardHeader;
