/**
 * @desc    Handle payment webhook
 * @route   POST /api/webhook/payment
 * @access  Public
 */
export const handleWebhook = async (req, res) => {
	// Process the webhook payload (e.g., update order status)
	console.log("Webhook received:", req.body);
	res.status(200).json({ received: true });
};
