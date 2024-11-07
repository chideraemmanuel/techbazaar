import { ProductTypes } from './product';

export interface ICart {
  _id: string;
  user: string;
  product: ProductTypes;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ICartSummary {
  total_items: number;
  total_amount: number;
}

export interface IBillingAddress {
  street: string;
  city: string;
  state: string;
  country: string;
}

export interface IBillingInformation {
  _id: string;
  user: string;
  receipent: {
    first_name: string;
    last_name: string;
    mobile_number: string;
  };
  address: IBillingAddress;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'in-transit'
  // | 'dispatched'
  | 'partially-shipped'
  | 'out-for-delivery'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface IOrder {
  _id: string;
  user: string;
  items: Pick<ICart, 'product' | 'quantity'>[];
  billing_information: Omit<
    IBillingInformation,
    '__v' | '_id' | 'user' | 'createdAt' | 'updatedAt'
  >;
  status: OrderStatus;
  total_price: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
