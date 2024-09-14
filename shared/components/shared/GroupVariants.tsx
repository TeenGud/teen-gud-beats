'use client'

import { cn } from '@/shared/lib/utils';
import React from 'react'

type Variant = {
    name: string;
    value: string;
    disabled?: boolean;
}

interface Props {
    items: readonly Variant[]
    className?: string;
    defaultValue?: string;
    onClick?: (value: Variant['value']) => void;
    value?: Variant['value'] 
}

export const GroupVariants: React.FC<Props> = ({items, onClick, className, value}) => {
  return (
    <div className={cn('flex justify-between bg-slate-950 rounded-3xl p-1 select-none', className)}>
        {
            items.map((item) => (
                <button key={item.name} onClick={() => onClick?.(item.value)}
                className={cn('flex items-center justify-center cursor-pointer h-[40px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm',
                    {
                        'bg-primary shadow': item.value === value,
                        'text-gray-500 opacity-50 pointer-events-none': item.disabled
                    }
                )}>
                    {item.name}
                </button>
            ))
        }
    </div>
  )
}
