import {z} from 'zod'
import { checkoutFormSchema } from '../components/shared/checkout/schemas/CheckoutFormSchema'


export type TCheckoutFormValues = z.infer<typeof checkoutFormSchema>