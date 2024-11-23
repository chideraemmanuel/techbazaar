'use client';

import useRemoveItemFromCart from '@/lib/hooks/cart/use-remove-item-from-cart';
import useAxiosPrivate from '@/lib/hooks/use-axios-private';
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

  const axios = useAxiosPrivate();

  const { mutate: removeItemFromCart } = useRemoveItemFromCart();

  return (
    <>
      <Comp
        {...props}
        onClick={(e) => {
          removeItemFromCart({ axios, cartItem });
          onClick?.(e);
        }}
        ref={ref}
      />
    </>
  );
});

export default RemoveFromCartButton;
