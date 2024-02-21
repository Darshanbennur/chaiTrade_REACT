const express = require('express')
const { BuyTheStock, SellTheStock, getAlltheBoughtStocks, getAllTradesWithDatesAndPnL } = require('../controllers/simulatorController.js')
const router = express.Router();

//POST Routes : 
router.post('/buyStock', BuyTheStock);
router.post('/sellStock', SellTheStock);
router.post('/getAllBoughtStocks', getAlltheBoughtStocks);

router.post('/getAllTradesWithDatesAndPnL', getAllTradesWithDatesAndPnL)

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = router