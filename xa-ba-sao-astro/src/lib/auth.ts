import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { openAPI } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const MONGODB_URI = import.meta.env.MONGODB_URI || "mongodb://localhost:27017/basaodb";

// Create MongoClient instance for Better Auth
const client = new MongoClient(MONGODB_URI);

// Connect and get database
const clientPromise = client.connect();
const db = client.db(); // Gets default database from URI

export const auth = betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {
        enabled: true
    },
    plugins: [
        openAPI()
    ],
    trustedOrigins: ["http://localhost:4321", "http://localhost:3000", "https://db62ddb4.xabasao.pages.dev"]
});

// Export for other uses
export { client, db, clientPromise };
