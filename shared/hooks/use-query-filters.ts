import { useEffect, useRef } from "react"
import { Filters } from "./use-filters"
import qs from 'qs'
import { useRouter } from "next/navigation"

export const useQueryFilters = (filters: Filters) => {
    const isMounted = useRef(false)
    const router = useRouter();
    useEffect(() => {
      if(isMounted.current) {
        const params = {
          ...filters.prices,
          beat_types: Array.from(filters.beat_types),
          moods: Array.from(filters.selectedMoods)
        }
        const query = qs.stringify(params, {
          arrayFormat: 'comma'
        })
        router.push(`?${query}`, {scroll: false})
      }
      isMounted.current = true
      }, [filters, router])
}