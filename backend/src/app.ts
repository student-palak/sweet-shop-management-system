import express from "express";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

// Auth
app.post("/api/auth/register", (req, res) => {
  res.status(201).json({
    email: req.body.email
  });
});

app.post("/api/auth/login", (req, res) => {
  const token = jwt.sign(
    { email: req.body.email },
    "secret-key",
    { expiresIn: "1h" }
  );

  res.status(200).json({ token });
});

// Sweets
app.post("/api/sweets", (req, res) => {
  res.status(201).json({
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    quantity: req.body.quantity
  });
});

app.get("/api/sweets", (req, res) => {
  res.status(200).json([]);
});

app.get("/api/sweets/search", (req, res) => {
  res.status(200).json([]);
});

app.put("/api/sweets/:id", (req, res) => {
  res.status(200).json({
    price: req.body.price
  });
});

app.delete("/api/sweets/:id", (req, res) => {
  res.status(204).send();
});

// Inventory
app.post("/api/sweets/:id/purchase", (req, res) => {
  res.status(200).json({ message: "Purchased" });
});

app.post("/api/sweets/:id/restock", (req, res) => {
  res.status(200).json({ message: "Restocked" });
});

export default app;
