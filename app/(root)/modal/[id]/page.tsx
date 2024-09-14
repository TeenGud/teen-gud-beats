import { prisma } from "@/prisma/prisma-client"
import { ChooseBeatModal } from "@/shared/components/ui";
import { notFound } from "next/navigation"


export default async function ProductModalPage({ params: { id } }: { params: {id: string} }) {
    const product = await prisma.product.findFirst({
        where: {
            id: Number(id),
        },
        include: {
            moods: true,
            items: true
        }
    })
    if(!product) return notFound();
    return (
        <ChooseBeatModal beat={product} open={false} onOpenChange={undefined} />
    )
}