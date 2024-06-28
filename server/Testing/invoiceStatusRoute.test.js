import { test, describe, expect, beforeAll, afterAll } from "vitest";
import { accessToken } from "./loginRoute.test";
import { serverTest } from "./loginRoute.test";

describe("Test for InvoiceStatusRoute", () => {
  test("GET /user", async () => {
    const response = await serverTest
      .get("/invoiceStatus/chart")
      .auth(accessToken, { type: "bearer" });
    expect(response.statusCode).toBe(200);
  });
});
