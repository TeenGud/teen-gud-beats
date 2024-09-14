import { BeatType } from '@/shared/constants/beat';
import { CartStateItem } from '@/shared/lib/get-cart-details';
import { cn } from '@/shared/lib/utils';
import { Mood } from '@prisma/client';

interface Props {
  name: string;
  beatType: BeatType;
  className?: string;
  moods: CartStateItem['moods'];
}

export const CartItemInfo: React.FC<Props> = ({ name, beatType, className, moods }) => {
  let beatTypeString = ''
  switch(beatType){
    case 1 :
      beatTypeString = 'mp3 lease'
      break
    case 2 :
      beatTypeString = 'wav lease'
      break
    case 3 :
      beatTypeString = 'Exclusice rights'
      break
  }
  return (
    <div>
      <div className={cn('flex items-center justify-between', className)}>
        <h2 className="text-base font-bold flex-1 leading-6">{name}</h2>
      </div>
      <p className='text-xs text-gray-400'>{beatTypeString}</p>
      <p className='text-xs text-primary'>{moods.map((mood) => mood.name).join(', ')}</p>
    </div>
  );
};
