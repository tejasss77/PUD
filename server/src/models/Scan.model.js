const mongoose = require('mongoose');

const ScanSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
    trim: true
  },
  verdict: {
    type: String,
    enum: ['SAFE', 'PHISHING', 'UNKNOWN'],
    required: true
  },
  confidence: {
    type: Number,
    required: true
  },
  features: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  scannedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Scan', ScanSchema);
