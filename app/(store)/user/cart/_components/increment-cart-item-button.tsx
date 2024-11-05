'use client';

import useIncrementCartItem from '@/lib/hooks/use-increment-cart-item';
import { ICart } from '@/types/cart';
import { Slot } from '@radix-ui/react-slot';
import React, { ComponentPropsWithoutRef, ElementRef } from 'react';

type IncrementCartItemButtonProps = ComponentPropsWithoutRef<'button'> & {
  cartItem: ICart;
  asChild?: boolean;
};
type IncrementCartItemButtonRef = ElementRef<'button'>;

const IncrementCartItemButton = React.forwardRef<
  IncrementCartItemButtonRef,
  IncrementCartItemButtonProps
>(({ cartItem, asChild, onClick, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';

  const { mutate: incrementCartItem } = useIncrementCartItem();

  return (
    <>
      <Comp
        {...props}
        onClick={(e) => {
          incrementCartItem(cartItem);
          onClick?.(e);
        }}
        ref={ref}
      />
    </>
  );
});

export default IncrementCartItemButton;
