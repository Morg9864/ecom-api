import { Schema, model } from "mongoose";

const productSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			default: "",
		},
		price: {
			type: Number,
			required: true,
			min: 0,
		},
		images: [
			{
				type: String,
				validate: {
					validator: url => /^https?:\/\//.test(url),
					message: props => `${props.value} is not a valid URL`,
				},
			},
		],
		category: {
			type: Schema.Types.ObjectId,
			ref: "Category",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

productSchema.index({ name: "text", description: "text" });

export default model("Product", productSchema);
