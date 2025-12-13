import request from "supertest";
import app from "../src/app";

describe("Auth API - Login", () => {
  it("should login and return a JWT token", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "palak@test.com",
        password: "password123"
      });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();

    // JWT tokens have 3 parts separated by dots
    const tokenParts = response.body.token.split(".");
    expect(tokenParts.length).toBe(3);
  });
});
