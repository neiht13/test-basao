import type { APIRoute } from 'astro';
import connectDB from '@/lib/db';
import Organization from '@/models/Organization';

export const GET: APIRoute = async () => {
    try {
        await connectDB();
        const orgs = await Organization.find({}).sort({ order: 1 });
        return new Response(JSON.stringify(orgs), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('GET organization error:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch organization data' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};

export const POST: APIRoute = async ({ request }) => {
    try {
        await connectDB();
        const body = await request.json();

        // Check if it's an update or create
        if (body._id) {
            const { _id, ...updateData } = body;
            const org = await Organization.findByIdAndUpdate(_id, updateData, { new: true });
            return new Response(JSON.stringify(org), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        } else {
            const org = await Organization.create(body);
            return new Response(JSON.stringify(org), {
                status: 201,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    } catch (error) {
        console.error('POST organization error:', error);
        return new Response(JSON.stringify({ error: 'Failed to save organization' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};

export const DELETE: APIRoute = async ({ request }) => {
    try {
        await connectDB();
        const { id } = await request.json();
        await Organization.findByIdAndDelete(id);
        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('DELETE organization error:', error);
        return new Response(JSON.stringify({ error: 'Failed to delete organization' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
