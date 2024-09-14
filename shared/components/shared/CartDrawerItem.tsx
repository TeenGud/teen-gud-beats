import { cn } from '@/shared/lib/utils';
import React from 'react'
import { CartItemDetailsImage } from './cart-item-details/cart-item-details-image';
import { CartItemProps } from './cart-item-details/cart-item-details.types';
import { CartItemInfo } from './cart-item-details/cart-item-info';
import { CartItemDetailsPrice } from './cart-item-details/cart-item-details-price';
import { Trash2Icon } from 'lucide-react';

interface Props extends CartItemProps{
    className: string;
    onClickRemove?: () => void;
}

export const CartDrawerItem: React.FC<Props> = ( {onClickRemove, className, imageUrl, name, beatType, moods, price, disabled} ) => {
  return (
    <div className={cn('flex bg-slate-950 p-5 gap-6', {'opacity-50 pointer-events-none': disabled}, className)}>
        <CartItemDetailsImage src={imageUrl} />
        <div className='flex-1'>
            <CartItemInfo name={name} beatType={beatType} moods={moods.map((mood) => ({name: mood.name}))} />
            <hr className='my-3' />
            <div className='flex items-center justify-center'>
                <div className='flex items-center gap-3'>
                    <CartItemDetailsPrice value={price} />
                    <Trash2Icon onClick={onClickRemove} size={16} className='text-gray-400 cursor-pointer hover:text-gray-600' />
                </div>
            </div>
        </div>
    </div>
  )
}