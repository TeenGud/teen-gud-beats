import { cn } from '@/shared/lib/utils';
import React from 'react'

interface Props {
    className?: string;
    imageUrl: string;
    name: string;
}

export const BeatImage: React.FC<Props> = ({ className, imageUrl, name }) => {
  return (
    <div className={cn('flex items-center flex-1 relative w-full', className)}>
        <img src={imageUrl} alt={name} 
        className='left-2 top-2 z-10 w-[500px] h-[500px]' />
    </div>
  )
}
