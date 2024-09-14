import { Api } from "@/shared/services/api-client";
import { Mood } from "@prisma/client";
import { useEffect, useState } from "react";

type MoodItem = Pick<Mood, 'id' | 'name'>

export const useMoods = () => {
    const [moods, setMoods] = useState<MoodItem[]>([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function fetchMoods() {
            try {
                setLoading(true)
                const moods = await Api.moods.getAll()
                setMoods(moods)
            } catch(error) {
                setLoading(true)
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchMoods()
    }, [])

    return { moods, loading }
}