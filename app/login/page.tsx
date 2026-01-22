"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Globe, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { data, error } = await authClient.signIn.email({
                email,
                password,
            });

            if (error) {
                setError(error.message || "Email hoặc mật khẩu không chính xác");
            } else {
                router.push("/admin");
                router.refresh();
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
                <div className="bg-primary p-8 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 text-white mb-4 backdrop-blur-sm">
                        <Globe size={24} />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Đăng Nhập Hệ Thống</h1>
                    <p className="text-primary-foreground/80 text-sm mt-2">Cổng thông tin điện tử Xã Ba Sao</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium border border-red-100">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                placeholder="admin@example.com"
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
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-4 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : "Đăng Nhập"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link href="/" className="text-sm text-slate-500 hover:text-primary font-medium transition-colors">
                            ← Quay lại trang chủ
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
