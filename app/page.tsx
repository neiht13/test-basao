"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { HAMLETS_DATA } from "@/lib/data";
import { Search, Globe, Building2, Newspaper, Calendar, ShieldCheck, MapPin, LayoutGrid, Users, ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { animateHeroText, animateListEntry, animateCardHover, animateCardLeave } from "@/lib/animations";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const heroRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    // Animate Hero Text
    animateHeroText(".hero-animate", 200);
    // Animate List
    animateListEntry(".hamlet-card", 800);
  }, []);

  const filteredHamlets = HAMLETS_DATA.filter(h =>
    h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    h.leaders.some(l => l.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <div ref={heroRef} className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-background to-background -z-10" />
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-grid-slate-900/[0.04] -z-10 [mask-image:linear-gradient(to_bottom,white,transparent)]" />

        {/* Decorative Blobs */}
        <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-50 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-3xl opacity-50" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="hero-animate opacity-0 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-white/40 text-primary text-xs font-bold uppercase tracking-wider mb-8 shadow-sm hover:scale-105 transition-transform cursor-default">
                <Globe size={12} /> Trang thông tin phục vụ công tác tra cứu thông tin trên địa bàn xã Ba Sao

              </div>

              <h2 className="hero-animate opacity-0 text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-[1.1]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Xã Ba Sao</span>
                <br />
                <span>Tỉnh Đồng Tháp</span>
              </h2>

              <p className="hero-animate opacity-0 text-slate-600 text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
                Hệ thống thông tin quản lý hỗ trợ tra cứu thông tin hành chính hiện đại, kết nối người dân và chính quyền.
                Tra cứu thông tin, liên hệ lãnh đạo và cập nhật tin tức nhanh chóng.
              </p>

              <div className="hero-animate opacity-0 w-full max-w-xl relative group shadow-2xl shadow-primary/10 rounded-full">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-full opacity-20 group-hover:opacity-40 blur transition duration-500" />
                <div className="relative flex items-center bg-white rounded-full p-2">
                  <div className="pl-6 text-slate-400">
                    <Search size={24} />
                  </div>
                  <input
                    type="text"
                    placeholder="Tìm kiếm ấp, cán bộ..."
                    className="w-full py-4 px-4 bg-transparent text-slate-800 focus:outline-none text-lg font-medium placeholder:text-slate-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors shadow-md whitespace-nowrap">
                    Tìm kiếm
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-center lg:justify-end relative">
              <div className="hero-animate opacity-0 relative w-64 h-64 md:w-96 md:h-96 drop-shadow-2xl hover:scale-105 transition-transform duration-500 animate-in zoom-in slide-in-from-right-10 duration-1000">
                <img
                  src="/Huy_Hiệu_Đoàn.png"
                  alt="Huy hiệu Đoàn"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_25px_rgba(0,94,184,0.3)]"
                />
                <div className="absolute inset-0 bg-primary/20 blur-[100px] -z-10 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info & Map Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            {/* Intro Card */}
            <div
              onMouseEnter={(e) => animateCardHover(e.currentTarget)}
              onMouseLeave={(e) => animateCardLeave(e.currentTarget)}
              className="group bg-white rounded-2xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-700" />

              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3 relative z-10">
                <div className="p-2 bg-blue-50 rounded-lg text-primary">
                  <Building2 size={24} />
                </div>
                Tổng Quan Xã Ba Sao
              </h3>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed relative z-10 text-lg">
                <p>
                  Xã Ba Sao là một đơn vị hành chính thuộc tỉnh Đồng Tháp.
                  Với vị trí địa lý thuận lợi và hệ thống kênh rạch chằng chịt, xã có thế mạnh lớn trong phát triển nông nghiệp,
                  đặc biệt là trồng lúa chất lượng cao và cây ăn trái.
                </p>
                <p>
                  Trong những năm qua, dưới sự lãnh đạo của Đảng ủy và UBND, xã Ba Sao đã đạt được nhiều thành tựu
                  trong xây dựng Nông thôn mới, đời sống vật chất và tinh thần của người dân ngày càng được nâng cao.
                </p>
              </div>
            </div>

            {/* News Grid */}
            {/* <div className="grid md:grid-cols-2 gap-6">
              {[
                { icon: Newspaper, color: "text-primary", bg: "bg-blue-50", title: "Tin tức sự kiện", headline: "Hội nghị triển khai kế hoạch phát triển kinh tế xã hội năm 2025", date: "15/01/2025", desc: "Sáng ngày 15/01/2025, UBND xã Ba Sao đã tổ chức hội nghị tổng kết công tác năm 2024..." },
                { icon: ShieldCheck, color: "text-green-600", bg: "bg-green-50", title: "An ninh trật tự", headline: "Ra mắt mô hình 'Tổ nhân dân tự quản kiểu mẫu' tại Ấp 5P", date: "10/01/2025", desc: "Mô hình nhằm phát huy vai trò làm chủ của nhân dân trong công tác giữ gìn an ninh..." }
              ].map((item, idx) => (
                <div
                  key={idx}
                  onMouseEnter={(e) => animateCardHover(e.currentTarget)}
                  onMouseLeave={(e) => animateCardLeave(e.currentTarget)}
                  className="group bg-white p-8 rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/50 cursor-pointer flex flex-col"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className={cn("flex items-center gap-2 font-bold text-sm px-3 py-1 rounded-full", item.bg, item.color)}>
                      <item.icon size={16} /> {item.title}
                    </div>
                    <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                      <Calendar size={12} /> {item.date}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-xl mb-3 group-hover:text-primary transition-colors leading-tight">
                    {item.headline}
                  </h4>
                  <p className="text-slate-500 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="flex items-center text-sm font-bold text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    Xem chi tiết <ArrowRight size={16} className="ml-1" />
                  </div>
                </div>
              ))}
            </div> */}
          </div>

          {/* Right: Map & Stats */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden group">
              <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-white relative z-10">
                <h3 className="font-bold text-slate-900 flex items-center gap-3">
                  <div className="p-2 bg-red-50 rounded-lg text-red-500">
                    <MapPin size={20} />
                  </div>
                  Bản đồ hành chính
                </h3>
              </div>
              <div className="h-80 bg-slate-100 relative overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=105.6000%2C10.4500%2C105.7500%2C10.6000&amp;layer=mapnik"
                  className="w-full h-full grayscale-[50%] group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110"
                ></iframe>
                <div className="absolute inset-0 pointer-events-none border-[12px] border-white/50 rounded-b-2xl" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary to-blue-700 text-white rounded-2xl p-8 shadow-2xl shadow-primary/30 relative overflow-hidden">
              {/* Abstract Pattern */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-black/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <LayoutGrid size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl leading-none">Đơn vị hành chính</h3>
                    <p className="text-blue-100 text-sm mt-1">Hệ thống quản lý ấp</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:bg-white/20 transition-colors">
                    <span className="block text-4xl font-black mb-1">13</span>
                    <span className="text-xs font-bold text-blue-100 uppercase tracking-wider">Tổng số ấp</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/10 hover:bg-white/20 transition-colors">
                    <span className="block text-4xl font-black mb-1">{filteredHamlets.length}</span>
                    <span className="text-xs font-bold text-blue-100 uppercase tracking-wider">Đã số hóa</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Danh Sách Ấp */}
      <div className="bg-slate-50/50 border-t border-slate-200">
        <div className="container mx-auto px-4 py-20">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-black text-slate-900 flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <LayoutGrid size={28} />
              </div>
              Danh sách các ấp
            </h3>
            <div className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-500">
              <Sparkles size={16} className="text-amber-400" />
              <span>{filteredHamlets.length} đơn vị trực thuộc</span>
            </div>
          </div>

          <div ref={listRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredHamlets.map((hamlet) => (
              <Link
                key={hamlet.id}
                href={`/ap/${hamlet.id}`}
                onMouseEnter={(e) => animateCardHover(e.currentTarget)}
                onMouseLeave={(e) => animateCardLeave(e.currentTarget)}
                className="hamlet-card opacity-0 group bg-white rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/50 flex flex-col relative overflow-hidden"
              >
                {hamlet.isSpotlight && (
                  <div className="absolute top-4 right-4 bg-amber-400/20 text-amber-700 text-[10px] font-black px-3 py-1 rounded-full z-10 border border-amber-400/30 flex items-center gap-1">
                    <Sparkles size={10} /> TIÊU ĐIỂM
                  </div>
                )}

                <div className="p-6 flex items-center gap-5 border-b border-slate-50 bg-gradient-to-b from-slate-50/50 to-transparent">
                  <div className="w-14 h-14 bg-white rounded-xl border border-slate-100 shadow-sm flex items-center justify-center text-slate-400 font-black text-xl group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    {hamlet.shortName}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-slate-900 group-hover:text-primary transition-colors">{hamlet.name}</h4>
                    <span className="text-xs text-slate-500 font-semibold flex items-center gap-1.5 mt-1">
                      <Users size={12} /> {hamlet.leaders.length} Cán bộ
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col">
                  {hamlet.leaders.slice(0, 1).map((leader, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 group-hover:bg-white border border-transparent group-hover:border-slate-100 transition-all">
                      <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center text-slate-400 text-sm font-bold shadow-sm">
                        {leader.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-[10px] uppercase text-slate-400 font-bold mb-0.5">{leader.role}</p>
                        <p className="text-sm font-bold text-slate-700 truncate">{leader.name}</p>
                      </div>
                    </div>
                  ))}

                  <div className="mt-auto pt-2">
                    <div className="w-full py-2.5 rounded-xl bg-slate-50 text-slate-600 text-sm font-bold text-center group-hover:bg-primary group-hover:text-white transition-colors flex items-center justify-center gap-2">
                      Xem chi tiết <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}