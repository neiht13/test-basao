"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Globe, Phone, Menu, X, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

export default function Navbar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { data: session } = authClient.useSession();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isActive = (path: string) => pathname === path;

    const handleLogout = async () => {
        await authClient.signOut();
        router.refresh();
    };

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
                scrolled ? "py-2" : "py-4"
            )}
        >
            <nav
                className={cn(
                    "container mx-auto px-4 transition-all duration-300 rounded-2xl",
                    scrolled
                        ? "bg-white/80 backdrop-blur-md shadow-lg border border-white/20 h-16 flex items-center justify-between"
                        : "bg-transparent h-20 flex items-center justify-between"
                )}
            >
                <Link href="/" className="flex items-center gap-3 group">
                    <div className={cn(
                        "relative h-12 w-12 transition-all duration-300 group-hover:scale-110",
                    )}>
                        <img
                            src="/Huy_Hiệu_Đoàn.png"
                            alt="Logo Đoàn Thanh niên"
                            className="w-full h-full object-contain filter drop-shadow-md"
                        />
                    </div>
                    <div>
                        <h1 className={cn(
                            "text-lg font-black leading-none tracking-tight transition-colors uppercase",
                            scrolled ? "text-primary" : "text-slate-900"
                        )}>
                            Trang thông tin tra cứu xã Ba Sao
                        </h1>
                        <p className={cn(
                            "text-[10px] font-bold uppercase tracking-[0.2em] mt-1 transition-colors",
                            scrolled ? "text-muted-foreground" : "text-slate-800"
                        )}>
                            Đồng Tháp
                        </p>
                    </div>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-1 bg-white/50 backdrop-blur-sm p-1.5 rounded-full border border-white/20 shadow-sm">
                    <Link href="/" className={cn(
                        "px-5 py-2 rounded-full text-sm font-bold transition-all duration-300",
                        isActive('/')
                            ? 'bg-primary text-primary-foreground shadow-md'
                            : 'text-slate-600 hover:text-primary hover:bg-white/50'
                    )}>
                        Trang chủ
                    </Link>
                    <Link href="/to-chuc-bo-may" className={cn(
                        "px-5 py-2 rounded-full text-sm font-bold transition-all duration-300",
                        isActive('/to-chuc-bo-may')
                            ? 'bg-primary text-primary-foreground shadow-md'
                            : 'text-slate-600 hover:text-primary hover:bg-white/50'
                    )}>
                        Tổ chức bộ máy
                    </Link>
                    {session && (
                        <Link href="/admin" className={cn(
                            "px-5 py-2 rounded-full text-sm font-bold transition-all duration-300",
                            isActive('/admin')
                                ? 'bg-primary text-primary-foreground shadow-md'
                                : 'text-slate-600 hover:text-primary hover:bg-white/50'
                        )}>
                            Quản trị
                        </Link>
                    )}
                </div>

                <div className="hidden md:flex items-center gap-3">
                    {session ? (
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2 text-sm font-bold text-slate-700 bg-white/50 px-3 py-1.5 rounded-full border border-white/20">
                                <User size={16} />
                                {session.user.name}
                            </div>
                            <button
                                onClick={handleLogout}
                                className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                                title="Đăng xuất"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <button className="group relative overflow-hidden bg-gradient-to-r from-primary to-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg hover:shadow-primary/25 transition-all hover:-translate-y-0.5 active:translate-y-0">
                            <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full transition-transform duration-500 ease-out -skew-x-12 -translate-x-full" />
                            <span className="relative flex items-center gap-2">
                                <Phone size={16} /> Liên hệ
                            </span>
                        </button>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 text-slate-700 bg-white/50 backdrop-blur-sm rounded-lg border border-white/20"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={cn(
                "fixed inset-0 bg-background/95 backdrop-blur-xl z-40 md:hidden transition-all duration-300 flex flex-col justify-center items-center gap-8",
                isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}>
                <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
                >
                    Trang chủ
                </Link>
                <Link
                    href="/to-chuc-bo-may"
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
                >
                    Tổ chức bộ máy
                </Link>
                {session && (
                    <Link
                        href="/admin"
                        onClick={() => setIsOpen(false)}
                        className="text-2xl font-bold text-foreground hover:text-primary transition-colors"
                    >
                        Quản trị
                    </Link>
                )}
                {session ? (
                    <button
                        onClick={() => {
                            handleLogout();
                            setIsOpen(false);
                        }}
                        className="bg-red-50 text-red-600 px-8 py-3 rounded-full text-lg font-bold shadow-xl"
                    >
                        Đăng xuất
                    </button>
                ) : (
                    <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full text-lg font-bold shadow-xl">
                        Liên hệ ngay
                    </button>
                )}
            </div>
        </header>
    );
}