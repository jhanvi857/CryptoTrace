// Final: 
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const { parse } = require("csv-parse");
const supabase = require("./Routes/db");
const fetch = require("node-fetch");
const crypto = require("crypto");
const getGraph = require("./Routes/graphRoute");
const scraper = require("./scraper");
const authRoutes = require("./server");
const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });
app.use("/auth",authRoutes);
app.use("/api", getGraph);

app.post("/scrape", async (req, res) => {
  const { url, source } = req.body;
  if (!url) return res.status(400).json({ error: "Missing URL" });

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Blockchain-style transaction
    const transaction = createTransaction(data);

    // Flatten into records
    const records = Array.isArray(data) ? data : [data];
    records.forEach(r => {
      r.source = source || url;
      r.last_scan = new Date().toISOString();
    });

    // Insert into Supabase
    const { error } = await supabase.from("crypto_records").insert(records);
    if (error) throw error;

    const analysis = analyzeRecords(records);

    res.json({
      message: "Scraping successful",
      transaction,
      analysis
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Scraping failed", details: err.message });
  }
});

// scraping via scraper.js..
app.post("/scrape-manual", async (req, res) => {
  try {
    await scraper.scrapeAllSources();
    res.json({ message: "Manual scraping completed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
  //  File Upload (CSV/JSON)
// app.post("/process-file", upload.single("file"), async (req, res) => {
//   const file = req.file;
//   if (!file) return res.status(400).json({ error: "File missing", entities: [], clusters: [], alerts: [] });

//   try {
//     const content = file.buffer.toString();
//     let records = [];

//     if (file.mimetype === "application/json") {
//       const parsed = JSON.parse(content);
//       records = parsed.records || [];
//     } else {
//       records = await new Promise((resolve, reject) => {
//         parse(content, { columns: true, skip_empty_lines: true }, (err, output) => {
//           if (err) reject(err);
//           else resolve(output);
//         });
//       });
//     }

//     await supabase.from("crypto_records").insert(records);

//     const entities = [];
//     const clusters = [];
//     const alerts = [];

//     records.forEach((r) => {
//       if (r.name) entities.push({ value: r.name, type: "Name" });
//       if (r.phone) entities.push({ value: r.phone, type: "Phone" });
//       if (r.email) entities.push({ value: r.email, type: "Email" });
//       if (r.wallet) entities.push({ value: r.wallet, type: "Wallet" });
//       if (r.bank_account) entities.push({ value: r.bank_account, type: "Bank Account" });

//       if (r.transaction_amount > 40000) clusters.push("High-value transactions group");
//       if (r.email && r.email.endsWith(".onion")) alerts.push(`⚠️ Suspicious email domain: ${r.email}`);
//       if (r.wallet && r.wallet.startsWith("INVALID")) alerts.push(`⚠️ Invalid wallet format: ${r.wallet}`);
//     });

//     res.json({ entities, clusters, alerts });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message, entities: [], clusters: [], alerts: [] });
//   }
// });
app.post("/process-file", upload.single("file"), async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: "File missing", entities: [], clusters: [], alerts: [] });

  try {
    const content = file.buffer.toString();
    let records = [];

    if (file.mimetype === "application/json") {
      const parsed = JSON.parse(content);
      records = parsed.records || [];
    } else {
      records = await new Promise((resolve, reject) => {
        parse(content, { columns: true, skip_empty_lines: true }, (err, output) => {
          if (err) reject(err);
          else resolve(output);
        });
      });
    }

    const formattedRecords = records.map(r => ({
      name: r.name || null,
      phone: r.phone || null,
      email: r.email || null,
      wallet: r.wallet || null,
      bank_account: r.bank_account || null,
      transaction_amount: r.transaction_amount || 0
    }));

    await supabase.from("crypto_records").insert(formattedRecords);

    // Extract entities, clusters, alerts
    const entities = new Map();
    const clusters = [];
    const alerts = [];

    formattedRecords.forEach(r => {
      if (r.name) entities.set(r.name, "Name");
      if (r.phone) entities.set(r.phone, "Phone");
      if (r.email) entities.set(r.email, "Email");
      if (r.wallet) entities.set(r.wallet, "Wallet");
      if (r.bank_account) entities.set(r.bank_account, "Bank Account");

      if (r.transaction_amount > 40000) clusters.push("High-value transactions group");
      if (r.email && r.email.endsWith(".onion")) alerts.push(`⚠️ Suspicious email domain: ${r.email}`);
      if (r.wallet && r.wallet.startsWith("INVALID")) alerts.push(`⚠️ Invalid wallet format: ${r.wallet}`);
    });

    res.json({ entities: Array.from(entities, ([value, type]) => ({ value, type })), clusters, alerts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message, entities: [], clusters: [], alerts: [] });
  }
});
  //  Query Endpoint
app.get("/search", async (req, res) => {
  const { wallet, name, from, to } = req.query;

  try {
    let query = supabase.from("crypto_records").select("*");

    if (wallet) query = query.ilike("wallet", `%${wallet}%`);
    if (name) query = query.ilike("name", `%${name}%`);
    if (from && to) query = query.gte("last_scan", from).lte("last_scan", to);

    const { data, error } = await query;
    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

  //  Export Endpoint (CSV/JSON)
app.get("/export", async (req, res) => {
  const { format } = req.query;
  try {
    const { data, error } = await supabase.from("crypto_records").select("*");
    if (error) throw error;

    if (format === "csv") {
      const headers = Object.keys(data[0] || {}).join(",") + "\n";
      const rows = data.map(r => Object.values(r).join(",")).join("\n");
      res.header("Content-Type", "text/csv");
      res.attachment("export.csv");
      return res.send(headers + rows);
    } else {
      res.json(data);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.use((req, res) => res.status(404).json({ error: "Route not found" }));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));