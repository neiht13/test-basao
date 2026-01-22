"use client";

import { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { Plus, Edit2, Trash2, Search, Save, X, User, Mail, Shield, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserData {
    id: string;
    name: string;
    email: string;
    role: "admin" | "editor" | "viewer";
    createdAt: string;
    isActive: boolean;
}

const mockUsers: UserData[] = [
    { id: "1", name: "Admin", email: "admin@basao.gov.vn", role: "admin", createdAt: "2024-01-01", isActive: true },
    { id: "2", name: "Nguyễn Văn A", email: "nguyenvana@basao.gov.vn", role: "editor", createdAt: "2024-03-15", isActive: true },
];

export default function UsersManager() {
    const [users, setUsers] = useState<UserData[]>(mockUsers);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingUser, setEditingUser] = useState<UserData | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSave = (user: UserData) => {
        if (isCreating) {
            setUsers([...users, { ...user, id: Date.now().toString(), createdAt: new Date().toISOString().split('T')[0] }]);
        } else {
            setUsers(users.map(u => u.id === user.id ? user : u));
        }
        setEditingUser(null);
        setIsCreating(false);
    };

    const handleDelete = (id: string) => {
        if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
            setUsers(users.filter(u => u.id !== id));
        }
    };

    const handleCreate = () => {
        setIsCreating(true);
        setEditingUser({
            id: "",
            name: "",
            email: "",
            role: "viewer",
            createdAt: "",
            isActive: true
        });
    };

    const roleLabels = {
        admin: { label: "Quản trị viên", color: "bg-red-100 text-red-700" },
        editor: { label: "Biên tập viên", color: "bg-blue-100 text-blue-700" },
        viewer: { label: "Người xem", color: "bg-slate-100 text-slate-700" },
    };

    return (
        <AdminLayout activeMenu="users">
            <div className="p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900">Quản lý người dùng</h1>
                        <p className="text-slate-500 mt-1">Thêm, sửa, xóa tài khoản người dùng</p>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
                    >
                        <Plus size={20} />
                        Thêm người dùng
                    </button>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm người dùng..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                </div>

                {/* Edit Modal */}
                {editingUser && (
                    <UserEditModal
                        user={editingUser}
                        isCreating={isCreating}
                        onSave={handleSave}
                        onClose={() => { setEditingUser(null); setIsCreating(false); }}
                    />
                )}

                {/* Users Table */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="text-left py-4 px-6 text-sm font-bold text-slate-500">Người dùng</th>
                                    <th className="text-left py-4 px-6 text-sm font-bold text-slate-500">Email</th>
                                    <th className="text-left py-4 px-6 text-sm font-bold text-slate-500">Vai trò</th>
                                    <th className="text-left py-4 px-6 text-sm font-bold text-slate-500">Trạng thái</th>
                                    <th className="text-left py-4 px-6 text-sm font-bold text-slate-500">Ngày tạo</th>
                                    <th className="text-right py-4 px-6 text-sm font-bold text-slate-500">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="border-b border-slate-50 hover:bg-slate-50">
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <span className="font-medium text-slate-900">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-sm text-slate-500">{user.email}</td>
                                        <td className="py-4 px-6">
                                            <span className={cn("px-2.5 py-1 rounded-full text-xs font-bold", roleLabels[user.role].color)}>
                                                {roleLabels[user.role].label}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6">
                                            {user.isActive ? (
                                                <span className="flex items-center gap-1 text-green-600 text-sm font-medium">
                                                    <UserCheck size={14} /> Hoạt động
                                                </span>
                                            ) : (
                                                <span className="text-slate-400 text-sm">Vô hiệu</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-6 text-sm text-slate-500">{user.createdAt}</td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => setEditingUser(user)}
                                                    className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
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

interface UserEditModalProps {
    user: UserData;
    isCreating: boolean;
    onSave: (user: UserData) => void;
    onClose: () => void;
}

function UserEditModal({ user, isCreating, onSave, onClose }: UserEditModalProps) {
    const [formData, setFormData] = useState<UserData>(user);
    const [password, setPassword] = useState("");

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md">
                <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-900">
                        {isCreating ? "Thêm người dùng mới" : "Chỉnh sửa người dùng"}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Họ tên *</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                placeholder="Nguyễn Văn A"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                placeholder="email@example.com"
                            />
                        </div>
                    </div>

                    {isCreating && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">Mật khẩu *</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                placeholder="••••••••"
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Vai trò *</label>
                        <div className="relative">
                            <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <select
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value as UserData["role"] })}
                                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none bg-white"
                            >
                                <option value="viewer">Người xem</option>
                                <option value="editor">Biên tập viên</option>
                                <option value="admin">Quản trị viên</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="isActive"
                            checked={formData.isActive}
                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                            className="w-4 h-4 text-primary rounded focus:ring-primary"
                        />
                        <label htmlFor="isActive" className="text-sm font-medium text-slate-700">Kích hoạt tài khoản</label>
                    </div>
                </div>

                <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={() => onSave(formData)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        <Save size={18} />
                        {isCreating ? "Tạo mới" : "Lưu thay đổi"}
                    </button>
                </div>
            </div>
        </div>
    );
}
