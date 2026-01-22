import mongoose from "mongoose";

const LeaderSchema = new mongoose.Schema({
    role: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    image: { type: String },
});

const HamletStatsSchema = new mongoose.Schema({
    area: { type: String },
    households: { type: String },
    population: { type: String },
    partyMembers: { type: String },
    exemptPartyMembers: { type: String }, // Đảng viên miễn công tác
    partyCellMembers: { type: String }, // Số lượng chi ủy viên
    selfGovGroups: { type: String }, // Số tổ nhân dân tự quản
    mainOccupation: { type: String }, // Nghề chính
});

const HamletSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    description: { type: String },
    detailedDescription: { type: String }, // Mô tả chi tiết
    organizations: [{ type: String }], // Danh sách tổ chức CT-XH
    goals: { type: String }, // Mục tiêu/định hướng
    stats: HamletStatsSchema,
    leaders: [LeaderSchema],
    security: [LeaderSchema],
    images: [{ type: String }],
    isSpotlight: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Hamlet || mongoose.model("Hamlet", HamletSchema);
