import mongoose from "mongoose";

if (!process.env.MONGO_DB_CONNECTION) {
  throw new Error(
    'Invalid/Missing environment variable: "MONGO_DB_CONNECTION"'
  );
}

const url = process.env.MONGO_DB_CONNECTION;

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
