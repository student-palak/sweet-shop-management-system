import request from "supertest";
import app from "../src/app";

describe("Auth API", () => {
  it("should register a new user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Palak",
        email: "palak@test.com",
        password: "password123"
      });

    expect(response.status).toBe(201);
    expect(response.body.email).toBe("palak@test.com");
  });
});
