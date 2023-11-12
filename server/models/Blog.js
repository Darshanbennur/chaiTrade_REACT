const mongoose = require('mongoose');

const Blog = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    authorName: {type : String, required : true},
    title: {type : String, required : true},
    content: {type : String, required : true},
    authorAvatar: {type : String, required : true},
});

module.exports = mongoose.model('Blog',Blog);