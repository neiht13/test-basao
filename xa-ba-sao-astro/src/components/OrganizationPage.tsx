"use client";

import { COMMUNE_ORG_DATA } from "@/lib/data";
import { UserCircle2, Phone, Mail, Building2, Award, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { animateListEntry, animateHeroText, animateCardHover, animateCardLeave } from "@/lib/animations";
import type { OrgGroup } from "@/lib/data";

export default function OrganizationPage() {
    const [orgGroups, setOrgGroups] = useState<OrgGroup[]>([]);
    const [loading, setLoading] = useState(true);
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

    useEffect(() => {
        fetchOrgGroups();
    }, []);

    const fetchOrgGroups = async () => {
        try {
            const res = await fetch('/api/organizations');
            if (res.ok) {
                const data = await res.json();
                if (data.length > 0) {
                    setOrgGroups(data);
                } else {
                    setOrgGroups(COMMUNE_ORG_DATA);
                }
            } else {
                setOrgGroups(COMMUNE_ORG_DATA);
            }
        } catch (error) {
            console.error('Fetch orgs error:', error);
            setOrgGroups(COMMUNE_ORG_DATA);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (!loading) {
            animateHeroText(".hero-animate", 0);
            animateListEntry(".org-card", 400);
        }
    }, [loading]);

    return (
        <div className="min-h-screen bg-slate-50 animate-in fade-in duration-700">
            {/* Hero Section */}
            <div className="relative bg-primary py-24 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary" />

                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="hero-animate opacity-0 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-sm border border-white/20 shadow-lg">
                        <Building2 size={14} /> Cơ cấu tổ chức
                    </div>
                    <h1 className="hero-animate opacity-0 text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        Tổ Chức Bộ Máy
                    </h1>
                    <p className="hero-animate opacity-0 text-blue-100 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                        Danh sách lãnh đạo Đảng ủy, HĐND, UBND và các đoàn thể chính trị - xã hội xã Ba Sao nhiệm kỳ 2021 - 2026.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 -mt-10 relative z-20 space-y-16">
                {orgGroups.map((group, groupIdx) => (
                    <div key={groupIdx} className="scroll-mt-24">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-px flex-1 bg-slate-200"></div>
                            <h2 className="text-2xl md:text-3xl font-black text-slate-900 uppercase tracking-tight text-center px-4 py-2 bg-white rounded-xl border border-slate-100 shadow-sm">
                                {group.title}
                            </h2>
                            <div className="h-px flex-1 bg-slate-200"></div>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {group.members.map((member, idx) => (
                                <div
                                    key={idx}
                                    onMouseEnter={(e) => animateCardHover(e.currentTarget)}
                                    onMouseLeave={(e) => animateCardLeave(e.currentTarget)}
                                    className={cn(
                                        "org-card opacity-0 group bg-white rounded-2xl border border-slate-100 p-6 shadow-lg shadow-slate-200/50 flex flex-col relative overflow-hidden",
                                        (member.role.includes("Bí thư Đảng uỷ") || member.role.includes("Chủ tịch UBND")) && "border-primary/20 bg-blue-50/30 ring-1 ring-primary/10"
                                    )}
                                >
                                    {/* Decorative background blob */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700" />

                                    <div className="flex items-start gap-5 relative z-10">
                                        <div
                                            className={cn(
                                                "w-[4.5rem] h-[6rem] rounded-xl flex items-center justify-center text-slate-300 shadow-inner border border-slate-100 transition-all duration-300 group-hover:scale-105 overflow-hidden cursor-pointer hover:opacity-90",
                                                (member.role.includes("Bí thư Đảng uỷ") || member.role.includes("Chủ tịch UBND")) && !member.image ? "bg-primary text-white shadow-primary/20" : "bg-slate-50 group-hover:bg-white group-hover:text-primary"
                                            )}
                                            onClick={() => member.image && setLightboxImage(member.image)}
                                        >
                                            {member.image ? (
                                                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <UserCircle2 size={32} strokeWidth={1.5} />
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0 pt-1">
                                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider mb-2 group-hover:bg-primary group-hover:text-white transition-colors">
                                                <Award size={10} />
                                                {member.role.split(',')[0]}
                                            </div>
                                            <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-primary transition-colors">
                                                {member.name}
                                            </h3>
                                            <p className="text-xs text-slate-500 font-medium mt-1 line-clamp-2">
                                                {member.role}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-6 border-t border-slate-50 space-y-3 relative z-10">
                                        {member.phone ? (
                                            <a href={`tel:${member.phone}`} className="flex items-center gap-3 text-sm font-semibold text-slate-600 hover:text-primary transition-colors p-2 rounded-xl hover:bg-slate-50 -mx-2">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                    <Phone size={14} />
                                                </div>
                                                {member.phone}
                                            </a>
                                        ) : (
                                            <div className="flex items-center gap-3 text-sm font-medium text-slate-400 p-2 -mx-2 opacity-50 cursor-not-allowed">
                                                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
                                                    <Phone size={14} />
                                                </div>
                                                Đang cập nhật
                                            </div>
                                        )}

                                        {member.email ? (
                                            <a href={`mailto:${member.email}`} className="flex items-center gap-3 text-sm font-semibold text-slate-600 hover:text-primary transition-colors p-2 rounded-xl hover:bg-slate-50 -mx-2">
                                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                    <Mail size={14} />
                                                </div>
                                                {member.email}
                                            </a>
                                        ) : (
                                            <div className="flex items-center gap-3 text-sm font-medium text-slate-400 p-2 -mx-2 opacity-50 cursor-not-allowed">
                                                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center">
                                                    <Mail size={14} />
                                                </div>
                                                Đang cập nhật
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {/* Lightbox Modal */}
            {lightboxImage && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300" onClick={() => setLightboxImage(null)}>
                    <button className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors" onClick={() => setLightboxImage(null)}>
                        <X size={32} />
                    </button>
                    <img src={lightboxImage} className="max-w-full max-h-[90vh] rounded-lg shadow-2xl object-contain animate-in zoom-in-95 duration-300" onClick={(e) => e.stopPropagation()} />
                </div>,
                document.body
            )}
        </div>
    );
}
