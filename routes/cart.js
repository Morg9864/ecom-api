import express from "express";
import { protect } from "../middleware/auth.js";
import { getCart, addToCart } from "../controllers/cartController.js";

const router = express.Router();

/**
 * @route   GET /api/cart
 * @desc    Retrieve the current user's cart
 * @access  Private
 */
router.get("/", protect, getCart);

/**
 * @route   POST /api/cart
 * @desc    Add an item to the current user's cart
 * @access  Private
 */
router.post("/", protect, addToCart);

export default router;