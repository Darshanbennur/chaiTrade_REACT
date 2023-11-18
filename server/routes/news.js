//All the News Related Routes will be here

const express = require('express')

const { getAllNews } = require('../controllers/newsController.js')

const router = express.Router();

router.get('/getAllNews', getAllNews);


module.exports = router