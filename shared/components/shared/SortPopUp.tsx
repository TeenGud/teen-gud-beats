import { cn } from '@/shared/lib/utils';
import { ArrowUpDown } from 'lucide-react';
import React from 'react'

interface Props {
    className?: string;
}

export const SortPopUp: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('inline-flex items-center gap-1 bg-gray-900 px-5 h-[52px] rounded-2xl cursor-pointer', className)}>
        <ArrowUpDown size={16} />
        <b>Sorting: </b>
        <b className='text-primary'>popular</b>
    </div>
  )
}
