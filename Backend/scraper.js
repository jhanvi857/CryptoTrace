require("dotenv").config();
const fetch = require("node-fetch");
const { JSDOM } = require("jsdom");
const cron = require("node-cron");
const supabase = require("./Routes/db"); 
const { analyzeRecords } = require("../sample_data.json"); 

const { HttpsProxyAgent } = require("https-proxy-agent");
const torAgent = new HttpsProxyAgent("socks5h://127.0.0.1:9050");

// List of sources to scrape
// const sources = [
//   { url: "https://realforum1.com/crypto", type: "json" },
//   { url: "https://newsportal2.com/crypto-addresses", type: "json" },
//   { url: "http://xyz.onion/suspicious-wallets", type: "json" }
// ];
const sources = [
  { url: "https://example-forum.com/crypto", type: "html" },
  { url: "https://newsportal.com/crypto-news", type: "html" },
  { url: "https://api.somerepo.com/addresses", type: "json" },
  // { url: "http://someonion.onion", type: "html" } // for Tor
];


async function scrapeSource(source) {
  try {
    const isOnion = source.url.endsWith(".onion");
    const response = await fetch(source.url, { agent: isOnion ? torAgent : undefined });
    let data = [];

    if (source.type === "json") {
      data = await response.json();
      if (!Array.isArray(data)) data = [data];
    } else if (source.type === "html") {
      const text = await response.text();
      const dom = new JSDOM(text);
      const document = dom.window.document;

      const rows = document.querySelectorAll(".address-row");
      data = Array.from(rows).map(row => ({
        name: row.querySelector(".name")?.textContent || null,
        wallet: row.querySelector(".wallet")?.textContent || null,
        email: row.querySelector(".email")?.textContent || null,
        phone: row.querySelector(".phone")?.textContent || null,
        bank_account: row.querySelector(".bank")?.textContent || null,
        source: source.url,
        last_scan: new Date().toISOString()
      }));
    }

    const wallets = data.map(d => d.wallet).filter(Boolean);
    const { data: existing } = await supabase
      .from("crypto_records")
      .select("wallet")
      .in("wallet", wallets);

    const newRecords = data.filter(d => !existing.some(e => e.wallet === d.wallet));

    if (newRecords.length) {
      await supabase.from("crypto_records").insert(newRecords);
      analyzeRecords(newRecords); 
    }

    console.log(`Scraped ${newRecords.length} new records from ${source.url}`);
  } catch (err) {
    console.error(`Failed to scrape ${source.url}:`, err.message);
  }
}

async function scrapeAllSources() {
  for (const src of sources) {
    await scrapeSource(src);
  }
}

cron.schedule("*/50 * * * *", async () => {
  console.log("Running scheduled scraping...");
  await scrapeAllSources();
});

module.exports = {
  scrapeSource,
  scrapeAllSources
};