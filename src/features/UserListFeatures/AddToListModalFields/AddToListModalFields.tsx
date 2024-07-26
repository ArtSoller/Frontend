import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { closeModal } from "../../NavBarFeatures/AddToListButton/model/AddToListModalSlice.ts";
import { httpService } from "../../../shared/services/http-service";
import { AutocompleteField } from "../../../shared/ui/AutocompleteField";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface Currency {
    currency_id: number;
    name: string;
}

interface FieldsData {
    currencies: Currency[];
    selectedCurrency: Currency | null;
    upperExchangeRate: string;
    lowerExchangeRate: string;
    currencySearchTerm: string;
    currentExchangeRate: string;
}

export const AddToListModalFields = () => {
    const [data, setData] = useState<FieldsData>({
        currencies: [],
        selectedCurrency: null,
        upperExchangeRate: "",
        lowerExchangeRate: "",
        currencySearchTerm: "",
        currentExchangeRate: ""
    });

    const dispatch = useDispatch();

    const handleChange = (target: {
        name: string;
        value: string | Currency | null;
    }) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }));
        if (target.name === "selectedCurrency") {
            if (target.value && typeof target.value !== 'string') {
                fetchExchangeRate(target.value);
            } else {
                setData(prevState => ({
                    ...prevState,
                    currentExchangeRate: ""
                }));
            }
        }
    };

    const handleSearch = async (searchTerm: string) => {
        try {
            const response = await httpService.get(`currencies?search=${searchTerm}`);
            setData(prevState => ({
                ...prevState,
                currencies: response.data
            }));
        } catch (error) {
            console.error("Error searching currencies:", error);
        }
    };

    const fetchExchangeRate = async (currency: Currency) => {
        try {
            const response = await httpService.get(`exchange-rate?currency_id=${currency.currency_id}`);
            setData(prevState => ({
                ...prevState,
                currentExchangeRate: response.data.rate
            }));
        } catch (error) {
            console.error("Error fetching exchange rate:", error);
        }
    };

    const handleSubmit = async () => {
        const currentRate = parseFloat(data.currentExchangeRate);
        const upperAlertRate = parseFloat(data.upperExchangeRate);
        const lowerAlertRate = parseFloat(data.lowerExchangeRate);

        if (data.selectedCurrency && data.upperExchangeRate && data.lowerExchangeRate) {
            if (upperAlertRate < currentRate) {
                toast.error("Upper Alert Exchange Rate cannot be less than the Current Exchange Rate");
                return;
            }
            if (lowerAlertRate > currentRate) {
                toast.error("Lower Alert Exchange Rate cannot be greater than the Current Exchange Rate");
                return;
            }
            try {
                const userId = localStorage.getItem('user_id');
                const response = await httpService.post('/rules', {
                    user_id: userId,
                    currency_id: data.selectedCurrency.currency_id,
                    upper_alert_rate: data.upperExchangeRate,
                    lower_alert_rate: data.lowerExchangeRate
                });
                console.log("Alert added successfully:", response.data);
                dispatch(closeModal());
            } catch (error) {
                console.error("Error adding alert:", error);
            }
        } else {
            console.error("Missing required fields");
        }
    };

    return (
        <>
            <div className='col-span-12 text-2xl font-bold mb-4'>
                Create your alert
            </div>
            <div className="alert alert-primary col-span-12" role="alert">
                Upper Alert Exchange Rate cannot be less than the Current Exchange Rate.<br/>
                Lower Alert Exchange Rate cannot be greater than the Current Exchange Rate.
            </div>
            <div className='col-span-12'>
                <AutocompleteField
                    options={data.currencies}
                    label='Currency'
                    value={data.selectedCurrency}
                    searchTerm={data.currencySearchTerm}
                    onSearchTermChange={event => {
                        handleChange({
                            name: "currencySearchTerm",
                            value: event.target.value
                        });
                        handleSearch(event.target.value);
                    }}
                    onValueChange={newValue =>
                        handleChange({name: "selectedCurrency", value: newValue})
                    }
                />
            </div>
            {data.selectedCurrency && (
                <div className='col-span-12'>
                    <TextField
                        label='Current Exchange Rate'
                        variant='outlined'
                        value={data.currentExchangeRate}
                        InputProps={{
                            readOnly: true,
                        }}
                        fullWidth
                    />
                </div>
            )}
            {data.selectedCurrency && (
                <>
                    <div className='col-span-12'>
                        <TextField
                            label='Upper Alert Exchange Rate'
                            variant='outlined'
                            value={data.upperExchangeRate}
                            onChange={event =>
                                handleChange({name: "upperExchangeRate", value: event.target.value})
                            }
                            fullWidth
                        />
                    </div>
                    <div className='col-span-12'>
                        <TextField
                            label='Lower Alert Exchange Rate'
                            variant='outlined'
                            value={data.lowerExchangeRate}
                            onChange={event =>
                                handleChange({name: "lowerExchangeRate", value: event.target.value})
                            }
                            fullWidth
                        />
                    </div>
                </>
            )}
            <div className='col-span-12 mt-8 flex justify-end'>
                <Button
                    variant='contained'
                    color='primary'
                    className='bg-viat-primary text-white font-bold py-2 px-4 rounded'
                    onClick={handleSubmit}
                >
                    ADD RULE
                </Button>
            </div>
        </>
    );
};
