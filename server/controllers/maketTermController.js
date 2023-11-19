const MarketTerm = require('../models/MarketTerms.js');

const getAllFAQ = (req, res, next) => {
    MarketTerm.find()
        .select('question answer')
        .exec()
        .then(result => {
            res.status(200).json({
                data: result,
                custom: "FAQ fetched Successfully!!"
            })
        })
        .catch(err => {
            console.log("Error Fetching : " + err)
            res.status(403).json({
                custom: "Error in fetching FAQ"
            })
        })
}

module.exports = { getAllFAQ }