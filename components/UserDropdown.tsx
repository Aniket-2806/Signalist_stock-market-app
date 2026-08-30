'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import NavItems from "@/components/NavItems";
import { signOut } from "@/lib/actions/auth.action";

interface UserDropdownProps {
    user: User;
    initialStocks: StockWithWatchlistStatus[];
}

const UserDropdown = ({ user, initialStocks }: UserDropdownProps) => {
    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.error("Sign out error:", error);
        } finally {
            window.location.href = "/sign-in";
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none cursor-pointer">
                <div className="flex items-center gap-3 text-gray-400 hover:text-yellow-500 p-2 rounded-md hover:bg-gray-800/50 transition-colors">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/AD_Logo_2020.svg/3840px-AD_Logo_2020.svg.png" />
                        <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
                            {user?.name?.[0] || 'U'}
                        </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:flex flex-col items-start">
                        <span className="text-base font-medium text-gray-400">
                            {user?.name}
                        </span>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-gray-400 bg-gray-900 border-gray-700">
                <DropdownMenuLabel>
                    <div className="flex relative items-center gap-3 py-2">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/AD_Logo_2020.svg/3840px-AD_Logo_2020.svg.png" />
                            <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
                                {user?.name?.[0] || 'U'}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="text-base font-medium text-gray-400">
                                {user?.name}
                            </span>
                            <span className="text-sm text-gray-500">{user?.email}</span>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-600" />
                <DropdownMenuItem
                    onClick={handleSignOut}
                    className="flex items-center text-gray-100 text-md font-medium focus:bg-transparent focus:text-yellow-500 transition-colors cursor-pointer"
                >
                    <LogOut className="h-4 w-4 mr-2 hidden sm:block" />
                    Logout
                </DropdownMenuItem>
                <DropdownMenuSeparator className="hidden sm:block bg-gray-600" />
                <nav className="sm:hidden">
                    <NavItems initialStocks={initialStocks} />
                </nav>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserDropdown;