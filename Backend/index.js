require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const fs = require("fs");
const { createObjectCsvWriter } = require("csv-writer");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// BTC, ETH validation..
function isValidCryptoAddress(address) {
  const btcRegex = /^(1|3|bc1)[a-zA-Z0-9]{25,39}$/;
  const ethRegex = /^0x[a-fA-F0-9]{40}$/;
  return btcRegex.test(address) || ethRegex.test(address);
}

// Routes..
app.get("/addresses", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM addresses ORDER BY last_seen DESC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

app.post("/addresses", async (req, res) => {
  const { address, crypto_type, category, description, source } = req.body;
  if (!isValidCryptoAddress(address)) return res.status(400).json({ error: "Invalid crypto address" });

  try {
    const query = `
      INSERT INTO addresses(address, crypto_type, category, description, source, last_seen)
      VALUES ($1,$2,$3,$4,$5,NOW())
      RETURNING *
    `;
    const { rows } = await pool.query(query, [address, crypto_type, category, description, source]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Export addresses as CSV file..
app.get("/export/csv", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM addresses");
    const csvWriter = createObjectCsvWriter({
      path: "addresses_export.csv",
      header: [
        {id: 'id', title: 'ID'},
        {id: 'address', title: 'Address'},
        {id: 'crypto_type', title: 'Crypto Type'},
        {id: 'category', title: 'Category'},
        {id: 'description', title: 'Description'},
        {id: 'source', title: 'Source'},
        {id: 'last_seen', title: 'Last Seen'}
      ]
    });
    await csvWriter.writeRecords(rows);
    res.download("addresses_export.csv");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Export failed" });
  }
});

// scraper endpoint
app.get("/scrape-sample", async (req, res) => {

    const sampleAddresses = [
    { address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", crypto_type: "BTC", category: "Darknet", description: "Example forum post", source: "forum.xyz" },
    { address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", crypto_type: "ETH", category: "Scam", description: "News article", source: "news.com" }
  ];

  try {
    for (let a of sampleAddresses) {
      await pool.query(
        `INSERT INTO addresses(address, crypto_type, category, description, source, last_seen)
        VALUES($1,$2,$3,$4,$5,NOW()) ON CONFLICT(address) DO NOTHING`,
        [a.address, a.crypto_type, a.category, a.description, a.source]
      );
    }
    res.json({ message: "Sample addresses scraped & stored" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Scraper failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));