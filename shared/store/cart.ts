import { create } from "zustand";
import { Api } from "../services/api-client";
import { CartStateItem, getCartDetails } from "../lib/get-cart-details";
import { CreateCartItemValue } from "../services/dto/cart.dto";

// zustand
export interface CartState {
    loading: boolean;
    error: boolean;
    totalAmount: number;
    items: CartStateItem[];
    fetchCartItems: () => Promise<void>
    addCartItem: (values: any ) => Promise<void>;
    removeCartItem: (id: number) => Promise<void>;
}

// zustand
export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    error: false,
    loading: true,
    totalAmount: 0,

    fetchCartItems: async () => {
        try{
            set({loading: true, error: false})
            const data = await Api.cart.getCart()
            set(getCartDetails(data))
        }catch(error) {
            console.log(error)
            set({error: true})
        }finally {
            set({loading: false})
        }
    },

    removeCartItem: async (id: number) => {
        try{
            set(state => ({loading: true, error: false, items: state.items.map((item) => (item.id === id ? {...item, disabled: true} : item))}))
            const data = await Api.cart.removeCartItem(id)
            set(getCartDetails(data))
        }catch(error) {
            console.log(error)
            set({error: true})
        }finally {
            set(state => ({loading: false, items: state.items.map((item) => (item.id === id ? {...item, disabled: false} : item))}))
        }
    },
    addCartItem: async (values: CreateCartItemValue) => {
        try{
            set({loading: true, error: false})
            const data = await Api.cart.postCart(values)
            set(getCartDetails(data))
        }catch(error) {
            console.log(error)
            set({error: true})
        }finally {
            set({loading: false})
        }
    }
}))