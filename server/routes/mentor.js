const express = require('express')
const { getAllFeaturedBlogs, LikeThisPost, postFeaturedSectionBlog,
    getAllMentorBlogs, postMentorApplication, getMentorBlogDatesAndLikes } = require('../controllers/mentorController')
const router = express.Router();

//GET Routes : 
router.get("/getAllFeaturedBlogs", getAllFeaturedBlogs);

//POST Routes : 
router.post('/postMentorBlog', postFeaturedSectionBlog);
router.post('/getMentorBlogs', getAllMentorBlogs);
router.post('/likePost', LikeThisPost);

router.post('/getMentorBlogDatesAndLikes', getMentorBlogDatesAndLikes)

//POST Routes : for applying for a mentor as a user
router.post('/postMentorApplication', postMentorApplication)

module.exports = router