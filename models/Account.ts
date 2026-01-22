import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    accountId: {
        type: String,
        required: true,
    },
    providerId: {
        type: String,
        required: true,
    },
    accessToken: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
    accessTokenExpiresAt: {
        type: Date,
    },
    refreshTokenExpiresAt: {
        type: Date,
    },
    scope: {
        type: String,
    },
    idToken: {
        type: String,
    },
    password: {
        type: String,
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

export default mongoose.models.Account || mongoose.model("Account", AccountSchema);
