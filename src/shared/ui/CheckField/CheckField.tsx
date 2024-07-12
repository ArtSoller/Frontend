import React from "react"

import {
    Checkbox,
    FormControlLabel,
    FormHelperText,
    ThemeProvider
} from "@mui/material"

import { muiTheme } from "../../services/mui-service"


interface CheckBox {
    label: string
    value: boolean
    name: string
    error?: boolean | undefined
    onChange: (event: { name: string; value: boolean }) => void
}

export const CheckField = ({
                               label,
                               value,
                               name,
                               error,
                               onChange
                           }: CheckBox) => {
    const handleChange = ({
                              target
                          }: React.ChangeEvent<HTMLInputElement>): void => {
        onChange({ name: target.name, value: target.checked })
    }
    return (
        <ThemeProvider theme={muiTheme}>
            <FormControlLabel
                control={
                    <Checkbox checked={value} onChange={handleChange} name={name} />
                }
                label={label}
            />
            {error && <FormHelperText error>{error}</FormHelperText>}
        </ThemeProvider>
    )
}