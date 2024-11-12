'use client';

import useWishlistItem from '@/lib/hooks/use-wishlist-item';
import { IAvailableProduct } from '@/types/product';
import { Heart } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { FC } from 'react';
import AddToWishlistButton from './add-to-wishlist-button';
import RemoveFromWishlistButton from './remove-from-wishlist-button';
import useAddItemToWishlist from '@/lib/hooks/use-add-item-to-wishlist';

interface Props {
  product: IAvailableProduct;
}

const WishlistAction: FC<Props> = ({ product }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const productID = searchParams.get('id');

  const { mutate: addItemToWishlist } = useAddItemToWishlist();

  React.useEffect(() => {
    if (productID && productID === product._id) {
      addItemToWishlist(product);
      router.replace(pathname);
    }
  }, []);

  const { data, isLoading, error } = useWishlistItem(product._id);

  if (error?.status && error?.status >= 400 && error?.status <= 500) {
    // if (error?.response?.status > 400 && error?.response?.status < 500) {
    return (
      <button
        className="absolute top-2 right-2 flex items-center justify-center rounded-full h-7 w-7 text-background bg-foreground/30 hover:bg-primary/80 hover:text-white transition-colors"
        title="Add to wishlist"
        onClick={() =>
          router.push(`/auth/login?return_to=${pathname}?id=${product._id}`)
        }
      >
        <Heart className="w-4 h-4" />
        <span className="sr-only">Add to wishlist</span>
      </button>
    );
  }

  if (error) throw new Error();

  if (isLoading) {
    return (
      <button className="absolute top-2 right-2 flex items-center justify-center rounded-full h-7 w-7 text-background bg-foreground/30 hover:bg-primary/80 hover:text-white transition-colors">
        <Heart className="w-4 h-4" />
      </button>
    );
  }

  return (
    <>
      {/* <button className="absolute top-2 right-2 flex items-center justify-center rounded-full h-7 w-7 text-muted-foreground bg-background hover:bg-primary/80 hover:text-white transition-colors">
          <Heart className="w-4 h-4" />
        </button> */}

      {!isLoading && data === '' && (
        <AddToWishlistButton asChild product={product}>
          <button
            className="absolute top-2 right-2 flex items-center justify-center rounded-full h-7 w-7 text-background bg-foreground/30 hover:bg-primary/80 hover:text-white transition-colors"
            title="Add to wishlist"
          >
            <Heart className="w-4 h-4" />
            <span className="sr-only">Add to wishlist</span>
          </button>
        </AddToWishlistButton>
      )}

      {!isLoading && data && (
        <RemoveFromWishlistButton asChild wishlistItem={data}>
          <button
            className="absolute top-2 right-2 flex items-center justify-center rounded-full h-7 w-7 bg-primary/80 text-white transition-colors"
            title="Remove from wishlist"
          >
            <Heart className="w-4 h-4" />
            <span className="sr-only">Remove from wishlist</span>
          </button>
        </RemoveFromWishlistButton>
      )}
    </>
  );
};

export default WishlistAction;