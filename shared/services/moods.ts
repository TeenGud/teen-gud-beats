import { Mood, Product } from "@prisma/client"
import { axiosInstance } from "./instance"
import { ApiRoutes } from "./constants"

export const getAll = async (): Promise<Mood[]> => {
    const {data} = await axiosInstance.get<Mood[]>(ApiRoutes.MOODS)

    return data
}