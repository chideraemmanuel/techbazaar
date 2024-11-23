'use client';

import AddToCartButton from '@/app/(store)/user/cart/_components/add-to-cart-button';
import RemoveFromCartButton from '@/app/(store)/user/cart/_components/remove-from-cart-button';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import useAddItemToCart from '@/lib/hooks/cart/use-add-item-to-cart';
import useCartItem from '@/lib/hooks/cart/use-cart-item';
import useAxiosPrivate from '@/lib/hooks/use-axios-private';
import { IAvailableProduct } from '@/types/product';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { FC } from 'react';

interface Props {
  product: IAvailableProduct;
}

const CartAction: FC<Props> = ({ product }) => {
  const axios = useAxiosPrivate();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const cartProductID = searchParams.get('cart_product_id');

  const { mutate: addItemToCart } = useAddItemToCart();

  const { data, isLoading, error } = useCartItem(product._id, axios);

  React.useEffect(() => {
    if (
      !isLoading &&
      data === '' &&
      cartProductID &&
      cartProductID === product._id
    ) {
      addItemToCart({ axios, product });
      router.replace(pathname);
    }
  }, [data, isLoading]);

  if (error?.status && error?.status >= 400 && error?.status <= 500) {
    return (
      <Button
        className="flex-1"
        onClick={() =>
          router.push(
            `/auth/login?return_to=${encodeURIComponent(
              pathname
            )}?cart_product_id=${product._id}`
          )
        }
      >
        <ShoppingBag /> Add to cart
      </Button>
    );
  }

  if (error) throw new Error();

  if (isLoading) {
    return <Skeleton className="h-10 w-full rounded-md" />;
  }

  return (
    <>
      {!isLoading && data === '' && (
        <AddToCartButton asChild product={product}>
          <Button className="flex-1">
            <ShoppingBag /> Add to cart
          </Button>
        </AddToCartButton>
      )}

      {!isLoading && data && (
        <RemoveFromCartButton asChild cartItem={data}>
          <Button variant={'destructive'} className="flex-1">
            <Trash2 /> Remove from cart
          </Button>
        </RemoveFromCartButton>
      )}
    </>
  );
};

export default CartAction;
