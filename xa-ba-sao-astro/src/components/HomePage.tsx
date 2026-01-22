"use client";

import { useState, useEffect, useRef } from "react";
import { HAMLETS_DATA, type Hamlet } from "@/lib/data";
import { Search, Globe, Building2, Newspaper, Calendar, ShieldCheck, MapPin, LayoutGrid, Users, ArrowRight, Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { animateHeroText, animateListEntry, animateCardHover, animateCardLeave } from "@/lib/animations";
import Map, { Marker, NavigationControl, Popup } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const MAP_STYLE = {
    version: 8,
    sources: {
        osm: {
            type: 'raster',
            tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
            tileSize: 256,
            attribution: '&copy; OpenStreetMap Contributors',
            maxzoom: 19
        }
    },
    layers: [
        {
            id: 'osm',
            type: 'raster',
            source: 'osm'
        }
    ]
};

export default function HomePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [hamlets, setHamlets] = useState<Hamlet[]>([]);
    const [loading, setLoading] = useState(true);
    const [popupInfo, setPopupInfo] = useState<Hamlet | null>(null);

    // Fetch hamlets from API on mount
    useEffect(() => {
        fetchHamlets();
    }, []);

    const fetchHamlets = async () => {
        try {
            const res = await fetch('/api/hamlets');
            if (res.ok) {
                const data = await res.json();
                if (data.length > 0) {
                    setHamlets(data);
                } else {
                    setHamlets(HAMLETS_DATA);
                }
            } else {
                setHamlets(HAMLETS_DATA);
            }
        } catch (error) {
            console.error('Fetch hamlets error:', error);
            setHamlets(HAMLETS_DATA);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (!loading) {
            animateHeroText(".hero-animate", 0);
            animateListEntry(".hamlet-card", 600);
        }
    }, [loading]);

    const filteredHamlets = hamlets.filter(hamlet =>
        hamlet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hamlet.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const categories = [
        { icon: Globe, label: "Giới thiệu", color: "bg-blue-500" },
        { icon: Building2, label: "Bộ máy", color: "bg-indigo-500" },
        { icon: Newspaper, label: "Tin tức", color: "bg-purple-500" },
        { icon: Calendar, label: "Sự kiện", color: "bg-pink-500" },
        { icon: ShieldCheck, label: "TTHC", color: "bg-emerald-500" },
        { icon: MapPin, label: "Bản đồ", color: "bg-amber-500" },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-3xl"></div>
                </div>

                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>

                <div className="container mx-auto px-4 relative z-10 pt-24 pb-16">
                    <div className="max-w-4xl mx-auto text-center">

                        <div className="hero-animate opacity-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm text-sm font-bold text-primary shadow-lg border border-white/50 mb-8">
                            <Sparkles size={16} className="text-amber-500" />
                            Cổng thông tin điện tử
                        </div>

                        <h1 className="hero-animate opacity-0 text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                            Xã <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-indigo-600">Ba Sao</span>
                        </h1>

                        <p className="hero-animate opacity-0 text-xl md:text-2xl text-slate-600 mb-10 max-w-2xl mx-auto font-medium leading-relaxed">
                            Huyện Cao Lãnh - Tỉnh Đồng Tháp
                        </p>

                        {/* Search Bar */}
                        <div className="hero-animate opacity-0 relative max-w-xl mx-auto mb-12">
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm thông tin ấp..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-6 py-4 pl-14 rounded-2xl border-2 border-slate-200/50 bg-white/80 backdrop-blur-sm focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-lg shadow-xl shadow-slate-200/50 outline-none"
                                />
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={22} />
                            </div>
                        </div>

                        {/* Quick Category Links */}
                        <div className="hero-animate opacity-0 flex flex-wrap justify-center gap-3 md:gap-4">
                            {categories.map((cat, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveCategory(cat.label)}
                                    className={cn(
                                        "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 shadow-lg hover:-translate-y-1 hover:shadow-xl active:translate-y-0",
                                        activeCategory === cat.label
                                            ? `${cat.color} text-white`
                                            : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-100"
                                    )}
                                >
                                    <cat.icon size={16} />
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Wave Separator */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 100" fill="none" className="w-full">
                        <path d="M0 50L48 45.7C96 41 192 32 288 29.3C384 27 480 31 576 40.3C672 50 768 65 864 68.3C960 72 1056 63 1152 53.7C1248 45 1344 36 1392 31.8L1440 28V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z" fill="white" />
                    </svg>
                </div>
            </section>

            {/* Hamlets Grid Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-3">
                                <LayoutGrid size={12} /> Danh sách các ấp
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                                Tổng quan {hamlets.length} Ấp
                            </h2>
                        </div>
                        <a href="/to-chuc-bo-may" className="hidden md:flex items-center gap-2 text-sm font-bold text-primary hover:text-primary/80 transition-colors group">
                            Xem tổ chức bộ máy <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>

                    {activeCategory === "Bản đồ" ? (
                        <div className="h-[600px] w-full rounded-2xl overflow-hidden border border-slate-200 shadow-lg relative bg-slate-100">
                            <Map
                                {...({
                                    initialViewState: {
                                        longitude: 105.6793,
                                        latitude: 10.5364,
                                        zoom: 13
                                    }
                                } as any)}
                                mapLib={maplibregl as any}
                                style={{ width: '100%', height: '100%' }}
                                mapStyle={MAP_STYLE as any}
                            >
                                <NavigationControl />
                                {hamlets.map((hamlet, index) => (
                                    <Marker
                                        key={`marker-${index}`}
                                        longitude={hamlet.location?.lng || 105.6793}
                                        latitude={hamlet.location?.lat || 10.5364}
                                    >
                                        <div
                                            className="cursor-pointer group relative"
                                            onClick={e => {
                                                e.stopPropagation();
                                                setPopupInfo(hamlet);
                                            }}
                                        >
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/20 blur-sm rounded-full" />
                                            <MapPin size={40} className={cn(
                                                "drop-shadow-lg transition-transform duration-300 group-hover:-translate-y-2",
                                                hamlet.isSpotlight ? "text-amber-500 fill-amber-500" : "text-primary fill-primary"
                                            )} />
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-sm font-bold text-slate-900 pointer-events-none">
                                                {hamlet.shortName}
                                            </div>
                                        </div>
                                    </Marker>
                                ))}

                                {popupInfo && (
                                    <Popup
                                        longitude={popupInfo.location?.lng || 105.6793}
                                        latitude={popupInfo.location?.lat || 10.5364}
                                        onClose={() => setPopupInfo(null)}
                                        className="min-w-[300px]"
                                    >
                                        <div className="p-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className={cn(
                                                    "w-10 h-10 rounded-lg flex items-center justify-center text-lg font-black text-white shadow-md",
                                                    popupInfo.isSpotlight ? "bg-amber-500" : "bg-primary"
                                                )}>
                                                    {popupInfo.shortName}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-900">{popupInfo.name}</h3>
                                                    {popupInfo.isSpotlight && <span className="text-[10px] font-bold text-amber-500 uppercase">Tiêu điểm</span>}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 mb-3 text-xs font-bold text-slate-500">
                                                <Users size={12} /> {popupInfo.leaders?.length || 0} lãnh đạo
                                                <span className="w-1 h-1 rounded-full bg-slate-300" />
                                                <LayoutGrid size={12} /> {popupInfo.stats?.area || "N/A"}
                                            </div>
                                            <a href={`/ap/${popupInfo.id}`} className="block w-full py-2 bg-slate-900 text-white text-center rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors">
                                                Xem chi tiết
                                            </a>
                                        </div>
                                    </Popup>
                                )}
                            </Map>
                        </div>
                    ) : (
                        loading ? (
                            <div className="flex items-center justify-center py-20">
                                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                                <span className="ml-3 text-slate-500">Đang tải dữ liệu...</span>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredHamlets.map((hamlet, idx) => (
                                    <a
                                        href={`/ap/${hamlet.id}`}
                                        key={hamlet.id || idx}
                                        onMouseEnter={(e) => animateCardHover(e.currentTarget)}
                                        onMouseLeave={(e) => animateCardLeave(e.currentTarget)}
                                        className={cn(
                                            "hamlet-card opacity-0 group relative bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 flex flex-col",
                                            hamlet.isSpotlight && "bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200/50"
                                        )}
                                    >
                                        {hamlet.isSpotlight && (
                                            <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-amber-500 text-white text-[10px] font-bold uppercase shadow-lg shadow-amber-500/25">
                                                Tiêu điểm
                                            </div>
                                        )}
                                        <div className={cn(
                                            "w-14 h-14 rounded-xl flex items-center justify-center text-xl font-black mb-4 shadow-lg transition-transform duration-300 group-hover:scale-110",
                                            hamlet.isSpotlight
                                                ? "bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-amber-500/25"
                                                : "bg-gradient-to-br from-primary to-indigo-600 text-white shadow-primary/25"
                                        )}>
                                            {hamlet.shortName}
                                        </div>
                                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">{hamlet.name}</h3>
                                        <p className="text-sm text-slate-500 line-clamp-2 flex-1">{hamlet.description}</p>
                                        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                                            <Users size={14} className="text-slate-400" />
                                            <span className="text-xs font-bold text-slate-400">{hamlet.leaders?.length || 0} lãnh đạo</span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        )
                    )}
                </div>
            </section >
        </div >
    );
}
