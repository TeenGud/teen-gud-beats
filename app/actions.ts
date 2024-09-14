'use server'

import { TCheckoutFormValues } from "../shared/constants/TCheckoutFormValues";
import { prisma } from '../prisma/prisma-client'
import { OrderStatus, Prisma } from "@prisma/client";
import { cookies } from "next/headers";
import { createPayment, sendEmail } from "@/shared/lib";
import { EmailTemplate } from "@/shared/components/shared/email-templates/email-template";
import { getUserSession } from "@/shared/lib/get-user-session";
import { hashSync } from "bcrypt";
import { VerificationUserTemplate } from "@/shared/components/shared/email-templates/verification-user";

export async function createOrder(data: TCheckoutFormValues) {
    try {
        const cookieStore = cookies()
        const cartToken = cookieStore.get('cartToken')?.value
        if(!cartToken) throw new Error('Cart token not found')
        const userCart = await prisma.cart.findFirst({
        include: {
            user: true,
            items: {
                include: {
                    moods: true,
                    productItem: {
                        include: {
                            product: true
                        }
                    }
                }
            }
        },
        where: {
            token: cartToken
        }
    })
        if(!userCart) throw new Error('Cart not found')
        if(userCart?.totalAmount === 0) throw new Error('Cart is empty')
        const order = await prisma.order.create({
            data: {
                token: cartToken,
                totalAmount: userCart.totalAmount,
                status: OrderStatus.PENDING,
                items: JSON.stringify(userCart.items),
                fullName: data.firstName + ' ' + data.lastName,
                email: data.email,
                phone: data.phone,
                comment: ''
            }
        })

        await prisma.cart.update({
            where: {
                id: userCart.id
            },
            data: {
                totalAmount: 0
            }
        })

        await prisma.cartItem.deleteMany({
            where: {
                cartId: userCart.id
            }
        })

        const paymentData = await createPayment({amount: order.totalAmount * 91,
            orderId: order.id,
            description: `Payment order ${order.id}`
        })
        if(!paymentData) throw new Error('Payment data not found')
        await prisma.order.update({
            where: {
                id: order.id
            },
            data: {
                paymentId: paymentData.id
            }
        })
        await sendEmail(data.email, 'Teen Gud Beats', EmailTemplate({firstName: data.firstName,
            orderId: order.id,
            totalAmount: order.totalAmount,
            paymentUrl: paymentData.confirmation.confirmation_url}))

        return paymentData.confirmation.confirmation_url
    } catch(err) {
        console.log('[CreateOrder] Server error', err)
    }
}
// re_jcrLWVxQ_DNJADX3VTL3dbX4UKnj8aUjn

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
    try{
        const currentUser = await getUserSession()

        if(!currentUser) throw new Error('User not found')

        const findUser = await prisma.user.findFirst({
            where: {
                id: Number(currentUser.id)
            }
        })

        await prisma.user.update({
            where: {
                id: Number(currentUser.id)
            },
            data: {
                fullName: body.fullName,
                email: body.email,
                password: body.password ? hashSync(body.password as string, 10) : findUser?.password
            }
        })

    }catch(error){
        console.log('Error [UPDATE_USER]', error)
        throw error
    }
}

export async function registerUser(body: Prisma.UserCreateInput) {
    try{
        const user = await prisma.user.findFirst({
            where: {
                email: body.email
            }
        })
        if(user){
            if(!user.verified){
                throw new Error('Email is not confirmed')
            }
            throw new Error('User is already exist')
        }
        const createUser = await prisma.user.create({
            data: {
                fullName: body.fullName,
                email: body.email,
                password: hashSync(body.password, 10),
            }
        })

        const code = Math.floor(100000 + Math.random() * 900000).toString()
        await prisma.verificationCode.create({
            data: {
                code,
                userId: createUser.id
            }
        })

        await sendEmail(
            createUser.email,
            'Teen Gud Beats / Confirm registration',
            VerificationUserTemplate({
                code
            })
        )
    }catch(error){
        console.log('Error [CREATE_USER]', error)
        throw error
    }
}