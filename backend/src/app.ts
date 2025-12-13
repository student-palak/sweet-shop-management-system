import express from "express";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

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



export default app;
