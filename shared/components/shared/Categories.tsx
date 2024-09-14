'use client'

import { cn } from '@/shared/lib/utils';
import { useCategoryStore } from '@/shared/store/category';
import { Category } from '@prisma/client';
import React from 'react'

interface Props {
    items: Category[];
    className?: string;
}

// const cats = ['New beats', 'Trap', 'Cloud', 'Sematary', 'Phonk', 'Dark Plugg', 'Plugg', 'Hyperpop', 'Drain']
// const cats = [
//     {id: 1, name: 'New beats'},
//     {id: 2, name: 'Trap'},
//     {id: 3, name: 'Cloud'},
//     {id: 4, name: 'Sematary'},
//     {id: 5, name: 'Phonk'},
//     {id: 6, name: 'Dark Plugg'},
//     {id: 7, name: 'Plugg'},
//     {id: 8, name: 'Hyperpop'},
//     {id: 9, name: 'Drain'},
//     {id: 10, name: 'Thrill'},
// ]

export const Categories: React.FC<Props> = ({ items, className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId)
  return (
    <div className={cn('inline-flex gap-1 bg-dark-50 p-1 rounded-2xl' ,className)}>
        {items.map(({name, id}, index) => (
            <a className={cn('flex items-center font-bold h-11 rounded-2xl px-5 text-white-400 transition hover:text-primary', 
                categoryActiveId === id && 'bg-white-100 shadow-sm text-primary'
            )} key={index}
            href={`/#${name}`}>
                <button>
                    {name}
                </button>
            </a>
        ))
        }
    </div>
  )
}
