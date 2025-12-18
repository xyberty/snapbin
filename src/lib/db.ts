import { MongoClient } from 'mongodb';
import type { MongoClientOptions } from 'mongodb';
import { env } from '$env/dynamic/private';

if (!env.MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

const uri = env.MONGODB_URI;
const options: MongoClientOptions = {
    retryWrites: true,
    retryReads: true,
    maxPoolSize: 10,
    minPoolSize: 5,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

async function initDb(client: MongoClient) {
    const db = client.db();
    const collection = db.collection('pastes');
    await collection.createIndex({ key: 1 });
    // TTL index for automatic deletion
    await collection.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 });
    return client;
}

if (import.meta.env.DEV) {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    let globalWithMongo = globalThis as typeof globalThis & {
        _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
        client = new MongoClient(uri, options);
        globalWithMongo._mongoClientPromise = client.connect().then(initDb);
    }
    clientPromise = globalWithMongo._mongoClientPromise;
} else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options);
    clientPromise = client.connect().then(initDb);
}

export default clientPromise; 
