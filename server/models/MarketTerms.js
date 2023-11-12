const mongoose = require('mongoose');

const MarketTerm = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    question: {type : String, required : true},
    answer: {type : String, required : true},
});

module.exports = mongoose.model('MarketTerm',MarketTerm);

//Rename this Model to FAQ after Some time