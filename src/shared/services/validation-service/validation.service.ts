import { object, string, ref, boolean } from "yup"

export interface SignUpFormData {
    username: string
    email: string
    password: string
    passwordRepeat: string
    terms: boolean
}

export interface SignInFormData {
    email: string
    password: string
}

export const validationSchemas = {
    registration: object({
        terms: boolean().isTrue("You must agree to the terms"),
        passwordRepeat: string()
            .oneOf([ref("password")], "Passwords must match")
            .required("Repeat password is required"),
        password: string()
            .matches(
                /(?=.[A-Z])/,
                "The password must contain at least one capital letter"
            )
            .matches(/(?=.[0-9])/, "The password must contain at least one number")
            .matches(
                /(?=.[!@#$%^&])/,
                "Password must contain at least one special symbol: !@#$%^&"
            )
            .matches(/(?=.{8,})/, "The password must be at least 8 characters long")
            .required("Password is required"),
        email: string()
            .matches(/^\S+@\S+\.\S+$/g, "Email is incorrect")
            .required("Email is required"),
        username: string().required("Username is required")
    }),
    login: object({
        password: string()
            .matches(
                /(?=.[A-Z])/,
                "The password must contain at least one capital letter"
            )
            .matches(/(?=.[0-9])/, "The password must contain at least one number")
            .matches(
                /(?=.[!@#$%^&])/,
                "Password must contain at least one special symbol: !@#$%^&"
            )
            .matches(/(?=.{8,})/, "The password must be at least 8 characters long")
            .required("Password is required"),
        email: string()
            .matches(/^\S+@\S+\.\S+$/g, "Email is incorrect")
            .required("Email is required")
    })
}