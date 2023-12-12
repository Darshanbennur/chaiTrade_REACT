const express = require('express')
const {postBlog, getAllBlogs} = require('../controllers/blogController.js')
const router = express.Router();

//GET Routes : 
router.get('/allBlogs', getAllBlogs)

//POST Routes : 
router.post('/postBlog', postBlog)


module.exports = router