import {useState, useEffect} from "react";
import {PageHeader} from "../../features/UserListFeatures/PageHeader";
import {EmptyListPicture} from "../../features/UserListFeatures/EmptyListPicture";
import {RuleItem} from "../../features/UserListFeatures/RuleItem";
import {httpService} from "../../shared/services/http-service";
import {toast} from "react-toastify";

interface Rule {
    id: number;
    user_id: number;
    currency: {
        currency_id: number;
        name: string;
    };
    alert_rate: number;
    rule_status: boolean;
}

export const UserFeedPage = () => {
    const [rules, setRules] = useState<Rule[]>([]);

    const fetchAlerts = async () => {
        const toastId = toast.loading("Loading....", {
            position: "top-center"
        });

        try {
            const userId = localStorage.getItem('user_id');
            const response = await httpService.get(`/get-rules?user_id=${userId}`);
            setRules(response.data);
            toast.update(toastId, {
                render: "Loaded successfully",
                type: "success",
                isLoading: false,
                autoClose: 1500
            });
        } catch (error) {
            toast.update(toastId, {
                render: "Failed to load alerts",
                type: "error",
                isLoading: false,
                autoClose: 5000
            });
            console.error("Error fetching alerts:", error);
        }
    };

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            fetchAlerts();
        }
        return () => {
            isMounted = false;
        };
    }, []);

    const handleDelete = (id: number) => {
        setRules(prevRules => prevRules.filter(rule => rule.id !== id));
    };

    const handleActivate = (id: number) => {
        setRules(prevRules => prevRules.map(rule =>
            rule.id === id ? { ...rule, rule_status: true } : rule
        ));
    };

    const activeRules = rules.filter(rule => !rule.rule_status);

    return (
        <div className='col-span-9'>
            <PageHeader/>
            <main className='h-screen bg-viat-back'>
                {activeRules.length === 0 ? (
                    <EmptyListPicture/>
                ) : (
                    <div className="alerts-list">
                        {activeRules.map(rule => (
                            <RuleItem key={rule.id} rule={rule} onDelete={handleDelete} onActivate={handleActivate} onUpdate={fetchAlerts}/>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};