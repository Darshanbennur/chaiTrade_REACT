const express = require('express')
const router = express.Router();

const { getAllResources } = require('../controllers/EducationalResources.js')

//GET routes:
router.get('/getAllEducationalResources', getAllResources);

//POST routes:

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});


module.exports = router