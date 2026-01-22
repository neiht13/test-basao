import mongoose from "mongoose";

const VerificationSchema = new mongoose.Schema({
    identifier: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

export default mongoose.models.Verification || mongoose.model("Verification", VerificationSchema);
