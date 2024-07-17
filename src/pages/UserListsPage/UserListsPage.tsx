import { useState, useEffect } from "react";
import { PageHeader } from "../../features/UserListFeatures/PageHeader";
import { EmptyListPicture } from "../../features/UserListFeatures/EmptyListPicture";
import { AlertItem } from "../../features/UserListFeatures/AlertItem";
import { httpService } from "../../shared/services/http-service";
import {toast} from "react-toastify";

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
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        const fetchAlerts = async () => {
            if (isMounted) {
                const toastId = toast.loading("Loading....", {
                    position: "top-center"
                });

                try {
                    const userId = localStorage.getItem('user_id');
                    // const token = localStorage.getItem('token');
                    const response = await httpService.get(`/get-alerts?user_id=${userId}`);
                    setAlerts(response.data);
                    toast.update(toastId, {
                        render: "Loaded successfully",
                        type: "success",
                        isLoading: false,
                        autoClose: 5000
                    });
                } catch (error) {
                    // setError("Failed to load alerts");
                    toast.update(toastId, {
                        render: "Failed to load alerts",
                        type: "error",
                        isLoading: false,
                        autoClose: 5000
                    });
                    console.error("Error fetching alerts:", error);
                }
            }
        };

        fetchAlerts();
        return () => {
            isMounted = false;
        };
    }, []);
    //
    // if (loading) {
    //     return <div>Loading...</div>;
    // }
    //
    // if (error) {
    //     return <div>Error: {error}</div>;
    // }

    return (
        <div className='col-span-9'>
            <PageHeader />
            <main className='h-screen bg-viat-back'>
                {alerts.length === 0 ? (
                    <EmptyListPicture />
                ) : (
                    <div className="alerts-list">
                        {alerts.map(alert => (
                            <AlertItem key={alert.id} alert={alert} /> // Используйте компонент AlertItem
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};