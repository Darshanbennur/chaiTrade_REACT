const express = require('express')
const { getAllTransaction, increase20K, increase40K, makeUserPremium, postContactUs } = require('../controllers/pricingController.js');
const router = express.Router();

//Pricing Routes :
//POST Routes : 
router.post('/getAllTransaction', getAllTransaction);
router.post('/purchase20k', increase20K);
router.post('/purchase40k', increase40K);
router.post('/purchasePremium', makeUserPremium);

//Contact Us Routes : 
//POST Routes : 
router.post('/postContactUs', postContactUs)

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = router