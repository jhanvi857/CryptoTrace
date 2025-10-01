const express = require("express");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const xss = require("xss-clean");
const { Pool } = require("pg");

const app = express();
app.use(express.json());
app.use(helmet());   // Security headers
app.use(xss());      // Prevent XSS

// 🔹 Database connection (Postgres)
const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "secureapp",
  password: "yourpassword",
  port: 5432,
});

// 🔹 Middleware: JWT Authentication
function authenticate(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "No token provided" });

  jwt.verify(token, "SECRET_KEY", (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    req.user = decoded;
    next();
  });
}

// 🔹 Register User
app.post(
  "/register",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
        email,
        hashedPassword,
      ]);
      res.json({ msg: "User registered successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Database error" });
    }
  }
);

// 🔹 Login User
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) return res.status(401).json({ error: "User not found" });

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign({ user: user.email }, "SECRET_KEY", { expiresIn: "1h" });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// 🔹 Protected Route
app.get("/profile", authenticate, (req, res) => {
  res.json({ msg: "This is a secure profile route", user: req.user });
});

// 🔹 Start Server
app.listen(3000, () => console.log("Secure server running on http://localhost:3000"));
