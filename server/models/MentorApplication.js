const mongoose = require('mongoose');

const MentorApplication = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    userID : {type : String, required : true},
    userName: {type : String, required : true},
    userEmail : {type : String, required : true},
    country: {type : String, required : true},
    tradingExperience: {type : String, required : true},
    tradingStrategy: {type : String, required : true},
    reasonMentor: {type : String, required : true},
    certificationPath : {type : String, required : true}
});

module.exports = mongoose.model('MentorApplication',MentorApplication);