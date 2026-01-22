import mongoose from 'mongoose';

const MemberSchema = new mongoose.Schema({
    role: String,
    name: String,
    phone: String,
    email: String,
    image: String,
});

export interface IOrganization extends mongoose.Document {
    title: string;
    members: any[];
    order: number;
}

const OrganizationSchema = new mongoose.Schema<IOrganization>({
    title: { type: String, required: true },
    members: [MemberSchema],
    order: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Organization || mongoose.model<IOrganization>('Organization', OrganizationSchema);
