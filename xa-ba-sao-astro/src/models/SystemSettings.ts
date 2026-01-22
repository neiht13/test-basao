import mongoose from 'mongoose';

export interface ISystemSettings extends mongoose.Document {
    siteName: string;
    siteDescription: string;
    contactPhone: string;
    contactEmail: string;
    socialLinks?: {
        facebook?: string;
        zalo?: string;
        youtube?: string;
    };
    features: {
        enableChatbot: boolean;
        enableNotifications: boolean;
    };
    maintenanceMode: boolean;
    primaryColor: string;
    updatedAt: Date;
}

const SystemSettingsSchema = new mongoose.Schema<ISystemSettings>({
    siteName: { type: String, default: "Cổng thông tin điện tử Xã Ba Sao" },
    siteDescription: { type: String, default: "Trang thông tin tra cứu xã Ba Sao - Huyện Cao Lãnh - Tỉnh Đồng Tháp" },
    contactPhone: { type: String, default: "02773.927.242" },
    contactEmail: { type: String, default: "xabasao.hcl@dongthap.gov.vn" },
    socialLinks: {
        facebook: String,
        zalo: String,
        youtube: String
    },
    features: {
        enableChatbot: { type: Boolean, default: true },
        enableNotifications: { type: Boolean, default: true }
    },
    maintenanceMode: { type: Boolean, default: false },
    primaryColor: { type: String, default: "#3b82f6" }
}, { timestamps: true });

// Prevent overwrite model error
export default mongoose.models.SystemSettings || mongoose.model<ISystemSettings>('SystemSettings', SystemSettingsSchema);
