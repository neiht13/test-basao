import type { APIRoute } from 'astro';
import mongoose from 'mongoose';
import Organization from '@/models/Organization';
import { optimizeImage } from '@/lib/server-utils';

// Connect to DB
const MONGODB_URI = import.meta.env.MONGODB_URI || "mongodb://localhost:27017/xa-ba-sao-portal";

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    return mongoose.connect(MONGODB_URI);
};

// Helper to process member images in organization groups
async function processOrgImages(data: any) {
    if (data.members && Array.isArray(data.members)) {
        for (const member of data.members) {
            if (member.image) {
                member.image = await optimizeImage(member.image, 400);
            }
        }
    }
    return data;
}

export const GET: APIRoute = async () => {
    try {
        await connectDB();
        // Return all groups sorted by order
        const orgs = await Organization.find({}).sort({ order: 1 });
        return new Response(JSON.stringify(orgs), {
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
        let body = await request.json();

        // Check if body is array (Bulk Replace/Sync) or Object (Single Create/Update)
        if (Array.isArray(body)) {
            // Bulk replace (for reordering or full sync)
            // Process images for each group
            for (const group of body) {
                await processOrgImages(group);
            }
            await Organization.deleteMany({});
            const created = await Organization.create(body);
            return new Response(JSON.stringify(created), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Single Group Create/Update - process images
        body = await processOrgImages(body);

        const { _id, id, ...data } = body;
        const targetId = _id || id;

        if (targetId) {
            const updated = await Organization.findByIdAndUpdate(targetId, data, { new: true });
            return new Response(JSON.stringify(updated), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        } else {
            const created = await Organization.create(data);
            return new Response(JSON.stringify(created), {
                status: 201,
                headers: { 'Content-Type': 'application/json' }
            });
        }

    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
};

export const DELETE: APIRoute = async ({ request }) => {
    try {
        await connectDB();
        const body = await request.json();
        const { id, _id } = body;

        await Organization.findByIdAndDelete(id || _id);

        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}
