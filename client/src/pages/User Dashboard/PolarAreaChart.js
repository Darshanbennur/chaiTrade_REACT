// PolarAreaChart.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function PolarAreaChart({ labels, data }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const chart = new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });

    return () => {
      chart.destroy();
    };
  }, [data, labels]);

  return (
    <div className="polar-area-chart-card">
      <div className="polar-area-chart-content">
        <canvas ref={chartRef} className="polar-area-chart-container"></canvas>
      </div>
    </div>
  );
}

export default PolarAreaChart;
