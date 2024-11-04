'use client';

import useAddItemToCart from '@/lib/hooks/use-add-item-to-cart';
import useRemoveItemFromCart from '@/lib/hooks/use-remove-item-from-cart';
import { ICart } from '@/types/cart';
import { IAvailableProduct } from '@/types/product';
import { Slot } from '@radix-ui/react-slot';
import React, { ComponentPropsWithoutRef, ElementRef } from 'react';
import { toast } from 'sonner';

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

  const { mutate: removeItemFromCart, isLoading } = useRemoveItemFromCart();

  return (
    <>
      <Comp
        {...props}
        // disabled={isLoading}
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
