import React, { useState, useEffect } from 'react';
import './pricing.css';
import { useSelector } from "react-redux";
import Footer from "../../components/Footer.jsx";
import charts from "../../images/charts.jpg"
import axios from "../../api/axiosConfig.js"
import { useDispatch } from "react-redux";
import { setPremium, setCostInCreditsWallet, setUserCostInHand } from "../../redux/userSlice.js"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function PricingPage() {

  const reduxData = useSelector((state) => state.userData);
  const isLoggedIn = reduxData.isUserloggedIn
  const isPremium = reduxData.isPremium

  const [faqData, setFaqData] = useState([
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers.",
    },
    {
      question: "Can I upgrade or downgrade my plan later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time.",
    },
    {
      question: "Is there a setup fee?",
      answer: "No, there is no setup fee. You only pay for the monthly or annual subscription fee.",
    },
    {
      question: "How does billing work?",
      answer: "Billing is done on a monthly or annual basis, depending on the plan you choose. You will be charged automatically at the beginning of each billing cycle.",
    },
    {
      question: "What features are included in each plan?",
      answer: "You can view a detailed list of features included in each plan on our pricing page.",
    },
    {
      question: "Are there any hidden fees or charges?",
      answer: "No, there are no hidden fees or charges. The price you see on the pricing page is the price you will pay.",
    },
  ]);

  const toggleFAQ = (index) => {
    setFaqData((prevData) => {
      const newData = [...prevData];
      newData[index].expanded = !newData[index].expanded;
      return newData;
    });
  };

  const reduxUserData = useSelector((state) => state.userData)
  const dispatch = useDispatch();

  function handlePremium(event) {
    event.preventDefault();
    const user = {
      _id: reduxUserData.currentUser._id,
      arrayID: reduxUserData.currentUser.arrayID
    }
    try {
      axios.post('/util/purchasePremium', user)
      dispatch(setPremium(true))
      toast.info('🥳 Premium purchased Successfully!!', {
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
    catch (e) {
      toast.error('🥲 Something went wrong!!', {
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
  }

  function handle20K(event) {
    event.preventDefault();
    const user = {
      _id: reduxUserData.currentUser._id,
      arrayID: reduxUserData.currentUser.arrayID,
      costInHand: reduxUserData.currentUser.costInHand,
      wallet: reduxUserData.currentUser.wallet
    }
    try {
      axios.post("/util/purchase20k", user).then(() => {
        let userInHandCost = +(reduxUserData.currentUser.costInHand) + 20000
        let userWallet = +(reduxUserData.currentUser.wallet) + 20000
        dispatch(setUserCostInHand(userInHandCost));
        dispatch(setCostInCreditsWallet(userWallet));
      })

      window.location.href = "/transactions"
    }
    catch (e) {
      toast.error('Something went wrong, Try Again!!', {
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
  }

  function handle40k(event) {
    event.preventDefault();
    const user = {
      _id: reduxUserData.currentUser._id,
      arrayID: reduxUserData.currentUser.arrayID,
      costInHand: reduxUserData.currentUser.costInHand,
      wallet: reduxUserData.currentUser.wallet
    }
    try {
      axios.post("/util/purchase40k", user).then(() => {
        let userInHandCost = +(reduxUserData.currentUser.costInHand) + 40000
        let userWallet = +(reduxUserData.currentUser.wallet) + 40000
        dispatch(setUserCostInHand(userInHandCost));
        dispatch(setCostInCreditsWallet(userWallet));
      })
      window.location.href = "/transactions"
    }
    catch (e) {
      toast.error('Something went wrong, Try Again!!', {
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
  }

  return (
    <>
      <body className='bodyPage'>

        {isLoggedIn && (
          <>
            <div className="backpic">
              <img src={charts} alt="background" className="backgroundpic" />
            </div>
            <div className="pricing-container">
              <div className="pricing-header">
                <h1>"You get what you pay for."</h1>
              </div>

              <div className="pricing-tiers">
                {!isPremium && (
                  <div className="pricing-tier basic">
                    <h2>Mentor Guidance</h2>
                    <hr />
                    <ul className="pricing-features">
                      <li>Limited access to Featured Section</li>
                      <li>Limited access to real-time market data</li>
                      <li>Limited customer support</li>
                    </ul>
                    <form onSubmit={handlePremium}>
                      <a className="cta-button"><button type="submit" className="pricing_butt">$30</button></a>
                    </form>
                  </div>
                )}

                <div className="pricing-tier pro">
                  <h2>Simulator Pro</h2>
                  <hr />
                  <ul className="pricing-features">
                    <li>Access to advanced trading tools and charts</li>
                    <li>Get 20,000 (INR)</li>
                    <li>Reduced commission fees</li>
                  </ul>
                  <form onSubmit={handle20K}>
                    <a className="cta-button"><button type="submit" className="pricing_butt">$50</button></a>
                  </form>
                </div>

                <div className="pricing-tier premium">
                  <h2>Simulator Premium</h2>
                  <hr />
                  <ul className="pricing-features">
                    <li>Access to advanced trading tools and charts</li>
                    <li>Get 50,000 (INR)</li>
                    <li>Reduced commission fees</li>
                  </ul>
                  <form onSubmit={handle40k}>
                    <a className="cta-button"><button type="submit" className="pricing_butt">$100</button></a>
                  </form>
                </div>
              </div>

              <div className="pricing-faq">
                <div className="faq-container">
                  <h1 className="faq-heading">Frequently Asked Questions</h1>
                  <div id="faq-list">
                    {faqData.map((data, index) => (
                      <div key={index}>
                        <button className={`faq-page`} onClick={() => toggleFAQ(index)}>
                          {data.question}
                        </button>
                        <div className="faq-body" style={{ display: data.expanded ? 'block' : 'none' }}>
                          <p>{data.answer}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </body>
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
      {/* Same as */}
      <ToastContainer />
      <Footer />
    </>
  );
};
