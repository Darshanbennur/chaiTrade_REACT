const mongoose = require('mongoose');

const EducationalResources = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    title: {type : String, required : true},
    content: {type : String, required : true},
    link: {type : String, required : true},
});

module.exports = mongoose.model('EducationalResources',EducationalResources);