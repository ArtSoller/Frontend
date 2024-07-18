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
        name: string;
    };
    alert_rate: number;
    rule_status: boolean;
}

export const UserFeedPage = () => {
    const [rules, setRules] = useState<Rule[]>([]);

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
            }
        };

        fetchAlerts();
        return () => {
            isMounted = false;
        };
    }, []);

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
                            <RuleItem key={rule.id} rule={rule}/>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};