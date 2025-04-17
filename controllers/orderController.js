import Order from "../models/Order.js";

/**
 * @desc    Create a new order
 * @route   POST /api/orders
 * @access  Private
 */
export const createOrder = async (req, res, next) => {
	try {
		const { items, total } = req.body;
		const order = await Order.create({ user: req.user._id, items, total });
		res.status(201).json(order);
	} catch (error) {
		next(error);
	}
};

/**
 * @desc    Get orders
 * @route   GET /api/orders (for users) or GET /api/admin/orders
 * @access  Private (and Admin for all orders)
 */
export const getOrders = async (req, res, next) => {
	try {
		const filter = req.user.role === "admin" ? {} : { user: req.user._id };
		const orders = await Order.find(filter).populate("items.product");
		res.json(orders);
	} catch (error) {
		next(error);
	}
};
