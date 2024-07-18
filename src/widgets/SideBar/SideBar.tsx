import { useLocation } from "react-router-dom"

import { ProfileFields } from "../../features/SideBarFeatures/ProfileFields"
import { Links } from "../../features/SideBarFeatures/Links"

import Logo from "../../shared/media/Logo.svg"
import Home from "../../shared/media/Home.svg"
import HomeAlt from "../../shared/media/HomeAlt.svg"
// import Feed from "../../shared/media/Home.svg"
// import FeedAlt from "../../shared/media/HomeAlt.svg"

interface SidebarLink {
    name: string
    path: string
    icon: {
        img: string
        imgAlt: string
        altName: string
        classes: string
    }
    isSelected: boolean
}

export const SideBar = () => {
    const location = useLocation()
    const sidebarLinksConfig: SidebarLink[] = [
        {
            name: "My Active Rules",
            path: "/workspace",
            icon: {
                img: Home.toString(),
                imgAlt: HomeAlt.toString(),
                altName: "Alerts Icon",
                classes: "h-5 w-5"
            }
        },
        {
            name: "My Inactive Rules",
            path: "/workspace/feed",
            icon: {
                img: Home.toString(),
                imgAlt: HomeAlt.toString(),
                altName: "Feed Icon",
                classes: "h-5 w-5"
            }
        }
    ].map(link => ({
        ...link,
        isSelected: location.pathname === link.path
    }))

    return (
        <div className='bg-viat-bg-shade col-span-3 h-screen sticky top-0 px-6'>
            <img
                src={Logo.toString()}
                alt='Capital Compass Logo'
                className='h-10 w-auto'
            /> <ProfileFields/>
            <Links linksConfig={sidebarLinksConfig}/>
        </div>
    )
}