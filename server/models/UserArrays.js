const mongoose = require('mongoose');

const UserArray = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    userID: {type : String, required : true},
    transactionID : [{type : String, required : false}],
    MentorBlogID: [{type : String, required : false}],
    ShareHoldingID: [{type : String, required : false}]
});

module.exports = mongoose.model('UserArray',UserArray);