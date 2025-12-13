import express from "express";

const app = express();
app.use(express.json());

app.post("/api/auth/register", (req, res) => {
  res.status(201).json({
    email: req.body.email
  });
});

app.post("/api/auth/login", (req, res) => {
  res.status(200).json({
    token: "dummy-token"
  });
});

export default app;
