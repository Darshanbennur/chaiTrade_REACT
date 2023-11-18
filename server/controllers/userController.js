const User = require('../models/User');
const ArrayUSer = require('../models/UserArrays');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const getUserDetails = async (req, res) => {
    const users = await User.findById(req.params.id)
    res.json(users)
        .status(200);
}

const verifyCookie = async (req, res, next) => {
    const booleanCookie = req.cookies.isLoggedIn;
    console.log(booleanCookie)
    if (booleanCookie === "true") {
        const users = await User.findById(req.cookies.userID)
        return res.json({
            custom: "true",
            userData: users
        }).status(200)
    }
    else {
        return res.json({
            custom: "false"
        })
    }
}

const logoutUser = async (req, res, next) => {
    try {
        console.log("Entered Logout Function!!")
        res.clearCookie('userID');
        res.cookie('isLoggedIn', false);
        res.status(200).json({
            custom : "User Logged Out!!"
        })
    } catch(e){
        console.log("Error faced");
        console.log(e);
        res.status(403).json({
            custom : "Error in Logging Out"
        })
    }
}

const userRegister = (req, res, next) => {
    const name = req.body.userName;
    const email = req.body.email;
    const password = req.body.password;

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    var passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

    if (!name || !email || !password) {
        res.status(403).json({
            custom: "Empty fields are invalid"
        }) // 403 - for FrontEnd Validations
    }
    else if (!email.match(mailformat)) {
        res.status(403).json({
            custom: "Email field is invalid"
        })
    }
    else if (!password.match(passwordFormat)) {
        res.status(403).json({
            custom: "Password field is invalid"
        })
    }
    else {
        User.find({ email: email })
            .exec()
            .then(user => {
                if (user.length >= 1) {
                    res.status(405).json({
                        custom: "User already Exists"
                    }) // 405 - User already Exists
                }
                else {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            res.status(505).json({
                                custom: "Database Error Occured", // 505 - Encrypting Error
                                error: err
                            })
                        } else {
                            const x = Math.floor((Math.random() * 10) % 8 + 1);
                            const avatar = "https://bootdey.com/img/Content/avatar/avatar" + x + ".png";
                            const user = new User({
                                _id: new mongoose.Types.ObjectId(),
                                email: email,
                                userName: name,
                                password: hash,
                                profileImage : avatar,
                                education : "",
                                countryCode : "",
                                phoneNumber : 0,
                                income : 0,
                                incomeType : "",
                                isMentor: false,
                                isAdmin: false,
                                isPremium: false,
                                costInHand: 5000,
                                costInvested: 0,
                                wallet: 5000
                            });
                            user.save()
                                .then(async result => {
                                    const arrayUser = new ArrayUSer({
                                        _id: new mongoose.Types.ObjectId(),
                                        userID: result._id,
                                    })
                                    await arrayUser.save()
                                        .then(resultOFArray => {
                                            console.log("User Array Created : " + resultOFArray);
                                            const userUpdate = new User({
                                                arrayID: resultOFArray._id
                                            })
                                            User.updateOne({ _id: new mongoose.Types.ObjectId(result._id) }, userUpdate)
                                                .then(finalUserDetails => {
                                                    console.log("Final Details : ")
                                                    console.log(finalUserDetails)
                                                    res.status(200).json({
                                                        custom: "User Registered Successfully", // 200 - Successfully Registered
                                                        userDetails: finalUserDetails
                                                    })

                                                })
                                                .catch(arrayIDError => {
                                                    console.log("Array ID Error : " + arrayIDError)
                                                })
                                        })
                                        .catch(someError => {
                                            console.log("Error in Array User Creation : " + someError);
                                            res.status(500).json({
                                                custom: "Error in Registration of User", // 501 - Error storing of user in Database.
                                                error: someError
                                            })
                                        })
                                })
                                .catch(err => {
                                    console.log(err)
                                    res.status(500).json({
                                        custom: "Database Error Occured", // 500 - Error in registration of User
                                        error: err
                                    })
                                })
                        }
                    })
                }
            })
    }
}

const userLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (!email || !password)
        res.status(403).json("Empty values are Invalid")
    else if (!email.match(emailFormat))
        res.status(403).json("Empty Email values are Invalid")
    else {
        User.find({ email: req.body.email })
            .exec()
            .then(result => {
                if (result.length < 1) {
                    res.status(403).json("User not Found") // 403 - User not Found in Database
                }
                bcrypt.compare(req.body.password, result[0].password, (err, done) => {
                    if (err)
                        console.log("Error");
                    if (!done) {
                        res.status(401).json("Database Error") // 505 - Encrypting Error
                        console.log("Invalid Syntax!!!!!!!!!");
                    }
                    else {
                        res.cookie('isLoggedIn', "true", {httpOnly: true });
                        res.cookie('userID', result[0]._id, {httpOnly: true });
                        res.status(200).json({
                            user: result[0],
                            custom: "User Logged in Successfully"
                        }) // 200 - User Logged In
                    }
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    custom: "User invalid credentials",
                    error: err
                })
            })
    }
}

const makeChanges = (req, res, next) => {
    const user = new User({
        userName: req.body.userName,
        education: req.body.education,
        countryCode: req.body.countryCode,
        phoneNumber: req.body.phoneNumber,
        profileImage: req.body.profileImage,
        income: req.body.income,
        incomeType: req.body.incomeType,
    });
    User.findOneAndUpdate({ email: req.body.email }, user)
        .then(result => {
            console.log("User Updated : " + result.userName);
            res.status(200).json({
                custom : "User Profile Updated Successfully"
            })
        })
        .catch(err => {
            console.log("Error Updating the User : " + err)
            res.status(403).json({
                custom : "Error in updating the values in Profile"
            })
        })
}



module.exports = { getUserDetails, userRegister, userLogin, verifyCookie, logoutUser, makeChanges };