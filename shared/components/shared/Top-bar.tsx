import { cn } from '@/shared/lib/utils';
import React from 'react'
import { Container } from './Container';
import { Categories } from './Categories';
import { SortPopUp } from './SortPopUp';
import { Category } from '@prisma/client';
import { categories } from '@/prisma/constants';

interface Props {
    className?: string;
    categories: Category[];
}

export const TopBar: React.FC<Props> = ({ categories, className }) => {
  return (
    <div className={cn('sticky top-0 bg-gray-950 py-5 shadow-sm shadow-black/5 z-10', className)}>
        <Container className='flex items-center justify-between'>
            <Categories  items={categories}/>
            <SortPopUp />
        </Container>
    </div>
  )
}
