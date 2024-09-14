'use client'
import { BlackBlock } from "../BlackBlock";
import { FormInput } from "../form";
import { Controller, useFormContext } from "react-hook-form";


interface Props {
    className?: string;
}

export const CheckoutPersonalData: React.FC<Props> = ({ className }) => {
    const { control } = useFormContext();
    return (
        <BlackBlock title="2. Personal data" className={className}>
            <div className="grid grid-cols-2 gap-5">
                <FormInput name="firstName" className="text-base" placeholder="Name"/>
                <FormInput name="lastName" className="text-base" placeholder="Surname"/>
                <FormInput name="email" className="text-base" placeholder="E-Mail"/>
                <Controller control={control} name="phone" render={({field}) => <>
                <FormInput onChange={field.onChange} name="phone" className="text-base" placeholder="Phone" />
                </>}/>
            </div>
        </BlackBlock>
    )
}