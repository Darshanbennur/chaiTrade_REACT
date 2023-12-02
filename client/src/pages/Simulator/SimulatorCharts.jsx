//React refs:
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./simulator.css"
//User made refs:
import axios from "../../api/axiosConfig.js"
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { setUserCostInHand, setUserCostInvested } from "../../redux/userSlice.js"

export default function SimulatorCharts() {

    const dispatch = useDispatch();
    //Here all the listed Charts will be shown, Buying and Selling of the Stocks as well
    const [companyStock, setCompanyStock] = useState([]);
    const [commodityStock, setCommodityStock] = useState([]);
    const [forexStock, setForexStock] = useState([]);
    const [cryptoStock, setCryptoStock] = useState([]);

    useEffect(() => {
        console.log("Inside UseEffect!!")
        axios.get('/chart/getChartData').then((res) => {
            setCompanyStock(res.data.companyStock);
            setCommodityStock(res.data.commodityStock);
            setForexStock(res.data.forexStock);
            setCryptoStock(res.data.cryptoStock);
        })
    }, [])

    const reduxUserData = useSelector((state) => state.userData)
    function handleStockBuying(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        let priceofStock;
        let stockID;

        for (let [name, value] of formData.entries()) {
            if (name == "priceOfStock")
                priceofStock = value;
            if (name == "buyingStocknametag")
                stockID = value;
        }

        if (!priceofStock || !stockID) {
            toast.error('🦄 Data not Fetched', {
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
        else if (priceofStock > reduxUserData.currentUser.costInHand) {
            toast.error('💰 Not enough credits', {
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
            const userData = {
                priceID: stockID,
                costInHand: reduxUserData.currentUser.costInHand,
                costInvested: reduxUserData.currentUser.costInvested,
                _id: reduxUserData.currentUser._id,
                arrayID: reduxUserData.currentUser.arrayID
            }
            axios.post('/simulator/buyStock', userData).then(() => {

                let newUserCostInHand = reduxUserData.currentUser.costInHand - priceofStock
                dispatch(setUserCostInHand(newUserCostInHand));

                let newUserCostInvested = reduxUserData.currentUser.costInvested + priceofStock
                dispatch(setUserCostInvested(newUserCostInvested))

                toast.success('Stock Bought Successfully!!', {
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
                .catch(() => {
                    toast.error('Error in purchase!!', {
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
        }
    }

    return (
        <>
            <div style={{ marginTop: "10rem" }} className="charts-body">
                <h2 style={{marginTop : "-6rem"}} class="justcharts-heading">Simulator</h2>
                <div className='charts-container'>
                    <div className='charts-column'>
                        <div className='charts-card charts-card1'>
                            <div className="charts-sub-head" id="charts-sub">Companies</div>
                            <div className="charts-info-1">
                                <div className="charts-info-nameheading">Name</div>
                                <div className="changes charts-info1">LTP</div>
                                <div className="changes charts-info2">Change</div>
                                <div style={{ marginLeft: "4.8rem" }} className="changes charts-info3">%Change</div>
                                <div style={{ marginLeft: "6rem" }} className="charts-info3">Action</div>
                            </div>
                            {companyStock.map((item, index) => (
                                <div className="charts-info" key={`company-${index}`}>
                                    <div className="charts-info-name">
                                        {item.chart_name}
                                    </div>
                                    <div className="charts-info1">
                                        {item.chart_ltp}
                                    </div>
                                    <div className="charts-info2">
                                        {item.chart_change}
                                    </div>
                                    <div className="charts-info3">
                                        {item.chart_percentage}
                                    </div>

                                    <form onSubmit={handleStockBuying}>
                                        <input style={{ display: "none" }} name='priceOfStock' value={item.chart_ltp} />
                                        <input style={{ display: "none" }} name='buyingStocknametag' value={item._id} />
                                        <button
                                            value={item._id}
                                            type="submit"
                                            name="priceID"
                                            className="buyingButton"
                                            id={item.chart_name}>
                                            Buy
                                        </button>
                                    </form>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='charts-column'>
                        <div className='charts-card charts-card1'>
                            <div className="charts-sub-head" id="charts-sub">Commodities</div>
                            <div className="charts-info-1">
                                <div className="charts-info-nameheading">Name</div>
                                <div className="changes charts-info1">LTP</div>
                                <div className="changes charts-info2">Change</div>
                                <div style={{ marginLeft: "4.8rem" }} className="changes charts-info3">%Change</div>
                                <div style={{ marginLeft: "6rem" }} className="charts-info3">Action</div>
                            </div>
                            {commodityStock.map((item, index) => (
                                <div className="charts-info" key={`commodity-${index}`}>
                                    <div className="charts-info-name">
                                        {item.chart_name}
                                    </div>
                                    <div className="charts-info1">
                                        {item.chart_ltp}
                                    </div>
                                    <div className="charts-info2">
                                        {item.chart_change}
                                    </div>
                                    <div className="charts-info3">
                                        {item.chart_percentage}
                                    </div>
                                    <form onSubmit={handleStockBuying}>
                                        <input style={{ display: "none" }} name='priceOfStock' value={item.chart_ltp} />
                                        <input style={{ display: "none" }} name='buyingStocknametag' value={item._id} />
                                        <button
                                            value={item._id}
                                            type="submit"
                                            name="priceID"
                                            className="buyingButton"
                                            id="GOLD"
                                        >
                                            Buy
                                        </button>
                                    </form>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='charts-column'>
                        <div className='charts-card charts-card1'>
                            <div className="charts-sub-head" id="charts-sub">Forex</div>
                            <div className="charts-info-1">
                                <div className="charts-info-nameheading">Name</div>
                                <div className="changes charts-info1">LTP</div>
                                <div className="changes charts-info2">Change</div>
                                <div style={{ marginLeft: "4.8rem" }} className="changes charts-info3">%Change</div>
                                <div style={{ marginLeft: "6rem" }} className="charts-info3">Action</div>
                            </div>
                            {forexStock.map((item, index) => (
                                <div className="charts-info" key={`forex-${index}`}>
                                    <div className="charts-info-name">
                                        {item.chart_name}
                                    </div>
                                    <div className="charts-info1">
                                        {item.chart_ltp}
                                    </div>
                                    <div className="charts-info2">
                                        {item.chart_change}
                                    </div>
                                    <div className="charts-info3">
                                        {item.chart_percentage}
                                    </div>
                                    <form onSubmit={handleStockBuying}>
                                        <input style={{ display: "none" }} name='priceOfStock' value={item.chart_ltp} />
                                        <input style={{ display: "none" }} name='buyingStocknametag' value={item._id} />
                                        <button
                                            value={item._id}
                                            type="submit"
                                            name="priceID"
                                            className="buyingButton"
                                            id="GBUSD"
                                        >
                                            Buy
                                        </button>
                                    </form>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='charts-column'>
                        <div className='charts-card charts-card1'>
                            <div className="charts-sub-head" id="charts-sub">Crypto</div>
                            <div className="charts-info-1">
                                <div className="charts-info-nameheading">Name</div>
                                <div className="changes charts-info1">LTP</div>
                                <div className="changes charts-info2">Change</div>
                                <div style={{ marginLeft: "4.8rem" }} className="changes charts-info3">%Change</div>
                                <div style={{ marginLeft: "6rem" }} className="charts-info3">Action</div>
                            </div>
                            {cryptoStock.map((item, index) => (
                                <div className="charts-info" key={`crypto-${index}`}>
                                    <div className="charts-info-name">
                                        {item.chart_name}
                                    </div>
                                    <div className="charts-info1">
                                        {item.chart_ltp}
                                    </div>
                                    <div className="charts-info2">
                                        {item.chart_change}
                                    </div>
                                    <div className="charts-info3">
                                        {item.chart_percentage}
                                    </div>
                                    <form onSubmit={handleStockBuying}>
                                        <input style={{ display: "none" }} name='priceOfStock' value={item.chart_ltp} />
                                        <input style={{ display: "none" }} name='buyingStocknametag' value={item._id} />
                                        <button
                                            value={item._id}
                                            type="submit"
                                            name="priceID"
                                            className="buyingButton"
                                            id="ETHUSDT"
                                        >
                                            Buy
                                        </button>
                                    </form>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <h2 class="justcharts-heading">Share Holdings</h2>

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