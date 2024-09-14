import React from 'react'
import { cn } from '@/shared/lib/utils';
import { ProductWithRelations } from '@/@types/prisma';
import { Dialog } from '../../ui';
import { DialogContent } from '../../ui/dialog';
import { ProductForm } from '../ProductForm';

interface Props {
    beat: ProductWithRelations;
    className?: string;
    open: boolean;
    onOpenChange: any;
}

export const ChooseBeatModal: React.FC<Props> = ({ className, beat, open, onOpenChange }) => {
  return (
    <Dialog open={open && Boolean(beat)} onOpenChange={onOpenChange}>
        <DialogContent className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-slate-900 overflow-hidden', className)}>
            <ProductForm product={beat} onOpenChange={onOpenChange}/>
        </DialogContent>
    </Dialog>
  )
}
