import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function GET() {
    try {
        await connectDB();
        const users = await User.find({}).select("-password").sort({ createdAt: -1 });
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}

// Note: Creating users usually involves auth registration, but for admin management we might want a direct create.
// For now, we'll rely on auth flow or manual seed, but a POST here could be useful for admin-created users.
export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();
        // Basic creation - password handling should ideally be done via Auth service or hashed here if manual
        // For better-auth, it's best to use their API, but we can create the User model directly if we handle Account separately.
        // This is a simplified version.
        const user = await User.create(body);
        return NextResponse.json(user, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}
