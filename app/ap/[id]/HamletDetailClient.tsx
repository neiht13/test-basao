"use client";

import { MapPin, Users, Phone, ShieldCheck, UserCircle2, Building2, ArrowLeft, AreaChart, Home, UserCheck } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { animateListEntry, animateHeroText, animateCardHover, animateCardLeave } from "@/lib/animations";

interface HamletDetailClientProps {
    hamlet: any; // Using any for simplicity as per existing data structure, can be typed strictly if models are available
}

export default function HamletDetailClient({ hamlet }: HamletDetailClientProps) {
    useEffect(() => {
        animateHeroText(".hero-animate", 0);
        animateListEntry(".stat-card", 400);
        animateListEntry(".leader-card", 600);
    }, []);

    // Fallback image if none provided
    // const bgImage = hamlet.images && hamlet.images.length > 0
    //     ? hamlet.images[0]
    //     : "https://images.unsplash.com/photo-1625246333195-f8d9c7a74553?auto=format&fit=crop&q=80&w=2000";
    const bgImage = "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1000";

    return (
        <div className="min-h-screen bg-slate-50 animate-in fade-in duration-700">
            {/* Rich Header with Parallax-like effect */}
            <div className="relative h-[50vh] min-h-[400px] flex items-end pb-12 overflow-hidden group">
                <div className="absolute inset-0 bg-slate-900">
                    <img
                        src={bgImage}
                        alt={hamlet.name}
                        className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <Link href="/" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors font-medium backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full border border-white/10 hover:bg-white/20">
                        <ArrowLeft size={16} /> Quay lại trang chủ
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-end gap-6">
                        <div className="hero-animate opacity-0 w-24 h-24 bg-white rounded-2xl flex items-center justify-center text-4xl font-black text-slate-900 shadow-2xl shadow-black/20">
                            {hamlet.shortName}
                        </div>
                        <div className="flex-1">
                            <div className="hero-animate opacity-0 flex items-center gap-3 mb-2">
                                <span className="px-3 py-1 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-primary/25">
                                    Đơn vị hành chính
                                </span>
                                {hamlet.isSpotlight && (
                                    <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-amber-500/25">
                                        Tiêu điểm
                                    </span>
                                )}
                            </div>
                            <h1 className="hero-animate opacity-0 text-4xl md:text-6xl font-black text-white mb-2 tracking-tight">{hamlet.name}</h1>
                            <p className="hero-animate opacity-0 text-slate-200 text-lg md:text-xl font-medium max-w-2xl leading-relaxed">
                                {hamlet.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 -mt-10 relative z-20">
                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Stats Cards - Floating Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { label: "Diện tích", value: hamlet.stats?.area, icon: AreaChart, color: "text-blue-600" },
                                { label: "Hộ dân", value: hamlet.stats?.households, icon: Home, color: "text-indigo-600" },
                                { label: "Nhân khẩu", value: hamlet.stats?.population, icon: Users, color: "text-violet-600" },
                                { label: "Đảng viên", value: hamlet.stats?.partyMembers, icon: UserCheck, color: "text-red-600" }
                            ].map((stat, idx) => (
                                <div
                                    key={idx}
                                    className={cn(
                                        "stat-card opacity-0 bg-white p-5 rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/50 flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300",
                                        "rounded-xl" // Sharper corners
                                    )}
                                >
                                    <div className={cn("p-3 rounded-full bg-slate-50 mb-3", stat.color)}>
                                        <stat.icon size={20} />
                                    </div>
                                    <span className="block text-xl font-black text-slate-900 mb-1">{stat.value || "--"}</span>
                                    <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">{stat.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* Extended Stats Cards */}
                        {(hamlet.stats?.exemptPartyMembers || hamlet.stats?.partyCellMembers || hamlet.stats?.selfGovGroups || hamlet.stats?.mainOccupation) && (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { label: "ĐV miễn công tác", value: hamlet.stats?.exemptPartyMembers, show: !!hamlet.stats?.exemptPartyMembers },
                                    { label: "Chi ủy viên", value: hamlet.stats?.partyCellMembers, show: !!hamlet.stats?.partyCellMembers },
                                    { label: "Tổ NDTQ", value: hamlet.stats?.selfGovGroups, show: !!hamlet.stats?.selfGovGroups },
                                    { label: "Nghề chính", value: hamlet.stats?.mainOccupation, show: !!hamlet.stats?.mainOccupation }
                                ].filter(stat => stat.show).map((stat, idx) => (
                                    <div
                                        key={idx}
                                        className="stat-card opacity-0 bg-gradient-to-br from-slate-50 to-white p-4 rounded-xl border border-slate-100 shadow-md flex flex-col items-center text-center hover:-translate-y-1 transition-transform duration-300"
                                    >
                                        <span className="block text-lg font-bold text-slate-900 mb-1">{stat.value}</span>
                                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Detailed Description Section */}
                        {hamlet.detailedDescription && (
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                                <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3 bg-white">
                                    <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                                        <Building2 size={20} />
                                    </div>
                                    <h3 className="font-bold text-xl text-slate-900">Giới Thiệu Chi Tiết</h3>
                                </div>
                                <div className="p-8">
                                    <p className="text-slate-600 leading-relaxed text-base">{hamlet.detailedDescription}</p>
                                </div>
                            </div>
                        )}



                        {/* Goals Section */}
                        {hamlet.goals && (
                            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/20 overflow-hidden">
                                <div className="px-8 py-6 border-b border-primary/10 flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                        <MapPin size={20} />
                                    </div>
                                    <h3 className="font-bold text-xl text-slate-900">Định Hướng Phát Triển</h3>
                                </div>
                                <div className="p-8">
                                    <p className="text-slate-700 leading-relaxed text-base italic">{hamlet.goals}</p>
                                </div>
                            </div>
                        )}

                        {/* Leaders Section */}
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                            <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3 bg-white">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    <Users size={20} />
                                </div>
                                <h3 className="font-bold text-xl text-slate-900">Ban Lãnh Đạo Ấp</h3>
                            </div>
                            <div className="p-8 grid md:grid-cols-2 gap-6">
                                {hamlet.leaders.map((leader: any, idx: number) => (
                                    <div
                                        key={idx}
                                        onMouseEnter={(e) => animateCardHover(e.currentTarget)}
                                        onMouseLeave={(e) => animateCardLeave(e.currentTarget)}
                                        className="leader-card opacity-0 flex items-start gap-5 p-5 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white transition-colors"
                                    >
                                        <div className="w-14 h-14 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-primary group-hover:text-white transition-colors shadow-sm flex-shrink-0">
                                            <UserCircle2 size={32} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[10px] font-bold text-primary uppercase mb-1 tracking-wider">{leader.role}</p>
                                            <p className="text-lg font-bold text-slate-900">{leader.name}</p>
                                            {leader.phone && (
                                                <div className="mt-3">
                                                    <a href={`tel:${leader.phone}`} className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-primary transition-colors bg-white px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm group-hover:border-primary/20">
                                                        <Phone size={12} /> {leader.phone}
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Organizations Section */}
                        {hamlet.organizations && hamlet.organizations.length > 0 && (
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                                <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3 bg-white">
                                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                        <Users size={20} />
                                    </div>
                                    <h3 className="font-bold text-xl text-slate-900">Tổ Chức Chính Trị - Xã Hội</h3>
                                </div>
                                <div className="p-8">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {hamlet.organizations.map((org: string, idx: number) => (
                                            <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                                                    {idx + 1}
                                                </div>
                                                <span className="text-slate-900 font-medium">{org}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Security Section (if exists) */}
                        {hamlet.security && hamlet.security.length > 0 && (
                            <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
                                <div className="px-8 py-6 border-b border-slate-50 flex items-center gap-3 bg-white">
                                    <div className="p-2 bg-green-50 rounded-lg text-green-600">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <h3 className="font-bold text-xl text-slate-900">Tổ An Ninh Trật Tự Cơ Sở</h3>
                                </div>
                                <div className="p-8 grid md:grid-cols-2 gap-6">
                                    {hamlet.security.map((member: any, idx: number) => (
                                        <div key={idx} className="leader-card opacity-0 flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-white hover:border-green-200 hover:shadow-md transition-all">
                                            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 font-black text-xs border border-green-100">
                                                AN
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-0.5">{member.role}</p>
                                                <p className="text-base font-bold text-slate-900">{member.name}</p>
                                                {member.phone && (
                                                    <p className="text-xs text-slate-500 mt-0.5 font-medium">{member.phone}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 p-8 sticky top-24">
                            <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Building2 size={20} className="text-primary" /> Thông tin khác
                            </h3>
                            <p className="text-sm text-slate-600 leading-relaxed mb-6">
                                Ấp {hamlet.name} là một trong những đơn vị hành chính quan trọng của xã Ba Sao.
                                Người dân luôn đoàn kết, chấp hành tốt chủ trương của Đảng và chính sách pháp luật của Nhà nước.
                            </p>
                            <div className="pt-6 border-t border-slate-100">
                                <h4 className="font-bold text-sm text-slate-900 mb-3">Vị trí địa lý</h4>
                                <div className="h-40 bg-slate-100 rounded-xl overflow-hidden relative">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        scrolling="no"
                                        src="https://www.openstreetmap.org/export/embed.html?bbox=105.6000%2C10.4500%2C105.7500%2C10.6000&amp;layer=mapnik"
                                        className="w-full h-full opacity-75"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
