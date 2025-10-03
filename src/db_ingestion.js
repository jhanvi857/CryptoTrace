// src/db_ingestion.js

const { Pool } = require('pg');

// 🛑 CRITICAL: Robustly extract the HOSTNAME from the SUPABASE_URL
const SUPABASE_URL_STRING = process.env.SUPABASE_URL;

const SUPABASE_HOST = SUPABASE_URL_STRING 
    ? SUPABASE_URL_STRING.replace('https://', '').split('/')[0]
    : null; 

if (!SUPABASE_HOST) {
    // If the variable isn't set, this custom error will be thrown.
    throw new Error("SUPABASE_URL is not set in .env. Cannot establish DB connection.");
}

// 2. Configure the Pool using Supabase derived details
const pool = new Pool({
    user: 'postgres', 
    host: SUPABASE_HOST, // Now correctly set to the Supabase host
    database: 'postgres', 
    password: process.env.SUPABASE_KEY, 
    port: 5432, 
    ssl: {
        rejectUnauthorized: false, // Required for secure cloud connections
    }
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1); 
});

/**
 * Handles the full ingestion of a single scraped data point.
 */
async function saveScrapedData(data) {
    const client = await pool.connect(); 

    try {
        await client.query('BEGIN'); // Start Transaction
        
        // --- A. UPSERT INTO sources ---
        const sourceUpsertQuery = `
            INSERT INTO sources (url, source_type, last_scan, reliability_score)
            VALUES ($1, $2, $3, 10) 
            ON CONFLICT (url) DO UPDATE SET last_scan = EXCLUDED.last_scan 
            RETURNING source_id;
        `;
        const sourceValues = [data.source_url, data.source_type, data.found_date];
        const sourceRes = await client.query(sourceUpsertQuery, sourceValues);
        const sourceId = sourceRes.rows[0].source_id;


        // --- B. UPSERT INTO crypto_addresses ---
        const addressUpsertQuery = `
            INSERT INTO crypto_addresses (address, crypto_type, first_seen, last_seen)
            VALUES ($1, $2, $3, $3) 
            ON CONFLICT (address) DO UPDATE SET last_seen = EXCLUDED.last_seen 
            RETURNING address_id;
        `;
        const addressValues = [data.address, data.crypto_type, data.found_date];
        const addressRes = await client.query(addressUpsertQuery, addressValues);
        const addressId = addressRes.rows[0].address_id;

        // --- C. INSERT INTO address_mentions ---
        const mentionInsertQuery = `
            INSERT INTO address_mentions (address_id, source_id, snippet, found_date)
            VALUES ($1, $2, $3, $4);
        `;
        const mentionValues = [addressId, sourceId, data.snippet, data.found_date];
        await client.query(mentionInsertQuery, mentionValues);

        await client.query('COMMIT'); // Commit Transaction
        console.log(`Successfully ingested mention for Address ID: ${addressId}`);

    } catch (e) {
        await client.query('ROLLBACK'); // Rollback if any error occurred
        console.error('Error during ingestion transaction. Rolling back:', e);
        throw e;
    } finally {
        client.release(); // Return the client to the pool
    }
}

// 4. Export the function and pool
module.exports = { saveScrapedData, pool };