"use client";

import { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { Save, Globe, Bell, Lock, Palette } from "lucide-react";

export default function SettingsManager() {
    const [settings, setSettings] = useState({
        siteName: "",
        siteDescription: "",
        contactPhone: "",
        contactEmail: "",
        enableNotifications: true,
        enableChatbot: true,
        maintenanceMode: false,
        primaryColor: "#3b82f6"
    });
    const [loading, setLoading] = useState(true);

    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch('/api/settings');
            if (res.ok) {
                const data = await res.json();
                setSettings({
                    ...data,
                    enableChatbot: data.features?.enableChatbot ?? true,
                    enableNotifications: data.features?.enableNotifications ?? true
                });
            }
        } catch (error) {
            console.error('Fetch settings error:', error);
        }
        setLoading(false);
    };

    const handleSave = async () => {
        setSaved(false);
        try {
            const payload = {
                ...settings,
                features: {
                    enableChatbot: settings.enableChatbot,
                    enableNotifications: settings.enableNotifications
                }
            };
            const res = await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setSaved(true);
                setTimeout(() => setSaved(false), 3000);
            } else {
                alert('Lỗi khi lưu cài đặt');
            }
        } catch (error) {
            console.error('Save error:', error);
            alert('Lỗi kết nối server');
        }
    };

    return (
        <AdminLayout activeMenu="settings">
            <div className="p-6 lg:p-8 max-w-4xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-slate-900">Cài đặt hệ thống</h1>
                    <p className="text-slate-500 mt-1">Cấu hình thông tin trang web</p>
                </div>

                <div className="space-y-6">
                    {/* Site Info */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                                <Globe size={20} />
                            </div>
                            <div>
                                <h2 className="font-bold text-slate-900">Thông tin trang web</h2>
                                <p className="text-sm text-slate-500">Cấu hình thông tin cơ bản</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Tên trang web</label>
                                <input
                                    type="text"
                                    value={settings.siteName}
                                    onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Mô tả</label>
                                <textarea
                                    value={settings.siteDescription}
                                    onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none"
                                />
                            </div>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Điện thoại liên hệ</label>
                                    <input
                                        type="text"
                                        value={settings.contactPhone}
                                        onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Email liên hệ</label>
                                    <input
                                        type="email"
                                        value={settings.contactEmail}
                                        onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                                <Bell size={20} />
                            </div>
                            <div>
                                <h2 className="font-bold text-slate-900">Tính năng</h2>
                                <p className="text-sm text-slate-500">Bật/tắt các tính năng</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div>
                                    <p className="font-medium text-slate-900">Chatbot trợ lý</p>
                                    <p className="text-sm text-slate-500">Hiển thị chatbot tra cứu TTHC</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.enableChatbot}
                                        onChange={(e) => setSettings({ ...settings, enableChatbot: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                                <div>
                                    <p className="font-medium text-slate-900">Thông báo</p>
                                    <p className="text-sm text-slate-500">Gửi thông báo cho người dùng</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={settings.enableNotifications}
                                        onChange={(e) => setSettings({ ...settings, enableNotifications: e.target.checked })}
                                        className="sr-only peer"
                                    />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Maintenance */}
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center text-red-600">
                                <Lock size={20} />
                            </div>
                            <div>
                                <h2 className="font-bold text-slate-900">Bảo trì</h2>
                                <p className="text-sm text-slate-500">Chế độ bảo trì hệ thống</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
                            <div>
                                <p className="font-medium text-red-900">Chế độ bảo trì</p>
                                <p className="text-sm text-red-600">Khi bật, người dùng sẽ thấy trang bảo trì</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={settings.maintenanceMode}
                                    onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-red-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-red-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                            </label>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex items-center justify-end gap-4">
                        {saved && (
                            <span className="text-green-600 font-medium">✓ Đã lưu thay đổi</span>
                        )}
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
                        >
                            <Save size={20} />
                            Lưu cài đặt
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
