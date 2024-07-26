import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { closeModal } from "../EditRuleButton/model/EditRuleModalSlice.ts";
import { httpService } from "../../../shared/services/http-service";
import { AutocompleteField } from "../../../shared/ui/AutocompleteField";
import {toast} from "react-toastify";

interface CurrencyRule {
    currency_id: number;
    name: string;
}

interface FieldsDataU {
    currencies: CurrencyRule[];
    selectedCurrency: CurrencyRule | null;
    upperExchangeRate: string;
    lowerExchangeRate: string;
    currencySearchTerm: string;
    currentExchangeRate: string;
}

interface EditRuleModalFieldsProps {
    initialCurrency: CurrencyRule | null;
    initialUpperExchangeRate: string;
    initialLowerExchangeRate: string;
    ruleId: number;
}

export const EditRuleModalFields: React.FC<EditRuleModalFieldsProps> = ({
                                                                            initialCurrency,
                                                                            initialUpperExchangeRate,
                                                                            initialLowerExchangeRate,
                                                                            ruleId
                                                                        }) => {
    const [data, setData] = useState<FieldsDataU>({
        currencies: [],
        selectedCurrency: initialCurrency,
        upperExchangeRate: initialUpperExchangeRate,
        lowerExchangeRate: initialLowerExchangeRate,
        currencySearchTerm: "",
        currentExchangeRate: ""
    });

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await httpService.get('currencies');
                setData(prevState => ({
                    ...prevState,
                    currencies: response.data
                }));
            } catch (error) {
                console.error("Error fetching currencies:", error);
            }
        };
        fetchCurrencies();
    }, []);

    useEffect(() => {
        setData(prevState => ({
            ...prevState,
            selectedCurrency: initialCurrency,
            upperExchangeRate: initialUpperExchangeRate,
            lowerExchangeRate: initialLowerExchangeRate
        }));
        if (initialCurrency) {
            fetchCurrentExchangeRate(initialCurrency);
        }
    }, [initialCurrency, initialUpperExchangeRate, initialLowerExchangeRate]);

    const handleChange = (target: {
        name: string;
        value: string | CurrencyRule | null;
    }) => {
        setData(prevState => ({
            ...prevState,
            [target.name]: target.value
        }));
        if (target.name === "selectedCurrency" && target.value) {
            fetchCurrentExchangeRate(target.value as CurrencyRule);
            setData(prevState => ({
                ...prevState,
                upperExchangeRate: "",
                lowerExchangeRate: ""
            }));
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

    const fetchCurrentExchangeRate = async (currency: CurrencyRule) => {
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
                console.log(data.selectedCurrency.currency_id);
                const response = await httpService.put(`/rules/${ruleId}`, {
                    currency_id: data.selectedCurrency.currency_id,
                    upper_alert_rate: data.upperExchangeRate,
                    lower_alert_rate: data.lowerExchangeRate
                });
                console.log("Alert updated successfully:", response.data);
                dispatch(closeModal());
            } catch (error) {
                console.error("Error updating alert:", error);
            }
        } else {
            console.error("No changes detected or missing required fields");
        }
    };

    return (
        <>
            <div className='col-span-12 text-2xl font-bold mb-4'>
                Update your rule
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
                    UPDATE RULE
                </Button>
            </div>
        </>
    );
};
