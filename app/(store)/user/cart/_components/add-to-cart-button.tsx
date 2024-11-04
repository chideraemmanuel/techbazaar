'use client';

import useAddItemToCart from '@/lib/hooks/use-add-item-to-cart';
import { IAvailableProduct } from '@/types/product';
import { Slot } from '@radix-ui/react-slot';
import { Loader2 } from 'lucide-react';
import React, {
  ComponentPropsWithoutRef,
  ElementRef,
  FC,
  useActionState,
  useTransition,
} from 'react';
import { toast } from 'sonner';

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

  const { mutate: addItemToCart, isLoading } = useAddItemToCart();

  return (
    <>
      <Comp
        {...props}
        // disabled={isLoading}
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
