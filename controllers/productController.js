import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

/**
 * @desc    Get all products
 * @route   GET /api/products
 * @access  Public
 */
export const getProducts = async (req, res, next) => {
	try {
		const products = await Product.find().populate("category");
		res.json(products);
	} catch (error) {
		next(error);
	}
};

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Private/Admin
 */
export const createProduct = async (req, res, next) => {
	try {
		const { name, description, price, category } = req.body;
		let images = [];
		if (req.files && req.files.length) {
			const uploads = await Promise.all(
				req.files.map(file => cloudinary.uploader.upload(file.path))
			);
			images = uploads.map(u => u.secure_url);
		}
		const product = await Product.create({
			name,
			description,
			price,
			category,
			images,
		});
		res.status(201).json(product);
	} catch (error) {
		next(error);
	}
};
