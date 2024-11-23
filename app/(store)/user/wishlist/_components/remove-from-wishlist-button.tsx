'use client';

import useAxiosPrivate from '@/lib/hooks/use-axios-private';
import useRemoveItemFromWishlist from '@/lib/hooks/wishlist/use-remove-item-from-wishlist';
import { WishlistTypes } from '@/types/wishlist';
import { Slot } from '@radix-ui/react-slot';
import React, { ComponentPropsWithoutRef, ElementRef } from 'react';

type RemoveFromWishlistButtonProps = ComponentPropsWithoutRef<'button'> & {
  wishlistItem: WishlistTypes;
  asChild?: boolean;
};

type RemoveFromWishlistButtonRef = ElementRef<'button'>;

const RemoveFromWishlistButton = React.forwardRef<
  RemoveFromWishlistButtonRef,
  RemoveFromWishlistButtonProps
>(({ wishlistItem, asChild, onClick, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';

  const axios = useAxiosPrivate();

  const { mutate: removeItemFromWishlist } = useRemoveItemFromWishlist();

  return (
    <>
      <Comp
        {...props}
        onClick={(e) => {
          removeItemFromWishlist({ axios, wishlistItem });
          onClick?.(e);
        }}
        ref={ref}
      />
    </>
  );
});

export default RemoveFromWishlistButton;
