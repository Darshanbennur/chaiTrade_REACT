const express = require('express')
const { getAllNews } = require('../controllers/newsController.js')
const router = express.Router();

//GET Routes : 
router.get('/getAllNews', getAllNews);

module.exports = router