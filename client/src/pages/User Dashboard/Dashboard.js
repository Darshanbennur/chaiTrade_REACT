import React, { useState, useEffect } from 'react';
import StockDashboard from './StockDashboard';
import PolarAreaChart from './PolarAreaChart';
import axios from '../../api/axiosConfig.js'
import './Dashboardcard.css';
import { useSelector } from "react-redux";

export default function UserDashboard() {
  const [allPnL, setAllPnL] = useState([])
  const reduxUserDataArrayID = useSelector((state) => state.userData.currentUser.arrayID)

  useEffect(() => {
    const getAllPnL = async () => {
      const body = {
        arrayID: reduxUserDataArrayID
      }
      const result = await axios.post('/simulator/getAllTradesWithDatesAndPnL', body);
      console.log("the results will be: ", result.data.data)
      setAllPnL(result.data.data)
    }
    getAllPnL();
  }, [])

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

  // Create the stocks array from the grouped data
  const sortedMonths = Object.keys(groupedPnL).sort((a, b) => new Date(a + ' 01, 2000') - new Date(b + ' 01, 2000'));

  // Create the stocks array from the grouped data
  const stocks = [
    {
      type: 'bar',
      labels: sortedMonths,
      stockData: sortedMonths.map((month) => -groupedPnL[month].losses), // Convert losses to positive values
      label: 'Loss',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
    },
    {
      type: 'bar',
      labels: sortedMonths,
      stockData: sortedMonths.map((month) => groupedPnL[month].profits),
      label: 'Profit',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
    },
  ];

  // const polarAreaLabels = ['Apple', 'Google', 'Meta', 'Tata', 'Infosys', 'Alphapet'];
  // const polarAreaData = [12, 19, 8, 15, 13, 7];

  return (
    <div className="dashboard">
      <StockDashboard stocks={stocks} />

      {/* <PolarAreaChart labels={polarAreaLabels} data={polarAreaData} /> */}
    </div>
  );
}


