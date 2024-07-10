import React, { useEffect, useState } from "react"
import { object, string, ValidationError } from "yup"

import { ButtonContained } from "../../shared/ui/Buttons/ButtonContained"
import { InputField } from "../../shared/ui/InputField"

import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../app/store/store.ts"
import { closeModal } from "../../features/SignInButton/model/SignInModalSlice.ts"

// TODO: Do something with it.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Logo from "../../shared/media/Logo.svg"
import { toast } from "react-toastify"
import { httpService } from "../../shared/services/http-service"
interface formData {
    email: string
    password: string
}

export const SignInModal = () => {
    const [data, setData] = useState<formData>({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState<Partial<formData>>({})
    const isValid: boolean = Object.keys(errors).length === 0
    const isModalOpen = useSelector(
        (state: RootState) => state.SignInModal.isOpen
    )
    const validateSchema = object({
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
            .required("Email is required")
    })

    const dispatch = useDispatch()
    const handleCloseModal = () => {
        dispatch(closeModal())
    }

    const handleChange = (target: { name: string; value: string }) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        const { email, password } = data
        const payload = { email, password }
        const toastId = toast.loading("Please wait patiently...", {
            position: "top-center"
        })

        httpService
            .post("http://localhost:8080/api/version1/login", { payload })
            .then(res => {
                console.log(res.data)
                toast.update(toastId, {
                    render: "Successfully!",
                    position: "top-center",
                    type: "success",
                    isLoading: false,
                    autoClose: 3000
                })
            })
            .catch(error => {
                console.error("Error during login:", error)
                toast.update(toastId, {
                    render: "Error during login",
                    position: "top-center",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000
                })
            })
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
                        className='fixed inset-0 bg-viat-bg bg-opacity-20 transition-opacity'
                        onClick={handleCloseModal}
                    ></div>
                    <div className='col-span-6 col-start-2 grid grid-cols-1 gap-8'>
                        <div className='bg-viat-wh viat-wh p-8 rounded-md'>
                            <div className='col-span-10 col-start-2 my-4'>
                                Capital Compass
                            </div>
                            <form
                                className='flex flex-col space-y-4'
                                onSubmit={handleSubmit}
                            >
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
                                <ButtonContained label='Sign In' disabled={!isValid}/>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}