'use client'
import { CartStateItem } from "@/shared/lib/get-cart-details";
import { BlackBlock } from "../BlackBlock";
import { CheckoutItem } from "../CheckoutItem";
import { CheckoutItemSkeleton } from "../CheckoutItemSkeleton";

interface Props {
    className?: string;
    items: CartStateItem[];
    removeCartItem: (id: number) => void;
    loading?: boolean; 
}

export const CheckoutCart: React.FC<Props> = ({ className, items, removeCartItem, loading }) => {
    return (
        <BlackBlock title="1. Cart" className={className}>
            <div className="flex flex-col gap-5">
                {
                    loading ?
                    [...Array(4)].map((_, index) => <CheckoutItemSkeleton key={index} />) :
                    items.map((item) => (
                        <CheckoutItem   key={item.id} className={""} id={item.id} imageUrl={item.imageUrl} details={""} name={item.name} price={item.price} beatType={item.beatType} moods={item.moods} onClickRemove={() => removeCartItem(item.id)} disabled={item.disabled} />
                    ))
                }
            </div>
        </BlackBlock>
    )
}