import express from "express";
import multer from "multer";
import {
	getProducts,
	createProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/auth.js";

const upload = multer({ dest: "uploads/" });
const router = express.Router();

/**
 * @route   GET /api/products
 * @desc    Get all products
 * @access  Public
 */
router.get("/", getProducts);

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Private/Admin
 */
router.post("/", protect, admin, upload.array("images"), createProduct);

export default router;
