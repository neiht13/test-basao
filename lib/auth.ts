import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { openAPI } from "better-auth/plugins";
import mongoose from "mongoose";

// Ensure Mongoose is connected
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    // Fallback for build time or if env is missing, but better to throw or handle gracefully
    console.warn("MONGODB_URI is not defined in environment variables");
} else if (!mongoose.connection.readyState) {
    mongoose.connect(MONGODB_URI);
}

export const auth = betterAuth({
    database: mongodbAdapter(mongoose.connection.getClient() as any), // Type cast might be needed if types don't match exactly
    emailAndPassword: {
        enabled: true
    },
    plugins: [
        openAPI()
    ]
});
