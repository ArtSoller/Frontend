import React from "react"

import { TextField, ThemeProvider } from "@mui/material"
import { muiTheme } from "../../services/mui-service"

interface InputField {
    label: string
    type?: string
    value: string
    name: string
    error: string | undefined
    onChange: (event: { name: string; value: string }) => void
}

export const InputField = ({
                               label,
                               type = "text",
                               value,
                               name,
                               error,
                               onChange
                           }: InputField) => {
    const handleChange = ({
                              target
                          }: React.ChangeEvent<HTMLInputElement>): void => {
        onChange({ name: target.name, value: target.value })
    }
    return (
        <ThemeProvider theme={muiTheme}>
            <TextField
                label={label}
                name={name}
                type={type}
                value={value}
                error={!!error}
                helperText={error ? error : ""}
                onChange={handleChange}
                variant='outlined'
                fullWidth
            />
        </ThemeProvider>
    )
}