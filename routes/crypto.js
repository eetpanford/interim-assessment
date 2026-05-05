const express = require('express');
const { body } = require('express-validator');
const { 
  getAllCryptos, 
  getTopGainers, 
  getNewListings, 
  addCrypto 
} = require('../controllers/cryptoController');

const router = express.Router();

router.get('/', getAllCryptos);
router.get('/gainers', getTopGainers);
router.get('/new', getNewListings);

router.post('/', [
  body('name')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Name must be between 1 and 50 characters'),
  body('symbol')
    .trim()
    .isLength({ min: 1, max: 10 })
    .withMessage('Symbol must be between 1 and 10 characters'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('image')
    .isURL()
    .withMessage('Image must be a valid URL'),
  body('change24h')
    .optional()
    .isFloat()
    .withMessage('24h change must be a number')
], addCrypto);

module.exports = router;
