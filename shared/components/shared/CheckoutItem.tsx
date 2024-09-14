'use client'
import { cn } from "@/shared/lib/utils";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import { CartItemDetailsImage } from "./cart-item-details/cart-item-details-image";
import { CartItemInfo } from "./cart-item-details/cart-item-info";
import { CartItemDetailsPrice } from "./cart-item-details/cart-item-details-price";
import { X } from "lucide-react";

interface Props extends CartItemProps {
    onClickRemove?: () => void;
    className: string;
}

export const CheckoutItem: React.FC<Props> = ({
    name,
    price,
    imageUrl,
    className,
    onClickRemove,
    moods,
    beatType,
    disabled

}) => {
    return (
        <div className={cn('flex items-center justify-between', className, {'opacity-50 pointer-events-none': disabled})}>
            <div className="flex items-center gap-5 flex-1">
                <CartItemDetailsImage src={imageUrl} />
                <CartItemInfo moods={moods} name={name} beatType={beatType}/>
            </div>
            <CartItemDetailsPrice value={price} />
            <div className="flex items-center gap-5 ml-20">
                <button type="button" onClick={onClickRemove}>
                    <X className="text-purple-700 cursor-pointer hover:text-purple-900" size={20} />
                </button>
            </div>
        </div>
    )
}