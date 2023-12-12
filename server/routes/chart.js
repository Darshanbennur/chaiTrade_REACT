const express = require('express')
const { getAllCharts } = require('../controllers/chartController.js');
const router = express.Router();

//GET Routes : 
router.get('/getChartData', getAllCharts);

module.exports = router