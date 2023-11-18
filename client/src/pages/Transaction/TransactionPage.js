import React, { useEffect, useState } from 'react';
import './transaction.css';
import chartsBackground from '../../images/charts.jpg';
import axios from "../../api/axiosConfig.js"
import { useSelector } from "react-redux";
import Footer from '../../components/Footer.jsx';

const MyBlog_backgroundPicStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: -1,
  objectFit: 'cover',
};

export default function TransactionPage() {
  const [transactions, setTransactions] = useState([]);

  const reduxStoreData = useSelector((state) => state.userData)

  const userArrayID = {
    arrayID: reduxStoreData.currentUser.arrayID
  }
  useEffect(() => {
    axios.post('/util/getAllTransaction', userArrayID).then((res) => setTransactions(res.data.data))
  }, []);

  return (
    <>
      <body style={{ margin: 0, padding: 0 }}>
        <div className="background-container" style={{
          backgroundImage: `url(${chartsBackground})`,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}>

        </div>
        <div className="transactions-container" style={{ paddingTop: '50px', boxSizing: 'border-box' }}>
          <div className="applications_cards-heading">
            <h1 className="appliation_card-mainheading">Payment History</h1>
            <h3 className="application_sub_heading_p">Here are all the plans purchased by you:</h3>
          </div>
          <div className="parent" style={{ marginBottom: "130px", marginLeft : "60px" }}>
            {transactions.map((transaction) => (
              <div key={transaction._id} className="container1234">
                <div id="payment-cards-container">
                  <div className="card payment_history-card" style={{padding : "25px 40px"}}>
                    <div className="paymenthistory_card-content">
                      <h3>
                        {transaction.typeOfTransaction} : 
                        &nbsp;<span style={{fontSize : "15px", fontWeight : "500", color : "purple"}}>Ref No: {transaction._id}</span>
                      </h3>
                      <p style={{fontWeight : "600", color : "#0b5245"}}>Chai Trade Exchange</p>
                    </div>
                    <div className="purchase-container">
                      <p style={{margin : "8px 0px"}}>Service purchased : <span className="application_date" style={{marginLeft : "22px", marginTop : "10px"}}>{transaction.Date}</span></p>
                      <p style={{margin : "8px 0px"}}>Service Amount : <span className="amount" style={{marginLeft : "40px"}}>${transaction.amount}</span></p>
                    </div>
                    <div className="date-container">
                      <p style={{margin : "8px 0px"}}>Type of Purchase: <span className="application_date" style={{marginLeft : "32px"}}>{transaction.typeOfTransaction}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </body>
      <Footer/>
    </>
  );
};