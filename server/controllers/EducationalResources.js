const EducationalResources = require('../models/EducationResources.js')

const getAllResources = async(req, res, next) => {
    try{
        const result = await EducationalResources.find().exec()
        res.status(200).json({
            data: result,
            custom: "Fetched all data successfully!!"
        })
    } catch(err){
        res.status(403).json({
            custom: "Error in fetching educational resources"
        })
    }
}

module.exports = { getAllResources };