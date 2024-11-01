import axios from '@/config/axios';
import { APIErrorResponse } from '@/types';
import { ProductCategory } from '@/types/product';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

export interface IProductData {
  name: string;
  brand: string;
  description: string;
  category: ProductCategory;
  image: File;
  price: number;
  stock: number;
  is_featured?: boolean;
  is_archived?: boolean;
}

const addProduct = async (data: IProductData) => {
  console.log('dataaa', data);
  const response = await axios.post('/products', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

const useAddProduct = () => {
  const router = useRouter();

  return useMutation({
    mutationKey: ['add product'],
    mutationFn: addProduct,
    onSuccess: (data) => {
      toast.success('Product added successfully');

      router.refresh();
    },
    onError: (error: AxiosError<APIErrorResponse>) => {
      toast.error(
        error?.response?.data?.error ||
          error?.message ||
          'Failed to add product'
      );
    },
  });
};

export default useAddProduct;
