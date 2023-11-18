//All the Utilities  Related Routes will be here
//Pricing
//ContactUs

const express = require('express')
const { getAllTransaction } = require('../controllers/pricingController.js');
const router = express.Router();

//Pricing Routes :
router.post('/getAllTransaction', getAllTransaction);



//Contact Us Routes : 


module.exports = router