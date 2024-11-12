'use client';

import useAddItemToCart from '@/lib/hooks/cart/use-add-item-to-cart';
import { IAvailableProduct } from '@/types/product';
import { Slot } from '@radix-ui/react-slot';
import React, { ComponentPropsWithoutRef, ElementRef } from 'react';

type AddToCartButtonProps = ComponentPropsWithoutRef<'button'> & {
  product: IAvailableProduct;
  asChild?: boolean;
};
type AddToCartButtonRef = ElementRef<'button'>;

const AddToCartButton = React.forwardRef<
  AddToCartButtonRef,
  AddToCartButtonProps
>(({ product, asChild, onClick, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';

  const { mutate: addItemToCart } = useAddItemToCart();

  return (
    <>
      <Comp
        {...props}
        onClick={(e) => {
          addItemToCart(product);
          onClick?.(e);
        }}
        ref={ref}
      />
    </>
  );
});

export default AddToCartButton;
