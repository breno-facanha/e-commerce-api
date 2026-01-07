const axios = require('axios');

const emailApi = axios.create({
    baseURL: process.env.EMAIL_API_URL,
    headers: { 
        Authorization: process.env.SECRET_EMAIL_API_KEY
    }
});

module.exports = emailApi;