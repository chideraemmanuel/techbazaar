import { ProductTypes } from './product';

export interface ICart {
  _id: string;
  user: string;
  product: ProductTypes;
  quantity: number;
}
