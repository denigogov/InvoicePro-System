import { app } from "server";

export const serverTest = supertest(app);
import {
  test,
  beforeAll,
  describe,
  expect,
  afterAll,
  it,
  vi,
  toBe,
} from "vitest";
import supertest from "supertest";

export let loginToken = "";
export let accessToken = "";

beforeAll(async () => {
  await serverTest
    .post("/login")
    .send({
      email: "guest@nexigo.com",
      password: "guest123!",
    })
    .expect(200)
    .expect(async function (res) {
      if (!res.body.token) throw new Error("validation faild, token missing");
      accessToken = res.body.token;
    });

  afterAll(async () => {
    accessToken = "";
  });
});

describe("test the employees path", (bka) => {
  //
  console.log(bka);

  //

  test("/user", async () => {
    const response = await serverTest
      .get("/user")
      .auth(accessToken, { type: "bearer" });
    expect(response.statusCode).toBe(200);
  });
});
