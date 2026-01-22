import type { APIRoute } from 'astro';
import connectDB from '@/lib/db';
import Hamlet from '@/models/Hamlet';
import { optimizeImage } from '@/lib/server-utils';

export const GET: APIRoute = async () => {
    try {
        await connectDB();
        const hamlets = await Hamlet.find({}).sort({ name: 1 });
        return new Response(JSON.stringify(hamlets), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('GET hamlets error:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch hamlets' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};

// Helper to process all images in a hamlet object
async function processHamletImages(body: any) {
    // Process avatar (512px for thumbnails)
    if (body.avatar) {
        body.avatar = await optimizeImage(body.avatar, 512);
    }

    // Process coverImage (1200px for hero)
    if (body.coverImage) {
        body.coverImage = await optimizeImage(body.coverImage, 1200);
    }

    // Process leader images
    if (body.leaders && Array.isArray(body.leaders)) {
        for (const leader of body.leaders) {
            if (leader.image) {
                leader.image = await optimizeImage(leader.image, 400);
            }
        }
    }

    // Process organization member images
    if (body.organizations && Array.isArray(body.organizations)) {
        for (const org of body.organizations) {
            if (org.image) {
                org.image = await optimizeImage(org.image, 400);
            }
        }
    }

    // Process security member images
    if (body.security && Array.isArray(body.security)) {
        for (const member of body.security) {
            if (member.image) {
                member.image = await optimizeImage(member.image, 400);
            }
        }
    }

    return body;
}

export const POST: APIRoute = async ({ request }) => {
    try {
        await connectDB();
        let body = await request.json();

        // Process all images to AVIF
        body = await processHamletImages(body);

        // Check if it's an update (has _id) or create
        if (body._id) {
            const { _id, ...updateData } = body;
            const hamlet = await Hamlet.findByIdAndUpdate(_id, updateData, { new: true });
            return new Response(JSON.stringify(hamlet), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        } else {
            const hamlet = await Hamlet.create(body);
            return new Response(JSON.stringify(hamlet), {
                status: 201,
                headers: { 'Content-Type': 'application/json' }
            });
        }
    } catch (error) {
        console.error('POST hamlet error:', error);
        return new Response(JSON.stringify({ error: 'Failed to save hamlet' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};

export const DELETE: APIRoute = async ({ request }) => {
    try {
        await connectDB();
        const { id } = await request.json();
        await Hamlet.findByIdAndDelete(id);
        return new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('DELETE hamlet error:', error);
        return new Response(JSON.stringify({ error: 'Failed to delete hamlet' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
