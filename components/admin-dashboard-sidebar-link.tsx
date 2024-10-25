'use client';

import { cn } from '@/lib/cn';
import { LucideProps } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, {
  ComponentPropsWithoutRef,
  ElementRef,
  FC,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';

type Props = ComponentPropsWithoutRef<typeof Link> & {
  title: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
};

type Ref = ElementRef<typeof Link>;

const AdminDashboardSidebarLink = React.forwardRef<Ref, Props>(
  ({ title, href, icon: Icon, className, ...props }, ref) => {
    const pathname = usePathname();

    return (
      <>
        <Link
          href={href}
          className={cn(
            'group flex items-center gap-3 py-3 px-3 rounded-lg text-muted-foreground font-medium text-base capitalize leading-[140%] tracking-[-0.44%] transition-colors hover:bg-secondary hover:text-primary',
            pathname === href && 'bg-secondary text-primary',
            className
          )}
          {...props}
          ref={ref}
        >
          <Icon
            className={cn(
              'text-muted-foreground w-5 h-5 transition-colors group-hover:text-primary',
              pathname === href && 'text-primary'
            )}
          />
          {title}
        </Link>
      </>
    );
  }
);

export default AdminDashboardSidebarLink;
