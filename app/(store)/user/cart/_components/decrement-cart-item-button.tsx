'use client';

import useDecrementCartItem from '@/lib/hooks/use-decrement-cart-item';
import { ICart } from '@/types/cart';
import { Slot } from '@radix-ui/react-slot';
import React, { ComponentPropsWithoutRef, ElementRef } from 'react';

type DecrementCartItemButtonProps = ComponentPropsWithoutRef<'button'> & {
  cartItem: ICart;
  asChild?: boolean;
};
type DecrementCartItemButtonRef = ElementRef<'button'>;

const DecrementCartItemButton = React.forwardRef<
  DecrementCartItemButtonRef,
  DecrementCartItemButtonProps
>(({ cartItem, asChild, onClick, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';

  const { mutate: decrementCartItem } = useDecrementCartItem();

  return (
    <>
      <Comp
        {...props}
        onClick={(e) => {
          decrementCartItem(cartItem);
          onClick?.(e);
        }}
        ref={ref}
      />
    </>
  );
});

export default DecrementCartItemButton;
