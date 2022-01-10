const axios = require('axios').default;
require('dotenv/config');

const apiSFN = axios.create({ baseURL: process.env.SPACE_FLIGHT_NEWS_API_URI });

module.exports = apiSFN;
