import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ValidationError } from "yup"
import { toast } from "react-toastify"

import { SignUpModalFields } from "../../features/NavBarFeatures/SignUpModalFields"
import { LandingPageModalView } from "../../shared/ui/Modals/LandingPageModalView"

import { RootState } from "../../app/store/store.ts"
import { closeModal } from "../../features/SignUpButton/model/SignUpModalSlice.ts"
import { authService } from "../../shared/services/auth-service"

import {
    SignUpFormData,
    validationSchemas
} from "../../shared/services/validation-service"

export const SignUpModal = () => {
    const [data, setData] = useState<SignUpFormData>({
        username: "",
        email: "",
        password: "",
        passwordRepeat: "",
        terms: false
    })
    const [errors, setErrors] = useState<Partial<SignUpFormData>>({})
    const isValid: boolean = Object.keys(errors).length === 0
    const isModalOpen = useSelector(
        (state: RootState) => state.SignUpModal.isOpen
    )
    const validateSchema = validationSchemas.registration


    const dispatch = useDispatch()
    const navigate = useNavigate()
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
        const { username, email, password } = data
        const payload = { username, email, password }
        const toastId = toast.loading("Please wait patiently...", {
            position: "top-center"
        })

        authService
            .registration(payload)
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
                console.error("Error during registration:", error)
                toast.update(toastId, {
                    render: "Error during registration",
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
            <SignUpModalFields
                data={data}
                errors={errors}
                onChange={handleChange}
                onSubmit={handleSubmit}
                isValid={isValid}
            />
        </LandingPageModalView>
    )
}