import mongoose from "mongoose";

if (!process.env.MONGO_DB_CONNECTION) {
  throw new Error('Invalid/Missing environment variable: "MONGO_DB_CONNECTION"');
}

const url = process.env.MONGO_DB_CONNECTION;
let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(url);
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    isConnected = false;
    throw error;
  }

  mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
    isConnected = false;
  });

  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
    isConnected = false;
  });
}

let client: typeof mongoose;
let clientPromise: Promise<typeof mongoose>;

if (process.env.NODE_ENV === "development") {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<typeof mongoose>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = mongoose;
    globalWithMongo._mongoClientPromise = mongoose.connect(url);
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = mongoose;
  clientPromise = mongoose.connect(url);
}

export { clientPromise };
