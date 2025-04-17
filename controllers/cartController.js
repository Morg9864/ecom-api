/**
 * @desc    Get current user's cart
 * @route   GET /api/cart
 * @access  Private
 */
export const getCart = async (req, res, next) => {
	try {
		// Cart is stored on user document
		res.json({ items: req.user.cart || [] });
	} catch (error) {
		next(error);
	}
};

/**
 * @desc    Add item to cart
 * @route   POST /api/cart
 * @access  Private
 */
export const addToCart = async (req, res, next) => {
	try {
		const { productId, qty } = req.body;
		req.user.cart = req.user.cart || [];
		req.user.cart.push({ product: productId, qty });
		await req.user.save();
		res.status(201).json(req.user.cart);
	} catch (error) {
		next(error);
	}
};
