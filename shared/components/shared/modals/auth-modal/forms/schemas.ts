import {z} from 'zod';

export const passwordSchema = z.string().min(4, { message: 'Enter correct password' })

export const formLoginSchema = z.object({
    email: z.string().email({ message: 'Enter correct email' }),
    password: passwordSchema
})

export const formRegisterSchema = formLoginSchema.merge(
    z.object({
        fullName: z.string().min(2, { message: 'Enter your name' }),
        confirmPassword: passwordSchema
    })
).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords are not equal',
    path: ['confirmPassword']
})

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;