const MarketTerm = require('../models/MarketTerms.js');

const getAllFAQ = async (req, res, next) => {
    try {
        const result = await MarketTerm.find()
            .select('question answer')
            .exec();

        res.status(200)
            .json({
                data: result,
                custom: "FAQ fetched Successfully!!"
            });
    } catch (err) {
        console.log("Error Fetching:", err);
        res.status(403)
            .json({
                custom: "Error in fetching FAQ"
            });
    }
};

module.exports = { getAllFAQ }