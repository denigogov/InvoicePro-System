import { test, describe, expect, beforeAll, afterAll } from "vitest";
import { accessToken } from "./loginRoute.test";
import { serverTest } from "./loginRoute.test";

let lastUserID = "";

describe("Test for User Route", () => {
  beforeAll(async () => {
    const response = await serverTest
      .post("/user")
      .send({
        firstName: "tester",
        lastName: "testUser",
        email: "test@test.com",
        password: "test123!",
        departmentId: 1,
      })
      .auth(accessToken, { type: "bearer" });

    // Save user ID for further tests
    lastUserID = response.body.userId;
  });

  afterAll(async () => {
    // Clean up the created user
    await serverTest
      .delete(`/user/${lastUserID}`)
      .auth(accessToken, { type: "bearer" });
  });

  test("GET /user", async () => {
    const response = await serverTest
      .get("/user")
      .auth(accessToken, { type: "bearer" });
    expect(response.statusCode).toBe(200);

    const userfind = response.body.find(
      (user) => user.email === "test@test.com"
    );
    expect(userfind).toBeDefined();
    lastUserID = userfind.userId;
  });

  test("PUT /user", async () => {
    const response = await serverTest
      .put(`/user/${lastUserID}`)
      .send({
        firstName: "tester123",
      })
      .auth(accessToken, { type: "bearer" });
    expect(response.statusCode).toBe(200);
  });
});

// No creating password testing route because of the limit emails !
