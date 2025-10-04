// routes/graph.js
const express = require("express");
const supabase = require("./db");
const router = express.Router();

router.get("/graph", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("crypto_records")
      .select("id, name, phone, email, wallet, bank_account, transaction_amount, transaction_date, source");

    if (error) throw error;

    // convert to nodes + links for graph
    const nodes = [];
    const links = [];

    data.forEach(row => {
      // entity node
      nodes.push({ id: `entity-${row.id}`, name: row.name || row.email || "Unknown", type: "person" });

      // wallet node
      if (row.wallet) {
        nodes.push({ id: `wallet-${row.wallet}`, name: row.wallet, type: "wallet" });
        links.push({ source: `entity-${row.id}`, target: `wallet-${row.wallet}`, label: "owns" });
      }

      // bank node
      if (row.bank_account) {
        nodes.push({ id: `bank-${row.bank_account}`, name: row.bank_account, type: "bank" });
        links.push({ source: `entity-${row.id}`, target: `bank-${row.bank_account}`, label: "uses" });
      }
    });

    // Deduplicate
    const uniqueNodes = Object.values(Object.fromEntries(nodes.map(n => [n.id, n])));

    res.json({ nodes: uniqueNodes, links });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
