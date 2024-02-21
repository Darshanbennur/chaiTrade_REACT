const express = require('express')
const { getAllNews } = require('../controllers/newsController.js')
const router = express.Router();

//GET Routes : 
router.get('/getAllNews', getAllNews);

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = router