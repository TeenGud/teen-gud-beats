import { CartItemDTO } from '@/shared/services/dto/cart.dto';
import * as React from 'react';

export interface OrderSuccessTemplate {
  orderId: number;
  items: CartItemDTO[];
}

export const OrderSuccessTemplate: React.FC<Readonly<OrderSuccessTemplate>> = ({
  orderId,
  items
}) => (
  <div>
    <h1>Thank you for purchasing!</h1>
    <p>Your order №{orderId} paid. List of beats</p>

    <hr />
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.productItem.product.name} | {item.productItem.price}$
        </li>
      ))}
    </ul>
  </div>
);