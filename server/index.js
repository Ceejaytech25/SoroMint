const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Token = require('./models/Token');
const stellarService = require('./services/stellar-service');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/soromint')
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Routes
app.get('/api/tokens/:owner', async (req, res) => {
  try {
    const tokens = await Token.find({ ownerPublicKey: req.params.owner });
    res.json(tokens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/tokens', async (req, res) => {
  try {
    const { name, symbol, decimals, contractId, ownerPublicKey } = req.body;
    const newToken = new Token({ name, symbol, decimals, contractId, ownerPublicKey });
    await newToken.save();
    res.json(newToken);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'Server is running', network: process.env.NETWORK_PASSPHRASE });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
