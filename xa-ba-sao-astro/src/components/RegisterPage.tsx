"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Globe, Loader2, UserPlus } from "lucide-react";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { data, error } = await authClient.signUp.email({
                email,
                password,
                name
            });

            if (error) {
                setError(error.message || "Không thể tạo tài khoản");
            } else {
                setSuccess(true);
                // Auto login after registration
                setTimeout(() => {
                    window.location.href = "/admin";
                }, 1500);
            }
        } catch (err) {
            setError("Đã có lỗi xảy ra");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="bg-green-600 p-8 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 text-white mb-4 backdrop-blur-sm">
                        <UserPlus size={24} />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Đăng Ký Tài Khoản</h1>
                    <p className="text-green-100 text-sm mt-2">Tạo tài khoản quản trị viên</p>
                </div>

                <div className="p-8">
                    {success ? (
                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                ✓
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 mb-2">Đăng ký thành công!</h2>
                            <p className="text-slate-500">Đang chuyển hướng đến trang quản trị...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium border border-red-100">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700" htmlFor="name">
                                    Họ tên
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none"
                                    placeholder="Nguyễn Văn A"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    required
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none"
                                    placeholder="admin@basao.gov.vn"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700" htmlFor="password">
                                    Mật khẩu
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    required
                                    minLength={8}
                                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all outline-none"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <p className="text-xs text-slate-400">Tối thiểu 8 ký tự</p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? <Loader2 className="animate-spin" size={20} /> : "Đăng Ký"}
                            </button>
                        </form>
                    )}

                    <div className="mt-6 text-center space-y-2">
                        <a href="/login" className="block text-sm text-green-600 hover:text-green-700 font-medium transition-colors">
                            Đã có tài khoản? Đăng nhập
                        </a>
                        <a href="/" className="block text-sm text-slate-500 hover:text-primary font-medium transition-colors">
                            ← Quay lại trang chủ
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
