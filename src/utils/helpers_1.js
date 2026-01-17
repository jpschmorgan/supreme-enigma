// Utility functions for supreme-enigma
// Generated as part of ongoing improvements

export function formatDate(date) {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export function validateEmail(email) {
    if (!email) return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

export function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export function sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}


// Supreme Enigma - Feature Enhancement
// Supreme Enigma

/**
 * Process and validate input data
 * @param {Array} data - Input data array
 * @returns {Array} Processed data
 */
function processData(data) {
    if (!data || !Array.isArray(data)) {
        throw new Error('Data must be a non-empty array');
    }
    
    return data.map(item => {
        if (typeof item === 'object' && item !== null) {
            return validateItem(item);
        }
        return String(item).trim();
    });
}

/**
 * Validate individual item structure
 * @param {Object} item - Item to validate
 * @returns {Object} Validated item
 */
function validateItem(item) {
    const requiredFields = ['id', 'name'];
    for (const field of requiredFields) {
        if (!(field in item)) {
            throw new Error(`Missing required field: ${field}`);
        }
    }
    return item;
}

class DataProcessor {
    constructor(config = {}) {
        this.config = config;
        this.cache = new Map();
    }
    
    process(data) {
        const cacheKey = JSON.stringify(data);
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        
        const result = processData(data);
        this.cache.set(cacheKey, result);
        return result;
    }
}

module.exports = { processData, validateItem, DataProcessor };
