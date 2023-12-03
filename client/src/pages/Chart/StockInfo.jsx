import React from 'react';

const chartsCardStyle = {
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
  padding: '16px',
  textAlign: 'center',
  backgroundColor: '#f1f1f1',
  borderRadius: '0.5rem',
  opacity: '0.8',
  marginBottom: '70px',
  width: '70%',
  margin: '0 auto',
};


const chartsSubStyle = {
  fontSize: '30px',
};


const chartsInfo1Style = {
  margin: "0.8rem 0px",
  color: "rgb(189, 49, 192)",
  fontSize: "15px",
  display: "flex",
  justifyContent: "left",
  alignItems: "center",
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
    <div style={chartsInfo1Style}>
      <div style={{marginLeft : "10px"}}>Name</div>
      <div style={{marginLeft : "7rem"}}>LTP</div>
      <div style={{marginLeft : "6.2rem"}}>Change</div>
      <div style={{marginLeft : "4.5rem"}}>%Change</div>
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
