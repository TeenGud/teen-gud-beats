import { CartDTO, CartItemDTO } from "../services/dto/cart.dto";

export type CartStateItem = {
    id: number;
    name: string;
    imageUrl: string;
    price: number;
    beatType: 1|2|3;
    moods: Array<{name: string}>;
    disabled: boolean;

}

interface ReturnProps {
    items: CartStateItem[];
    totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
    const totalAmount = data.items.reduce((acc: number, item: CartItemDTO) => acc + item.productItem.price, 0)

    const items: CartStateItem[] = data.items.map((item: CartItemDTO) => ({
        disabled: false,
        id: item.id,
        name: item.productItem.product.name,
        imageUrl: item.productItem.product.imageUrl,
        price: item.productItem.price,
        beatType: item.productItem.beatType,
        moods: item.moods.map((mood) => ({
            name: mood.name
        }))
    }))

    return {
        items,
        totalAmount
    }

}