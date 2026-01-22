import mongoose from 'mongoose';

// Load environment variables
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://neiht13:hj6scsg4@cluster0.tmy5xk2.mongodb.net/basaodb';

async function seed() {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB!');

    // Create test admin user using Better Auth's user collection
    const usersCollection = mongoose.connection.collection('user');
    const accountsCollection = mongoose.connection.collection('account');
    const sessionsCollection = mongoose.connection.collection('session');

    // Check if admin exists
    const existingUser = await usersCollection.findOne({ email: 'admin@basao.gov.vn' });

    if (existingUser) {
        console.log('Admin user already exists:', existingUser.email);
    } else {
        // Create admin user (Better Auth stores password hash in account collection)
        const user = {
            id: 'admin-user-001',
            name: 'Admin',
            email: 'admin@basao.gov.vn',
            emailVerified: true,
            image: null,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        await usersCollection.insertOne(user);
        console.log('Created admin user:', user.email);

        // Note: For Better Auth, you would typically use their API to create users with passwords
        // This seed creates the user record, but login should be done via Better Auth sign-up
        console.log('To set a password, use Better Auth sign-up API or seed with password hash');
    }

    // Seed hamlets data
    const hamletsCollection = mongoose.connection.collection('hamlets');
    const existingHamlets = await hamletsCollection.countDocuments();

    if (existingHamlets === 0) {
        console.log('Seeding hamlets data...');
        // Import hamlets data (simplified version)
        const hamlets = [
            { id: 'ap-1', name: 'Ấp 1', shortName: '1', description: 'Ấp 1 xã Ba Sao', leaders: [] },
            { id: 'ap-2', name: 'Ấp 2', shortName: '2', description: 'Ấp 2 xã Ba Sao', leaders: [] },
            // Add more as needed
        ];

        if (hamlets.length > 0) {
            await hamletsCollection.insertMany(hamlets);
            console.log(`Seeded ${hamlets.length} hamlets`);
        }
    } else {
        console.log(`Found ${existingHamlets} existing hamlets`);
    }

    console.log('Seed completed!');
    await mongoose.disconnect();
}

seed().catch(console.error);
