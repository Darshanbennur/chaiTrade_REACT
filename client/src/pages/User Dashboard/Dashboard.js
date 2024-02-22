import React, { useState, useEffect } from "react";
import StockDashboard from "./StockDashboard";
import PolarAreaChart from "./PolarAreaChart";
import axios from "../../api/axiosConfig.js";
import "./Dashboardcard.css";
import { useSelector } from "react-redux";
import Footer from '../../components/Footer.jsx'

export default function UserDashboard() {
  const [allPnL, setAllPnL] = useState([]);
  const [allTradedStocks, setAllTradedStocks] = useState([]);
  const reduxUserDataArrayID = useSelector(
    (state) => state.userData.currentUser.arrayID
  );

  useEffect(() => {
    const getAllPnL = async () => {
      const body = {
        arrayID: reduxUserDataArrayID,
      };
      const result = await axios.post(
        "/simulator/getAllTradesWithDatesAndPnL",
        body
      );
      setAllPnL(result.data.data);
    };
    const getAllTradedStocks = async () => {
      const body = {
        arrayID: reduxUserDataArrayID,
      }
      const result = await axios.post('/simulator/getAllTradedStocks', body)
      console.log("all the traded stocks are: ", result.data.data)
      setAllTradedStocks(result.data.data)
    }
    getAllPnL();
    getAllTradedStocks();
  }, []);

  const groupedPnL = allPnL.reduce((acc, entry) => {
    const month = entry.date;
    if (!acc[month]) {
      acc[month] = { profits: 0, losses: 0 };
    }
    if (entry.pnl > 0) {
      acc[month].profits += entry.pnl;
    } else {
      acc[month].losses += entry.pnl;
    }
    return acc;
  }, {});


  const sortedMonths = Object.keys(groupedPnL).sort(
    (a, b) => new Date(a + " 01, 2000") - new Date(b + " 01, 2000")
  );


  const stocks = [
    {
      type: "bar",
      labels: sortedMonths,
      stockData: sortedMonths.map((month) => -groupedPnL[month].losses), // Convert losses to positive values
      label: "Loss",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
    },
    {
      type: "bar",
      labels: sortedMonths,
      stockData: sortedMonths.map((month) => groupedPnL[month].profits),
      label: "Profit",
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor: "rgba(54, 162, 235, 1)",
    },
  ];

  const [isHovered, setIsHovered] = useState(false);
  const contentH1Style = {
    cursor: "pointer",
    fontFamily: "Sacramento, cursive",
    fontSize: "75px",
    color: isHovered ? "transparent" : "#65a893",
    textAlign: "center",
    WebkitTextStroke: isHovered ? "2px #88b9a9" : "none",
    fontWeight: "normal",
    marginTop: "80px",
    marginBottom: "50px",
  };
  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  // const polarAreaLabels = ['Apple', 'Google', 'Meta', 'Tata', 'Infosys', 'Alphapet'];
  // const polarAreaData = [12, 19, 8, 15, 13, 7];
  const counts = {};
  allTradedStocks.forEach(stock => {
    counts[stock] = (counts[stock] || 0) + 1;
  });

  const polarAreaLabels = Object.keys(counts);
  const polarAreaData = Object.values(counts);

  return (
    <div>
      <div className="dashboard">
        <h1 style={contentH1Style} onMouseOver={handleHover} onMouseOut={handleMouseOut}>
          Welcome to User Dashboard
        </h1>
        <StockDashboard stocks={stocks} />

        <PolarAreaChart labels={polarAreaLabels} data={polarAreaData} />
      </div>
      <Footer />
    </div>
  );
}
