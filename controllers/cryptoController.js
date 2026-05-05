const { validationResult } = require('express-validator');
const Crypto = require('../models/Crypto');

const getAllCryptos = async (req, res) => {
  try {
    const cryptos = await Crypto.find().sort({ createdAt: -1 });
    
    res.json({
      success: true,
      message: 'Cryptocurrencies retrieved successfully',
      data: cryptos
    });
  } catch (error) {
    console.error('Get all cryptos error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving cryptocurrencies'
    });
  }
};

const getTopGainers = async (req, res) => {
  try {
    const gainers = await Crypto.find()
      .sort({ change24h: -1 })
      .limit(10);
    
    res.json({
      success: true,
      message: 'Top gainers retrieved successfully',
      data: gainers
    });
  } catch (error) {
    console.error('Get top gainers error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving top gainers'
    });
  }
};

const getNewListings = async (req, res) => {
  try {
    const newListings = await Crypto.find()
      .sort({ createdAt: -1 })
      .limit(10);
    
    res.json({
      success: true,
      message: 'New listings retrieved successfully',
      data: newListings
    });
  } catch (error) {
    console.error('Get new listings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error retrieving new listings'
    });
  }
};

const addCrypto = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, symbol, price, image, change24h } = req.body;

    const existingCrypto = await Crypto.findOne({ symbol: symbol.toUpperCase() });
    if (existingCrypto) {
      return res.status(400).json({
        success: false,
        message: 'Cryptocurrency with this symbol already exists'
      });
    }

    const crypto = new Crypto({
      name,
      symbol: symbol.toUpperCase(),
      price,
      image,
      change24h: change24h || 0
    });

    await crypto.save();

    res.status(201).json({
      success: true,
      message: 'Cryptocurrency added successfully',
      data: crypto
    });
  } catch (error) {
    console.error('Add crypto error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error adding cryptocurrency'
    });
  }
};

module.exports = {
  getAllCryptos,
  getTopGainers,
  getNewListings,
  addCrypto
};
