const Transaction = require('../models/Transaction.js');
const ArrayUSer = require('../models/UserArrays');

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
                    data : allTransArray,
                    custom : "Fetched all transaction Successfully"
                })
                counter = 0;
                allTransArray = [];
            }
        })
        .catch(err => {
            console.log("Error in Fetching the Array : " + err)
        })
}

module.exports = { getAllTransaction }