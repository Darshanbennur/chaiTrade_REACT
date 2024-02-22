import React from 'react';
import StockCard from './StockCard';

function StockDashboard({ stocks }) {
  return (
    <div className="userdashboard-stock-dashboard">
      {stocks.map((stock, index) => (
        <div className="userdashboard-stock-card" key={index}>
          <StockCard data={stock} />
        </div>
      ))}
    </div>
  );
}
export default StockDashboard;
