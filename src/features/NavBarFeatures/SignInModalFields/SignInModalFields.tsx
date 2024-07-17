import React, { useState } from "react"

import { LandingPageModalLayout } from "../../../shared/ui/Layouts/LandingPageModalLayout"
import { InputField } from "../../../shared/ui/InputField"
import { ButtonContained } from "../../../shared/ui/Buttons/ButtonContained"

import Logo from "../../../shared/media/Logo.svg"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface SignInFormProps {
    data: {
        email: string
        password: string
    }
    errors: Partial<{
        email: string
        password: string
    }>
    onChange: (target: { name: string; value: string }) => void
    onSubmit: (ea: React.FormEvent<HTMLFormElement>) => void
    isValid: boolean
}

export const SignInModalFields = ({
         data,
         errors,
         onChange,
         onSubmit,
         isValid
     }:SignInFormProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const signUpFields: Array<{
        label: string
        name: keyof SignInFormProps["data"]
        type: string
    }> = [
        {
            label: "Email",
            name: "email",
            type: "email"
        },
        {
            label: "Password",
            name: "password",
            type: showPassword ? "text" : "password"
        }
    ]
    return (
        <>
            <div className='col-span-10 col-start-2'>
                <img
                    src={Logo.toString()}
                    alt='Capital Compass Logo'
                    className='h-10 w-auto'
                />
            </div>
            <LandingPageModalLayout>
                <form className='flex flex-col space-y-4' onSubmit={onSubmit}>
                    {signUpFields.map(field => (
                        <div key={field.name} className="relative">
                            <InputField
                                key={field.name}
                                {...field}
                                value={data[field.name]}
                                error={errors[field.name]}
                                onChange={onChange}
                            />
                                {field.name === "password" && (
                                    <div
                                        onClick={togglePasswordVisibility}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                    >
                                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </div>
                                )}
                        </div>
                    ))}
                    <ButtonContained label='Sign In' disabled={!isValid} />
                </form>
            </LandingPageModalLayout>
        </>
    )
}