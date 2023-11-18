import React from 'react';

const chartsCardStyle = {
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
  padding: '16px',
  textAlign: 'center',
  backgroundColor: '#f1f1f1',
  borderRadius: '0.5rem',
  opacity: '0.8',
  marginBottom: '30px',
};

const chartsSubStyle = {
  fontSize: '30px',
};

const chartsInfo1Style = {
  color: 'rgb(189, 49, 192)',
  fontSize: '20px',
  display: 'grid',
  gridTemplateColumns: 'auto auto auto auto',
  gridColumnGap: '10px',
  marginLeft: '80px',
};


const chartsInfoStyle = {
  border: '1px solid black',
  padding: '5px',
  borderRadius: '5px',
  margin: '5px',
  fontSize: '20px',
  display: 'grid',
  gridTemplateColumns: 'auto auto auto auto',
};

const StockInfo = ({ stocks, subtitle, cardClass }) => (
  <div className={`charts-card ${cardClass}`} style={chartsCardStyle}>

    <div className="charts-sub" style={chartsSubStyle}>{subtitle}</div>
    
    <div className="charts-info-1" style={chartsInfo1Style}>
      <div className="charts-info-name">Name</div>
      <div className="charts-info1">LTP</div>
      <div className="charts-info2">Change</div>
      <div className="charts-info3">%Change</div>
    </div>
    
    {stocks.map((stock, index) => (
      <div className="charts-info" key={index} style={chartsInfoStyle}>
        <div className="charts-info-name">{stock.chart_name}</div>
        <div className="charts-info1">{stock.chart_ltp}</div>
        <div className="charts-info2">{stock.chart_change}</div>
        <div className="charts-info3">{stock.chart_percentage}</div>
      </div>
    ))}
    
  </div>
);

export default StockInfo;
