import { useLocation } from "react-router-dom"

import { ProfileFields } from "../../features/SideBarFeatures/ProfileFields"
import { Links } from "../../features/SideBarFeatures/Links"

// TODO: Do something with it.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Logo from "../../shared/media/ViatorusLogo.svg"
// TODO: Do something with it.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Home from "../../shared/media/Home.svg"
// TODO: Do something with it.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import HomeAlt from "../../shared/media/HomeAlt.svg"
// TODO: Do something with it.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Feed from "../../shared/media/Feed.svg"
// TODO: Do something with it.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import FeedAlt from "../../shared/media/FeedAlt.svg"

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
            name: "My Lists",
            path: "/workspace",
            icon: {
                img: Home,
                imgAlt: HomeAlt,
                altName: "Home Icon",
                classes: "h-5 w-5"
            }
        },
        {
            name: "Feed",
            path: "/workspace/feed",
            icon: {
                img: Feed,
                imgAlt: FeedAlt,
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
            <img src={Logo} alt='Viatorus Logo' className='h-10 w-auto mt-4' />
            <ProfileFields />
            <Links linksConfig={sidebarLinksConfig} />
        </div>
    )
}