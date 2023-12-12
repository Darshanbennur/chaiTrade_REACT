const express = require('express')
const {getAllFAQ} = require('../controllers/maketTermController.js')
const router = express.Router();

//GET Routes : 
router.get('/getAllFAQ', getAllFAQ)

module.exports = router