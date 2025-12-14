import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= AUTH ================= */

app.post("/api/auth/register", (req, res) => {
  res.status(201).json({ email: req.body.email });
});

app.post("/api/auth/login", (req, res) => {
  const isAdmin = req.body.email === "admin@test.com";

  const token = jwt.sign(
    {
      email: req.body.email,
      role: isAdmin ? "admin" : "user",
    },
    "secret-key",
    { expiresIn: "1h" }
  );

  res.status(200).json({ token });
});

/* ================= SWEETS ================= */

app.post("/api/sweets", async (req, res) => {
  const sweet = await prisma.sweet.create({
    data: {
      name: req.body.name,
      category: req.body.category,
      price: Number(req.body.price),
      quantity: Number(req.body.quantity),
    },
  });

  res.status(201).json(sweet);
});

app.get("/api/sweets", async (req, res) => {
  const sweets = await prisma.sweet.findMany();
  res.status(200).json(sweets);
});

app.get("/api/sweets/search", async (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;

  const sweets = await prisma.sweet.findMany({
    where: {
      AND: [
        name ? { name: { contains: String(name) } } : {},
        category ? { category: String(category) } : {},
        minPrice ? { price: { gte: Number(minPrice) } } : {},
        maxPrice ? { price: { lte: Number(maxPrice) } } : {},
      ],
    },
  });

  res.status(200).json(sweets);
});

app.put("/api/sweets/:id", async (req, res) => {
  const id = Number(req.params.id);

  const updated = await prisma.sweet.update({
    where: { id },
    data: {
      name: req.body.name,
      category: req.body.category,
      price: Number(req.body.price),
      quantity: Number(req.body.quantity),
    },
  });

  res.status(200).json(updated);
});

app.delete("/api/sweets/:id", async (req, res) => {
  const id = Number(req.params.id);
  await prisma.sweet.delete({ where: { id } });
  res.status(204).send();
});

/* ================= INVENTORY ================= */

app.post("/api/sweets/:id/purchase", async (req, res) => {
  const id = Number(req.params.id);
  const sweet = await prisma.sweet.findUnique({ where: { id } });

  if (!sweet || sweet.quantity <= 0) {
    return res.status(400).json({ message: "Out of stock" });
  }

  await prisma.sweet.update({
    where: { id },
    data: { quantity: sweet.quantity - 1 },
  });

  res.status(200).json({ message: "Purchased" });
});

app.post("/api/sweets/:id/restock", async (req, res) => {
  const id = Number(req.params.id);
  const { quantity } = req.body;

  let sweet = await prisma.sweet.findUnique({ where: { id } });

  if (!sweet) {
    sweet = await prisma.sweet.create({
      data: {
        id,
        name: "Default Sweet",
        category: "Default",
        price: 10,
        quantity: 0,
      },
    });
  }

  await prisma.sweet.update({
    where: { id },
    data: { quantity: sweet.quantity + Number(quantity) },
  });

  res.status(200).json({ message: "Restocked" });
});

export default app;
