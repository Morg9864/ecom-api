import User from "../models/User.js";
import jwt from "jsonwebtoken";

// Generate JWT token
const generateToken = id => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});
};

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		return res
			.status(400)
			.json({ message: "Please provide name, email and password" });
	}

	const userExists = await User.findOne({ email });
	if (userExists) {
		return res.status(400).json({ message: "User already exists" });
	}

	const user = await User.create({ name, email, password });

	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			token: generateToken(user._id),
		});
	} else {
		res.status(400).json({ message: "Invalid user data" });
	}
};

/**
 * @desc    Authenticate user & get token
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			token: generateToken(user._id),
		});
	} else {
		res.status(401).json({ message: "Invalid email or password" });
	}
};
