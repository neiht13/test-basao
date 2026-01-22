"use client";

import AdminLayout from "./AdminLayout";
import { MapPin, Users, Building2, TrendingUp, Eye } from "lucide-react";
import { HAMLETS_DATA, COMMUNE_ORG_DATA } from "@/lib/data";

export default function AdminDashboard() {
    const stats = [
        { label: "Tổng số Ấp", value: HAMLETS_DATA.length, icon: MapPin, color: "bg-blue-500", change: "+0" },
        { label: "Lãnh đạo xã", value: COMMUNE_ORG_DATA.reduce((acc, g) => acc + g.members.length, 0), icon: Users, color: "bg-green-500", change: "+0" },
        { label: "Nhóm tổ chức", value: COMMUNE_ORG_DATA.length, icon: Building2, color: "bg-purple-500", change: "+0" },
        { label: "Lượt truy cập", value: "1,234", icon: Eye, color: "bg-amber-500", change: "+12%" },
    ];

    return (
        <AdminLayout activeMenu="dashboard">
            <div className="p-6 lg:p-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-slate-900">Tổng quan</h1>
                    <p className="text-slate-500 mt-1">Chào mừng trở lại! Đây là tổng quan hệ thống.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                                    <p className="text-3xl font-black text-slate-900 mt-1">{stat.value}</p>
                                </div>
                                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-white`}>
                                    <stat.icon size={24} />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center gap-1 text-sm">
                                <TrendingUp size={14} className="text-green-500" />
                                <span className="text-green-600 font-medium">{stat.change}</span>
                                <span className="text-slate-400">so với tháng trước</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm mb-8">
                    <h2 className="text-lg font-bold text-slate-900 mb-4">Thao tác nhanh</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <a href="/admin/hamlets" className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors text-blue-700 font-medium">
                            <MapPin size={20} />
                            Quản lý thông tin Ấp
                        </a>
                        <a href="/admin/organization" className="flex items-center gap-3 p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors text-purple-700 font-medium">
                            <Building2 size={20} />
                            Cập nhật tổ chức
                        </a>
                        <a href="/admin/users" className="flex items-center gap-3 p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors text-green-700 font-medium">
                            <Users size={20} />
                            Quản lý người dùng
                        </a>
                        <a href="/" target="_blank" className="flex items-center gap-3 p-4 rounded-xl bg-amber-50 hover:bg-amber-100 transition-colors text-amber-700 font-medium">
                            <Eye size={20} />
                            Xem trang chủ
                        </a>
                    </div>
                </div>

                {/* Recent Hamlets */}
                <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-slate-900">Danh sách các Ấp</h2>
                        <a href="/admin/hamlets" className="text-sm text-primary font-medium hover:underline">Xem tất cả →</a>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-100">
                                    <th className="text-left py-3 px-4 text-sm font-bold text-slate-500">Tên Ấp</th>
                                    <th className="text-left py-3 px-4 text-sm font-bold text-slate-500">Mô tả</th>
                                    <th className="text-left py-3 px-4 text-sm font-bold text-slate-500">Số lãnh đạo</th>
                                    <th className="text-left py-3 px-4 text-sm font-bold text-slate-500">Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {HAMLETS_DATA.slice(0, 5).map((hamlet) => (
                                    <tr key={hamlet.id} className="border-b border-slate-50 hover:bg-slate-50">
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold text-sm">
                                                    {hamlet.shortName}
                                                </div>
                                                <span className="font-medium text-slate-900">{hamlet.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-slate-500 max-w-xs truncate">{hamlet.description}</td>
                                        <td className="py-3 px-4 text-sm text-slate-600">{hamlet.leaders.length} người</td>
                                        <td className="py-3 px-4">
                                            {hamlet.isSpotlight ? (
                                                <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">Tiêu điểm</span>
                                            ) : (
                                                <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">Hoạt động</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
