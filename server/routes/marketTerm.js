//All the FAQ Page Related Routes will be here

const express = require('express')
const {getAllFAQ} = require('../controllers/maketTermController.js')
const router = express.Router();

router.get('/getAllFAQ', getAllFAQ)

module.exports = router