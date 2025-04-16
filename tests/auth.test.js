import request from "supertest";
import app from "../index.js";
import { connect, closeDatabase, clearDatabase } from "./setup.js";

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe("Auth Endpoints", () => {
	it("should register a new user and return a token", async () => {
		const res = await request(app)
			.post("/api/auth/register")
			.send({
				name: "Test",
				email: "test@example.com",
				password: "pass1234",
			});
		expect(res.statusCode).toBe(201);
		expect(res.body.token).toBeDefined();
	});

	it("should login an existing user", async () => {
		await request(app)
			.post("/api/auth/register")
			.send({
				name: "Test",
				email: "test2@example.com",
				password: "pass1234",
			});

		const res = await request(app)
			.post("/api/auth/login")
			.send({ email: "test2@example.com", password: "pass1234" });
		expect(res.statusCode).toBe(200);
		expect(res.body.token).toBeDefined();
	});
});
