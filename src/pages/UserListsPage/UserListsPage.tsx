import { useState, useEffect } from "react";
import { PageHeader } from "../../features/UserListFeatures/PageHeader";
import { EmptyListPicture } from "../../features/UserListFeatures/EmptyListPicture";
import { httpService } from "../../shared/services/http-service";

interface Alert {
    id: number;
    user_id: number;
    currency: {
        name: string;
    };
    alert_rate: number;
}

export const UserListsPage = () => {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                const userId = localStorage.getItem('user_id');
                // const token = localStorage.getItem('token');
                const response = await httpService.get(`/get-alerts?user_id=${userId}`);
                setAlerts(response.data);
            } catch (error) {
                setError("Failed to load alerts");
                console.error("Error fetching alerts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAlerts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='col-span-9'>
            <PageHeader />
            <main className='h-screen bg-viat-back'>
                {alerts.length === 0 ? (
                    <EmptyListPicture />
                ) : (
                    <div className="alerts-list">
                        {alerts.map(alert => (
                            <div key={alert.id} className="alert-item">
                                <div>Currency: {alert.currency.name}</div>
                                <div>Alert Rate: {alert.alert_rate}</div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};