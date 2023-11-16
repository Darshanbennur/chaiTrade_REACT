const Blog = require('../models/blog');
const mongoose = require('mongoose');

const postBlog = (req, res, next) => {
    const name = req.body.authorName;
    const title = req.body.title;
    const content = req.body.content;
    const avatar = req.body.authorAvatar;

    const blog = new Blog({
        _id: new mongoose.Types.ObjectId(),
        authorName: name,
        title: title,
        content: content,
        authorAvatar: avatar
    })
    blog
        .save()
        .then(result => {
            console.log("Blog Got Posted : " + result)
            res.status(200).json({
                custom: "Blog Posted!!"
            })
        })
        .catch(err => {
            console.log("Error Occured : " + err)
            res.status(403).json({
                custom: "Error in posting the blog"
            })
        })
}

const getAllBlogs = (req, res, next) => {
    Blog.find()
        .select('authorName title content authorAvatar')
        .exec()
        .then(result => {
            res.status(200)
                .json({
                    data: result,
                    custom: "Fetched all blogs!!"
                });
        })
        .catch(err => {
            console.log("Error while Fetching Blogs : " + err)
            res.status(403)
                .json({
                    custom: "Error in fetching blogs!!" + err
                })
        })
}

module.exports = { postBlog, getAllBlogs };