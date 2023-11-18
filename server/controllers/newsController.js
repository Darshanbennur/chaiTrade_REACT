const News = require('../models/News.js');

const getAllNews = (req, res, next) => {
    News.find()
        .select("image title headlines url")
        .exec()
        .then(result => {
            console.log("News Fetched")
            res.status(200).json({
                data : result,
                custom : "News Fetched Successfully!!"
            })
        })
        .catch(err => {
            console.log("Error in Fetching News")
        })
}

module.exports = { getAllNews };