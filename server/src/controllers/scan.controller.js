const Scan = require('../models/Scan.model');
const mlService = require('../services/mlService');

const scanUrl = async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: 'URL is required' });
    }

    // Call ML Microservice
    const mlResult = await mlService.predictUrl(url);

    // Save to Database
    const scan = new Scan({
      url,
      verdict: mlResult.verdict,
      confidence: mlResult.confidence,
      features: mlResult.features_used
    });

    await scan.save();

    res.status(200).json({
      url,
      verdict: mlResult.verdict,
      confidence: mlResult.confidence,
      features: mlResult.features_used,
      scannedAt: scan.scannedAt,
      scanId: scan._id
    });
  } catch (error) {
    console.error('Scan Error:', error.message);
    res.status(500).json({ message: error.message });
  }
};

const getHistory = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 20;
    const page = parseInt(req.query.page) || 1;

    const scans = await Scan.find()
      .sort({ scannedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Scan.countDocuments();

    res.status(200).json({
      total,
      scans
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  scanUrl,
  getHistory
};
