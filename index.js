// index.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import connectDB from "./config/db.js";
import authRouter from "./routes/auth.js";
import productRouter from "./routes/products.js";
import categoryRouter from "./routes/categories.js";
import cartRouter from "./routes/cart.js";
import adminRouter from "./routes/admin.js";
import webhookRouter from "./routes/webhook.js";

const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev")); // HTTP request logger
app.use(express.json()); // Parse JSON bodies

// Health check endpoint
app.get("/healthz", (_req, res) => res.status(200).json({ status: "ok" }));

// Mount API routes
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/cart", cartRouter);
app.use("/api/admin", adminRouter);
app.use("/api/webhook", webhookRouter);

// 404 handler
app.use((req, res) => {
	res.status(404).json({ message: "Not Found" });
});

// Global error handler
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(err.statusCode || 500).json({
		message: err.message || "Server Error",
	});
});

// Connect to database and start server only outside of test environment
if (process.env.NODE_ENV !== "test") {
	connectDB()
		.then(() => {
			const PORT = process.env.PORT || 5000;
			app.listen(PORT, () =>
				console.log(`Server running on port ${PORT}`)
			);
		})
		.catch(err => {
			console.error("Failed to connect to DB", err);
			process.exit(1);
		});
}

export default app;
