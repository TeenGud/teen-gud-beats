'use client'
import { useCartStore } from "@/shared/store";
import toast from "react-hot-toast";
import { ChooseBeatForm } from "./ChooseBeatForm";
import { ProductWithRelations } from "@/@types/prisma";

interface Props {
    className?: string;
    product: ProductWithRelations;
    onOpenChange?: (props: boolean) => void
}

export const ProductForm: React.FC<Props> = ({ className, product, onOpenChange }) => {
    const [addCartItem, loading] = useCartStore(state => [state.addCartItem, state.loading])
    const onAddBeat = async (productItemId: number, moods: number[]) => {
        try{
          await addCartItem({
            productItemId: productItemId,
            moods: moods,
          })
          toast.success('The beat has been added to your cart')
          if(onOpenChange) onOpenChange(false)
        }catch(error){
          // console.error(error)
          toast.error('Cannot add the beat to your cart')
    
        }
      }
    return (
        <div className={className}>
            <ChooseBeatForm loading={loading} onAddBeat={onAddBeat} name={product.name} imageUrl={product.imageUrl} musicUrl={product.musicUrl} altMusicUrl={product.altMusicUrl} moods={product.moods} items={product.items} />
        </div>
    )
}