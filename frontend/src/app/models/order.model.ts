import { CartItem } from './cart-item.model';

export interface Order {
  orderId: number;
  username: string;
  items: CartItem[];
  totalAmount: number;
  status: string;
  orderDate: string;
}
