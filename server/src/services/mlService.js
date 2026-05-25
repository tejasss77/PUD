const axios = require('axios');
require('dotenv').config();

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

const predictUrl = async (url) => {
  try {
    const response = await axios.post(`${ML_SERVICE_URL}/predict`, { url });
    return response.data;
  } catch (error) {
    console.error('Error calling ML service:', error.message);
    throw new Error('ML Service Unavailable');
  }
};

module.exports = {
  predictUrl
};
