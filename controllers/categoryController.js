import Category from "../models/Category.js";

/**
 * @desc    Get all categories
 * @route   GET /api/categories
 * @access  Public
 */
export const getCategories = async (req, res, next) => {
	try {
		const categories = await Category.find();
		res.json(categories);
	} catch (error) {
		next(error);
	}
};

/**
 * @desc    Create a new category
 * @route   POST /api/categories
 * @access  Private/Admin
 */
export const createCategory = async (req, res, next) => {
	try {
		const { name } = req.body;
		const category = await Category.create({ name });
		res.status(201).json(category);
	} catch (error) {
		next(error);
	}
};
