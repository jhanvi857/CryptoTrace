// middleware/checkAuth.js
const jwt = require("jsonwebtoken");

function checkAuth(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(403).json({ error: "No token provided" });

  const token = authHeader.split(" ")[1]; 
  if (!token) return res.status(403).json({ error: "No token provided" });

  const SECRET = process.env.JWT_SECRET || "fallbacksecret";

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Invalid token" });
    req.userEmail = decoded.user; 
    next();
  });
}

module.exports = checkAuth;