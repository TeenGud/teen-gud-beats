'use client'
import { BlackBlock } from "../BlackBlock";
import { Button, Skeleton } from "../../ui";
import { ArrowRight } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface Props {
    className?: string;
    totalAmount: number;
    loading?: boolean;
}

export const CheckoutTotal: React.FC<Props> = ({ className, totalAmount, loading }) => {
    return (
        <BlackBlock className={cn("p-6 sticky top-4", className)}>
            <div className="flex flex-col gap-1">
                <span className="text-xl">Total:</span>
                {loading ? <Skeleton className="w-48 h-11"/> :<span className="text-3xl font-extrabold text-primary h-11">{totalAmount}$</span>}
                <Button type="submit" loading={loading} className="w-full h-14 rounded-2xl mt-6 text-base font-bold">
                    Go to payment
                    <ArrowRight className="w-5 ml-2" />
                </Button>
            </div>
        </BlackBlock>
    )
}