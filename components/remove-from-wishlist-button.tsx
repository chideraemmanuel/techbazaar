'use client';

import useRemoveItemFromWishlist from '@/lib/hooks/use-remove-item-from-wishlist';
import { ICart } from '@/types/cart';
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

  const { mutate: removeItemFromWishlist } = useRemoveItemFromWishlist();

  return (
    <>
      <Comp
        {...props}
        onClick={(e) => {
          removeItemFromWishlist(wishlistItem);
          onClick?.(e);
        }}
        ref={ref}
      />
    </>
  );
});

export default RemoveFromWishlistButton;
