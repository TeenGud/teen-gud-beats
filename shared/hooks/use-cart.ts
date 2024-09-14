'use client'
import { useEffect } from "react"
import { useCartStore } from "../store";
import { CreateCartItemValue } from "../services/dto/cart.dto";
import { CartStateItem } from "../lib/get-cart-details";

type ReturnProps = {
    totalAmount: number;
    items: CartStateItem[];
    loading: boolean;
    removeCartItem: (id: number) => void;
    addCartItem: (values: CreateCartItemValue) => void
}

export const useCart = (): ReturnProps => {
    const [totalAmount, fetchCartItems, items, removeCartItem, addCartItem, loading] = useCartStore((state) => [
        state.totalAmount,
        state.fetchCartItems,
        state.items,
        state.removeCartItem,
        state.addCartItem,
        state.loading
      ]);
    useEffect(() => {
        fetchCartItems();
      }, [fetchCartItems]);

      return {
        totalAmount, items, removeCartItem, loading, addCartItem
      }
}