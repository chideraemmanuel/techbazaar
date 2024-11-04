'use client';

import AddToCartButton from '@/app/(store)/user/cart/_components/add-to-cart-button';
import RemoveFromCartButton from '@/app/(store)/user/cart/_components/remove-from-cart-button';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import axios from '@/config/axios';
import useAddItemToCart from '@/lib/hooks/use-add-item-to-cart';
import useCartItem from '@/lib/hooks/use-cart-item';
import { APIErrorResponse } from '@/types';
import { ICart } from '@/types/cart';
import { IAvailableProduct } from '@/types/product';
import { AxiosError } from 'axios';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { FC } from 'react';
import { useQuery } from 'react-query';

interface Props {
  product: IAvailableProduct;
}

const CartAction: FC<Props> = ({ product }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const productID = searchParams.get('id');

  const { mutate: addItemToCart } = useAddItemToCart();

  React.useEffect(() => {
    if (productID && productID === product._id) {
      addItemToCart(product);
      router.replace(pathname);
    }
  }, []);

  const { data, isLoading, error } = useCartItem(product._id);

  if (error?.status && error?.status >= 400 && error?.status <= 500) {
    // if (error?.response?.status > 400 && error?.response?.status < 500) {
    return (
      <Button
        className="flex-1"
        onClick={() =>
          router.push(`/auth/login?return_to=${pathname}?id=${product._id}`)
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
