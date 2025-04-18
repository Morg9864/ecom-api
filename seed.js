import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Category from "./models/Category.js";
import Product from "./models/Product.js";
import Order from "./models/Order.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/ecom-api";

const connectDB = async () => {
	try {
		await mongoose.connect(MONGO_URI);
		console.log("MongoDB connected");
		// Clean up any existing data
		await Order.deleteMany({});
		await Product.deleteMany({});
		await Category.deleteMany({});
		await User.deleteMany({});
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

const seedUsers = async () => {
	console.log("Seeding users...");
	const users = [];

	// Create one admin user and 19 regular users:
	users.push({
		name: "Admin User",
		email: "admin@example.com",
		password: "password",
		role: "admin",
	});

	for (let i = 1; i < 20; i++) {
		users.push({
			name: `User ${i}`,
			email: `user${i}@example.com`,
			password: "password",
			// role defaults to "user"
		});
	}

	// Bulk insert users
	const createdUsers = await User.insertMany(users);
	return createdUsers;
};

const seedCategories = async () => {
	console.log("Seeding categories...");
	const categories = [];
	for (let i = 1; i <= 15; i++) {
		categories.push({
			name: `Category ${i}`,
		});
	}
	const createdCategories = await Category.insertMany(categories);
	return createdCategories;
};

const seedProducts = async (categories) => {
	console.log("Seeding products...");
	const products = [];
	// Use a default image url for all products
	const defaultImage = "https://i.imgur.com/EJLFNOw.png"; 

	for (let i = 1; i <= 50; i++) {
		// Pick a random category
		const randomCategory =
			categories[Math.floor(Math.random() * categories.length)];
		products.push({
			name: `Product ${i}`,
			description: `Description for product ${i}`,
			price: parseFloat((Math.random() * 100 + 10).toFixed(2)),
			category: randomCategory._id,
			images: [defaultImage],
		});
	}
	const createdProducts = await Product.insertMany(products);
	return createdProducts;
};

const seedOrders = async (users, products) => {
	console.log("Seeding orders...");

	const orders = [];
	const statuses = ["pending", "processing", "shipped", "delivered", "cancelled"];

	for (let i = 1; i <= 10; i++) {
		// pick a random user
		const randomUser =
			users[Math.floor(Math.random() * users.length)];

		// decide on 1 to 3 products for this order
		const numberOfItems = Math.floor(Math.random() * 3) + 1;
		const items = [];
		let orderTotal = 0;

		for (let j = 0; j < numberOfItems; j++) {
			const randomProduct =
				products[Math.floor(Math.random() * products.length)];
			const qty = Math.floor(Math.random() * 5) + 1;
			items.push({
				product: randomProduct._id,
				qty,
			});
			orderTotal += randomProduct.price * qty;
		}

		orders.push({
			user: randomUser._id,
			items,
			total: parseFloat(orderTotal.toFixed(2)),
			status: statuses[Math.floor(Math.random() * statuses.length)],
		});
	}

	await Order.insertMany(orders);
};

const importData = async () => {
	try {
		await connectDB();

		// Clean existing data
		await Order.deleteMany({});
		await Product.deleteMany({});
		await Category.deleteMany({});
		await User.deleteMany({});

		// Seed collections
		const createdUsers = await seedUsers();
		const createdCategories = await seedCategories();
		const createdProducts = await seedProducts(createdCategories);
		await seedOrders(createdUsers, createdProducts);

		console.log("Data Imported!");
		process.exit();
	} catch (error) {
		console.error(`${error}`);
		process.exit(1);
	}
};

importData();