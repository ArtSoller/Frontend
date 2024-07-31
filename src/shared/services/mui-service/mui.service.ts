import { createTheme } from "@mui/material"

const baseTheme = createTheme({
    palette: {
        primary: {
            main: "#2D3648"
        },
        error: {
            main: "#2D3648"
        },
        text: {
            primary: "#2D3648",
            secondary: "#A9B5CC"
        },
        background: {
            default: "#FFFFFF"
        }
    }
})

export const muiTheme = createTheme({
    ...baseTheme,
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: baseTheme.palette.text.secondary
                        },
                        "&:hover fieldset": {
                            borderColor: baseTheme.palette.primary.main
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: baseTheme.palette.primary.main
                        },
                        "& .MuiInputBase-input": {
                            backgroundColor: baseTheme.palette.background.default
                        },
                        "&.Mui-error": {
                            "& fieldset": {
                                borderColor: baseTheme.palette.primary.main
                            },
                            "&:hover fieldset": {
                                borderColor: baseTheme.palette.primary.main
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: baseTheme.palette.primary.main
                            }
                        }
                    }
                }
            }
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    color: baseTheme.palette.text.secondary,
                    "&:hover": {
                        backgroundColor: `rgba(${baseTheme.palette.primary.main}, 0.1)`
                    },
                    "&.Mui-checked": {
                        color: baseTheme.palette.primary.main,
                        "&:hover": {
                            backgroundColor: `rgba(${baseTheme.palette.primary.main}, 0.2)`
                        }
                    },
                    "&.Mui-disabled": {
                        color: baseTheme.palette.text.secondary,
                        opacity: 0.5
                    },
                    "&.Mui-error": {
                        color: baseTheme.palette.primary.main,
                        "&.Mui-checked": {
                            color: baseTheme.palette.primary.main
                        },
                        "&:hover": {
                            backgroundColor: `rgba(${baseTheme.palette.primary.main}, 0.1)`
                        }
                    }
                }
            }
        }
    }
})