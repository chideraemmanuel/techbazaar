import { getAvailableBrands } from '@/lib/data/brand';
import { FC } from 'react';
import NewProductDialog from './new-product-dialog';

interface Props {}

const NewProduct: FC<Props> = async () => {
  const brands = await getAvailableBrands();

  return (
    <>
      <NewProductDialog brands={brands} />
    </>
  );
};

export default NewProduct;
