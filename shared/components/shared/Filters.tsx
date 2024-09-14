'use client'

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Title } from './Title';
import { Input } from '../ui';
import { RangeSlider } from './RangeSlider';
import { CheckboxFiltersGroup } from './CheckboxFiltersGroup';
import { useFilters, useMoods, useQueryFilters } from '@/shared/hooks';



interface Props {
  className?: string;
}

export const Filters: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
  const { moods, loading } = useMoods();

  const filters = useFilters()
  useQueryFilters(filters)

  const my_moods = moods.map((mood) => ({value: String(mood.id), text: mood.name}))

  const updatePrices = (prices: [number, number]) => {
    filters.setPrices('priceFrom', prices[0])
    filters.setPrices('priceTo', prices[1])
  }


  return (
    <div className={cn(className)}>
        <Title text='Filters' size='sm' className='mb-5 font-bold' />

        <CheckboxFiltersGroup name='beat_types' title={'Beat type'} items={[
            {text: 'New beats', value: '1'},
            {text: 'Old beats', value: '2'}
        ]} className={'mb-5'} onClickCheckbox={filters.setBeatTypes}
        selected={filters.beat_types} loading={false}/>

        <div className='mt-5 border-y border-y-neutral-800 py-6 pb-7'>
            <p>Price from and to</p>
            <div className='flex gap-3 mb-5'>
                <Input type='number' placeholder='0' min={0} max={50} value={String(filters.prices.priceFrom || '0')} onChange={(e) => filters.setPrices('priceFrom', Number(e.target.value))}/>
                <Input type='number' placeholder='100' min={50} max={100} value={String(filters.prices.priceTo || '100')} onChange={(e) => filters.setPrices('priceTo', Number(e.target.value))}/>
            </div>
            <RangeSlider min={0} max={100} step={1} value={[
                filters.prices.priceFrom || 0,
                filters.prices.priceTo || 100
            ]} onValueChange={([priceFrom, priceTo]) => updatePrices([priceFrom, priceTo])}/>
        </div>
        <CheckboxFiltersGroup name='moods' title={'Mood'} defaultItems={my_moods.slice(0, 6)} items={my_moods} limit={5} className={'mt-5'} loading={loading} onClickCheckbox={filters.setMoods} selected={filters.selectedMoods}/>
    </div>
  )
};
