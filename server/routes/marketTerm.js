const express = require('express')
const { getAllFAQ } = require('../controllers/maketTermController.js')
const router = express.Router();

//GET Routes : 
router.get('/getAllFAQ', getAllFAQ)

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = router