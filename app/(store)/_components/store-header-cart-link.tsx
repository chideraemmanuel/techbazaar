'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import useCurrentUserCart from '@/lib/hooks/use-current-user-cart';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

interface Props {}

const StoreHeaderCartLink: FC<Props> = () => {
  const { data, isLoading } = useCurrentUserCart();

  //   if (isLoading) return null;

  return (
    <>
      <Button asChild variant={'ghost'} size={'icon'}>
        <Link
          href={'/user/cart'}
          className="h-8 sm:h-10 w-8 sm:w-10 relative !mr-2"
        >
          <ShoppingCart className="sm:!w-5 sm:!h-5" />

          {isLoading && (
            <Skeleton className="absolute -top-[20%] -right-[15%] flex h-5 sm:h-6 w-5 sm:w-6 shrink-0 items-center justify-center rounded-full" />
          )}

          {data && (
            <Badge className="absolute bg-destructive text-destructive-foreground hover:bg-destructive hover:text-destructive-foreground -top-[20%] -right-[15%] flex h-5 sm:h-6 w-5 sm:w-6 shrink-0 items-center justify-center rounded-full">
              {data?.pages[0].pagination.total_records}
            </Badge>
          )}
        </Link>
      </Button>
    </>
  );
};

export default StoreHeaderCartLink;
