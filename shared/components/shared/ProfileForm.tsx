'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { formRegisterSchema, TFormRegisterValues } from "./modals/auth-modal/forms/schemas"
import { User } from "@prisma/client"
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { Container } from "./Container";
import { Title } from "./Title";
import { FormInput } from "./form";
import { Button } from "../ui";
import { updateUserInfo } from "@/app/actions"

interface Props {
    data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
    const form = useForm({
        resolver: zodResolver(formRegisterSchema),
        defaultValues: {
            fullName: data.fullName,
            email: data.email,
            password: '',
            confirmPassword: '',
        },
    })
    const onClickSignOut = () => {
        signOut({
            callbackUrl: '/'
        })
    }
    const onSubmit = async (data: TFormRegisterValues) => {
        try{
            await updateUserInfo({
                email: data.email,
                fullName: data.fullName,
                password: data.password,
            })
            toast.error('Data updated', {
                icon: '✅'
            })
        }catch(error) {
            return toast.error('Error updating data.', {
                icon: '❌'
            })
        }
    }

    return (
        <Container className="my-10">
            <Title text="Personal data" size="md" className="font-bold" />
            <FormProvider {...form}>
                <form className="flex flex-col gap-5 w-96 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormInput name="email" label="E-Mail" required />
                    <FormInput name="fullName" label="Full name" required />

                    <FormInput type="password" name="password" label="New password" required />
                    <FormInput type="password" name="confirmPassword" label="Confirm new passport" required />

                    <Button disabled={form.formState.isSubmitting} className="text-base mt-10" type="submit">
                        Save
                    </Button>
                    <Button onClick={onClickSignOut}
                    variant="secondary" disabled={form.formState.isSubmitting} className="text-base mb-2" type="button">
                        Quit
                    </Button>
                </form>
            </FormProvider>
        </Container>
    )
}