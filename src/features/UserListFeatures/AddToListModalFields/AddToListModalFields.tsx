import { useState } from "react"
import { Autocomplete, TextField } from "@mui/material"

import { httpService } from "../../../shared/services/http-service"

interface Country {
    id: number
    name: string
}

interface City {
    id: number
    name: string
    countryId: number
}

export const AddToListModalFields = () => {
    const [countries, setCountries] = useState<Country[]>([])
    const [cities, setCities] = useState<City[]>([])
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
    const [selectedCity, setSelectedCity] = useState<City | null>(null)

    const handleCountrySearch = async (searchTerm: string) => {
        try {
            const response = await httpService.get(`countries?search=${searchTerm}`)
            setCountries(response.data)
        } catch (error) {
            console.error("Error searching countries:", error)
        }
    }

    const handleCitySearch = async (searchTerm: string) => {
        if (selectedCountry) {
            try {
                const response = await httpService.get(
                    `cities?search=${searchTerm}&countryId=${selectedCountry.id}`
                )
                setCities(response.data)
            } catch (error) {
                console.error("Error searching cities:", error)
            }
        }
    }

    const handleSelectCountry = (country: Country | null) => {
        setSelectedCountry(country)
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
                    options={countries}
                    getOptionLabel={option => option.name}
                    renderInput={params => (
                        <TextField
                            {...params}
                            label='Country'
                            variant='outlined'
                            onChange={event => handleCountrySearch(event.target.value)}
                        />
                    )}
                    value={selectedCountry}
                    onChange={(_, newValue) => handleSelectCountry(newValue)}
                />
            </div>
            <div className='col-span-12'>
                <Autocomplete
                    options={cities}
                    getOptionLabel={option => option.name}
                    renderInput={params => (
                        <TextField
                            {...params}
                            label='City'
                            variant='outlined'
                            onChange={event => handleCitySearch(event.target.value)}
                        />
                    )}
                    value={selectedCity}
                    onChange={(_, newValue) => handleSelectCity(newValue)}
                    disabled={!selectedCountry}
                />
            </div>
        </>
    )
}