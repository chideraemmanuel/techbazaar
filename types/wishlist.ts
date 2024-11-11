import { ICart } from './cart';

export type WishlistTypes = Omit<ICart, 'quantity'>;
