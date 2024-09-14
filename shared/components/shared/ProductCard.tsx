'use client'

import Link from 'next/link';
import React, { useState } from 'react'
import { Title } from './Title';
import { Button, ChooseBeatModal, Dialog } from '../ui';
import { Plus } from 'lucide-react';
import { AudioPlayer } from './AudioPlayer';
import { cn } from '@/shared/lib/utils';
import { Product } from '@prisma/client';
import { ProductWithRelations } from '@/@types/prisma';

interface Props {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    musicUrl: string;
    className?: string;
    item: Product;
    altBeatLink: string;
}

export const ProductCard: React.FC<Props> = ({item, id, name, price, imageUrl, musicUrl, className, altBeatLink }) => {
  const [isOpen, setIsOpen] = useState(false) 

  const toggleModal = () => {
    setIsOpen((prev) => !prev)
  }
  return (
    <>
    <div className={cn(className, 'bg-black p-2 rounded-md')}>
        <Link href={`beat/${id}`}>
            <div className='flex justify-center p-6 bg-slate-950 rounded-lg h-[260px]'>
                <img className='w-[215px] h-[215px]' src={imageUrl} alt={name} />
            </div>
            <Title text={name} size='xs' className='mb-1 mt-3 font-bold' />
        </Link>
        <AudioPlayer className={''} beatLink={musicUrl} altBeatLink={altBeatLink}/>
        <div onClick={toggleModal}>
            <div className='flex justify-between items-center mt-4'>
                <span className='text-[20px]'>
                    from <b>{price}$</b>
                </span>
                <Button variant="secondary" className='text-base font-bold'>
                    <Plus size={20} className='mr-1' />
                    Add
                </Button>
            </div>
        </div>
    </div>
    <ChooseBeatModal beat={item as ProductWithRelations} open={isOpen} onOpenChange={toggleModal}/>
    </>
  )
}
