'use client'

import { NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Navigation items component that renders a list of navigation links with active state highlighting.
 * @returns {JSX.Element} Rendered navigation menu with highlighted active links
 */
const NavItems = () => {
    const pathname: string = usePathname();

    const isActive = (path: string): boolean => {
        return pathname === path || (path !== '/' && pathname.startsWith(path));
    };

    return (
        <ul className="flex flex-col sm:flex-row p-2 gap-3 sm:gap-10 font-medium">
            {NAV_ITEMS.map(({ href, label }) => (
                <li key={href}>
                    <Link
                        href={href}
                        className={`hover:text-yellow-500 transition-colors ${
                            isActive(href) ? 'text-gray-100' : ''
                        }`}
                    >
                        {label}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default NavItems