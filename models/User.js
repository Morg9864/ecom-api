import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["user", "admin"],
			default: "user",
		},
		cart: [
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
	},
	{
		timestamps: true,
	}
);

// Hash password before saving
userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	try {
		const salt = await bcrypt.genSalt(10);
		this.password = await bcrypt.hash(this.password, salt);
		next();
	} catch (err) {
		next(err);
	}
});

// Compare given password with the hashed one
userSchema.methods.matchPassword = function (enteredPassword) {
	return bcrypt.compare(enteredPassword, this.password);
};

export default model("User", userSchema);
