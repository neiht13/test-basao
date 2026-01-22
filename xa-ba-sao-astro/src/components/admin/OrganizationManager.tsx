"use client";

import { useState, useEffect, useRef } from "react";
import AdminLayout from "./AdminLayout";
import { Plus, Edit2, Trash2, Save, X, Building2, UserCircle2, Phone, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMMUNE_ORG_DATA, type OrgGroup, type Leader } from "@/lib/data";
import { compressImageToBase64, isValidImageFile } from "@/lib/image-utils"; // Import utils
import { Upload, Loader2, Image } from "lucide-react"; // Import missing icons

export default function OrganizationManager() {
    const [orgGroups, setOrgGroups] = useState<OrgGroup[]>([]);
    const [editingGroup, setEditingGroup] = useState<OrgGroup | null>(null);
    const [editingGroupIndex, setEditingGroupIndex] = useState<number | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [loading, setLoading] = useState(true);

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
                    setOrgGroups(COMMUNE_ORG_DATA); // Fallback to raw data if empty
                }
            }
        } catch (error) {
            console.error('Fetch orgs error:', error);
        }
        setLoading(false);
    };

    const handleSave = async (group: OrgGroup) => {
        try {
            const res = await fetch('/api/organizations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(group)
            });

            if (res.ok) {
                const savedGroup = await res.json();
                if (isCreating) {
                    setOrgGroups([...orgGroups, savedGroup]);
                } else if (editingGroupIndex !== null) {
                    const updated = [...orgGroups];
                    updated[editingGroupIndex] = savedGroup;
                    setOrgGroups(updated);
                }
                setEditingGroup(null);
                setEditingGroupIndex(null);
                setIsCreating(false);
            } else {
                alert('Lỗi khi lưu dữ liệu');
            }
        } catch (error) {
            console.error('Save error:', error);
            alert('Lỗi kết nối server');
        }
    };

    const handleDelete = async (index: number) => {
        if (!confirm('Bạn có chắc chắn muốn xóa nhóm này?')) return;

        try {
            const group = orgGroups[index];
            if ((group as any)._id) {
                await fetch('/api/organizations', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: (group as any)._id })
                });
            }
            setOrgGroups(orgGroups.filter((_, i) => i !== index));
        } catch (error) {
            console.error('Delete error:', error);
            alert('Lỗi kết nối server');
        }
    };

    const handleCreate = () => {
        setIsCreating(true);
        setEditingGroup({ title: "", members: [] });
    };

    const handleEdit = (group: OrgGroup, index: number) => {
        setEditingGroup(group);
        setEditingGroupIndex(index);
    };

    return (
        <AdminLayout activeMenu="organization">
            <div className="p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900">Tổ chức bộ máy</h1>
                        <p className="text-slate-500 mt-1">Quản lý cơ cấu tổ chức xã Ba Sao</p>
                    </div>
                    <button
                        onClick={handleCreate}
                        className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
                    >
                        <Plus size={20} />
                        Thêm nhóm mới
                    </button>
                </div>

                {/* Edit Modal */}
                {editingGroup && (
                    <OrgGroupEditModal
                        group={editingGroup}
                        isCreating={isCreating}
                        onSave={handleSave}
                        onClose={() => { setEditingGroup(null); setEditingGroupIndex(null); setIsCreating(false); }}
                    />
                )}

                {/* Organization Groups */}
                <div className="space-y-8">
                    {orgGroups.map((group, groupIdx) => (
                        <div key={groupIdx} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                        <Building2 size={20} />
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-slate-900">{group.title}</h2>
                                        <p className="text-sm text-slate-500">{group.members.length} thành viên</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleEdit(group, groupIdx)}
                                        className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(groupIdx)}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {group.members.map((member, idx) => (
                                        <div key={idx} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                                            <div className={cn(
                                                "w-12 h-12 rounded-xl flex items-center justify-center text-slate-400 overflow-hidden shrink-0",
                                                (member.role.includes("Bí thư") || member.role.includes("Chủ tịch")) && !member.image ? "bg-primary text-white" : "bg-white border border-slate-200"
                                            )}>
                                                {member.image ? (
                                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <UserCircle2 size={28} />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-slate-900">{member.name}</p>
                                                <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{member.role}</p>
                                                {member.phone && (
                                                    <p className="text-xs text-primary mt-2 flex items-center gap-1">
                                                        <Phone size={12} /> {member.phone}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}

interface OrgGroupEditModalProps {
    group: OrgGroup;
    isCreating: boolean;
    onSave: (group: OrgGroup) => void;
    onClose: () => void;
}

function OrgGroupEditModal({ group, isCreating, onSave, onClose }: OrgGroupEditModalProps) {
    const [formData, setFormData] = useState<OrgGroup>(group);
    const [newMember, setNewMember] = useState<Leader & { image?: string }>({ role: "", name: "", phone: "", email: "", image: "" });
    const [uploading, setUploading] = useState(false);

    // Reuse handy image upload from HamletManager
    const handleImageUpload = async (index: number, file: File) => {
        if (!isValidImageFile(file)) return;
        setUploading(true);
        try {
            const base64 = await compressImageToBase64(file, 512);
            const updatedMembers = [...formData.members];
            updatedMembers[index] = { ...updatedMembers[index], image: base64 };
            setFormData({ ...formData, members: updatedMembers });
        } catch (err) {
            console.error('Upload error:', err);
        }
        setUploading(false);
    };

    const handleNewMemberImageUpload = async (file: File) => {
        if (!isValidImageFile(file)) return;
        try {
            const base64 = await compressImageToBase64(file, 512);
            setNewMember({ ...newMember, image: base64 });
        } catch (e) {
            console.error(e);
        }
    };

    const handleAddMember = () => {
        if (newMember.name && newMember.role) {
            setFormData({
                ...formData,
                members: [...formData.members, newMember]
            });
            setNewMember({ role: "", name: "", phone: "", email: "" });
        }
    };

    const handleRemoveMember = (index: number) => {
        setFormData({
            ...formData,
            members: formData.members.filter((_, i) => i !== index)
        });
    };

    const handleUpdateMember = (index: number, field: keyof Leader, value: string) => {
        const updated = [...formData.members];
        updated[index] = { ...updated[index], [field]: value };
        setFormData({ ...formData, members: updated });
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-900">
                        {isCreating ? "Thêm nhóm tổ chức mới" : `Chỉnh sửa ${group.title}`}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Tên nhóm *</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                            placeholder="Đảng Uỷ Xã Ba Sao"
                        />
                    </div>

                    {/* Members */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                            <UserCircle2 size={16} />
                            Thành viên ({formData.members.length})
                        </h3>

                        <div className="space-y-3 mb-4">
                            {formData.members.map((member, idx) => (
                                <div key={idx} className="grid grid-cols-[auto_1fr_auto] gap-3 p-3 bg-slate-50 rounded-lg items-center">
                                    {/* Avatar */}
                                    <div className="relative group w-12 h-12 shrink-0">
                                        <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 flex items-center justify-center overflow-hidden">
                                            {(member as any).image ? (
                                                <img src={(member as any).image} className="w-full h-full object-cover" />
                                            ) : (
                                                <UserCircle2 className="text-slate-300" />
                                            )}
                                        </div>
                                        <div
                                            className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                                            onClick={() => (document.getElementById(`org-mem-${idx}`) as HTMLInputElement)?.click()}
                                        >
                                            <Upload size={14} className="text-white" />
                                        </div>
                                        <input
                                            type="file"
                                            id={`org-mem-${idx}`}
                                            hidden
                                            accept="image/*"
                                            onChange={(e) => e.target.files?.[0] && handleImageUpload(idx, e.target.files[0])}
                                        />
                                    </div>

                                    <div className="grid grid-cols-3 gap-2 w-full">
                                        <input
                                            type="text"
                                            value={member.name}
                                            onChange={(e) => handleUpdateMember(idx, "name", e.target.value)}
                                            className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                            placeholder="Họ tên"
                                        />
                                        <input
                                            type="text"
                                            value={member.role}
                                            onChange={(e) => handleUpdateMember(idx, "role", e.target.value)}
                                            className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                            placeholder="Chức vụ"
                                        />
                                        <input
                                            type="text"
                                            value={member.phone || ""}
                                            onChange={(e) => handleUpdateMember(idx, "phone", e.target.value)}
                                            className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                            placeholder="SĐT"
                                        />
                                    </div>

                                    <button
                                        onClick={() => handleRemoveMember(idx)}
                                        className="p-2 text-red-500 hover:bg-red-100 rounded-lg"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-[auto_1fr_auto] gap-3 items-center pt-2 border-t border-dashed border-slate-200">
                            <div className="relative group w-12 h-12 shrink-0 cursor-pointer" onClick={() => (document.getElementById('new-org-mem-upload') as HTMLInputElement)?.click()}>
                                <div className="w-12 h-12 bg-white rounded-lg border border-dashed border-slate-300 flex items-center justify-center overflow-hidden hover:bg-slate-50 transition-colors">
                                    {newMember.image ? (
                                        <img src={newMember.image} className="w-full h-full object-cover" />
                                    ) : (
                                        <Upload size={16} className="text-slate-400" />
                                    )}
                                </div>
                                <input type="file" id="new-org-mem-upload" hidden accept="image/*" onChange={(e) => e.target.files?.[0] && handleNewMemberImageUpload(e.target.files[0])} />
                            </div>

                            <div className="grid grid-cols-3 gap-2 w-full">
                                <input
                                    type="text"
                                    value={newMember.name}
                                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                                    className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    placeholder="Họ tên"
                                />
                                <input
                                    type="text"
                                    value={newMember.role}
                                    onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                                    className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    placeholder="Chức vụ"
                                />
                                <input
                                    type="text"
                                    value={newMember.phone || ""}
                                    onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                                    className="px-3 py-2 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                                    placeholder="SĐT"
                                />
                            </div>

                            <button
                                onClick={handleAddMember}
                                className="px-3 py-2 bg-primary/10 hover:bg-primary/20 rounded-lg text-sm font-medium text-primary transition-colors h-10"
                            >
                                + Thêm
                            </button>
                        </div>
                    </div>
                </div>

                <div className="sticky bottom-0 bg-white border-t border-slate-100 px-6 py-4 flex items-center justify-end gap-3">
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
