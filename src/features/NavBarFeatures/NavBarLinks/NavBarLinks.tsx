import { NavLink } from "react-router-dom"

interface NavbarLink {
    name: string
    path: string
    isSelected: boolean
}

interface NavbarLinksProps {
    linksConfig: NavbarLink[]
}

export const NavBarLinks = ({ linksConfig }: NavbarLinksProps) => {
    return (
        <nav className='flex space-x-8'>
            {linksConfig.map(link => (
                <NavLink
                    key={link.path}
                    to={link.path}
                    className='text-viat-primary font-viat-body hover:text-viat-accent font-bold'
                >
                    {link.name}
                </NavLink>
            ))}
        </nav>
    )
}