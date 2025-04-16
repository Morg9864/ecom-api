import { Schema, model } from "mongoose";

const orderSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		items: [
			{
				product: {
					type: Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				qty: {
					type: Number,
					required: true,
					min: 1,
					default: 1,
				},
			},
		],
		total: {
			type: Number,
			required: true,
			min: 0,
		},
		status: {
			type: String,
			enum: [
				"pending",
				"processing",
				"shipped",
				"delivered",
				"cancelled",
			],
			default: "pending",
		},
	},
	{
		timestamps: true,
	}
);

export default model("Order", orderSchema);
