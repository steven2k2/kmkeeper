const axios = require('axios');

/**
 * A utility function to perform HTTP requests.
 * Wraps around the Axios library for consistent API communication.
 *
 * @param {string} method - The HTTP method (e.g., 'get', 'post', 'put', 'delete').
 * @param {string} url - The full API endpoint URL.
 * @param {object} [data] - The payload for POST and PUT requests.
 * @param {object} [headers] - Optional headers to include in the request.
 * @returns {Promise<any>} - The response data from the API.
 */
async function apiRequest(method, url, data = {}, headers = {}) {
    try {
        const options = {
            method,
            url,
            data,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
        };

        const response = await axios(options);
        return response.data;
    } catch (error) {
        console.error(`API Request Error: ${error.message}`);
        throw error; // Re-throw the error for higher-level handling
    }
}

module.exports = apiRequest;