'use client'
import { useFormContext } from "react-hook-form";
import { Input } from "../../ui";
import { ClearButton } from "../ClearButton";
import { ErrorText } from "../ErrorText";
import { RequiredSymbol } from "../RequiredSymbol";
import { useRef } from 'react';
import { IMaskInput } from 'react-imask';

interface Props extends React.InputHTMLAttributes<HTMLInputElement>{
    name: string;
    label?: string;
    required?: boolean;
    className?: string;
    isPhone?: boolean;
}

export const FormInput: React.FC<Props> = ({ className, name, label, required, isPhone = false, ...props }) => {
    const {register, formState: { errors }, watch, setValue} = useFormContext()
    const value = watch(name);
    const errorText = errors[name]?.message as string;
    const onClickClear = () => {
        setValue(name, '', { shouldValidate: true })
    }
    const ref = useRef(null);
    const inputRef = useRef(null);

    return <div className={className}>
        {label && (
            <p className="font-medium mb-2">
                {label} {required && <RequiredSymbol />}
            </p>
        )}
        <div className="relative">
            {isPhone ? <IMaskInput
  mask={Number}
  
  className="h-12 text-md flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
  radix="+"
  value=""
  unmask={false} // true|false|'typed'

  // DO NOT USE onChange TO HANDLE CHANGES!
  // USE onAccept INSTEAD
  onAccept={
    // depending on prop above first argument is
    // `value` if `unmask=false`,
    // `unmaskedValue` if `unmask=true`,
    // `typedValue` if `unmask='typed'`
    (value, mask) => undefined
  }
  // ...and more mask props in a guide

  // input props also available
  placeholder='Enter number here'
/> : <Input {...register(name)} className="h-12 text-md" {...props} />}
            {value && <ClearButton onClick={onClickClear} />}
        </div>
        {errorText && <ErrorText text={errorText} className="mt-2"/>}
    </div>
}