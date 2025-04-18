import request from "supertest";
import app from "../index.js";
import { connect, closeDatabase, clearDatabase } from "./setup.js";

let userToken;

beforeAll(async () => {
  await connect();
});

beforeEach(async () => {
  await clearDatabase();

  // Crée un **utilisateur classique** et récupère son token
  const res = await request(app)
    .post("/api/auth/register")
    .send({
      name: "User",
      email: "user@example.com",
      password: "user1234",
    });

  userToken = res.body.token;
});

afterAll(async () => {
  await closeDatabase();
});

describe("Products (non‑admin)", () => {
  it("should fetch an empty product list", async () => {
    const res = await request(app).get("/api/products");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  it("should forbid non‑admin product creation", async () => {
    const res = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${userToken}`)
      .send({
        name: "Prod",
        description: "Desc",
        price: 10,
        category: null,
      });

    expect(res.statusCode).toBe(403);
  });
});
