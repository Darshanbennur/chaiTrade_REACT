const mongoose = require('mongoose');

const StockBuying = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    stockID: {type : String, required : true},
    userID: {type : String, required : true},
    stockName: {type : String, required : true},
    purchasePrice: {type : Number, required : true},
    purchaseDate: {type : String, required : true},
    inPossesion: {type : Boolean, required : true},
    sellingPrice: {type : String, required : false}, //New One
    sellingDate: {type : String, required : false}, //New One
});

module.exports = mongoose.model('StockBuying',StockBuying);