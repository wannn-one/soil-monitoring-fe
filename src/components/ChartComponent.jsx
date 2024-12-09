import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ChartComponent = ({ title, color, data, bgcolor }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (!data.labels.length || !data.values.length) return;

    const chart = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: title,
            data: data.values,
            borderColor: color,
            backgroundColor: bgcolor,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Waktu',
            },
          },
          y: {
            title: {
              display: true,
              text: title,
            },
          },
        },
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