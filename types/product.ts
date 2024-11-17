interface IBrand {
  _id: string;
  name: string;
  logo: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAvailableBrand extends IBrand {
  is_deleted: false;
}

export interface IDeletedBrand extends IBrand {
  is_deleted: true;
  deleted_at: Date;
}

export type BrandTypes = IAvailableBrand | IDeletedBrand;

export type ProductCategory =
  | 'smartphones'
  | 'tablets'
  | 'laptops'
  | 'headphones'
  | 'speakers'
  | 'smartwatches'
  | 'gaming-consoles';

interface IProduct {
  _id: string;
  name: string;
  brand: BrandTypes;
  description: string;
  category: ProductCategory;
  image: string;
  price: number;
  stock: number;
  SKU: string;
  slug: string;
  is_featured: boolean;
  is_archived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAvailableProduct extends IProduct {
  is_deleted: false;
}

export interface IDeletedProduct extends IProduct {
  is_deleted: true;
  deleted_at: Date;
}

export type ProductTypes = IAvailableProduct | IDeletedProduct;
