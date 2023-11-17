const express = require('express')
const { getAllFeaturedBlogs, LikeThisPost, postFeaturedSectionBlog, getAllMentorBlogs } = require('../controllers/mentorController')

const router = express.Router();

router.get("/getAllFeaturedBlogs", getAllFeaturedBlogs);

router.post('/likePost', LikeThisPost);
router.post('/postMentorBlog', postFeaturedSectionBlog);

router.post('/getMentorBlogs', getAllMentorBlogs);

module.exports = router