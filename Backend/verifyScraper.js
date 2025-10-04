// require("dotenv").config();
// const scraper = require("./scraper");
// const supabase = require("./Routes/db");

// // Optional: force a manual scrape and log results
// (async () => {
//   try {
//     console.log("Starting scraper verification...");

//     // Run scraping for all sources
//     await scraper.scrapeAllSources();

//     console.log("Scraper finished. Fetching inserted records...");

//     // Fetch latest records from Supabase
//     const { data, error } = await supabase
//       .from("crypto_records")
//       .select("*")
//       .order("last_scan", { ascending: false })
//       .limit(10); // get latest 10 for verification

//     if (error) throw error;

//     console.log("Latest records inserted:");
//     console.table(data);

//     console.log("Verification complete.");
//     process.exit(0);
//   } catch (err) {
//     console.error("Verification failed:", err.message);
//     process.exit(1);
//   }
// })();
