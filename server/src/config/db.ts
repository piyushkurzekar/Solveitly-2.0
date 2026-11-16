import mongoose from "mongoose";

export async function connectDB(uri: string) {
  mongoose.connection.on("disconnected", () => console.warn("MongoDB disconnected"));
  mongoose.connection.on("error", (err) => console.error("MongoDB error:", err));

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
  } catch (err) {
    const safeUri = uri.replace(/\/\/[^@/]+@/, "//<credentials>@");
    throw new Error(
      `Could not connect to MongoDB at ${safeUri}\n` +
        "  → Is MongoDB installed and running? Or set MONGODB_URI in server/.env to a MongoDB Atlas URL.\n" +
        `  (${err instanceof Error ? err.message : String(err)})`,
    );
  }
  console.log(`MongoDB connected (${mongoose.connection.name})`);
}

export async function disconnectDB() {
  await mongoose.disconnect();
}
