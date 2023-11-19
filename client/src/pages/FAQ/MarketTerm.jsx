import React, { useState, useEffect } from 'react';
import './MarketTerm.css';
import charts from "../../images/charts.jpg"
import axios from "../../api/axiosConfig.js"
import Footer from '../../components/Footer.jsx';

export default function FAQPage() {

  const [faqData, setFaqData] = useState([]);
  console.log("Inside FAQ")

  const expand = (index) => {
    setFaqData((prevData) => {
      const newData = [...prevData];
      newData[index].expanded = !newData[index].expanded;
      return newData;
    });
  };

  useEffect(() => {
    axios.get('/marketTerm/getAllFAQ').then((res) => setFaqData(res.data.data))
    console.log(faqData)
  }, []);

  return (
    <>
      <div className="content">
        <img src={charts} alt="background" className="backgroundpic" />
        <div className="faq-container">
          <h1 className="faq-heading">Market Terminology</h1>
          <div id="faq-list">
            {faqData.map((item, index) => (
              <div key={index}>
                <button style={{width : "700px"}} className={`faq-page ${item.expanded ? 'active' : ''}`} onClick={() => expand(index)}>
                  {item.question}
                </button>
                <div className="faq-body" style={{ display: item.expanded ? 'block' : 'none', width : "700px", fontSize : "18px", fontWeight : "500" }}>
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
