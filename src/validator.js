// src/validator.js
const WAValidator = require('multicoin-address-validator');

/**
 * Validates a string as a BTC or ETH address and returns its type.
 * @param {string} address - The potential crypto address.
 * @returns {string | null} 'BTC', 'ETH', or null if invalid/unsupported.
 */
function validateAndGetType(address) {
    // 1. Check BTC using Regex (for addresses starting with 1, 3, or bc1)
    const btcRegex = /^(bc1|[13])[a-km-zA-HJ-NP-Z1-9]{25,34}$/;

    if (btcRegex.test(address)) {
        return 'BTC';
    }
    
    // 2. Check ETH using the library 
    if (WAValidator.validate(address, 'ETH', 'prod')) {
        return 'ETH';
    }
    
    // 3. Fallback Regex check for Ethereum (0x followed by 40 hex chars)
    if (/^0x[a-fA-F0-9]{40}$/.test(address)) {
        return 'ETH';
    }

    return null; 
}

module.exports = { validateAndGetType };