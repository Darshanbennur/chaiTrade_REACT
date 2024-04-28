const express = require('express')
const { getAllCharts, updateCharts } = require('../controllers/chartController.js');
const router = express.Router();

//GET Routes : 
router.get('/getChartData', getAllCharts);
router.get('/updateCharts', updateCharts);

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = router