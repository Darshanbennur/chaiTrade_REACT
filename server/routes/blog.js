const express = require('express')
const { postBlog, getAllBlogs } = require('../controllers/blogController.js')
const router = express.Router();

//GET Routes : 
router.get('/allBlogs', getAllBlogs)

//POST Routes : 
router.post('/postBlog', postBlog)

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = router