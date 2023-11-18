import React from 'react';
import StockInfo from './StockInfo';

const Charts = ({ companyStock, commodityStock, forexStock, cryptoStock }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', alignItems: 'center', justifyContent: 'center', padding: '20px' }} className="charts-container">
    <StockInfo stocks={companyStock} subtitle="Companies" />
    <StockInfo stocks={commodityStock} subtitle="Commodities" />
    <StockInfo stocks={forexStock} subtitle="Forex" />
    <StockInfo stocks={cryptoStock} subtitle="Crypto" />
  </div>
);

export default Charts;
