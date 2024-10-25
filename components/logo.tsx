import { cn } from '@/lib/cn';
import Link from 'next/link';
import React, { ComponentPropsWithoutRef, ElementRef } from 'react';

type LogoPropTypes = Omit<ComponentPropsWithoutRef<typeof Link>, 'href'>;

type LogoRefTypes = ElementRef<typeof Link>;

const Logo = React.forwardRef<LogoRefTypes, LogoPropTypes>(
  ({ className, ...props }, ref) => {
    return (
      <>
        <Link
          href={'/'}
          className={cn('text-2xl font-semibold', className)}
          {...props}
        >
          <span>
            Tech<span className="text-primary">Bazaar</span>
          </span>
        </Link>
      </>
    );
  }
);

export default Logo;
