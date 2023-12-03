const User = require('../models/User.js');
const StockBuy = require('../models/Stock_buying.js');
const ArrayUser = require('../models/UserArrays.js');
const Chart = require('../models/Chart.js');
const mongoose = require('mongoose');

const BuyTheStock = (req, res, next) => {
    const stockId = req.body.priceID; //Here I will get the id of the Stock
    //Caution in this part ahead on which to call

    const userCostInHand = req.body.costInHand;
    const userCostInvested = req.body.costInvested;
    // const userWallet = req.body.wallet;

    const userID = req.body._id;
    const userArrayID = req.body.arrayID;

    Chart.findOne({ _id: new mongoose.Types.ObjectId(stockId) })
        .then(result => {
            //Here I got all the Details about the Stock
            //Now to check if the User can Buy the Stock
            if (userCostInHand >= result.chart_ltp) {
                const newPurchase = new StockBuy({
                    _id: new mongoose.Types.ObjectId(),
                    stockID: stockId,
                    userID: userID,
                    stockName: result.chart_name,
                    purchasePrice: result.chart_ltp,
                    purchaseDate: new Date().toDateString(),
                    inPossesion: true
                })
                newPurchase
                    .save()
                    .then((resultOfPurchase) => {
                        ArrayUser.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(userArrayID) }, {
                            $push: { ShareHoldingID: resultOfPurchase._id }
                        })
                            .then(resultOfSavingInUserPurchase => { //Updating the User Here : 
                                console.log("Stock Saved in User Array : " + resultOfSavingInUserPurchase)

                                let tempCostInvested = userCostInvested;
                                let tempCostInHand = userCostInHand;

                                tempCostInvested = parseFloat(tempCostInvested);
                                tempCostInHand = parseFloat(tempCostInHand);

                                tempCostInvested += result.chart_ltp;
                                tempCostInHand -= result.chart_ltp;

                                const user = new User({
                                    costInHand: tempCostInHand,
                                    costInvested: tempCostInvested
                                })
                                User.updateOne({ _id: new mongoose.Types.ObjectId(userID) }, user)
                                    .then(result => {
                                        console.log("Stock Purchased Price Updated : " + result)
                                        res.status(200).json({
                                            custom: "Stock Purchased Successfully!!",
                                            metaCustom: "Stock Purchased Price Updated : " + result
                                        })
                                    })
                                    .catch(err => {
                                        console.log("Error in err123 : " + err);
                                        res.status(403).json({
                                            custom: "Error in err123 : " + err
                                        })
                                    })
                            })
                            .catch(errInStoringInUser => {
                                console.log("Error in Storing in User Array : " + errInStoringInUser)
                                res.status(403).json({
                                    custom: "Error in Storing in User Array : " + errInStoringInUser
                                })
                            })
                    })
                    .catch(errInPurchase => {
                        console.log("Error In Purchase : " + errInPurchase)
                        res.status(403).json({
                            custom: "Error In Purchase : " + errInPurchase
                        })
                    })
            }
            else {
                //Here then Write the Code for Cost Less in Hand (For now just redirect)
                console.log("Less Cash, Buy More Cash")
                res.status(403).json({
                    custom: "Insufficient Credits"
                })
            }
        })
        .catch(err => {
            console.log("Error Fetching the Stock : " + err)
            res.status(403).json({
                custom: "Error Fetching the Stock : " + err
            })
        })
}

const SellTheStock = async (req, res, next) => {
    const userID = req.body._id;
    
    const transactionID = req.body.transactionID; // To be fetched from all the transaction in Stock Buying
    // Will be used to make the inPosession as False when needed!!

    const purchaseValue = req.body.purchaseValue;
    //Will be fetched from Transactions Stock Buyings
    const currentValue = req.body.currentValue; // To be fetched from Charts!!
    //User things to be fetched!!
    const userCostInHand = req.body.costInHand;
    const userCostInvested = req.body.costInvested;
    const wallet = req.body.wallet;
    console.log("Request Body")
    console.log(req.body)
    let tempCostInHand = parseFloat(userCostInHand);
    let tempCostInvested = parseFloat(userCostInvested);
    let tempwallet = parseFloat(wallet);

    tempCostInHand += +(currentValue)
    tempCostInvested -= +(purchaseValue)
    tempwallet = tempCostInHand + tempCostInvested;

    const userCostUpdate = new User({
        costInHand: tempCostInHand,
        costInvested: tempCostInvested,
        wallet: tempwallet
    })

    await User.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(userID) }, userCostUpdate)
        .then(costUpdated => {
            console.log("The Cost after Selling : " + costUpdated)
        })
        .catch(costUpdateError => {
            console.log("Error in Updating Cost after Selling : " + costUpdateError)
        })
    const stockSell = new StockBuy({
        inPossesion: false,
        sellingPrice : +(currentValue),
        sellingDate : new Date().toDateString()
    })
    console.log("transactionID")
    console.log(transactionID)
    await StockBuy.updateOne({ _id: new mongoose.Types.ObjectId(transactionID) }, stockSell)
        .then(afterSelling => {
            console.log("The Stock is Sold : ")
            console.log(afterSelling);
            res.status(200).json({
                custom: "The Stock is Sold : " + afterSelling
            })
        })
        .catch(errorInSelling => {
            console.log("Error in Stock Selling : " + errorInSelling)
            res.status(403).json({
                custom: "Error in Stock Selling : " + errorInSelling
            })
        })
}

const getAlltheBoughtStocks = async (req, res, next) => {
    const userArrayID = req.body.arrayID;

    let counterForGettingStockId = 0;
    let counterForGettingStockDetails = 0;
    let stockIds = []
    let transactionStockDetails = []
    let stockDetails = []

    await ArrayUser.findOne({ _id: new mongoose.Types.ObjectId(userArrayID) })
        .then(async result => { // These are Transaction Id's
            const allTransactionId = result.ShareHoldingID;
            let sizeAllTransaction = allTransactionId.length
            console.log("The Size : " + sizeAllTransaction)
            for (let index = 0; index < sizeAllTransaction; index++) {
                const trans = await StockBuy.findOne({ _id: new mongoose.Types.ObjectId(allTransactionId[index]) })
                if (trans) {
                    stockIds.push(trans.stockID)
                    transactionStockDetails.push(trans)
                    counterForGettingStockId++;
                }
            }
            if (sizeAllTransaction == counterForGettingStockId) {
                counterForGettingStockId = 0;
                for (let index = 0; index < sizeAllTransaction; index++) {
                    const det = await Chart.findOne({ _id: new mongoose.Types.ObjectId(stockIds[index]) })
                    if (det) {
                        stockDetails.push(det);
                        counterForGettingStockDetails++;;
                    }
                }
                if (counterForGettingStockDetails == sizeAllTransaction) {
                    counterForGettingStockDetails = 0
                    console.log("Fetched Eveything Successfully!!")
                    res.status(200).json({
                        data: {
                            stockTransactionDetails: transactionStockDetails, // Stock Buying everything
                            stockDetails: stockDetails //Charts Page
                        },
                        custom: "All bought stocks are Fetched Successfully!!"
                    })
                    counterForGettingStockId = 0;
                    counterForGettingStockDetails = 0;
                    stockIds = []
                    transactionStockDetails = []
                    stockDetails = []
                }
            }
        })
        .catch(err => {
            console.log("Error in Finding the Stocks from User : " + err);
        })
}

module.exports = { BuyTheStock, SellTheStock, getAlltheBoughtStocks };