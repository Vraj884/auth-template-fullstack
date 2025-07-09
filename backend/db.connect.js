import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.URI;

  if (!uri) {
    console.error("❌ MongoDB URI not found in environment variables.");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB successfully.");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
}