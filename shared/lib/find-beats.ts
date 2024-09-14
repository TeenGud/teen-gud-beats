import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
    query?: string;
    sortBy?: string;
    beat_types?: string;
    moods?: string;
    priceFrom?: string;
    priceTo?: string;
}
const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 100;

export const findBeats = async (params: GetSearchParams) => {
    const beatTypes = params.beat_types?.split(',').map(Number)
    const moodsArr = params.moods?.split(',').map(Number)

    const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE
    const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE

    const categories = await prisma.category.findMany({
        include: {
          products: {
            orderBy: {
                id: 'desc'
            },
            where: {
                moods: moodsArr ? {
                    some: {
                        id: {
                            in: moodsArr
                        }
                    }
                } : undefined,
                items: {
                    some: {
                        newOrOld: {
                            in: beatTypes
                        },
                    },
                    every: {
                        price: {
                            gte: minPrice,
                            lte: maxPrice
                        }

                    }
                },
                
            },
            include: {
              moods: true,
              items: {
                where: {
                    price: {
                        gte: minPrice,
                        lte: maxPrice
                    }
                },
                orderBy: {
                    price: 'asc'
                }
              }
            }
          }
        }
      })
    return categories;
}