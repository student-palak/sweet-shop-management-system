import request from "supertest";
import app from "../src/app";

describe("Auth API - Login", () => {
  it("should login an existing user and return a token", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "palak@test.com",
        password: "password123"
      });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
});
