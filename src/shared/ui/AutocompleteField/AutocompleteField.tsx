import React from "react"
import { Autocomplete, TextField } from "@mui/material"

interface Option {
    id: number
    name: string
}

interface AutocompleteFieldProps {
    options: Option[]
    label: string
    value: Option | null
    searchTerm: string
    onSearchTermChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onValueChange: (newValue: Option | null) => void
    disabled?: boolean
}

export const AutocompleteField: React.FC<AutocompleteFieldProps> = ({
                                                                        options,
                                                                        label,
                                                                        value,
                                                                        searchTerm,
                                                                        onSearchTermChange,
                                                                        onValueChange,
                                                                        disabled = false
                                                                    }) => {
    return (
        <Autocomplete
            options={options}
            getOptionLabel={option => option.name}
            renderInput={params => (
                <TextField
                    {...params}
                    label={label}
                    variant='outlined'
                    value={searchTerm}
                    onChange={onSearchTermChange}
                />
            )}
            value={value}
            onChange={(_, newValue) => onValueChange(newValue)}
            disabled={disabled}
            isOptionEqualToValue={(option, value) => option.id === value.id}
        />
    )
}