import mongoose from 'mongoose';

export async function handleConnect() {
  const url = process.env.url;

  mongoose.connect(url)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("MongoDB connection error:", err);
    });
}
