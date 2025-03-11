"use client";

import { Button } from "./button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "./navigation-menu";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Header1() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigationItems = [
        {
            title: "Ana Sayfa",
            href: "/",
        }
    ];

    const [isOpen, setOpen] = useState(false);

    useEffect(() => {
        // Check for authentication status by making an API call instead of checking localStorage
        const checkAuthStatus = async () => {
            try {
                const response = await fetch('/api/profile', {
                    credentials: 'include', // Important for sending cookies
                });
                setIsAuthenticated(response.ok);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };
        
        checkAuthStatus();
    }, []);

    const handleLogout = async () => {
        try {
            // Call the logout API to clear the JWT cookie
            await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            });
            setIsAuthenticated(false);
            router.push('/');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <header className="w-full z-40 fixed top-0 left-0 bg-background bg-black">
            <div className="container relative mx-auto min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center">
                <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
                    <NavigationMenu className="flex justify-start items-start">
                        <NavigationMenuList className="flex justify-start gap-4 flex-row">
                            {navigationItems.map((item) => (
                                <NavigationMenuItem key={item.title}>
                                    <NavigationMenuLink href={item.href}>
                                        <Button variant="ghost" className="text-white bg-gray-800 hover:bg-gray-600">{item.title}</Button>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="flex lg:justify-center">
                    <p className="font-semibold">TWBlocks</p>
                </div>
                <div className="flex justify-end w-full gap-4">
                    {isAuthenticated ? (
                        <>
                            <Link href="/profile">
                                <Button variant="outline" className="hover:scale-105 transition-transform duration-200 text-white hover:bg-gray-100 dark:hover:bg-gray-800">
                                    Profil
                                </Button>
                            </Link>
                            <Button 
                                variant="outline" 
                                onClick={handleLogout}
                                className="hover:scale-105 transition-transform duration-200 text-white bg-primary hover:bg-red-500 dark:hover:bg-gray-800"
                            >
                                Çıkış Yap
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link href="/auth/login">
                                <Button variant="outline" className="hover:scale-105 transition-transform duration-200 text-white hover:bg-gray-100 dark:hover:bg-gray-800">Giriş Yap</Button>
                            </Link>
                            <Link href="/auth/register">
                                <Button className="hover:scale-105 transition-transform duration-200 hover:bg-primary/90">Kayıt Ol</Button>
                            </Link>
                        </>
                    )}
                </div>
                <div className="flex w-12 shrink lg:hidden items-end justify-end">
                    <Button variant="ghost" onClick={() => setOpen(isOpen=>!isOpen)}>
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                    {isOpen && (
                        <div className="absolute top-20 border-t flex flex-col w-full right-0 bg-background shadow-lg py-4 container gap-8">
                            {navigationItems.map((item) => (
                                <div key={item.title}>
                                    <div className="flex flex-col gap-2">
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export { Header1 };