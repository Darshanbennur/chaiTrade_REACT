import React, { useState, useEffect } from 'react';
import './pricing.css';
import { useSelector } from "react-redux";
import Footer from "../../components/Footer.jsx";

//Too many changes to be done in this page yet!!

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

  const expand = (index) => {
    setFaqData((prevData) => {
      const newData = [...prevData];
      newData[index].expanded = !newData[index].expanded;
      return newData;
    });
  };

  return (
    <>
      <body className='bodyPage'>
        {isLoggedIn && (
          <div className="pricing-container">
            <div className="pricing-header">
              <h1>"You get what you pay for."</h1>
            </div>

            <div className="pricing-tiers">
              {!isPremium && (
                <div className="pricing-tier basic">
                  <h1>Mentor Guidance</h1>
                  <hr className='hrElement' />
                  <ul className="pricing-features">
                    <li>Limited access to Featured Section</li>
                    <li>Limited access to real-time market data</li>
                    <li>Limited customer support</li>
                  </ul>
                  <form >
                    {/* action="/makeMePremium" method="POST" */}
                    <a href="#" className="cta-button"><button type="submit" className="pricing_butt">$30</button></a>
                  </form>
                </div>
              )}

              <div className="pricing-tier pro">
                <h1>Simulator Pro</h1>
                <hr />
                <ul className="pricing-features">
                  <li>Access to advanced trading tools and charts</li>
                  <li>Get 20,000 (INR)</li>
                  <li>Reduced commission fees</li>
                </ul>
                <form >
                  {/* action="/purchasing20" method="POST" */}
                  <a href="#" className="cta-button"><button type="submit" className="pricing_butt">$50</button></a>
                </form>
              </div>

              <div className="pricing-tier premium">
                <h1>Simulator Premium</h1>
                <hr />
                <ul className="pricing-features">
                  <li>Access to advanced trading tools and charts</li>
                  <li>Get 50,000 (INR)</li>
                  <li>Reduced commission fees</li>
                </ul>
                <form>
                  {/* action="/purchasing40" method="POST" */}
                  <a href="#" className="cta-button"><button type="submit" className="pricing_butt">$100</button></a>
                </form>
              </div>
            </div>

            <div className="pricing-faq">
              <div className="faq-container">
                <h1 className="faq-heading">Frequently Asked Questions</h1>
                <div id="faq-list">
                  {faqData.map((data, index) => (
                    <div key={index}>
                      <button className={`faq-page`} onClick={() => expand(index)}>
                        {data.question}
                      </button>
                      <div className="faq-body" style={{ display: 'none' }}>
                        <p>{data.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </body>
      <Footer />
    </>
  );
};
