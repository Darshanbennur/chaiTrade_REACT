import React, { useEffect } from 'react';

export default function FullChart(){
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      new window.TradingView.widget({
        "width": 1000,
        "height": 610,
        "symbol": "GOOG",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "3",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "container_id": "chart-container"
      });
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="chartview" style={{ marginTop: '40px', marginBottom : "200px" }}>
      <div className="tradingview-widget-copyright">
        <span className="blue-text"></span>
      </div>
      <div id="chart-container"></div>
    </div>
  );
};
