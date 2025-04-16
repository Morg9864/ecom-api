import request from "supertest";
import app from "../index.js";
import { connect, closeDatabase, clearDatabase } from "./setup.js";

let token;
beforeAll(async () => {
	await connect();
	// create admin user
	const res = await request(app)
		.post("/api/auth/register")
		.send({
			name: "Admin",
			email: "admin@example.com",
			password: "admin1234",
		});
	token = res.body.token;
});
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe("Products Endpoints", () => {
	it("should fetch empty product list", async () => {
		const res = await request(app).get("/api/products");
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual([]);
	});

	it("should not allow non-admin to create product", async () => {
		const userRes = await request(app)
			.post("/api/auth/register")
			.send({
				name: "User",
				email: "user@example.com",
				password: "user1234",
			});

		const res = await request(app)
			.post("/api/products")
			.set("Authorization", `Bearer ${userRes.body.token}`)
			.send({
				name: "Prod",
				description: "Desc",
				price: 10,
				category: null,
			});
		expect(res.statusCode).toBe(403);
	});

	it("should allow admin to create product", async () => {
		const res = await request(app)
			.post("/api/products")
			.set("Authorization", `Bearer ${token}`)
			.field("name", "Prod")
			.field("description", "Desc")
			.field("price", "10")
			.field("category", "")
			.attach("images", Buffer.from("test"), "test.png");
		expect(res.statusCode).toBe(201);
		expect(res.body.name).toBe("Prod");
	});
});
