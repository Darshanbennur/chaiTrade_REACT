const express = require('express')

const {postBlog, getAllBlogs} = require('../controllers/blogController.js')

const router = express.Router();

router.get('/allBlogs', getAllBlogs)

router.post('/postBlog', postBlog)


module.exports = router