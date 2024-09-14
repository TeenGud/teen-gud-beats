import { cn } from '@/shared/lib/utils';
import React from 'react'

interface Props {
    className?: string;
    name: string;

}

export const MoodComponent: React.FC<Props> = ({ className, name }) => {
  return (
    <div className={cn('flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-primary', className)}>
        <span className='text-xs mb-1'>{name}</span>
    </div>
  )
}
