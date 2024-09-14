import { axiosInstance } from "./instance"
import { CartDTO, CreateCartItemValue } from "./dto/cart.dto"

export const getCart = async (): Promise<CartDTO> => {
    const { data } = await axiosInstance.get<CartDTO>('/cart')
    return data
}

export const removeCartItem = async (id: number): Promise<CartDTO> => {
    const { data } = await axiosInstance.delete<CartDTO>('/cart/' + id)
    return data
}

export const postCart = async (values: CreateCartItemValue): Promise<CartDTO> => {
    const { data } = await axiosInstance.post<CartDTO>('/cart', values)
    return data
}
