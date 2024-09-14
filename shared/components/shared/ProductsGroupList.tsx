'use client'

import React, { useEffect } from 'react'
import { Title } from './Title';
import { cn } from '@/shared/lib/utils';
import { ProductCard } from './ProductCard';
import { useIntersection } from 'react-use'
import { useCategoryStore } from '@/shared/store/category';
import { ProductWithRelations } from '@/@types/prisma';


interface Props {
    title: string;
    items: ProductWithRelations[];
    categoryId: number;
    className?: string;
    listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({ 
    title,
    items,
    categoryId,
    className,
    listClassName }) => {
  const setActiveCategoryId = useCategoryStore((state) => state.setActiveId)
  const intersectionRef = React.useRef(null)
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.1
  })
  useEffect(() => {
    if(intersection?.isIntersecting) {
        setActiveCategoryId(categoryId)
    }
    // console.log(title, categoryId)
  }, [categoryId, intersection?.isIntersecting, title, setActiveCategoryId])
  return (
    <div className={className} id={title} ref={intersectionRef}>
        <Title text={title} size='lg' className='font-extrabold mb-5' />
        <div className={cn(listClassName, 'grid grid-cols-3 gap-[50px]')}>
            {items.map((product, i) => (<>
                <ProductCard item={product} key={product.name} id={product.id} name={product.name} price={product.items[0].price} imageUrl={product.imageUrl} musicUrl={product.musicUrl} altBeatLink={product.altMusicUrl}/>
                </>
            ))}
        </div>
    </div>
  )
}
