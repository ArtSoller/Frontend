import React, { useEffect, useState } from "react"
import { boolean, object, ref, string, ValidationError } from "yup"

import { ButtonContained } from "../../shared/ui/Buttons/ButtonContained"
import { InputField } from "../../shared/ui/InputField"
import { CheckField } from "../../shared/ui/CheckField"

import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store/store.ts"
import { closeModal } from "../../features/SignUpButton/model/SignUpModalSlice.ts"

// TODO: Do something with it.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Logo from "../../shared/media/Screenshot1.svg"

interface formData {
    username: string
    email: string
    password: string
    passwordRepeat: string
    terms: boolean
}

export const SignUpModal = () => {
    const [data, setData] = useState<formData>({
        username: "",
        email: "",
        password: "",
        passwordRepeat: "",
        terms: false
    })
    const [errors, setErrors] = useState<Partial<formData>>({})
    const isValid: boolean = Object.keys(errors).length === 0
    const isModalOpen = useSelector(
        (state: RootState) => state.SignUpModal.isOpen
    )
    const validateSchema = object({
        terms: boolean().isTrue("You must agree to the terms"),
        passwordRepeat: string()
            .oneOf([ref("password")], "Passwords must match")
            .required("Repeat password is required"),
        password: string()
            .matches(
                /(?=.*[A-Z])/,
                "The password must contain at least one capital letter"
            )
            .matches(/(?=.*[0-9])/, "The password must contain at least one number")
            .matches(
                /(?=.*[!@#$%^&*])/,
                "Password must contain at least one special symbol: !@#$%^&*"
            )
            .matches(/(?=.{8,})/, "The password must be at least 8 characters long")
            .required("Password is required"),
        email: string()
            .matches(/^\S+@\S+\.\S+$/g, "Email is incorrect")
            .required("Email is required"),
        username: string().required("Username is required")
    })

    const dispatch = useDispatch()
    const handleCloseModal = () => {
        dispatch(closeModal())
    }

    const handleChange = (target: { name: string; value: string | boolean }) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        console.log(data)
    }

    useEffect(() => {
        validate()
    }, [data])

    const validate = () => {
        validateSchema
            .validate(data, { abortEarly: false })
            .then(() => setErrors({}))
            .catch((err: ValidationError) => {
                const validationErrors: Record<string, string> = {}
                err.inner.forEach((error: ValidationError) => {
                    if (error.path !== undefined) {
                        validationErrors[error.path] = error.message
                    }
                })
                setErrors(validationErrors)
            })
        return Object.keys(errors).length === 0
    }

    return (
        <div>
            {isModalOpen && (
                <div className='fixed inset-0 flex items-center justify-center z-50'>
                    <div
                        className='fixed inset-0 bg-viat-bg bg-opacity-90 transition-opacity'
                        onClick={handleCloseModal}
                    ></div>

                    <div className='relative grid grid-cols-12 gap-8 bg-white border-2 border-viat-primary rounded-md p-8 w-10/12 max-w-screen-lg'>
                        <div className='col-span-10 col-start-2'>
                            <img src={Logo} alt='Viatorus Logo' className='h-10 w-auto' />
                        </div>
                        <div className='col-span-10 col-start-2 grid grid-cols-2 gap-8'>
                            <div className='bg-viat-bg p-8 rounded-md'>
                                <form
                                    className='flex flex-col space-y-4'
                                    onSubmit={handleSubmit}
                                >
                                    <InputField
                                        label='Username'
                                        name='username'
                                        value={data.username}
                                        error={errors.username}
                                        onChange={handleChange}
                                    />
                                    <InputField
                                        label='Email'
                                        name='email'
                                        value={data.email}
                                        error={errors.email}
                                        onChange={handleChange}
                                    />
                                    <InputField
                                        label='Password'
                                        name='password'
                                        type='password'
                                        value={data.password}
                                        error={errors.password}
                                        onChange={handleChange}
                                    />
                                    <InputField
                                        label='Repeat password'
                                        name='passwordRepeat'
                                        type='password'
                                        value={data.passwordRepeat}
                                        error={errors.passwordRepeat}
                                        onChange={handleChange}
                                    />
                                    <CheckField
                                        label='I agree with Terms & Conditions'
                                        name='terms'
                                        value={data.terms}
                                        error={errors.terms}
                                        onChange={handleChange}
                                    />
                                    <ButtonContained label='Sign Up' disabled={!isValid} />
                                </form>
                            </div>
                            <div className='flex items-center justify-center'>
                                <h2 className='text-3xl font-bold'>Come join Us</h2>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}