const User = require('../models/User');
const ArrayUSer = require('../Models/UserArrays');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const getUserDetails = async (req, res) => {
    const users = await User.findById(req.params.id)
    res.json(users)
        .status(200);
}

const verifyCookie = async (req, res, next) => {
    console.log(req.cookies)
    const booleanCookie = req.cookies.isLoggedIn;
    if(booleanCookie === "true"){
        const users = await User.findById(req.cookies.userID)
        return res.json(users)
            .status(200)
    } else {
        return res.json("NULL")
    }
}

const userRegister = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    var passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/

    if (!name || !email || !password) 
        res.status(403).json("Empty fields are invalid") // 403 - for FrontEnd Validations
    else if (!email.match(mailformat)) 
        res.status(403).json("Email field is invalid")
    else if (!password.match(passwordFormat))
        res.status(403).json("Password field is invalid")
    else {
        User.find({ email: email })
            .exec()
            .then(user => {
                if (user.length >= 1)
                    res.status(405).json("User Not Found") // 405 - for User Not found
                else {
                    bcrypt.hash(req.body.password, 10, (err, hash) => {
                        if (err) {
                            res.status(505).json({
                                custom : "Database Error Occured", // 505 - Encrypting Error
                                error : err
                            })
                        } else {
                            const user = new User({
                                _id: new mongoose.Types.ObjectId(),
                                email: req.body.email,
                                userName: req.body.name,
                                password: hash,
                                isMentor: false,
                                isAdmin: false,
                                isPremium: false,
                                costInHand: 5000,
                                costInvested: 0,
                                wallet: 5000
                            });
                            user.save().then(async result => {
                                    const arrayUser = new ArrayUSer({
                                        _id : new mongoose.Types.ObjectId(),
                                        userID : result._id,
                                    })
                                    await arrayUser.save()
                                        .then(resultOFArray => {
                                            console.log("User Array Created : " + resultOFArray);
                                            const userUpdate = new User({
                                                arrayID : resultOFArray._id
                                            })
                                            User.updateOne({ _id: new mongoose.Types.ObjectId(result._id)}, userUpdate)
                                                .then(finalUserDetails => {
                                                    console.log("Final Details : " + finalUserDetails)
                                                    res.status(200).json({
                                                        custom : "User Registered Successfully", // 200 - Successfully Registered
                                                        userDetails : finalUserDetails
                                                    }) 
                                                })
                                                .catch(arrayIDError => {
                                                    console.log("Array ID Error : " + arrayIDError)
                                                })
                                        })
                                        .catch(someError => {
                                            console.log("Error in Array User Creation : "  + someError);
                                            res.status(500).json({
                                                custom : "Error in Registration of User", // 501 - Error storing of user in Database.
                                                error : someError
                                            })
                                        })
                                })
                                .catch(err => {
                                    console.log(err)
                                    res.status(500).json({
                                        custom : "Database Error Occured", // 500 - Error in registration of User
                                        error : err 
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
                    if(!done){
                        res.status(401).json("Database Error") // 505 - Encrypting Error
                        console.log("Invalid Syntax!!!!!!!!!");
                    }
                    else{
                        res.cookie('isLoggedIn',"true", { maxAge: 900000, httpOnly: true });
                        res.cookie('userID',result[0]._id, { maxAge: 900000, httpOnly: true });
                        res.status(200).json({
                            user : result[0],
                            custom : "User Logged in Successfully"
                        }) // 200 - User Logged In
                    }
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    custom : "User invalid credentials",
                    error : err
                })
            })
    }
}



module.exports = { getUserDetails, userRegister, userLogin, verifyCookie };