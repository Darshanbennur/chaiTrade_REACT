const express = require('express')
const {getAllFeaturedBlogs, LikeThisPost} = require('../controllers/mentorController')

const router = express.Router();

router.get("/getAllFeaturedBlogs", getAllFeaturedBlogs)
router.post('/likePost', LikeThisPost)

module.exports = router