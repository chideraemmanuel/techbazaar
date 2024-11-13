'use client';

import useAddItemToWishlist from '@/lib/hooks/wishlist/use-add-item-to-wishlist';
import { IAvailableProduct } from '@/types/product';
import { Slot } from '@radix-ui/react-slot';
import React, { ComponentPropsWithoutRef, ElementRef } from 'react';

type AddToWishlistButtonProps = ComponentPropsWithoutRef<'button'> & {
  product: IAvailableProduct;
  asChild?: boolean;
};
type AddToWishlistButtonRef = ElementRef<'button'>;

const AddToWishlistButton = React.forwardRef<
  AddToWishlistButtonRef,
  AddToWishlistButtonProps
>(({ product, asChild, onClick, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';

  const { mutate: addItemToWishlist } = useAddItemToWishlist();

  return (
    <>
      <Comp
        {...props}
        onClick={(e) => {
          addItemToWishlist(product);
          onClick?.(e);
        }}
        ref={ref}
      />
    </>
  );
});

export default AddToWishlistButton;
