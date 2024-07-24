import { NavLink } from "react-router-dom";

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

interface SidebarLinksProps {
    linksConfig: SidebarLink[];
}

export const Links = ({ linksConfig }: SidebarLinksProps) => {
    const handleTextClasses = (linkIsSelected: boolean) => {
        return linkIsSelected
            ? "text-viat-primary font-bold border-l-2 border-viat-primary pl-4"
            : "text-viat-secondary";
    };

    return (
        <nav className='ml-4 mt-8 space-y-8'>
            {linksConfig.map(link => (
                <NavLink
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-2 ${handleTextClasses(link.isSelected)}`}
                >
                    <img
                        src={link.isSelected ? link.icon.img : link.icon.imgAlt}
                        alt={link.icon.altName}
                        className={`${link.icon.classes} ${
                            link.isSelected ? "stroke-viat-primary" : "stroke-viat-secondary"
                        }`}
                    />
                    <span className='font-viat-body text-viat-size-body'>
                        {link.name}
                    </span>
                    {link.badge && (
                        <span className="ml-2">
                            {link.badge}
                        </span>
                    )}
                </NavLink>
            ))}
        </nav>
    );
};
