"use client";

import { useState, useRef, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { Plus, Edit2, Trash2, Search, Save, X, MapPin, Users, Phone, Upload, Image, Shield, Building2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { HAMLETS_DATA, type Hamlet, type Leader } from "@/lib/data";
import { compressImageToBase64, isValidImageFile } from "@/lib/image-utils";
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

// Extended Leader type with image
interface LeaderWithImage extends Leader {
    image?: string; // base64 image
}

// Security member type
interface SecurityMember {
    name: string;
    role: string;
    phone?: string;
    image?: string;
}

// Extended Hamlet type with _id for MongoDB
interface HamletExtended extends Omit<Hamlet, 'leaders' | 'security' | 'organizations'> {
    _id?: string;
    leaders: LeaderWithImage[];
    organizations?: LeaderWithImage[];
    security?: SecurityMember[];
    avatar?: string;
    coverImage?: string;
    location?: {
        lat: number;
        lng: number;
    };
}


export default function HamletsManager() {
    const [hamlets, setHamlets] = useState<HamletExtended[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingHamlet, setEditingHamlet] = useState<HamletExtended | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchHamlets();
    }, []);

    const fetchHamlets = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/hamlets');
            if (res.ok) {
                const data = await res.json();
                if (data.length === 0) {
                    setHamlets(HAMLETS_DATA as unknown as HamletExtended[]);
                } else {
                    setHamlets(data);
                }
            } else {
                setHamlets(HAMLETS_DATA as unknown as HamletExtended[]);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setHamlets(HAMLETS_DATA as unknown as HamletExtended[]);
        }
        setLoading(false);
    };

    const filteredHamlets = hamlets.filter(h =>
        h.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSave = async (hamlet: HamletExtended) => {
        setSaving(true);
        try {
            const res = await fetch('/api/hamlets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(hamlet)
            });

            if (res.ok) {
                const savedHamlet = await res.json();
                if (isCreating) {
                    setHamlets([...hamlets, savedHamlet]);
                } else {
                    setHamlets(hamlets.map(h => (h._id === savedHamlet._id || h.id === savedHamlet.id) ? savedHamlet : h));
                }
                setEditingHamlet(null);
                setIsCreating(false);
            } else {
                alert('Lỗi khi lưu dữ liệu');
            }
        } catch (error) {
            console.error('Save error:', error);
            alert('Lỗi kết nối server');
        }
        setSaving(false);
    };

    const handleDelete = async (hamlet: HamletExtended) => {
        if (!confirm('Bạn có chắc chắn muốn xóa ấp này?')) return;

        try {
            const res = await fetch('/api/hamlets', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: hamlet._id || hamlet.id })
            });

            if (res.ok) {
                setHamlets(hamlets.filter(h => h._id !== hamlet._id && h.id !== hamlet.id));
            } else {
                alert('Lỗi khi xóa dữ liệu');
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Lỗi kết nối server');
        }
    };

    const handleCreate = () => {
        setIsCreating(true);
        setEditingHamlet({
            id: `ap-${Date.now()}`,
            name: "",
            shortName: "",
            description: "",
            stats: {},
            leaders: [],
            organizations: [],
            security: [],
            images: [],
            location: { lat: 10.5364, lng: 105.6793 } // Default center of Ba Sao
        });
    };

    return (
        <AdminLayout activeMenu="hamlets">
            <div className="p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900">Quản lý Ấp</h1>
                        <p className="text-slate-500 mt-1">Thêm, sửa, xóa thông tin các ấp trong xã</p>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
                    >
                        <Plus size={20} />
                        Thêm Ấp mới
                    </button>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Tìm kiếm ấp..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    />
                </div>

                {/* Edit Modal */}
                {editingHamlet && (
                    <HamletEditModal
                        hamlet={editingHamlet}
                        isCreating={isCreating}
                        onSave={handleSave}
                        onClose={() => { setEditingHamlet(null); setIsCreating(false); }}
                    />
                )}

                {/* Hamlet Cards Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredHamlets.map((hamlet) => (
                        <div key={hamlet.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black text-white",
                                            hamlet.isSpotlight ? "bg-amber-500" : "bg-primary"
                                        )}>
                                            {hamlet.shortName}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900">{hamlet.name}</h3>
                                            {hamlet.isSpotlight && (
                                                <span className="text-xs text-amber-600 font-medium">Tiêu điểm</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <p className="text-sm text-slate-500 mb-4 line-clamp-2">{hamlet.description}</p>

                                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-4">
                                    <span className="flex items-center gap-1">
                                        <Users size={14} />
                                        {hamlet.leaders.length} lãnh đạo
                                    </span>
                                    {hamlet.organizations && hamlet.organizations.length > 0 && (
                                        <span className="flex items-center gap-1">
                                            <Building2 size={14} />
                                            {hamlet.organizations.length} tổ chức
                                        </span>
                                    )}
                                    {hamlet.security && hamlet.security.length > 0 && (
                                        <span className="flex items-center gap-1">
                                            <Shield size={14} />
                                            {hamlet.security.length} an ninh
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                                    <button
                                        onClick={() => setEditingHamlet(hamlet)}
                                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors"
                                    >
                                        <Edit2 size={16} />
                                        Chỉnh sửa
                                    </button>
                                    <button
                                        onClick={() => handleDelete(hamlet)}
                                        className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}

interface HamletEditModalProps {
    hamlet: HamletExtended;
    isCreating: boolean;
    onSave: (hamlet: HamletExtended) => void;
    onClose: () => void;
}

function HamletEditModal({ hamlet, isCreating, onSave, onClose }: HamletEditModalProps) {
    const [formData, setFormData] = useState<HamletExtended>(hamlet);
    const [newLeader, setNewLeader] = useState<LeaderWithImage>({ role: "", name: "", phone: "" });
    const [newOrgMember, setNewOrgMember] = useState<LeaderWithImage>({ role: "", name: "", phone: "" });
    const [newSecurity, setNewSecurity] = useState<SecurityMember>({ role: "", name: "", phone: "" });
    const [activeTab, setActiveTab] = useState<"info" | "leaders" | "orgs" | "security" | "images" | "location">("info");
    const [uploading, setUploading] = useState(false);

    const handleChange = (field: keyof HamletExtended, value: any) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleStatsChange = (field: string, value: string) => {
        setFormData({
            ...formData,
            stats: { ...formData.stats, [field]: value }
        });
    };

    const handleImageUpload = async (section: 'leaders' | 'organizations' | 'security', index: number, file: File) => {
        if (!isValidImageFile(file)) return;
        setUploading(true);
        try {
            const base64 = await compressImageToBase64(file, 512);
            const list = [...(formData[section] || [])];
            (list[index] as any).image = base64;
            setFormData({ ...formData, [section]: list });
        } catch (err) {
            console.error('Upload error:', err);
        }
        setUploading(false);
    };

    const handleNewMemberImageUpload = async (setter: any, current: any, file: File) => {
        if (!isValidImageFile(file)) return;
        try {
            const base64 = await compressImageToBase64(file, 512);
            setter({ ...current, image: base64 });
        } catch (e) { console.error(e); }
    };

    const handleAddMember = (section: 'leaders' | 'organizations' | 'security', newItem: any, resetItem: any, setResetItem: any) => {
        if (newItem.name && newItem.role) {
            setFormData({
                ...formData,
                [section]: [...(formData[section] || []), newItem]
            });
            setResetItem({ role: "", name: "", phone: "" });
        }
    };

    const handleRemoveMember = (section: 'leaders' | 'organizations' | 'security', index: number) => {
        setFormData({
            ...formData,
            [section]: (formData[section] || []).filter((_: any, i: number) => i !== index)
        });
    };

    const tabs = [
        { id: "info", label: "Thông tin", icon: MapPin },
        { id: "images", label: "Hình ảnh", icon: Image },
        { id: "location", label: "Vị trí", icon: MapPin },
        { id: "leaders", label: "Lãnh đạo", icon: Users },
        { id: "orgs", label: "Tổ chức CT-XH", icon: Building2 },
        { id: "security", label: "An ninh", icon: Shield },
    ];

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
                <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-900">
                        {isCreating ? "Thêm Ấp mới" : `Chỉnh sửa ${hamlet.name}`}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex border-b border-slate-100 px-6 bg-slate-50">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors",
                                activeTab === tab.id
                                    ? "border-primary text-primary bg-white"
                                    : "border-transparent text-slate-500 hover:text-slate-700"
                            )}
                        >
                            <tab.icon size={16} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                    {activeTab === "info" && (
                        <div className="space-y-6">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Tên Ấp *</label>
                                    <input type="text" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="Ấp 1" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Tên viết tắt *</label>
                                    <input type="text" value={formData.shortName} onChange={(e) => handleChange("shortName", e.target.value)} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="1" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Mô tả *</label>
                                <textarea value={formData.description} onChange={(e) => handleChange("description", e.target.value)} rows={3} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Mô tả chi tiết</label>
                                <textarea value={formData.detailedDescription || ""} onChange={(e) => handleChange("detailedDescription", e.target.value)} rows={5} className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none" placeholder="Nội dung chi tiết hiển thị bên dưới..." />
                            </div>
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="isSpotlight" checked={formData.isSpotlight || false} onChange={(e) => handleChange("isSpotlight", e.target.checked)} className="w-4 h-4 text-primary rounded focus:ring-primary" />
                                <label htmlFor="isSpotlight" className="text-sm font-medium text-slate-700">Đánh dấu là Tiêu điểm</label>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-900 mb-3">Thống kê</h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { key: "area", label: "Diện tích", placeholder: "160 ha" },
                                        { key: "households", label: "Số hộ dân", placeholder: "406 hộ" },
                                        { key: "population", label: "Nhân khẩu", placeholder: "1.902 khẩu" },
                                        { key: "partyMembers", label: "Đảng viên", placeholder: "24 đảng viên" },
                                    ].map((stat) => (
                                        <div key={stat.key}>
                                            <label className="block text-xs font-medium text-slate-500 mb-1">{stat.label}</label>
                                            <input type="text" value={(formData.stats as any)?.[stat.key] || ""} onChange={(e) => handleStatsChange(stat.key, e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder={stat.placeholder} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "images" && (
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Ảnh đại diện (Avatar)</label>
                                <div className="flex items-start gap-4">
                                    <div className="w-24 h-24 bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden relative cursor-pointer group" onClick={() => (document.getElementById('avatar-upload') as HTMLInputElement)?.click()}>
                                        {formData.avatar ? <img src={formData.avatar} className="w-full h-full object-cover" /> : <Image className="text-slate-400" />}
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Upload className="text-white" size={20} />
                                        </div>
                                    </div>
                                    <input type="file" id="avatar-upload" hidden accept="image/*" onChange={async (e) => { const file = e.target.files?.[0]; if (file && isValidImageFile(file)) { const base64 = await compressImageToBase64(file, 512); handleChange("avatar", base64); } }} />
                                    <div className="text-sm text-slate-500 max-w-xs">Ảnh đại diện hiển thị trong danh sách và thẻ thông tin. Tỉ lệ khuyến nghị 1:1.</div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Ảnh bìa (Cover)</label>
                                <div className="w-full h-48 bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden relative cursor-pointer group" onClick={() => (document.getElementById('cover-upload') as HTMLInputElement)?.click()}>
                                    {formData.coverImage ? <img src={formData.coverImage} className="w-full h-full object-cover" /> : <div className="flex flex-col items-center gap-2 text-slate-400"><Image size={32} /><span>Nhấn để tải lên ảnh bìa</span></div>}
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><Upload className="text-white" size={32} /></div>
                                </div>
                                <input type="file" id="cover-upload" hidden accept="image/*" onChange={async (e) => { const file = e.target.files?.[0]; if (file && isValidImageFile(file)) { const base64 = await compressImageToBase64(file, 1200); handleChange("coverImage", base64); } }} />
                            </div>
                        </div>
                    )}

                    {activeTab === "location" && (
                        <div className="space-y-4 h-[500px] flex flex-col">
                            <div className="flex-1 rounded-xl overflow-hidden border border-slate-300 relative">
                                <HamletMap
                                    location={formData.location || { lat: 10.5364, lng: 105.6793 }}
                                    onLocationChange={(lat, lng) => handleChange("location", { lat, lng })}
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === "leaders" && (
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2"><Users size={16} />Lãnh đạo Ấp ({formData.leaders.length})</h3>
                            <div className="space-y-3">
                                {formData.leaders.map((leader, idx) => (
                                    <PersonCard key={idx} person={leader} onImageUpload={(file) => handleImageUpload('leaders', idx, file)} onRemove={() => handleRemoveMember('leaders', idx)} uploading={uploading} />
                                ))}
                            </div>
                            <div className="p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                                <p className="text-sm font-medium text-slate-700 mb-3">Thêm lãnh đạo mới</p>
                                <div className="flex items-end gap-2">
                                    <div className="w-16 h-16 bg-white rounded-lg border border-slate-200 flex items-center justify-center shrink-0 cursor-pointer hover:bg-slate-50" onClick={() => (document.getElementById('new-leader-upload') as HTMLInputElement)?.click()}>
                                        {newLeader.image ? <img src={newLeader.image} className="w-full h-full object-cover rounded-lg" /> : <Upload size={16} className="text-slate-400" />}
                                        <input type="file" id="new-leader-upload" hidden accept="image/*" onChange={(e) => e.target.files?.[0] && handleNewMemberImageUpload(setNewLeader, newLeader, e.target.files[0])} />
                                    </div>
                                    <div className="flex-1 grid grid-cols-2 gap-2">
                                        <input type="text" value={newLeader.name} onChange={(e) => setNewLeader({ ...newLeader, name: e.target.value })} className="px-3 py-2 rounded-lg border border-slate-200 text-sm" placeholder="Họ tên" />
                                        <input type="text" value={newLeader.role} onChange={(e) => setNewLeader({ ...newLeader, role: e.target.value })} className="px-3 py-2 rounded-lg border border-slate-200 text-sm" placeholder="Chức vụ" />
                                        <input type="text" value={newLeader.phone || ""} onChange={(e) => setNewLeader({ ...newLeader, phone: e.target.value })} className="px-3 py-2 rounded-lg border border-slate-200 text-sm col-span-2" placeholder="SĐT" />
                                    </div>
                                    <button onClick={() => handleAddMember('leaders', newLeader, newLeader, setNewLeader)} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 h-10">Thêm</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "orgs" && (
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2"><Building2 size={16} />Tổ Chức Chính Trị - Xã Hội ({formData.organizations?.length || 0})</h3>
                            <div className="space-y-3">
                                {(formData.organizations || []).map((org, idx) => (
                                    <PersonCard key={idx} person={org} onImageUpload={(file) => handleImageUpload('organizations', idx, file)} onRemove={() => handleRemoveMember('organizations', idx)} uploading={uploading} color="blue" />
                                ))}
                            </div>
                            <div className="p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                                <p className="text-sm font-medium text-slate-700 mb-3">Thêm thành viên tổ chức</p>
                                <div className="flex items-end gap-2">
                                    <div className="w-16 h-16 bg-white rounded-lg border border-slate-200 flex items-center justify-center shrink-0 cursor-pointer hover:bg-slate-50" onClick={() => (document.getElementById('new-org-upload') as HTMLInputElement)?.click()}>
                                        {newOrgMember.image ? <img src={newOrgMember.image} className="w-full h-full object-cover rounded-lg" /> : <Upload size={16} className="text-slate-400" />}
                                        <input type="file" id="new-org-upload" hidden accept="image/*" onChange={(e) => e.target.files?.[0] && handleNewMemberImageUpload(setNewOrgMember, newOrgMember, e.target.files[0])} />
                                    </div>
                                    <div className="flex-1 grid grid-cols-2 gap-2">
                                        <input type="text" value={newOrgMember.name} onChange={(e) => setNewOrgMember({ ...newOrgMember, name: e.target.value })} className="px-3 py-2 rounded-lg border border-slate-200 text-sm" placeholder="Họ tên" />
                                        <input type="text" value={newOrgMember.role} onChange={(e) => setNewOrgMember({ ...newOrgMember, role: e.target.value })} className="px-3 py-2 rounded-lg border border-slate-200 text-sm" placeholder="Chức vụ" />
                                    </div>
                                    <button onClick={() => handleAddMember('organizations', newOrgMember, newOrgMember, setNewOrgMember)} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 h-10">Thêm</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "security" && (
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2"><Shield size={16} />Tổ An Ninh Trật Tự Cơ Sở ({formData.security?.length || 0})</h3>
                            <div className="space-y-3">
                                {(formData.security || []).map((member, idx) => (
                                    <PersonCard key={idx} person={member} onImageUpload={(file) => handleImageUpload('security', idx, file)} onRemove={() => handleRemoveMember('security', idx)} uploading={uploading} color="green" />
                                ))}
                            </div>
                            <div className="p-4 bg-green-50 rounded-xl border border-dashed border-green-300">
                                <p className="text-sm font-medium text-green-700 mb-3">Thêm thành viên an ninh</p>
                                <div className="flex items-end gap-2">
                                    <div className="w-16 h-16 bg-white rounded-lg border border-slate-200 flex items-center justify-center shrink-0 cursor-pointer hover:bg-slate-50" onClick={() => (document.getElementById('new-sec-upload') as HTMLInputElement)?.click()}>
                                        {newSecurity.image ? <img src={newSecurity.image} className="w-full h-full object-cover rounded-lg" /> : <Upload size={16} className="text-slate-400" />}
                                        <input type="file" id="new-sec-upload" hidden accept="image/*" onChange={(e) => e.target.files?.[0] && handleNewMemberImageUpload(setNewSecurity, newSecurity, e.target.files[0])} />
                                    </div>
                                    <div className="flex-1 grid grid-cols-2 gap-2">
                                        <input type="text" value={newSecurity.name} onChange={(e) => setNewSecurity({ ...newSecurity, name: e.target.value })} className="px-3 py-2 rounded-lg border border-slate-200 text-sm" placeholder="Họ tên" />
                                        <input type="text" value={newSecurity.role} onChange={(e) => setNewSecurity({ ...newSecurity, role: e.target.value })} className="px-3 py-2 rounded-lg border border-slate-200 text-sm" placeholder="Chức vụ" />
                                        <input type="text" value={newSecurity.phone || ""} onChange={(e) => setNewSecurity({ ...newSecurity, phone: e.target.value })} className="px-3 py-2 rounded-lg border border-slate-200 text-sm col-span-2" placeholder="SĐT" />
                                    </div>
                                    <button onClick={() => handleAddMember('security', newSecurity, newSecurity, setNewSecurity)} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 h-10">Thêm</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="sticky bottom-0 bg-white border-t border-slate-100 px-6 py-4 flex items-center justify-end gap-3">
                    <button onClick={onClose} className="px-4 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors">Hủy</button>
                    <button onClick={() => onSave(formData)} className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors">
                        <Save size={18} />
                        {isCreating ? "Tạo mới" : "Lưu thay đổi"}
                    </button>
                </div>
            </div>
        </div>
    );
}

// Reusable Person Card with Image Upload
interface PersonCardProps {
    person: { name: string; role: string; phone?: string; image?: string };
    onImageUpload: (file: File) => void;
    onRemove: () => void;
    uploading?: boolean;
    color?: "blue" | "green";
}

function PersonCard({ person, onImageUpload, onRemove, uploading, color = "blue" }: PersonCardProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) onImageUpload(file);
    };

    const bgColor = color === "green" ? "bg-green-50" : "bg-slate-50";
    const avatarBg = color === "green" ? "bg-green-100 text-green-600" : "bg-primary/10 text-primary";

    return (
        <div className={cn("flex items-center gap-3 p-3 rounded-xl", bgColor)}>
            <div className="relative group shrink-0">
                <div className={cn(
                    "w-[3rem] h-[4rem] rounded-lg flex items-center justify-center overflow-hidden",
                    person.image ? "" : avatarBg
                )}>
                    {person.image ? (
                        <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                    ) : (
                        <span className="text-lg font-bold">{person.name.charAt(0)}</span>
                    )}
                </div>
                <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    {uploading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <Upload size={16} className="text-white" />}
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
            </div>

            <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-900 truncate">{person.name}</p>
                <p className="text-xs text-slate-500 truncate">{person.role}</p>
                {person.phone && <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5"><Phone size={10} /> {person.phone}</p>}
            </div>

            <button onClick={onRemove} className="p-1.5 text-red-500 hover:bg-red-100 rounded-lg transition-colors"><X size={16} /></button>
        </div>
    );
}

// Inner component for MapLibre
function HamletMap({ location, onLocationChange }: { location: { lat: number, lng: number }, onLocationChange: (lat: number, lng: number) => void }) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<any>(null);
    const markerRef = useRef<any>(null);

    useEffect(() => {
        if (!mapContainerRef.current) return;

        const map = new maplibregl.Map({
            container: mapContainerRef.current,
            style: MAP_STYLE as any,
            center: [location.lng, location.lat],
            zoom: 13
        });

        map.addControl(new maplibregl.NavigationControl());
        mapRef.current = map;

        const el = document.createElement('div');
        el.className = 'text-primary drop-shadow-lg';
        el.innerHTML = `<svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3" fill="white"></circle></svg>`;

        const marker = new maplibregl.Marker({ element: el, draggable: true })
            .setLngLat([location.lng, location.lat])
            .addTo(map);

        markerRef.current = marker;

        marker.on('dragend', () => {
            const lngLat = marker.getLngLat();
            onLocationChange(lngLat.lat, lngLat.lng);
        });

        map.on('click', (e) => {
            const { lng, lat } = e.lngLat;
            marker.setLngLat([lng, lat]);
            onLocationChange(lat, lng);
        });

        return () => map.remove();
    }, []);

    useEffect(() => {
        if (markerRef.current) {
            const current = markerRef.current.getLngLat();
            if (Math.abs(current.lng - location.lng) > 0.0001 || Math.abs(current.lat - location.lat) > 0.0001) {
                markerRef.current.setLngLat([location.lng, location.lat]);
                mapRef.current?.easeTo({ center: [location.lng, location.lat] });
            }
        }
    }, [location]);

    return (
        <>
            <div className="absolute top-2 right-2 z-10 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-slate-500 shadow-sm border border-slate-200">
                Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}
            </div>
            <div ref={mapContainerRef} className="w-full h-full" />
        </>
    );
}
