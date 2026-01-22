import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Hamlet from "@/models/Hamlet";

export async function GET() {
    try {
        await connectDB();
        const hamlets = await Hamlet.find({}).sort({ name: 1 });
        return NextResponse.json(hamlets);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch hamlets" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();
        const hamlet = await Hamlet.create(body);
        return NextResponse.json(hamlet, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create hamlet" }, { status: 500 });
    }
}
