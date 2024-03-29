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
// router.post('/postMentorApplication', postMentorApplication)

router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});


module.exports = router