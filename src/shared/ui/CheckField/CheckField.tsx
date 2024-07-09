import {
    Checkbox,
    createTheme,
    FormControlLabel,
    FormHelperText,
    ThemeProvider
} from "@mui/material"
import React from "react"

const theme = createTheme({
    components: {
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: "#A9B5CC",
                    "&:hover": {
                        backgroundColor: "rgba(45, 54, 72, 0.1)"
                    },
                    "&.Mui-checked": {
                        color: "#2D3648",
                        "&:hover": {
                            backgroundColor: "rgba(45, 54, 72, 0.2)"
                        }
                    },
                    "&.Mui-disabled": {
                        color: "#A9B5CC",
                        opacity: 0.5
                    },
                    "&.Mui-error": {
                        color: "#FF0000",
                        "&.Mui-checked": {
                            color: "#FF0000"
                        },
                        "&:hover": {
                            backgroundColor: "rgba(255, 0, 0, 0.1)"
                        }
                    }
                }
            }
        }
    }
})

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
        <ThemeProvider theme={theme}>
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