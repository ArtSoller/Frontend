import { useLocation } from "react-router-dom"

import { SignUpButton } from "../../features/SignUpButton"
import { SignInButton } from "../../features/SignInButton"
import { NavBarLinks } from "../../features/NavBarFeatures/NavBarLinks"

import Logo from "../../shared/media/Logo.svg"

interface NavbarLink {
    name: string
    path: string
    isSelected: boolean
}

export const LandingPageNavBar = () => {
    const location = useLocation()
    const navbarLinksConfig: NavbarLink[] = [
        {
            name: "CONVERT",
            path: "/"
        },
        {
            name: "COMPARISON",
            path: "/features"
        },
        {
            name: "ANALYTICS",
            path: "/tips"
        },
    ].map(link => ({
        ...link,
        isSelected: location.pathname === link.path
    }))

    return (
        <header className='relative h-20'>
            <div className='container mx-auto px-24 h-full'>
                <div className='flex items-center justify-between h-full'>
                    <div className='flex items-center'>
                        <img
                            src={Logo.toString()}
                            alt='Capital Compass Logo'
                            className='h-10 w-auto'
                        />
                    </div>
                    <NavBarLinks linksConfig={navbarLinksConfig}/>
                    <div className='flex space-x-4'>
                        <SignUpButton />
                        <SignInButton />
                    </div>
                </div>
            </div>
        </header>
    )
}