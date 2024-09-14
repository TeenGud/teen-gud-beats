'use client'

import { cn } from '@/shared/lib/utils';
import React, { useState } from 'react'
import { BeatImage } from './BeatImage';
import { Title } from './Title';
import { Button } from '../ui';
import { GroupVariants } from './GroupVariants';
import { BeatType, beatTypes } from '@/shared/constants/beat';
import { MoodComponent } from './MoodComponent';
import { Mood, ProductItem } from '@prisma/client';
import { AudioPlayer } from './AudioPlayer';
import { ProductWithRelations } from '@/@types/prisma';

interface Props {
    className?: string;
    name: string;
    imageUrl: string;
    musicUrl: string;
    altMusicUrl: string;
    moods: Mood[];
    items: ProductItem[];
    onClickAddCart?: VoidFunction;
    onAddBeat: (productId: number, moods: number[]) => void;
    loading: boolean;
}

export const ChooseBeatForm: React.FC<Props> = ({ 
    name,
    items,
    imageUrl,
    moods,
    onClickAddCart,
    className,
    musicUrl,
    altMusicUrl,
    onAddBeat,
    loading
 }) => {
  const [type, setType] = useState<BeatType>(1);
  const beatPrice = items.find((item) => item.beatType === type)?.price
  const firstBeatItemId = items[0].id
  const beatItemId = items.find((item) => (item.id - firstBeatItemId) === (type - 1) )?.id
  const idMoods = moods.map((mood) => mood.id)
  const handleClickAdd = () => {
    // onAddBeat?.(type);
    // console.log({
    //     type
    // })
    console.log(beatItemId)
    onAddBeat(beatItemId as number, idMoods)

  }
  return (
    <div className={cn(className, 'flex flex-1')}>
        <BeatImage imageUrl={imageUrl} name={name} />
        <div className='w-[490px] bg-slate-900 p-7 flex flex-col items-center justify-between'>
            <Title text={name} size='md' className='font-extrabold mb-1' />
            <div className='flex justify-between gap-1 mb-1'>
                {moods.map((mood) => (
                    <MoodComponent key={mood.name} name={mood.name} />
                ))}
            </div>
            <GroupVariants className='mt-3 mb-20' items={beatTypes} value={String(type)} onClick={value => setType(Number(value) as BeatType)}/>
            <AudioPlayer className={''} beatLink={musicUrl} altBeatLink={altMusicUrl} />
            <Button
            loading={loading}
            className='h-[55px] px-10 text-base rounded-[18px] w-[300px] my-4'
            onClick={handleClickAdd}>
                Add to cart for {beatPrice} $
            </Button>
        </div>
    </div>
  )
}
