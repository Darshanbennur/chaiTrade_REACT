const mongoose = require('mongoose');

const Transaction = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    userID : {type : String, required : true},
    amount : {type : Number, required : true},
    Date : {type : String, required : true},
    typeOfTransaction : {type : String, required : true}
});

module.exports = mongoose.model('Transaction',Transaction);