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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await axios.get('/marketTerm/getAllFAQ');
        setFaqData(response.data.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <>
        <h3>Error Occured...</h3>
      </>
    )
  }


  return (
    <>
      <div className="content">
        <img src={charts} alt="background" className="backgroundpic" />
        <div className="faq-container">
          <h1 className="faq-heading">Market Terminology</h1>
          {!loading && <div id="faq-list">
            {faqData.map((item, index) => (
              <div key={index}>
                <button style={{ width: "700px" }} className={`faq-page ${item.expanded ? 'active' : ''}`} onClick={() => expand(index)}>
                  {item.question}
                </button>
                <div className="faq-body" style={{ display: item.expanded ? 'block' : 'none', width: "700px", fontSize: "18px", fontWeight: "500" }}>
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
            {loading && <div style={{ display: "flex", justifyContent: "center", margin: "5rem 0rem" }}>
              <l-trefoil
                size="40"
                stroke="4"
                stroke-length="0.15"
                bg-opacity="0.1"
                speed="1.4"
                color="white"
              ></l-trefoil>
            </div>}
          </div>}
        </div>
      </div>
      <Footer />
    </>
  );
};
