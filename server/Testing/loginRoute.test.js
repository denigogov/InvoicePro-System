const request = require("supertest");
const { describe, it, beforeAll, afterAll } = require("vitest");
const { app } = require("../server");
const database = require("../database/database");

describe("Login Route", () => {
  beforeAll(async () => {
    await database.query("SELECT 1");
  });

  afterAll(async () => {
    await database.end();
  });

  it("should login a user with valid credentials", async () => {
    const res = await request(app).post("/login").send({
      email: "testuser@example.com",
      password: "password123",
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should not login a user with invalid credentials", async () => {
    const res = await request(app).post("/login").send({
      email: "invaliduser@example.com",
      password: "invalidpassword",
    });

    expect(res.status).toBe(401);
  });

  it("should validate user and send user info", async () => {
    const loginRes = await request(app).post("/login").send({
      email: "testuser@example.com",
      password: "password123",
    });

    const token = loginRes.body.token;

    const res = await request(app)
      .get("/login")
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("payload");
    expect(res.body.payload).toHaveProperty("id");
    expect(res.body.payload).toHaveProperty("username");
    expect(res.body.payload).toHaveProperty("type");
  });
});
