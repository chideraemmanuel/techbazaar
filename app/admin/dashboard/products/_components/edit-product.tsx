import { getAvailableBrands } from '@/lib/data/brand';
import { FC } from 'react';
import EditProductDialog from './edit-product-dialog';
import { ProductTypes } from '@/types/product';

interface Props {
  product: ProductTypes;
}

const EditProduct: FC<Props> = async ({ product }) => {
  const brands = await getAvailableBrands();
  return (
    <>
      <EditProductDialog product={product} brands={brands} />
    </>
  );
};

export default EditProduct;
