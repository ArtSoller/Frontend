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
                            rates: rule.currency.rates || [],
                        },
                    }));
                    setRules(rulesWithRates);
                    console.log("Fetched rules:", rulesWithRates);

                    const chartData: { [key: number]: any } = {};
                    for (const rule of rulesWithRates) {
                        chartData[rule.currency.currency_id] = getCurrencyData(rule.currency, rule);
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

    const getCurrencyData = (currency: Currency, rule: Rule) => {
        if (!currency || !currency.rates || currency.rates.length === 0) {
            console.error(`Currency or rates not found for currencyId: ${currency.currency_id}`);
            return { labels: [], datasets: [], options: {} };
        }

        const labels = currency.rates.map((_, index) => `Point ${index + 1}`);
        const data = currency.rates;

        const minRate = Math.min(...data, rule.lower_alert_rate);
        const maxRate = Math.max(...data, rule.upper_alert_rate);
        const range = maxRate - minRate;

        const stepSize = range / 10;

        const getMovingAverage = (data: number[], windowSize: number): number[] => {
            const result: number[] = [];
            for (let i = 0; i < data.length - windowSize + 1; i++) {
                const windowData = data.slice(i, i + windowSize);
                const average = windowData.reduce((sum, value) => sum + value, 0) / windowSize;
                result.push(average);
            }
            return result;
        };

        const movingAverage = getMovingAverage(data, 5);

        // Calculate average of moving average
        const averageMovingAverage = movingAverage.reduce((sum, value) => sum + value, 0) / movingAverage.length;

        return {
            labels,
            datasets: [
                {
                    label: currency.name,
                    data,
                    borderColor: 'rgba(129, 152, 198,1)',
                    backgroundColor: 'rgba(129, 152, 198, 0.2)',
                },
                {
                    label: `${currency.name} (5-point MA)`,
                    data: new Array(data.length).fill(averageMovingAverage),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderDash: [5, 5],
                    pointRadius: 0,
                    hidden: true,
                },
                {
                    label: 'Upper Alert Rate',
                    data: new Array(data.length).fill(rule.upper_alert_rate),
                    borderColor: 'red',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    pointRadius: 0,
                    hidden: true,
                },
                {
                    label: 'Lower Alert Rate',
                    data: new Array(data.length).fill(rule.lower_alert_rate),
                    borderColor: 'blue',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    pointRadius: 0,
                    hidden: true,
                },
            ],
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Points',
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Rates',
                        },
                        min: minRate - stepSize,
                        max: maxRate + stepSize,
                        ticks: {
                            stepSize: stepSize,
                        },
                    },
                },
                plugins: {
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: (tooltipItem: any) => {
                                let label = `${tooltipItem.dataset.label || ''}: ${tooltipItem.raw.toFixed(2)}`;
                                const averageRate = tooltipItem.chart.data.datasets[0].data.reduce((sum: number, value: number) => sum + value, 0) / tooltipItem.chart.data.datasets[0].data.length;
                                const percentageChange = ((tooltipItem.raw - averageRate) / averageRate) * 100;
                                label += ` (${percentageChange.toFixed(2)}%)`;
                                return label;
                            },
                        },
                    },
                    legend: {
                        display: true,
                        position: 'bottom',
                    },
                },
                interaction: {
                    mode: 'nearest',
                    axis: 'x',
                    intersect: false
                }
            },
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
                            data={currencyChartData[rule.currency.currency_id]?.datasets ? currencyChartData[rule.currency.currency_id] : { labels: [], datasets: [] }}
                            options={currencyChartData[rule.currency.currency_id]?.options || {}}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserChartsPage;
