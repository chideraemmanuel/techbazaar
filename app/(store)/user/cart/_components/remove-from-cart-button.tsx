'use client';

import useRemoveItemFromCart from '@/lib/hooks/use-remove-item-from-cart';
import { ICart } from '@/types/cart';
import { Slot } from '@radix-ui/react-slot';
import React, { ComponentPropsWithoutRef, ElementRef } from 'react';

type RemoveFromCartButtonProps = ComponentPropsWithoutRef<'button'> & {
  cartItem: ICart;
  asChild?: boolean;
};
type RemoveFromCartButtonRef = ElementRef<'button'>;

const RemoveFromCartButton = React.forwardRef<
  RemoveFromCartButtonRef,
  RemoveFromCartButtonProps
>(({ cartItem, asChild, onClick, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';

  const { mutate: removeItemFromCart } = useRemoveItemFromCart();

  return (
    <>
      <Comp
        {...props}
        onClick={(e) => {
          removeItemFromCart(cartItem);
          onClick?.(e);
        }}
        ref={ref}
      />
    </>
  );
});

export default RemoveFromCartButton;
