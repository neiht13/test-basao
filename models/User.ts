import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    image: {
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
    role: {
        type: String,
        enum: ["admin", "editor", "user"],
        default: "user",
    },
    // Better Auth specific fields
    sessions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Session" }],
    accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Account" }],
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", UserSchema);
