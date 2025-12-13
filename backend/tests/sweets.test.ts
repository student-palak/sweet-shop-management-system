import request from "supertest";
import app from "../src/app";

describe("Sweets API", () => {
  it("should add a new sweet", async () => {
    const response = await request(app)
      .post("/api/sweets")
      .send({
        name: "Gulab Jamun",
        category: "Indian",
        price: 10,
        quantity: 50
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("Gulab Jamun");
  });

  it("should return a list of sweets", async () => {
    const response = await request(app).get("/api/sweets");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should search sweets by name", async () => {
  const response = await request(app)
    .get("/api/sweets/search")
    .query({ name: "Gulab" });

  expect(response.status).toBe(200);
  expect(Array.isArray(response.body)).toBe(true);
});
it("should update a sweet", async () => {
  const response = await request(app)
    .put("/api/sweets/1")
    .send({ price: 15 });

  expect(response.status).toBe(200);
  expect(response.body.price).toBe(15);
});
it("should delete a sweet", async () => {
  const response = await request(app)
    .delete("/api/sweets/1");

  expect(response.status).toBe(204);
});
it("should purchase a sweet", async () => {
  const response = await request(app)
    .post("/api/sweets/1/purchase");

  expect(response.status).toBe(200);
});
it("should restock a sweet", async () => {
  const response = await request(app)
    .post("/api/sweets/1/restock")
    .send({ quantity: 10 });

  expect(response.status).toBe(200);
  expect(response.body.message).toBe("Restocked");
});

});
