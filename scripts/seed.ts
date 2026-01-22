import mongoose from "mongoose";
import { HAMLETS_DATA, COMMUNE_ORG_DATA } from "../lib/data";
import Hamlet from "../models/Hamlet";
import Organization from "../models/Organization";
import User from "../models/User";
import Account from "../models/Account";
import * as dotenv from "dotenv";

// Load env vars
dotenv.config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error("Please define the MONGODB_URI environment variable inside .env.local");
    process.exit(1);
}

async function seed() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(MONGODB_URI!);
        console.log("Connected!");

        // Seed Hamlets
        console.log("Seeding Hamlets...");
        await Hamlet.deleteMany({});
        await Hamlet.insertMany(HAMLETS_DATA);
        console.log(`Seeded ${HAMLETS_DATA.length} hamlets.`);

        // Seed Organization
        console.log("Seeding Organization...");
        await Organization.deleteMany({});
        // Add order to org data
        const orgDataWithOrder = COMMUNE_ORG_DATA.map((org, index) => ({
            ...org,
            order: index
        }));
        await Organization.insertMany(orgDataWithOrder);
        console.log(`Seeded ${COMMUNE_ORG_DATA.length} organization groups.`);

        // Seed Admin User
        console.log("Seeding Admin User...");
        const adminEmail = "admin@xabasao.gov.vn";
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (!existingAdmin) {
            const bcrypt = require("bcryptjs");
            const hashedPassword = await bcrypt.hash("admin123", 10);

            const newUser = await User.create({
                name: "Quản Trị Viên",
                email: adminEmail,
                emailVerified: true,
                role: "admin",
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            await Account.create({
                userId: newUser._id,
                accountId: newUser._id.toString(),
                providerId: "credential",
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date(),
            });

            console.log("Admin user created: admin@xabasao.gov.vn / admin123");
        } else {
            console.log("Admin user already exists.");
        }

        console.log("Seeding completed!");
        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
}

seed();
