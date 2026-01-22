import type { APIRoute } from 'astro';
import mongoose from 'mongoose';
import SystemSettings from '@/models/SystemSettings';

// Connect to DB (Global connection check)
const MONGODB_URI = import.meta.env.MONGODB_URI || "mongodb://localhost:27017/xa-ba-sao-portal";

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    return mongoose.connect(MONGODB_URI);
};

export const GET: APIRoute = async () => {
    try {
        await connectDB();
        // Always try to get the first settings document
        let settings = await SystemSettings.findOne();

        // If not exists, create default
        if (!settings) {
            settings = await SystemSettings.create({});
        }

        return new Response(JSON.stringify(settings), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
};

export const POST: APIRoute = async ({ request }) => {
    try {
        await connectDB();
        const body = await request.json();

        // Update the single settings document. Use upsert: true just in case.
        // We find one and update it, or create if missing. 
        // Since we don't have a stable ID, we can look for *any* doc or just use findOneAndUpdate on empty query if we ensure only 1 exists.
        // Better strategy: findOne. If exists, update. If not, create.

        let settings = await SystemSettings.findOne();

        if (settings) {
            Object.assign(settings, body);
            await settings.save();
        } else {
            settings = await SystemSettings.create(body);
        }

        return new Response(JSON.stringify(settings), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
};
