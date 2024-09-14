import { FormProvider, useForm } from "react-hook-form";
import { formLoginSchema, formRegisterSchema, TFormLoginValues, TFormRegisterValues } from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Title } from "../../../Title";
import { FormInput } from "../../../form";
import { Button } from "@/shared/components/ui";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { registerUser } from "@/app/actions";

interface Props {
    onClose?: VoidFunction;
    onClickLogin?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose, onClickLogin }) => {
    const form = useForm<TFormRegisterValues>({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            email: '',
            fullName: '',
            password: '',
            confirmPassword: ''

        }
    })
    const onSubmit = async (data: TFormRegisterValues) => {
        try{
            await registerUser({
                email: data.email,
                fullName: data.fullName,
                password: data.password
            })
            toast.error('Registration successful! Confirm your email',{
                icon: '✅'
            }
            )
            onClose?.()
        }catch(error){
            console.log(error)
            toast.error('Failed to register', {
                icon: '❌'
            })
        }

    }

    return (
        <FormProvider {...form}>
            <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex justify-between items-center">
                    <div className="mr-2">
                        <Title text="Register new account" size="md" className="font-bold" />
                        <p className="text-gray-400">Enter your email, name and password to register</p>
                    </div>
                    <img src="/assets/images/phone-icon.png" alt="Phone Icon" width={60} height={60} />
                </div>
                <FormInput name="email" label="E-Mail" required/>
                <FormInput name="fullName" label="Full name" required/>
                <FormInput name="password" label="Password" type="password" required/>
                <FormInput name="confirmPassword" label="Confirm password" type="password" required/>

                <Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
                    Enter
                </Button>
            </form>
        </FormProvider>
    )
}