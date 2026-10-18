import mongoose from "mongoose";

const DEFAULT_URI = "mongodb://localhost:27017/vyomai";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached = global.mongooseCache;

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null };
}

export async function connectToDatabase(): Promise<typeof mongoose | null> {
  const uri = process.env.MONGODB_URI || DEFAULT_URI;

  if (cached?.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached?.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 3000, // fast timeout for seamless fallback
      maxPoolSize: 10, // optimal for serverless container concurrency
      socketTimeoutMS: 20000,
    };

    cached!.promise = mongoose
      .connect(uri, opts)
      .then((mongooseInstance) => {
        return mongooseInstance;
      })
      .catch((err) => {
        cached!.promise = null;
        console.warn("[MongoDB] Connection attempt failed:", err.message);
        return null as unknown as typeof mongoose;
      });
  }

  try {
    const conn = await cached!.promise;
    if (conn && mongoose.connection.readyState === 1) {
      cached!.conn = conn;
      return cached!.conn;
    } else {
      cached!.conn = null;
      return null;
    }
  } catch (err) {
    cached!.promise = null;
    cached!.conn = null;
    return null;
  }
}

export function isDbConnected(): boolean {
  return mongoose.connection.readyState === 1;
}

export function getDbStatus(): {
  connected: boolean;
  state: number;
  uriConfigured: boolean;
  maskedUri: string;
} {
  const uri = process.env.MONGODB_URI || "";
  const maskedUri = uri
    ? uri.replace(/\/\/[^:]+:[^@]+@/, "//***:***@")
    : "mongodb://localhost:27017/vyomai (default local)";

  return {
    connected: mongoose.connection.readyState === 1,
    state: mongoose.connection.readyState,
    uriConfigured: Boolean(process.env.MONGODB_URI),
    maskedUri,
  };
}
