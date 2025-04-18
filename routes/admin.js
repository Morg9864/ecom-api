import express from "express";
import { protect, admin } from "../middleware/auth.js";
import Order from "../models/Order.js";

const router = express.Router();

/**
 * @route   GET /api/admin/orders
 * @desc    Get all orders (admin only)
 * @access  Admin
 */
router.get("/orders", protect, admin, async (req, res, next) => {
	try {
		const orders = await Order.find({}).populate("user", "name email");
		res.status(200).json(orders);
	} catch (error) {
		next(error);
	}
});

export default router;