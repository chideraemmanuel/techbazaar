'use server';

import axios from '@/config/axios';
import { APISuccessResponse } from '@/types';
import { ICart } from '@/types/cart';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export const addItemToCart = async (previousState: any, productID: string) => {
  try {
    const session_id = (await cookies()).get('session_id')?.value;

    if (!session_id) throw new Error('Unauthorized access');

    const {
      data: { data, message },
    } = await axios.post<Required<APISuccessResponse<ICart>>>(
      '/users/me/cart',
      { product: productID },
      { headers: { Cookie: `session_id=${session_id}` } }
    );

    console.log('new cart item', data);

    revalidateTag('get current user cart');

    console.log('TAG REVALIDATED');

    return { success: true, message: `Item added to cart successfully` };
  } catch (error: any) {
    const message =
      error?.response?.data?.error ||
      error?.message ||
      'Failed - Something went wrong';

    return { error: message };
  }
};
