// const express = require("express");
// const { body, validationResult } = require("express-validator");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const helmet = require("helmet");
// const xss = require("xss-clean");
// const { Pool } = require("pg");

// const app = express();
// app.use(express.json());
// app.use(helmet());   // Security headers..
// app.use(xss());      // Prevent XSS..

// // Database connection (Postgres)..
// const db = new Pool({
//   user: "postgres",
//   host: "localhost",
//   database: "secureapp",
//   password: "yourpassword",
//   port: 5432,
// });

// // JWT Authentication..
// function authenticate(req, res, next) {
//   const token = req.headers["authorization"];
//   if (!token) return res.status(403).json({ error: "No token provided" });

//   jwt.verify(token, "SECRET_KEY", (err, decoded) => {
//     if (err) return res.status(401).json({ error: "Invalid token" });
//     req.user = decoded;
//     next();
//   });
// }

// // Register User..
// app.post(
//   "/register",
//   [
//     body("email").isEmail().normalizeEmail(),
//     body("password").isLength({ min: 8 }),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

//     const { email, password } = req.body;

//     try {
//       const hashedPassword = await bcrypt.hash(password, 10);
//       await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [
//         email,
//         hashedPassword,
//       ]);
//       res.json({ msg: "User registered successfully" });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: "Database error" });
//     }
//   }
// );

// // Login route..
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
//     if (result.rows.length === 0) return res.status(401).json({ error: "User not found" });

//     const user = result.rows[0];
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ error: "Invalid password" });

//     const token = jwt.sign({ user: user.email }, "SECRET_KEY", { expiresIn: "1h" });
//     res.json({ token });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Database error" });
//   }
// });

// // 🔹 Protected Route
// app.get("/profile", authenticate, (req, res) => {
//   res.json({ msg: "This is a secure profile route", user: req.user });
// });

// // 🔹 Start Server
// app.listen(5000, () => console.log("Secure server running on http://localhost:5000"));
// authRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const supabase = require("./Routes/db"); 
require("dotenv").config();
const router = express.Router();

// register route..
router.post(
  "/register",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    let { name, email, password, userType } = req.body;
    email = email.toLowerCase().trim();

    try {
      const { data: existingUser, error: existingError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .maybeSingle();

      if (existingError) throw existingError;
      if (existingUser) return res.status(400).json({ error: "User already exists" });

      // password hashing..
      const hashedPassword = await bcrypt.hash(password, 10);

      // add user w extra fields..
      const { error } = await supabase
        .from("users")
        .insert([{ name, email, password: hashedPassword, user_type: userType }]);

      if (error) throw error;

      res.json({ msg: "User registered successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
);


// login route..
router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  email = email.toLowerCase().trim();

  try {
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (error) throw error;
    if (!user) return res.status(401).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign(
      { user_id: user.user_id },
      process.env.JWT_SECRET || "fallbacksecret",
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// PROTECTED PROFILE..
router.get("/profile", async (req, res) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ error: "No token provided" });

  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET || "fallbacksecret", (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    res.json({ msg: "Secure profile route", user: decoded });
  });
});

//  auth middleware..
// function checkAuth(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   if (!authHeader) return res.status(403).json({ error: "No token provided" });

//   const token = authHeader.split(" ")[1]; 
//   if (!token) return res.status(401).json({ error: "Unauthorized" });

//   jwt.verify(token, process.env.JWT_SECRET || "fallbacksecret", (err, decoded) => {
//     if (err) return res.status(401).json({ error: "Invalid token payload" });
//     if (!decoded.user_id) return res.status(401).json({ error: "Invalid token payload" });
//     req.userId = decoded.user_id;
//     next();
//   });
// }
async function checkAuth(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(403).json({ error: "No token provided" });

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
    const SECRET = process.env.JWT_SECRET || "fallbacksecret";

    const decoded = jwt.verify(token, SECRET);

    if (!decoded || !decoded.user_id) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    req.userId = decoded.user_id;
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    res.status(401).json({ error: "Invalid or expired token" });
  }
}


// search saving..
router.post("/user/save-search", checkAuth, async (req, res) => {
  const { query, results } = req.body;
  const userId = req.userId;

  if (!query) return res.status(400).json({ error: "Missing query" });

  try {
    const { error } = await supabase
      .from("saved_searches")
      .insert([{ user_id: userId, query, results }]); 

    if (error) throw error;
    res.json({ msg: "Search saved successfully" });
  } catch (err) {
    console.error("Save search error:", err);
    res.status(500).json({ error: err.message });
  }
});

// get saved searches..
router.get("/user/saved", checkAuth, async (req, res) => {
  const userId = req.userId;

  try {
    const { data, error } = await supabase
      .from("saved_searches")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error("Saved searches fetch error:", err);
    res.status(500).json({ error: err.message });
  }
});

// open and delete functionality..
router.get("/user/saved/:id", checkAuth, async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;

  try {
    const { data, error } = await supabase
      .from("saved_searches")
      .select("*")
      .eq("id", id)
      .eq("user_id", userId)
      .maybeSingle();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: "Not found" });

    res.json(data);
  } catch (err) {
    console.error("Open saved search error:", err);
    res.status(500).json({ error: err.message });
  }
});

// delete search func..
router.delete("/user/saved/:id", checkAuth, async (req, res) => {
  const userId = req.userId;
  const { id } = req.params;

  try {
    const { error } = await supabase
      .from("saved_searches")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);

    if (error) throw error;

    res.json({ msg: "Deleted successfully" });
  } catch (err) {
    console.error("Delete saved search error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
