import React, { useEffect } from 'react';

export default function SideScrollWidget(){
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
    script.async = true;
    // document.body.insertBefore(script, document.body.firstChild);
    
    script.onload = () => {
      if (window['TradingView'] && window['TradingView'].widget) {
        new window['TradingView'].widget({
          "symbols": [
            {
              "proName": "FOREXCOM:SPXUSD",
              "title": "S&P 500"
            },
            {
              "proName": "FOREXCOM:NSXUSD",
              "title": "US 100"
            },
            {
              "proName": "FX_IDC:EURUSD",
              "title": "EUR/USD"
            },
            {
              "proName": "BITSTAMP:BTCUSD",
              "title": "Bitcoin"
            },
            {
              "proName": "BITSTAMP:ETHUSD",
              "title": "Ethereum"
            },
            {
              "description": "in",
              "proName": "SGX:IN1!"
            },
            {
              "description": "reliance",
              "proName": "NSE:RELIANCE"
            },
            {
              "description": "USD/Rupee",
              "proName": "FX_IDC:USDINR"
            },
            {
              "description": "oil",
              "proName": "MCX:CRUDEOIL1!"
            },
            {
              "description": "HDFC",
              "proName": "NSE:HDFCBANK"
            },
            {
              "description": "ICICI",
              "proName": "NSE:ICICIBANK"
            },
            {
              "description": "ITC",
              "proName": "NSE:ITC"
            },
            {
              "description": "KOTAK",
              "proName": "NSE:KOTAKBANK"
            },
            {
              "description": "APOLLO",
              "proName": "NSE:APOLLOHOSP"
            },
            {
              "description": "SBI",
              "proName": "NSE:SBIN"
            },
            {
              "description": "TATA",
              "proName": "NSE:TATAMOTORS"
            },
            {
              "description": "RBI",
              "proName": "ECONOMICS:ININTR"
            }
          ],
          "showSymbolLogo": true,
          "colorTheme": "dark",
          "isTransparent": false,
          "displayMode": "adaptive",
          "locale": "in",
          "container_id": "tradingview-widget-container"
        });
      }
    };

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return <div id="tradingview-widget-container"></div>;
};
