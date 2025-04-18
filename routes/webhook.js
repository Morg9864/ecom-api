import express from "express";
import { handleWebhook } from "../controllers/webhookController.js";

const router = express.Router();

/**
 * @route   POST /api/webhook/payment
 * @desc    Fictitious payment webhook endpoint
 * @access  Public
 */
router.post("/payment", express.json(), handleWebhook);

export default router;
