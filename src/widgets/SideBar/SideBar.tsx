import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ProfileFields } from "../../features/SideBarFeatures/ProfileFields";
import { Links } from "../../features/SideBarFeatures/Links";
import Logo from "../../shared/media/Logo.svg";
import Home from "../../shared/media/Home.svg";
import HomeAlt from "../../shared/media/HomeAlt.svg";
import { httpService } from "../../shared/services/http-service";

interface SidebarLink {
    name: string;
    path: string;
    icon: {
        img: string;
        imgAlt: string;
        altName: string;
        classes: string;
    };
    isSelected: boolean;
    badge?: JSX.Element;
}

export const SideBar = () => {
    const location = useLocation();
    const [inactiveRulesCount, setInactiveRulesCount] = useState<number>(0);

    useEffect(() => {
        const fetchInactiveRulesCount = async () => {
            try {
                const userId = localStorage.getItem('user_id');
                const response = await httpService.get(`/inactive-count?user_id=${userId}`);
                setInactiveRulesCount(response.data.count);
            } catch (error) {
                console.error("Error fetching inactive rules count:", error);
            }
        };

        fetchInactiveRulesCount();
        const intervalId = setInterval(fetchInactiveRulesCount, 1000);

        return () => clearInterval(intervalId);
    }, [location.pathname]);

    const sidebarLinksConfig: SidebarLink[] = [
        {
            name: "My Active Rules",
            path: "/workspace",
            icon: {
                img: Home.toString(),
                imgAlt: HomeAlt.toString(),
                altName: "Alerts Icon",
                classes: "h-5 w-5"
            },
            isSelected: location.pathname === "/workspace"
        },
        {
            name: "My Inactive Rules",
            path: "/workspace/feed",
            icon: {
                img: Home.toString(),
                imgAlt: HomeAlt.toString(),
                altName: "Feed Icon",
                classes: "h-5 w-5"
            },
            isSelected: location.pathname === "/workspace/feed",
            badge: inactiveRulesCount > 0 ? (
                <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs font-semibold">{inactiveRulesCount}</span>
            ) : undefined
        }
    ];

    return (
        <div className='bg-viat-bg-shade col-span-3 h-screen sticky top-0 px-6'>
            <img
                src={Logo.toString()}
                alt='Capital Compass Logo'
                className='h-10 w-auto'
            />
            <ProfileFields />
            <Links linksConfig={sidebarLinksConfig} />
        </div>
    );
};
