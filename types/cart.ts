import { ProductTypes } from './product';

export interface ICart {
  _id: string;
  user: string;
  product: ProductTypes;
  quantity: number;
}

export interface ICartSummary {
  total_items: number;
  total_amount: number;
}
