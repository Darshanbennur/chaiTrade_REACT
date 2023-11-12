const mongoose = require('mongoose');

const ContactUs = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    authorName: {type : String, required : true},
    email: {type : String, required : true},
    title: {type : String, required : true},
    content: {type : String, required : true},
});

module.exports = mongoose.model('ContactUs',ContactUs);