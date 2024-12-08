// src/components/dashboard/ChartComponent.jsx
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ title, color, data, bgcolor }) => {
  const chartRef = useRef();

  useEffect(() => {
    const chart = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: ['08:00', '10:00', '12:00', '14:00', '16:00'],
        datasets: [
          {
            label: title,
            data,
            borderColor: color,
            backgroundColor: bgcolor,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    return () => chart.destroy();
  }, [title, color, data]);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 h-64">
      <h3 className="text-lg font-bold mb-2 text-center">{title}</h3>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default ChartComponent;
