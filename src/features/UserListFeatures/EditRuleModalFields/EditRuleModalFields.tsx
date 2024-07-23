import React, { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { closeModal } from "../EditRuleButton/model/EditRuleModalSlice.ts";
import { httpService } from "../../../shared/services/http-service";
import { AutocompleteField } from "../../../shared/ui/AutocompleteField";

interface CurrencyRule {
    currency_id: number;
    name: string;
}

interface FieldsDataU {
    currencies: CurrencyRule[];
    selectedCurrency: CurrencyRule | null;
    exchangeRate: string;
    currencySearchTerm: string;
    currentExchangeRate: string;
}

interface EditRuleModalFieldsProps {
    initialCurrency: CurrencyRule | null;
    initialExchangeRate: string;
    ruleId: number; // Добавьте идентификатор правила
}

export const EditRuleModalFields: React.FC<EditRuleModalFieldsProps> = ({
                                                                            initialCurrency,
                                                                            initialExchangeRate,
                                                                            ruleId
                                                                        }) => {
    const [data, setData] = useState<FieldsDataU>({
        currencies: [],
        selectedCurrency: initialCurrency,
        exchangeRate: initialExchangeRate,
        currencySearchTerm: "",
        currentExchangeRate: ""
    });

    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch currencies when component mounts
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
        // Update form fields when initialCurrency or initialExchangeRate change
        setData(prevState => ({
            ...prevState,
            selectedCurrency: initialCurrency,
            exchangeRate: initialExchangeRate
        }));
        if (initialCurrency) {
            fetchCurrentExchangeRate(initialCurrency);
        }
    }, [initialCurrency, initialExchangeRate]);

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
                exchangeRate: "" // Reset the exchange rate when a new currency is selected
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
        if (data.selectedCurrency && data.exchangeRate) {
            try {
                console.log(data.selectedCurrency.currency_id);
                const response = await httpService.put(`/rules/${ruleId}`, {
                    currency_id: data.selectedCurrency.currency_id,
                    alert_rate: data.exchangeRate
                });
                console.log("Alert updated successfully:", response.data);
                dispatch(closeModal()); // Close modal after successful update
            } catch (error) {
                console.error("Error updating alert:", error);
            }
        } else {
            console.error("No changes detected or missing required fields");
        }
    };

    return (
        <>
            <div className='col-span-12'>
                Update your alert
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
                        handleChange({ name: "selectedCurrency", value: newValue })
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
                <div className='col-span-12'>
                    <TextField
                        label='Exchange Rate'
                        variant='outlined'
                        value={data.exchangeRate}
                        onChange={event =>
                            handleChange({ name: "exchangeRate", value: event.target.value })
                        }
                        fullWidth
                    />
                </div>
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
