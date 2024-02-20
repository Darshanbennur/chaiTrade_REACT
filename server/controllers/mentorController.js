const Mentor = require('../models/mentor');
const ArrayUSer = require('../models/UserArrays');
const MentorApplication = require('../models/MentorApplication.js');
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
    try {
        const arrayID = req.body.arrayID;
        const user = await ArrayUSer.findOne({ _id: new mongoose.Types.ObjectId(arrayID) });

        if (!user) {
            return res.status(404)
                .json({
                    custom: 'User not found'
                });
        }

        const arrayOfBlogs = user.MentorBlogID || [];
        const allBlogs = [];

        for (const blogId of arrayOfBlogs) {
            const mentor = await Mentor.findOne({ _id: new mongoose.Types.ObjectId(blogId) });

            if (mentor) {
                allBlogs.push(mentor);
            }
        }

        res.status(200)
            .json({
                data: allBlogs,
                custom: 'All mentor blogs are fetched successfully!!'
            });
    }
    catch (err) {
        console.log('getAllMentorBlogs error:', err);
        res.status(500)
            .json({
                custom: 'Error in fetching all mentor blogs'
            });
    }
};

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
                        data: allLiked.length,
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

const postMentorApplication = (req, res, next) => {

    const application = new MentorApplication({
        _id: new mongoose.Types.ObjectId(),
        userID: req.body.userID,
        userName: req.body.userName,
        userEmail: req.body.email,
        country: req.body.country,
        tradingExperience: req.body.tradingExperience,
        tradingStrategy: req.body.tradingStrategy,
        reasonMentor: req.body.reasonMentor,
        certificationPath: req.body.certificationPath
    })
    application
        .save()
        .then(result => {
            res.status(200).json({
                custom: "The Mentor Application was submitted Successfully"
            })
            console.log("The Mentor Application was submitted Successfully")
        })
        .catch(err => {
            res.status(403).json({
                custom: "Mentor Application Process Denied"
            })
            console.log("Mentor Application Process Denied")
        })
}

const getMentorBlogDatesAndLikes = async (req, res, next) => {
    console.log("Entered")
    const arrayID = req.body.arrayID;
    const userArrayInstance = await ArrayUSer.findOne({ _id: new mongoose.Types.ObjectId(arrayID) });

    if (!userArrayInstance) {
        return res.status(404)
            .json({
                custom: 'User Array Instance not found'
            });
    }

    const arrayOfBlogs = userArrayInstance.MentorBlogID || [];
    const allBlogs = [];

    for (const blogId of arrayOfBlogs) {
        const mentor = await Mentor.findOne({ _id: new mongoose.Types.ObjectId(blogId) });

        if (mentor) {
            allBlogs.push(mentor);
        }
    }

    const blogDateWithLikes = []
    for (let index = 0; index < allBlogs.length; index++) {
        const blogDate = new Date(allBlogs[index].time);
        const month = blogDate.toLocaleString('en-us', { month: 'short' });

        const body = {
            date: `${month}`,
            likes: allBlogs[index].likedBy.length
        }
        blogDateWithLikes.push(body)
    }

    res.status(200).json({
        data: blogDateWithLikes,
        custom: "Fetched all blog timing and likes"
    })
}




module.exports = { postFeaturedSectionBlog, getAllFeaturedBlogs, getAllMentorBlogs, LikeThisPost, postMentorApplication, getMentorBlogDatesAndLikes };