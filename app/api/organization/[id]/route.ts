import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Organization from "@/models/Organization";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const body = await request.json();
        const org = await Organization.findByIdAndUpdate(params.id, body, { new: true });
        if (!org) {
            return NextResponse.json({ error: "Organization group not found" }, { status: 404 });
        }
        return NextResponse.json(org);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update organization group" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const org = await Organization.findByIdAndDelete(params.id);
        if (!org) {
            return NextResponse.json({ error: "Organization group not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Organization group deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete organization group" }, { status: 500 });
    }
}
