'use client'

import { createOrder } from "@/app/actions";
import { Container, Title } from "@/shared/components/shared";
import { CheckoutCart, CheckoutPersonalData, CheckoutTotal } from "@/shared/components/shared/checkout";
import { checkoutFormSchema } from "@/shared/components/shared/checkout/schemas/CheckoutFormSchema";
import { TCheckoutFormValues } from "@/shared/constants/TCheckoutFormValues";
import { useCart } from "@/shared/hooks";
import { cn } from "@/shared/lib/utils";
import { Api } from "@/shared/services/api-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";


export default function CheckoutPage() {
    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState(false);
    const { totalAmount, removeCartItem, items, loading } = useCart()
    const form = useForm<TCheckoutFormValues>({
        resolver: zodResolver(checkoutFormSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            phone: '',
        }
    })
    useEffect(() => {
        async function fetchUserInfo() {
            const data = await Api.auth.getMe();
            const [firstName, lastName] = data.fullName.split(' ')

            form.setValue('firstName', firstName)
            form.setValue('lastName', lastName)
            form.setValue('email', data.email)

        }
        if(session){
            fetchUserInfo()
        }
    }, [form, session])
    const onSubmit: SubmitHandler<TCheckoutFormValues> = async (data) => {
        try {
            setSubmitting(true)
            const url = await createOrder(data)
            toast.error('The order has been successfully completed! Proceed to payment...', {
                icon: '✅'
            })
            if(url) location.href = url
        } catch(err){
            console.log(err)
            setSubmitting(false)
            toast.error('Failed to create the order!', {
                icon: '❌'
            })
        }
    }
    return (
        <Container className="mt-8">
            <Title className="text-purple-300 font-extrabold mb-5" size="lg" text="Making an order" />

            <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex gap-10">
                        <div className="flex flex-col gap-10 flex-1 mb-20">
                            <CheckoutCart loading={loading} items={items} removeCartItem={removeCartItem} />
                            <CheckoutPersonalData className={cn({"opacity-40 pointer-events-none": loading})}/>
                        </div>
                        <div className="w-[450px]">
                            <CheckoutTotal loading={loading || submitting} totalAmount={totalAmount} />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Container>
    )
}