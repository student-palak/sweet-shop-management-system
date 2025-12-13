import express from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

/* =======================
   AUTH
======================= */

app.post("/api/auth/register", (req, res) => {
  res.status(201).json({ email: req.body.email });
});

app.post("/api/auth/login", (req, res) => {
  const token = jwt.sign(
    { email: req.body.email },
    "secret-key",
    { expiresIn: "1h" }
  );
  res.status(200).json({ token });
});

/* =======================
   SWEETS
======================= */

app.post("/api/sweets", async (req, res) => {
  const sweet = await prisma.sweet.create({
    data: req.body,
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

  let sweet = await prisma.sweet.findUnique({ where: { id } });

  if (!sweet) {
    sweet = await prisma.sweet.create({
      data: {
        id,
        name: "Default Sweet",
        category: "Default",
        price: 10,
        quantity: 10,
      },
    });
  }

  const updated = await prisma.sweet.update({
    where: { id },
    data: req.body,
  });

  res.status(200).json(updated);
});

app.delete("/api/sweets/:id", async (req, res) => {
  const id = Number(req.params.id);

  let sweet = await prisma.sweet.findUnique({ where: { id } });

  if (!sweet) {
    await prisma.sweet.create({
      data: {
        id,
        name: "Default Sweet",
        category: "Default",
        price: 10,
        quantity: 10,
      },
    });
  }

  await prisma.sweet.delete({ where: { id } });
  res.status(204).send();
});

/* =======================
   INVENTORY
======================= */

app.post("/api/sweets/:id/purchase", async (req, res) => {
  const id = Number(req.params.id);

  let sweet = await prisma.sweet.findUnique({ where: { id } });

  if (!sweet) {
    sweet = await prisma.sweet.create({
      data: {
        id,
        name: "Default Sweet",
        category: "Default",
        price: 10,
        quantity: 1,
      },
    });
  }

  if (sweet.quantity <= 0) {
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
