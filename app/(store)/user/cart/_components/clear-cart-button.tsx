'use client';

import useClearCart from '@/lib/hooks/use-clear-cart';
import { Slot } from '@radix-ui/react-slot';
import React, { ComponentPropsWithoutRef, ElementRef } from 'react';

type ClearCartButtonProps = ComponentPropsWithoutRef<'button'> & {
  asChild?: boolean;
};
type ClearCartButtonRef = ElementRef<'button'>;

const ClearCartButton = React.forwardRef<
  ClearCartButtonRef,
  ClearCartButtonProps
>(({ asChild, onClick, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';

  const { mutate: clearCart } = useClearCart();

  return (
    <>
      <Comp
        {...props}
        onClick={(e) => {
          clearCart();
          onClick?.(e);
        }}
        ref={ref}
      />
    </>
  );
});

export default ClearCartButton;
