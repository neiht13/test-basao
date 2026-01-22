import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Organization from "@/models/Organization";

export async function GET() {
    try {
        await connectDB();
        const orgs = await Organization.find({}).sort({ order: 1 });
        return NextResponse.json(orgs);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch organization data" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();
        const org = await Organization.create(body);
        return NextResponse.json(org, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create organization group" }, { status: 500 });
    }
}
