import request from "supertest";
import app from "../index.js";
import { connect, closeDatabase, clearDatabase } from "./setup.js";
import { admin } from "../middleware/auth.js";
import User from "../models/User.js";

let adminToken;

beforeAll(async () => {
	await connect();
});

beforeEach(async () => {
	await clearDatabase();

	// Crée un user **admin** et récupère son token
	const res = await request(app).post("/api/auth/register").send({
		name: "Admin",
		email: "admin@example.com",
		password: "admin1234",
		role: "admin",
	});

	

	adminToken = res.body.token;
});

afterAll(async () => {
	await closeDatabase();
});

describe("Products (admin)", () => {
	it("should allow admin to create a product", async () => {
		const res = await request(app)
			.post("/api/products")
			.set("Authorization", `Bearer ${adminToken}`)
			.field("name", "Prod")
			.field("description", "Desc")
			.field("price", "10")
			.field("category", "")
			.attach("images", Buffer.from("test"), "test.png");

		expect(res.statusCode).toBe(201);
		expect(res.body.name).toBe("Prod");
	});
});
