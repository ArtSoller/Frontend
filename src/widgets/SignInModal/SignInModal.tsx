import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ValidationError } from "yup"
import { toast } from "react-toastify"

import { SignInModalFields } from "../../features/NavBarFeatures/SignInModalFields"
import { LandingPageModalView } from "../../shared/ui/Modals/LandingPageModalView"

import { RootState } from "../../app/store/store.ts"
import { closeModal } from "../../features/SignInButton/model/SignInModalSlice.ts"

import { authService } from "../../shared/services/auth-service"
import {
    SignInFormData,
    validationSchemas
} from "../../shared/services/validation-service"

export const SignInModal = () => {
    const [data, setData] = useState<SignInFormData>({
        email: "",
        password: ""
    })
    const [errors, setErrors] = useState<Partial<SignInFormData>>({})
    const isValid: boolean = Object.keys(errors).length === 0
    const isModalOpen = useSelector(
        (state: RootState) => state.SignInModal.isOpen
    )
    const validateSchema = validationSchemas.login


    const dispatch = useDispatch()
    const navigate = useNavigate()
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

        authService
            .login(payload)
            .then(() => {
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
                navigate("workspace")
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
        <LandingPageModalView isOpen={isModalOpen} onClose={handleCloseModal}>
            <SignInModalFields
                data={data}
                errors={errors}
                onChange={handleChange}
                onSubmit={handleSubmit}
                isValid={isValid}
            />
        </LandingPageModalView>
    )
}