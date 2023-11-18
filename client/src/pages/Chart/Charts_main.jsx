import React, { useEffect, useState } from "react";
import Charts from "./Charts_content.jsx";
import SideScrollWidget from "./SideScrollWidget.jsx";
import FullChart from "./FullChartWidget.jsx";
import image from "../../images/charts.jpg";
import axios from "../../api/axiosConfig.js"

export default function Charts_main() {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const backgroundPicStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
    objectFit: "cover",
  };

  const chartsHeadingStyle = {
    cursor: "pointer",
    fontFamily: "Sacramento, cursive",
    fontSize: "90px",
    color: isHovered ? "transparent" : "#65a893",
    textAlign: "center",
    WebkitTextStroke: isHovered ? "2px #88b9a9" : "none",
    fontWeight: "normal",
  };

  const [companyStock, setCompanyStock] = useState([]);
  const [commodityStock, setCommodityStock] = useState([]);
  const [forexStock, setForexStock] = useState([]);
  const [cryptoStock, setCryptoStock] = useState([]);
  console.log("Inside Charts!!");

  useEffect(() => {
    console.log("Inside UseEffect!!")
    axios.get('/chart/getChartData').then((res) => {
      setCompanyStock(res.data.companyStock);
      setCommodityStock(res.data.commodityStock);
      setForexStock(res.data.forexStock);
      setCryptoStock(res.data.cryptoStock);
    })
  }, [])

  return (
    <div>
      <SideScrollWidget />

      <div className="backpic row">
        <img src={image} style={backgroundPicStyle} alt="background" />
      </div>

      <h2
        className="charts-heading"
        onMouseOver={handleHover}
        onMouseOut={handleMouseOut}
        style={chartsHeadingStyle}
      >
        Charts
      </h2>

      <Charts
        companyStock={companyStock}
        commodityStock={commodityStock}
        forexStock={forexStock}
        cryptoStock={cryptoStock}
      />

      <FullChart />

    </div>
  );
};

