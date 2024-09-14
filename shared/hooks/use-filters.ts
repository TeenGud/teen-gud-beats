import { useRouter, useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import { useMemo, useState } from "react";

interface PriceProps {
    priceFrom?: number;
    priceTo?: number;
}
interface QueryFilters extends PriceProps{
    beat_types: string;
    moods: string;
  }
export interface Filters {
    beat_types: Set<string>;
    selectedMoods: Set<string>
    prices: PriceProps;
}
interface ReturnProps extends Filters {
    setPrices: (name: keyof PriceProps, value: number) => void;
    setBeatTypes: (key: string) => void;
    setMoods: (key: string) => void;
}


export const useFilters = (): ReturnProps => {
    // const router = useRouter()
    const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

    /* Moods filter */
    const [selectedMoods, { toggle: toggleMoods }] = useSet(new Set<string>(searchParams.get('moods')?.split(',')));

    /* Beat type filter */
    const [beat_types, { toggle: toggleBeatType }] = useSet(new Set<string>(searchParams.has('beat_types') ? searchParams.get('beat_types')?.split(',') : []))

    /* Prices filter */
    const [prices, setPrices] = useState<PriceProps>({
        priceFrom: Number(searchParams.get('priceFrom')) || undefined,
        priceTo: Number(searchParams.get('priceTo')) || undefined,
    })

    const updatePrice = (name: keyof PriceProps, value: number) => {
        setPrices((prev) => ({
            ...prev,
            [name]: value,
        }))
      }

    return useMemo(
        () => (
            {
                beat_types,
                selectedMoods,
                prices,
                setPrices: updatePrice,
                setBeatTypes: toggleBeatType,
                setMoods: toggleMoods
            }
        ), [beat_types, selectedMoods, prices]
    ) 
}