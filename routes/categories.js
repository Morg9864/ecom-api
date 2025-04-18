import express from "express";
import {
	getCategories,
	createCategory,
} from "../controllers/categoryController.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

/**
 * @route   GET /api/categories
 * @desc    Get all categories
 * @access  Public
 */
router.get("/", getCategories);

/**
 * @route   POST /api/categories
 * @desc    Create a new category
 * @access  Private/Admin
 */
router.post("/", protect, admin, createCategory);

export default router;
