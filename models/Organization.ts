import mongoose from "mongoose";

const LeaderSchema = new mongoose.Schema({
    role: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String },
    email: { type: String },
    image: { type: String },
});

const OrganizationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    order: { type: Number, default: 0 },
    members: [LeaderSchema],
}, { timestamps: true });

export default mongoose.models.Organization || mongoose.model("Organization", OrganizationSchema);
