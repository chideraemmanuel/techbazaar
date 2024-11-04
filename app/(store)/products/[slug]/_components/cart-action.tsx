'use client';

import AddToCartButton from '@/app/(store)/user/cart/_components/add-to-cart-button';
import RemoveFromCartButton from '@/app/(store)/user/cart/_components/remove-from-cart-button';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import axios from '@/config/axios';
import { APIErrorResponse } from '@/types';
import { ICart } from '@/types/cart';
import { IAvailableProduct } from '@/types/product';
import { AxiosError } from 'axios';
import { ShoppingBag, Trash2 } from 'lucide-react';
import { FC } from 'react';
import { useQuery } from 'react-query';

interface Props {
  product: IAvailableProduct;
}

const CartAction: FC<Props> = ({ product }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['get cart item by product ID'],
    queryFn: async () => {
      const response = await axios.get<ICart | ''>(
        `/users/me/cart/product?id=${product._id}`
      );

      console.log('response', response);

      return response.data;
    },
    onSuccess: (data) => {},
    onError: (error: AxiosError<APIErrorResponse>) => {},
    retry: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  if (error?.status && error?.status >= 400 && error?.status <= 500) {
    return (
      <Button className="flex-1">
        <ShoppingBag /> Add to cart
      </Button>
    );
  }

  // if (error) throw new Error();

  if (isLoading) {
    return <Skeleton className="h-10 w-full rounded-md" />;
  }

  console.log({ data });

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
        <RemoveFromCartButton asChild cartItemID={data?._id}>
          <Button variant={'destructive'} className="flex-1">
            <Trash2 /> Remove from cart
          </Button>
        </RemoveFromCartButton>
      )}
    </>
  );
};

export default CartAction;
