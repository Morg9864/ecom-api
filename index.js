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

// Connect to database
connectDB();

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
app.use((req, res, next) => {
	res.status(404).json({ message: "Not Found" });
});

// Global error handler
app.use((err, req, res, next) => {
	console.error(err.stack);
	const status = err.statusCode || 500;
	res.status(status).json({ message: err.message || "Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
