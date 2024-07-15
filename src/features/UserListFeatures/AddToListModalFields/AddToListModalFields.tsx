import { useState } from "react"
import { Autocomplete, TextField } from "@mui/material"

import { httpService } from "../../../shared/services/http-service"

interface Currency {
    id: number
    name: string
}

interface City {
    id: number
    name: string
    countryId: number
}

export const AddToListModalFields = () => {
    const [currencies, setCurrencies] = useState<Currency[]>([])
    const [cities, setCities] = useState<City[]>([])
    const [selectedCurrency, setSelectedCurrency] = useState<Currency | null>(null)
    const [selectedCity, setSelectedCity] = useState<City | null>(null)

    const handleCurrencySearch = async (searchTerm: string) => {
        try {
            const response = await httpService.get(`currencies?search=${searchTerm}`)
            setCurrencies(response.data)
        } catch (error) {
            console.error("Error searching currencies:", error)
        }
    }

    const handleCitySearch = async (searchTerm: string) => {
        if (selectedCurrency) {
            try {
                const response = await httpService.get(
                    `cities?search=${searchTerm}&countryId=${selectedCurrency.id}`
                )
                setCities(response.data)
            } catch (error) {
                console.error("Error searching cities:", error)
            }
        }
    }

    const handleSelectCurrency = (currency: Currency | null) => {
        setSelectedCurrency(currency)
        setSelectedCity(null)
        setCities([])
    }

    const handleSelectCity = (city: City | null) => {
        setSelectedCity(city)
    }

    return (
        <>
            <div className='col-span-12'>
                <Autocomplete
                    options={currencies}
                    getOptionLabel={option => option.name}
                    renderInput={params => (
                        <TextField
                            {...params}
                            label='Currency'
                            variant='outlined'
                            onChange={event => handleCurrencySearch(event.target.value)}
                        />
                    )}
                    value={selectedCurrency}
                    onChange={(_, newValue) => handleSelectCurrency(newValue)}
                />
            </div>
            <div className='col-span-12'>
                <Autocomplete
                    options={cities}
                    getOptionLabel={option => option.name}
                    renderInput={params => (
                        <TextField
                            {...params}
                            label='Value'
                            variant='outlined'
                            onChange={event => handleCitySearch(event.target.value)}
                        />
                    )}
                    value={selectedCity}
                    onChange={(_, newValue) => handleSelectCity(newValue)}
                    disabled={!selectedCurrency}
                />
            </div>
        </>
    )
}