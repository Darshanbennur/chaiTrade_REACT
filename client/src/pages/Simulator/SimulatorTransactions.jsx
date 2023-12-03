//React refs:
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";

//User made refs:
import axios from "../../api/axiosConfig.js"
import image from "../../images/newwordCoin4.png"
import { setUserCostInHand, setUserCostInvested, setCostInCreditsWallet } from "../../redux/userSlice.js"

const cardStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    width: '50%',
    marginBottom: "3rem",
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-repeat',
    opacity: 0.8,
    objectFit: 'cover',
};

const overlayStyle = {
    position: 'absolute',
    width: '25%',
};

const partStyle = {
    flex: 1,
    padding: '20px',
    border: '1px solid #ccc',
    position: 'relative',
    zIndex: 1,
};

const firstdiv = {
    flex: '0 0 2%',
    border: '1px solid #ccc',
    position: 'relative',
    zIndex: 1,
};

const secondDiv = {
    flex: '0 0 50%',
    margin: '10px',
    position: 'relative',
    zIndex: 1,
};

const thirddiv = {
    flex: '0 0 5%',
    position: 'relative',
    zIndex: 1,
};

const headingStyle = {
    transform: 'rotate(-90deg)',
    fontWeight: '500',
    fontSize: '23px',
    marginTop: '70px'
};

const subHeadingStyle = {
    fontWeight: 'bold',
    fontSize: '20px',
    marginTop: '10px',
    marginBottom: '10px',
};

const hrStyle = {
    margin: '10px 0',
    border: '0',
    borderTop: '1px solid #ccc',
};

const buttonStyle = {
    marginTop: '10px',
    padding: '10px',
    margin: '10px',
    width: "60px",
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
};

const containerCardStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10rem",
}

export default function SimulatorTransactions() {

    const reduxUserData = useSelector((state) => state.userData)
    const dispatch = useDispatch();
    const [userTransactions, setUserTransactions] = useState([]);
    const [stockDetails, setStockDetails] = useState([]);

    function handleSellingStock(event) {
        event.preventDefault();
        const userID = reduxUserData.currentUser._id;

        const userInHand = reduxUserData.currentUser.costInHand;
        const userCostInvested = reduxUserData.currentUser.costInvested;
        const userWallet = reduxUserData.currentUser.wallet;

        const formData = new FormData(event.target);
        let transID;
        let purchaseVal;
        let currVall;
        for (let [name, value] of formData.entries()) {
            if (name == "transactionID")
                transID = value;
            if (name == "purchaseValue")
                purchaseVal = value;
            if (name == "currentValue")
                currVall = value;
        }
        console.log(formData.entries())
        if (!transID || !purchaseVal || !currVall) {
            console.log(transID);
            console.log(purchaseVal);
            console.log(currVall);
            toast.error('🥲 Data not Fetched', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            const finalUserData = {
                _id: userID,
                costInHand: userInHand,
                costInvested: userCostInvested,
                wallet: userWallet,
                transactionID: transID,
                purchaseValue: +(purchaseVal),
                currentValue: +(currVall)
            }
            console.log("Final User Data : ")
            console.log(finalUserData)
            let tempCostInHand = +(reduxUserData.currentUser.costInHand) + +(currVall);
            let tempCostInvested = +(reduxUserData.currentUser.costInvested) - +(purchaseVal);
            let tempWallet = +(tempCostInHand) + +(tempCostInvested)

            axios.post('/simulator/sellStock', finalUserData).then(() => {
                toast.success('🥳 Stock Sold Successfully!!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            }).catch(() => {
                toast.error('Error In Buying!!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })

            dispatch(setUserCostInHand(tempCostInHand));
            dispatch(setUserCostInvested(tempCostInvested));
            dispatch(setCostInCreditsWallet(tempWallet));
        }

    }

    useEffect(() => {
        const userArrayID = {
            arrayID: reduxUserData.currentUser.arrayID
        }
        axios.post('/simulator/getAllBoughtStocks', userArrayID).then((res) => {
            setUserTransactions(res.data.data.stockTransactionDetails);
            setStockDetails(res.data.data.stockDetails);
        })
    }, [])

    return (
        <>
            <div style={containerCardStyle}>
                {userTransactions.map((item, index) => (
                    <div style={cardStyle}>
                        <div style={{ ...overlayStyle }}></div>

                        <div style={firstdiv}>
                            {item.inPossesion && <div style={headingStyle}>BOUGHT</div>}
                            {!item.inPossesion && <div style={headingStyle}>SOLD</div>}
                        </div>

                        <div style={secondDiv}>
                            <div style={subHeadingStyle}>Chai Trade Exchange</div>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
                                    <div style={{ fontWeight: "bold" }}>{stockDetails[index].chart_name}</div>
                                    <div>Current Price: $<span style={{ fontWeight: "bold" }}>{stockDetails[index].chart_ltp}</span></div>
                                </div>
                                <hr style={hrStyle} />
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingLeft: '5px' }}>
                                    <div style={{ flexDirection: 'column' }}>
                                        <div style={{ marginBottom: '5px' }}>Purchased Date:</div>
                                        <div style={{ marginTop: '5px', fontWeight: "bold" }}>{item.purchaseDate}</div>
                                    </div>
                                    <div style={{ flexDirection: 'column' }}>
                                        <div style={{ marginBottom: '5px' }}>Purchased Price:</div>
                                        <div style={{ marginTop: '5px', fontWeight: "bold" }}>${item.purchasePrice}</div>
                                    </div>
                                    {item.inPossesion && <form onSubmit={handleSellingStock}>
                                        <input style={{ display: "none" }} name='transactionID' value={item._id} />
                                        <input style={{ display: "none" }} name='purchaseValue' value={item.purchasePrice} />
                                        <input style={{ display: "none" }} name='currentValue' value={stockDetails[index].chart_ltp} />
                                        <button type='submit' style={buttonStyle}>Sell</button>
                                    </form>}
                                </div>
                            </div>
                        </div>

                        <div style={{ ...partStyle, borderRight: '1px solid #ccc' }}>
                            <div style={thirddiv}>
                                <div style={subHeadingStyle}>Chai Trade Exchange</div>
                                {!item.inPossesion && <div>
                                    <div style={{marginBottom : "5px"}}>Sold Price: $<span style={{ fontWeight: "bold" }}>{(item.sellingPrice).toFixed(3)}</span></div>
                                    <div style={{marginBottom : "5px"}}>P & L Price : $<span style={{ fontWeight: "bold" }}>{(item.sellingPrice - item.purchasePrice).toFixed(3)}</span></div>
                                    <div style={{marginBottom : "5px"}}>P & L% : <span style={{ fontWeight: "bold" }}>{(((item.sellingPrice - item.purchasePrice) / item.purchasePrice) * 100).toFixed(3)}</span>%</div>
                                    <div style={{marginBottom : "5px"}}>Sold Date: <span style={{ fontWeight: "bold" }}>{item.sellingDate}</span></div>
                                </div>}
                                {item.inPossesion && <div>
                                    <div style={{ margin: "1rem 0rem" }}>P & L Price : $<span style={{ fontWeight: "bold" }}>{(stockDetails[index].chart_ltp - item.purchasePrice).toFixed(3)}</span></div>
                                    <div>P & L% : <span style={{ fontWeight: "bold" }}>{(((stockDetails[index].chart_ltp - item.purchasePrice) / item.purchasePrice) * 100).toFixed(3)}%</span></div>
                                </div>}
                            </div>
                        </div>

                    </div>
                ))}
            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ToastContainer />
        </>
    );
}