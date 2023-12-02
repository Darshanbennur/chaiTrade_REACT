const express = require('express')
const { BuyTheStock, SellTheStock, getAlltheBoughtStocks } = require('../controllers/simulatorController.js')
const router = express.Router();

router.post('/buyStock', BuyTheStock);
router.post('/sellStock', SellTheStock);
router.post('/getAllBoughtStocks', getAlltheBoughtStocks);

module.exports = router