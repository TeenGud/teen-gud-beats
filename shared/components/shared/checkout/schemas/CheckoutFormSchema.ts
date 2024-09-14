import {z} from 'zod'

export const checkoutFormSchema = z.object({
    firstName: z.string().min(2, { message: 'Name should contain at least 2 symbols' }),
    lastName: z.string().min(2, { message: 'Surname should contain at least 2 symbols' }),
    email: z.string().email({message: 'Type the correct email'}),
    phone: z.string().min(10, {message: 'Type the correct phone number'})
})

