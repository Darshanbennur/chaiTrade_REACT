const express = require('express')
const router = express.Router();

const {getAllResources} = require('../controllers/EducationalResources.js')

//GET routes:
router.get('/getAllEducationalResources', getAllResources);

//POST routes:


module.exports = router