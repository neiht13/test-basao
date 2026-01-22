"use client";

import { useState, useEffect } from "react";
import { Building2, Users, FileText, Settings, MapPin, Home, LogOut, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";

const menuItems = [
    { icon: Home, label: "Tổng quan", href: "/admin", id: "dashboard" },
    { icon: MapPin, label: "Quản lý Ấp", href: "/admin/hamlets", id: "hamlets" },
    { icon: Building2, label: "Tổ chức bộ máy", href: "/admin/organization", id: "organization" },
    { icon: Users, label: "Người dùng", href: "/admin/users", id: "users" },
    { icon: Settings, label: "Cài đặt", href: "/admin/settings", id: "settings" },
];

interface AdminLayoutProps {
    children: React.ReactNode;
    activeMenu?: string;
}

export default function AdminLayout({ children, activeMenu = "dashboard" }: AdminLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { data: session } = authClient.useSession();

    const handleLogout = async () => {
        await authClient.signOut();
        window.location.href = '/';
    };

    return (
        <div className="min-h-screen bg-slate-100 pt-20">
            {/* Mobile sidebar toggle */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary text-white rounded-full shadow-xl flex items-center justify-center"
            >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <div className="flex">
                {/* Sidebar */}
                <aside className={cn(
                    "fixed lg:sticky top-20 left-0 h-[calc(100vh-5rem)] w-64 bg-white border-r border-slate-200 z-40 transform transition-transform duration-300 lg:translate-x-0",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}>
                    <div className="p-6">
                        <h2 className="text-lg font-black text-slate-900 mb-1">Quản trị viên</h2>
                        <p className="text-sm text-slate-500">{session?.user?.name || "Admin"}</p>
                    </div>

                    <nav className="px-4 space-y-1">
                        {menuItems.map((item) => (
                            <a
                                key={item.id}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                                    activeMenu === item.id
                                        ? "bg-primary text-white shadow-lg shadow-primary/25"
                                        : "text-slate-600 hover:bg-slate-100"
                                )}
                            >
                                <item.icon size={20} />
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 w-full transition-colors"
                        >
                            <LogOut size={20} />
                            Đăng xuất
                        </button>
                    </div>
                </aside>

                {/* Main content */}
                <main className="flex-1 lg:ml-0 min-h-[calc(100vh-5rem)]">
                    {children}
                </main>
            </div>

            {/* Backdrop for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
}
