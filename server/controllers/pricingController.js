const User = require('../models/User');
const Transaction = require('../models/Transaction.js');
const ArrayUSer = require('../models/UserArrays');
const ContactUs = require('../models/ContactUs.js');
const mongoose = require('mongoose');

const getAllTransaction = (req, res, next) => {
    let allTransArray = []
    let counter = 0;
    const arrayID = req.body.arrayID;
    console.log(arrayID);
    ArrayUSer.findById(arrayID)
        .then(async gotArray => {
            console.log("Fetched the Array : " + gotArray)
            const transID = gotArray.transactionID;
            const size = transID.length

            for (let index = 0; index < size; index++) {
                const tran123 = await Transaction.findById(transID[index])
                if (tran123) {
                    console.log("Transaction : " + tran123)
                    allTransArray.push(tran123)
                    counter++;
                }
            }
            if (counter == size) {
                res.json({
                    data: allTransArray,
                    custom: "Fetched all transaction Successfully"
                })
                counter = 0;
                allTransArray = [];
            }
        })
        .catch(err => {
            console.log("Error in Fetching the Array : " + err)
        })
}

const increase20K = (req, res, next) => {
    const userID = req.body._id;
    const arrayID = req.body.arrayID;
    const costInHand = req.body.costInHand;
    const wall = req.body.wallet;

    const trans = new Transaction({
        _id: new mongoose.Types.ObjectId(),
        userID: userID,
        amount: 50,
        Date: new Date().toDateString(),
        typeOfTransaction: "Simulator Pro"
    })
    trans
        .save()
        .then(savedToTransaction => {
            console.log("Saved in Transaction : " + savedToTransaction);
            ArrayUSer.findByIdAndUpdate(arrayID, {
                $push: {
                    transactionID: savedToTransaction._id
                }
            })
                .then(savedtoArray => {
                    console.log("Saved to Transaction Array : " + savedtoArray);
                    const user = new User({
                        costInHand: 20000 + costInHand,
                        wallet: 20000 + wall
                    })
                    User.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(userID) }, user)
                        .then(result => {
                            res.status(200).json({
                                custom: "User data Updated!!"
                            })
                        })
                        .catch(err => {
                            res.status(403).json({
                                custom: "Error Increasing 20,000 Credits" + err
                            })
                        })
                })
                .catch(errinArray => {
                    res.status(403).json({
                        custom: "Error in Storing in Array : " + errinArray
                    })
                })
        })
        .catch(errInTransaction => {
            res.status(403).json({
                custom: "Error in Saving Transactions : " + errInTransaction
            })
        })
}

const increase40K = (req, res, next) => {

    const userID = req.body._id;
    const arrayID = req.body.arrayID;
    const costInHand = req.body.costInHand;
    const wall = req.body.wallet;

    const trans = new Transaction({
        _id: new mongoose.Types.ObjectId(),
        userID: userID,
        amount: 100,
        Date: new Date().toDateString(),
        typeOfTransaction: "Simulator Premium"
    })
    trans
        .save()
        .then(savedToTransaction => {
            console.log("Saved in Transaction : " + savedToTransaction);
            ArrayUSer.findByIdAndUpdate(arrayID, {
                $push: {
                    transactionID: savedToTransaction._id
                }
            })
                .then(savedtoArray => {
                    console.log("Saved to Transaction Array : " + savedtoArray);
                    const user = new User({
                        costInHand: 40000 + costInHand,
                        wallet: 40000 + wall
                    })
                    User.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(userID) }, user)
                        .then(result => {
                            res.status(200).json({
                                custom : "User data Updated!!"
                            })
                        })
                        .catch(err => {
                            res.status(403).json({
                                custom : "Error Increasing 40,000 Credits"
                            })
                        })
                })
                .catch(errinArray => {
                    res.status(403).json({
                        custom : "Error in Storing in Array : " + errinArray
                    })
                })
        })
        .catch(errInTransaction => {
            res.status(403).json({
                custom : "Error in Saving Transactions : " + errInTransaction
            })
        })
}

const makeUserPremium = (req, res, next) => {
    const userID = req.body._id;
    const arrayID = req.body.arrayID;

    const trans = new Transaction({
        _id: new mongoose.Types.ObjectId(),
        userID: userID,
        amount: 30,
        Date: new Date().toDateString(),
        typeOfTransaction: "Premium Purchase"
    })
    trans
        .save()
        .then(savedToTransaction => {
            console.log("Saved in Transaction : " + savedToTransaction);
            ArrayUSer.findByIdAndUpdate(arrayID, {
                $push: {
                    transactionID: savedToTransaction._id
                }
            })
                .then(savedtoArray => {
                    console.log("Saved to Transaction Array : " + savedtoArray);
                    const user = new User({
                        isPremium: true
                    })
                    User.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(userID) }, user)
                        .then(result => {
                            res.status(200).json({
                                custom : "User Premium Enabled!!"
                            })
                        })
                        .catch(err => {
                            res.status(403).json({
                                custom : "Error making user Premium"
                            })
                        })
                })
                .catch(errinArray => {
                    res.status(403).json({
                        custom : "Error in Storing in Array : " + errinArray
                    })
                })
        })
        .catch(errInTransaction => {
            res.status(403).json({
                custom : "Error in Saving Transactions : " + errInTransaction
            })
        })
}

const postContactUs = (req, res, next) => {
    const name= req.body.authorName;
    const email = req.body.email;
    const title = req.body.title;
    const content = req.body.content;

    const contactUs = new ContactUs({
        _id: new mongoose.Types.ObjectId(),
        authorName : name,
        email : email,
        title : title,
        content : content
    })
    contactUs
        .save()
        .then(result => {
            console.log("The Feedback was Sent : " + result);
            res.status(200).json({
                custom : "The Feedback was Sent"
            })
        })
        .catch(err => {
            console.log("Error occured while Sending Feedback : " + err)
            res.status(403).json({
                custom : "Error occured while Sending Feedback "
            })
        })
}



module.exports = { getAllTransaction, increase20K, increase40K, makeUserPremium, postContactUs }