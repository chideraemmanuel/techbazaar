'use client';

import { FC } from 'react';
import Logo from './logo';
import { ADMIN_DASHBAORD_SIDEBAR_LINKS } from '@/constants';
import { Separator } from './ui/separator';
import AdminDashboardSidebarLink from './admin-dashboard-sidebar-link';

interface Props {}

const AdminDashboardSidebar: FC<Props> = () => {
  return (
    <>
      <div className="hidden xl:block fixed left-0 top-0 bottom-0 h-screen border-r w-[min(270px,_30vw)]">
        <div className="h-20 p-6 flex items-center justify-start border-b">
          <Logo />
        </div>

        <aside className="bg-secondary/30 h-full">
          <nav>
            {ADMIN_DASHBAORD_SIDEBAR_LINKS.map((sidebar_link, index) => (
              <div className="p-4" key={index}>
                <span className="inline-block px-4 pb-2 font-medium text-muted-foreground text-xs leading-[140%] tracking-[-0.8%] uppercase">
                  {sidebar_link.title}
                </span>

                <ul className="flex flex-col gap-1">
                  {sidebar_link.items.map((link_item, index) => (
                    <li key={index}>
                      <AdminDashboardSidebarLink {...link_item} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <Separator />
          </nav>
        </aside>
      </div>
    </>
  );
};

export default AdminDashboardSidebar;
