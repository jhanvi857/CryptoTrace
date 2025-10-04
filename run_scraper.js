// run_scraper.js

// 🛑 CRITICAL: dotenv MUST be loaded first!
require('dotenv').config(); 

const { validateAndGetType } = require('./Backend/src/validator');
const { saveScrapedData, pool } = require('./Backend/src/db_ingestion'); 
const axios = require('axios');
const cheerio = require('cheerio');

// --- MOCK DATA SIMULATION ---
function simulateScraping() {
    const scrapedResults = [
        { 
            raw_text: "Bitcoin address for payment: 1F1tAaz5x1HUXrCNLbtMDqcw6o5GNn4xqM", 
            source_url: "http://mock-darknet-forum-a.onion", 
            source_type: "Darknet Forum",
            found_date: new Date().toISOString().slice(0, 10)
        },
        { 
            raw_text: "Send Eth to: 0x89205A3A3b2A69De6Dbf7f01fEaa3b4f0b2f1eEe", 
            source_url: "http://fake-news-site.co", 
            source_type: "Fake News Site",
            found_date: new Date().toISOString().slice(0, 10)
        },
        { 
            raw_text: "Invalid address found here: ZYXW1234", 
            source_url: "http://mock-darknet-forum-a.onion", 
            source_type: "Darknet Forum",
            found_date: new Date().toISOString().slice(0, 10)
        }
    ];

    return scrapedResults;
}

// --- MAIN RUNNER FUNCTION ---
async function runScraper() {
    console.log("Starting data collection and ingestion...");
    const results = simulateScraping();
    let successfulIngestions = 0;

    for (const result of results) {
        // Regex to broadly match BTC or ETH
        const potentialAddress = result.raw_text.match(/[A-Za-z0-9]{25,}|0x[a-fA-F0-9]{40}/)?.[0];

        console.log(`DEBUG: Extracted potential address: [${potentialAddress}]`); 
        
        if (!potentialAddress) {
            console.log(`Skipping: Could not extract address from snippet: ${result.raw_text.substring(0, 30)}...`);
            continue;
        }

        const cryptoType = validateAndGetType(potentialAddress);

        if (cryptoType) {
            console.log(`Valid Address Found: ${potentialAddress} (${cryptoType})`);
            
            const structuredData = {
                address: potentialAddress,
                crypto_type: cryptoType,
                source_url: result.source_url,
                source_type: result.source_type,
                snippet: result.raw_text,
                found_date: result.found_date 
            };
            
            try {
                await saveScrapedData(structuredData);
                successfulIngestions++;
            } catch (error) {
                console.error(`Failed to ingest address ${potentialAddress}: ${error.message}`);
            }

        } else {
            console.log(`Invalid or unsupported address skipped: ${potentialAddress}`);
        }
    }

    console.log(`\n--- Scraper Run Complete ---`);
    console.log(`Total attempts: ${results.length}`);
    console.log(`Successful database ingéstions: ${successfulIngestions}`);
    
    await pool.end(); 
    console.log("Database connection pool closed.");
}

runScraper().catch(err => {
    console.error("Critical error during scraper execution:", err);
    process.exit(1);
});