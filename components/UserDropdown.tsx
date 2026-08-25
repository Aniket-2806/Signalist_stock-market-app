"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import NavItems from "./NavItems";

const UserDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const user = { name: "Aniket", email: "aniket@example.com" };

    const handleSignOut = () => {
        router.push('/sign-in');
    };

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 text-gray-400 hover:text-yellow-500 outline-none cursor-pointer bg-transparent border-0"
            >
                <Avatar className="h-8 w-8">
                    <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/AD_Logo_2020.svg/3840px-AD_Logo_2020.svg.png" />
                    <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
                        {user.name[0]}
                    </AvatarFallback>
                </Avatar>
                <span className="hidden md:block text-base font-medium text-gray-400">
                    {user.name}
                </span>
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md bg-gray-900 border border-gray-800 p-2 text-gray-400 shadow-lg z-50">
                    <div className="flex items-center gap-3 py-1 px-2">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/AD_Logo_2020.svg/3840px-AD_Logo_2020.svg.png" />
                            <AvatarFallback className="bg-yellow-500 text-yellow-900 text-sm font-bold">
                                {user.name[0]}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="text-base font-medium text-gray-200">
                                {user.name}
                            </span>
                            <span className="text-xs text-gray-400">
                                {user.email}
                            </span>
                        </div>
                    </div>
                    <div className="h-px bg-gray-800 my-2" />
                    <button
                        onClick={handleSignOut}
                        className="w-full text-left text-red-400 hover:bg-red-500/10 p-2 rounded transition-colors flex items-center gap-2 cursor-pointer"
                    >
                        <LogOut className="h-4 w-4 mr-2 hidden sm:block" />
                        <span>Logout</span>
                    </button>
                    <div className="hidden sm:block h-px bg-gray-600 my-2" />
                    <nav className="sm:hidden mt-2">
                        <NavItems />
                    </nav>
                </div>
            )}
        </div>
    );
};

export default UserDropdown;