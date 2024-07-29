import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { httpService } from "../../shared/services/http-service";
import './styles.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Currency {
    currency_id: number;
    name: string;
    rates: number[];
}

interface Rule {
    id: number;
    user_id: number;
    currency: Currency;
    upper_alert_rate: number;
    lower_alert_rate: number;
    rule_status: boolean;
}

const UserChartsPage: React.FC = () => {
    const [rules, setRules] = useState<Rule[]>([]);
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [currencyChartData, setCurrencyChartData] = useState<{ [key: number]: any }>({});

    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const userId = localStorage.getItem('user_id');
                const response = await httpService.get(`/chart-currencies?user_id=${userId}`);
                if (response.data) {
                    setCurrencies(response.data);
                    console.log("Fetched currencies:", response.data);
                } else {
                    console.error('No currencies data received');
                }
            } catch (error) {
                console.error('Error fetching currencies', error);
            }
        };

        const fetchRules = async () => {
            try {
                const userId = localStorage.getItem('user_id');
                const response = await httpService.get(`/get-rules?user_id=${userId}`);
                if (response.data) {
                    const rulesWithRates = response.data.map((rule: any) => ({
                        ...rule,
                        currency: {
                            ...rule.currency,
                            rates: rule.currency.rates || [], // Ensure rates exist
                        },
                    }));
                    setRules(rulesWithRates);
                    console.log("Fetched rules:", rulesWithRates);

                    const chartData: { [key: number]: any } = {};
                    for (const rule of rulesWithRates) {
                        chartData[rule.currency.currency_id] = getCurrencyData(rule.currency);
                    }
                    setCurrencyChartData(chartData);
                } else {
                    console.error('No rules data received');
                }
            } catch (error) {
                console.error('Error fetching rules', error);
            }
        };

        fetchCurrencies();
        fetchRules();
    }, []);

    const getCurrencyData = (currency: Currency) => {
        if (!currency || !currency.rates || currency.rates.length === 0) {
            console.error(`Currency or rates not found for currencyId: ${currency.currency_id}`);
            return { labels: [], datasets: [] };
        }

        const labels = currency.rates.map((_, index) => `Point ${index + 1}`);
        const data = currency.rates;

        // Calculate min and max
        const minRate = Math.min(...data);
        const maxRate = Math.max(...data);

        return {
            labels,
            datasets: [{
                label: currency.name,
                data,
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
            }],
        };
    };

    useEffect(() => {
        console.log("Rules:", rules);
        console.log("Currencies:", currencies);
        console.log("Currency Chart Data:", currencyChartData);
    }, [rules, currencies, currencyChartData]);

    return (
        <div>
            <h1>Currency Graphs</h1>
            {rules.map(rule => (
                <div key={rule.id} className="mb-4">
                    <h2>{rule.currency.name}</h2>
                    <div className="chart-container"> {/* Контейнер для графика */}
                        <Line
                            data={currencyChartData[rule.currency.currency_id] || { labels: [], datasets: [] }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false, // Позволяет изменять размер графика
                                scales: {
                                    x: {
                                        title: {
                                            display: true,
                                            text: 'Points'
                                        },
                                    },
                                    y: {
                                        title: {
                                            display: true,
                                            text: 'Rates'
                                        },
                                        min: Math.min(...rule.currency.rates) - 0.5, // добавление отступа
                                        max: Math.max(...rule.currency.rates) + 0.5, // добавление отступа
                                        ticks: {
                                            stepSize: 0.25, // Устанавливаем шаг на оси Y
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserChartsPage;
