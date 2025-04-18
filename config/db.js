import mongoose from "mongoose";

const connectDB = async () => {
	// Avoid multiple connections in tests or during hot-reload
	if (mongoose.connection.readyState === 0) {
		try {
			await mongoose.connect(process.env.MONGO_URI);
			console.log("MongoDB connected");
		} catch (error) {
			console.error("MongoDB connection error:", error);
			process.exit(1);
		}
	}
};

export default connectDB;
