'use client';

import AddToWishlistButton from '@/components/add-to-wishlist-button';
import RemoveFromWishlistButton from '@/components/remove-from-wishlist-button';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import useAddItemToWishlist from '@/lib/hooks/use-add-item-to-wishlist';
import useWishlistItem from '@/lib/hooks/use-wishlist-item';
import { IAvailableProduct } from '@/types/product';
import { RiHeartFill } from '@remixicon/react';
import { Heart } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { FC } from 'react';

interface Props {
  product: IAvailableProduct;
}

const WishlistAction: FC<Props> = ({ product }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const wishlistProductID = searchParams.get('wishlist_product_id');

  const { mutate: addItemToWishlist } = useAddItemToWishlist();

  const { data, isLoading, error } = useWishlistItem(product._id);

  React.useEffect(() => {
    if (
      !isLoading &&
      data === '' &&
      wishlistProductID &&
      wishlistProductID === product._id
    ) {
      addItemToWishlist(product);
      router.replace(pathname);
    }
  }, [data, isLoading]);

  if (error?.status && error?.status >= 400 && error?.status <= 500) {
    // if (error?.response?.status > 400 && error?.response?.status < 500) {
    return (
      <Button
        variant={'secondary'}
        title="Add to wishlist"
        onClick={() =>
          router.push(
            `/auth/login?return_to=${pathname}?wishlist_product_id=${product._id}`
          )
        }
      >
        <Heart />
        <span className="sr-only">Add to wishlist</span>
      </Button>
    );
  }

  if (error) throw new Error();

  if (isLoading) {
    return <Skeleton className="h-10 w-12 rounded-md" />;
  }

  return (
    <>
      {!isLoading && data === '' && (
        <AddToWishlistButton asChild product={product}>
          <Button variant={'secondary'} title="Add to wishlist">
            <Heart />
            <span className="sr-only">Add to wishlist</span>
          </Button>
        </AddToWishlistButton>
      )}

      {!isLoading && data && (
        <RemoveFromWishlistButton asChild wishlistItem={data}>
          <Button
            variant={'secondary'}
            className="text-primary"
            title="Remove from wishlist"
          >
            <RiHeartFill />
            <span className="sr-only">Remove from wishlist</span>
          </Button>
        </RemoveFromWishlistButton>
      )}
    </>
  );
};

export default WishlistAction;
