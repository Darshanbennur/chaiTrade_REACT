const mongoose = require('mongoose');

const StockBuying = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    stockID: {type : String, required : true},
    userID: {type : String, required : true},
    stockName: {type : String, required : true},
    purchasePrice: {type : Number, required : true},
    purchaseDate: {type : String, required : true},
    inPossesion: {type : Boolean, required : false},
});

module.exports = mongoose.model('StockBuying',StockBuying);