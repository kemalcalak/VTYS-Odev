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
        const checkAuthStatus = async () => {
            try {
                const response = await fetch('/api/profile', {
                    credentials: 'include',
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
            <div className="container relative mx-auto px-4 py-4 flex items-center justify-between">
                {/* Ana Sayfa butonu sol üstte */}
                <div className="flex items-center space-x-4">
                    <Link href="/">
                        <Button variant="ghost" className="text-white bg-gray-800 hover:bg-gray-600 mr-2">
                            Ana Sayfa
                        </Button>
                    </Link>
                    <p className="font-semibold text-lg">TWBlocks</p>
                </div>
                
                {/* Masaüstü için diğer navigation itemlar burada olacak ama Ana Sayfa dışındakiler */}
                <div className="hidden md:flex items-center justify-center space-x-4">
                    <NavigationMenu>
                        <NavigationMenuList className="flex space-x-2">
                            {/* Eğer ileride başka navigation itemlar eklenecekse burada göster */}
                            {navigationItems.slice(1).map((item) => (
                                <NavigationMenuItem key={item.title}>
                                    <NavigationMenuLink href={item.href}>
                                        <Button variant="ghost" className="text-white bg-gray-800 hover:bg-gray-600">{item.title}</Button>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                
                {/* Authentication Buttons */}
                <div className="hidden md:flex items-center space-x-2">
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
                
                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <Button variant="ghost" onClick={() => setOpen(!isOpen)} className="text-white">
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                </div>
            </div>
            
            {isOpen && (
                <div className="md:hidden bg-black border-t border-gray-700">
                    <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                        <div className="flex flex-col space-y-2">
                            {/* Ana Sayfa butonu artık burada gösterilmeyecek çünkü üstte sabit */}
                            {navigationItems.slice(1).map((item) => (
                                <Link 
                                    key={item.title} 
                                    href={item.href} 
                                    className="text-white hover:bg-gray-800 px-4 py-2 rounded-md"
                                    onClick={() => setOpen(false)}
                                >
                                    {item.title}
                                </Link>
                            ))}
                        </div>
                        
                        <div className="flex flex-col space-y-2 pt-2 border-t border-gray-700">
                            {isAuthenticated ? (
                                <>
                                    <Link 
                                        href="/profile" 
                                        onClick={() => setOpen(false)}
                                        className="w-full"
                                    >
                                        <Button variant="outline" className="w-full text-white hover:bg-gray-700">
                                            Profil
                                        </Button>
                                    </Link>
                                    <Button 
                                        variant="outline"
                                        onClick={() => {
                                            handleLogout();
                                            setOpen(false);
                                        }}
                                        className="w-full text-white bg-primary hover:bg-red-500"
                                    >
                                        Çıkış Yap
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link 
                                        href="/auth/login" 
                                        onClick={() => setOpen(false)}
                                        className="w-full"
                                    >
                                        <Button variant="outline" className="w-full text-white hover:bg-gray-700">
                                            Giriş Yap
                                        </Button>
                                    </Link>
                                    <Link 
                                        href="/auth/register" 
                                        onClick={() => setOpen(false)}
                                        className="w-full"
                                    >
                                        <Button className="w-full hover:bg-primary/90">
                                            Kayıt Ol
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

export { Header1 };