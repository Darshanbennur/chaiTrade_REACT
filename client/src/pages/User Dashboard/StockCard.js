import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function StockCard({ data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const chart = new Chart(ctx, {
      type: data.type,
      data: {
        labels: data.labels,
        datasets: [{
          label: data.label,
          data: data.stockData,
          backgroundColor: data.backgroundColor,
          borderColor: data.borderColor,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    return () => {
      chart.destroy();
    };
  }, [data]);

  return (
    <div className="card">
      <div className="card-content">
        <canvas ref={chartRef} className="canvas-container"></canvas>
      </div>
    </div>
  );
}

export default StockCard;

