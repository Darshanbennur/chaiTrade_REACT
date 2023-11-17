const Mentor = require('../models/mentor');
const ArrayUSer = require('../models/UserArrays');
const mongoose = require('mongoose');

const postFeaturedSectionBlog = (req, res, next) => {
    const mentorID = req.body.mentorID;
    const mentorEmail = req.body.mentorEmail;
    const authorName = req.body.mentorName;
    const mentorImage = req.body.mentorImage;
    const contentTitle = req.body.title;
    const content = req.body.content;
    const mentorArrayID = req.body.arrayID;
    const datetime = new Date().toDateString();

    let submittedBlogId = "";
    const featuredSection = new Mentor({
        _id: new mongoose.Types.ObjectId(),
        mentorID: mentorID,
        mentorName: authorName,
        mentorImage: mentorImage,
        mentorEmail: mentorEmail,
        title: contentTitle,
        content: content,
        time: datetime
    })
    featuredSection
        .save()
        .then(result => {
            console.log("Featured Blog got posted : " + result)
            submittedBlogId = result._id;
            ArrayUSer.updateOne({ _id: new mongoose.Types.ObjectId(mentorArrayID) }, {
                $push: {
                    MentorBlogID: submittedBlogId
                }
            }).then(resultofFinding => {
                console.log("It is Pushed : " + resultofFinding)
            })
                .catch(ErrInFinding => {
                    console.log("Error in Pushing : " + ErrInFinding);
                    res.status(403).json({
                        custom: "Error in pushing in User Error"
                    })
                })
            res.status(200).json({
                custom: "Blog posted my Mentor Successfully!!"
            })
        })
        .catch(err => {
            console.log("Error Occured Posting the Blog : " + err);
            res.status(403).json({
                custom: "Error in posting blog by Mentor!!"
            })
        })
}

const getAllFeaturedBlogs = (req, res, next) => {
    Mentor.find()
        .exec()
        .then(result => {
            console.log("Successfully Fetched all Data : ")
            res.status(200)
                .json({
                    data: result,
                    custom: "All featured blogs fetched successfully!!"
                })
        })
        .catch(err => {
            console.log("Error Occured Fetching Data : " + err)
            res.status(403)
                .json({
                    custom: "Error in fetching all featured blogs"
                })
        })
}

const getAllMentorBlogs = async (req, res, next) => {
    let counter = 0;
    const allBlogs = [];
    const arrayID = req.body.arrayID

    await ArrayUSer.findOne({ _id: new mongoose.Types.ObjectId(arrayID) })
        .then(async result => {
            const arrayOfBlogs = result.MentorBlogID;
            const size = arrayOfBlogs.length;
            for (let index = 0; index < size; index++) {
                const mentorr = await Mentor.findOne({ _id: new mongoose.Types.ObjectId(arrayOfBlogs[index]) })
                if (mentorr) {
                    allBlogs.push(mentorr)
                    counter++;
                }
            }
            if (size == counter) {
                await res.status(200)
                    .json({
                        data: allBlogs,
                        custom: "All mentor blogs are fetched successfully!!"
                    })
                counter = 0;
            }
        })
        .catch(err => {
            console.log("getAllMentorBlogs error : " + err)
            res.status(403).json({
                custom: "Error in fetching all mentor blogs"
            })
        })
}

const LikeThisPost = (req, res, next) => {
    const blogID = req.body.blogID;
    const userID = req.body.userID;
    Mentor.findById(blogID)
        .then(blog => {
            console.log("Fetched The Blog : " + blog);
            const allLiked = blog.likedBy;
            const size = allLiked.length

            if (allLiked.includes(userID)) {
                for (let i = 0; i < size; i++) {
                    if (allLiked[i] === userID) {
                        let spliced = allLiked.splice(i, 1);
                    }
                }
            } else {
                allLiked.push(userID);
            }
            const blogger = new Mentor({
                likedBy: allLiked
            })
            Mentor.findByIdAndUpdate(blogID, blogger)
                .exec()
                .then(async resultOFArray => {
                    console.log("Updated the Array when exists : " + resultOFArray)
                    await res.status(200).json({
                        data : allLiked.length,
                        custom: "Updated the Array when exists"
                    })
                })
                .catch(errArray => {
                    console.log("Error in Updating Array : " + errArray)
                    res.status(403).json({
                        custom: "Error in Updating Array"
                    })
                })
        })
        .catch(errBlog => {
            console.log("Error in Fetching : " + errBlog);
            res.status(403).json({
                custom: "Error in Fetching"
            })
        })
}


module.exports = { postFeaturedSectionBlog, getAllFeaturedBlogs, getAllMentorBlogs, LikeThisPost };