const mongoose = require('mongoose');

const Chart = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    chart_name: {type : String, required : true},
    chart_ltp: {type : Number, required : true},
    chart_change: {type : Number, required : true},
    chart_percentage: {type : String, required : true},
    type: {type : String, required : true},
});

module.exports = mongoose.model('Chart',Chart);