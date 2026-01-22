import mongoose from 'mongoose';

const LeaderSchema = new mongoose.Schema({
    role: String,
    name: String,
    phone: String,
    email: String,
    image: String,
});

const HamletStatsSchema = new mongoose.Schema({
    area: String,
    households: String,
    population: String,
    partyMembers: String,
    exemptPartyMembers: String,
    partyCellMembers: String,
    selfGovGroups: String,
    mainOccupation: String,
});

export interface IHamlet extends mongoose.Document {
    id: string;
    name: string;
    shortName: string;
    description: string;
    detailedDescription?: string;
    organizations?: any[];
    goals?: string;
    stats: any;
    leaders: any[];
    security?: any[];
    avatar?: string;
    coverImage?: string;
    location?: {
        lat: number;
        lng: number;
    };
    images: string[];
    isSpotlight?: boolean;
}

const HamletSchema = new mongoose.Schema<IHamlet>({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    shortName: { type: String, required: true },
    description: { type: String, required: true },
    detailedDescription: String,
    organizations: [LeaderSchema], // Changed to LeaderSchema
    goals: String,
    stats: HamletStatsSchema,
    leaders: [LeaderSchema],
    security: [LeaderSchema],
    avatar: String,
    coverImage: String,
    location: {
        lat: Number,
        lng: Number
    },
    images: [String],
    isSpotlight: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.models.Hamlet || mongoose.model<IHamlet>('Hamlet', HamletSchema);
