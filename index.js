import "dotenv/config";
import express from "express";
import cors from "cors";
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
app.use(cors());
app.use(express.json());

// Mount routes
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/cart", cartRouter);
app.use("/api/admin", adminRouter);
app.use("/api/webhook", webhookRouter);

const server = app.listen(process.env.PORT, () =>
	console.log(`API running on port ${process.env.PORT}`)
);
export default app;
