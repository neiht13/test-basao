import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Hamlet from "@/models/Hamlet";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const hamlet = await Hamlet.findOne({ id: params.id });
        if (!hamlet) {
            return NextResponse.json({ error: "Hamlet not found" }, { status: 404 });
        }
        return NextResponse.json(hamlet);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch hamlet" }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const body = await request.json();
        const hamlet = await Hamlet.findOneAndUpdate({ id: params.id }, body, { new: true });
        if (!hamlet) {
            return NextResponse.json({ error: "Hamlet not found" }, { status: 404 });
        }
        return NextResponse.json(hamlet);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update hamlet" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const hamlet = await Hamlet.findOneAndDelete({ id: params.id });
        if (!hamlet) {
            return NextResponse.json({ error: "Hamlet not found" }, { status: 404 });
        }
        return NextResponse.json({ message: "Hamlet deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete hamlet" }, { status: 500 });
    }
}
