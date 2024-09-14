
import { prisma } from "@/prisma/prisma-client"
import { BeatImage, ChooseBeatForm, Container, GroupVariants, ProductForm, Title } from "@/shared/components/shared";
import { useCartStore } from "@/shared/store";
import { notFound } from "next/navigation"
import toast from "react-hot-toast";

export default async function ProductPage({ params: { id } }: {params: {id: string} }) {
    const product = await prisma.product.findFirst({where: { id: Number(id) }, include: {
        moods: true,
        category: {
            include: {
                products: {
                    include: {
                        items: true,
                    }
                }
            }
        },
        items: true
        
    }})


    if(!product) return notFound();

    return (
        <Container className='flex flex-col my-10'>
            <ProductForm product={product} />
        </Container>
    )
}