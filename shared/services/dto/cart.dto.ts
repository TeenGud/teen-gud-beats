import { Cart, CartItem, Mood, Product, ProductItem } from "@prisma/client";

export type CartItemDTO = CartItem & {
    productItem: ProductItem & {
        product: Product
    };
    moods: Mood[];
    map: any;
    reduce: any;
}

export interface CartDTO extends Cart{
    items: CartItemDTO
}

export interface CreateCartItemValue {
    productItemId: number;
    moods: number[];
}