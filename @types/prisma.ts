import { Mood, Product, ProductItem } from "@prisma/client";


export type ProductWithRelations = Product & { items: ProductItem[]; moods: Mood[] }