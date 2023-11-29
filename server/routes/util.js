const express = require('express')
const { getAllTransaction, increase20K, increase40K, makeUserPremium,postContactUs } = require('../controllers/pricingController.js');
const router = express.Router();

//Pricing Routes :
router.post('/getAllTransaction', getAllTransaction);
router.post('/purchase20k', increase20K);
router.post('/purchase40k', increase40K);
router.post('/purchasePremium', makeUserPremium);

//Contact Us Routes : 
router.post('/postContactUs', postContactUs)

module.exports = router