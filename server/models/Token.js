const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  decimals: {
    type: Number,
    default: 7,
  },
  contractId: {
    type: String,
    required: true,
    unique: true,
  },
  ownerPublicKey: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Token', TokenSchema);
