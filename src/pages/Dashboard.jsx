import React, { useEffect, useState } from 'react';

import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';

import Card from '../components/Card';
import ChartComponent from '../components/ChartComponent';

const Dashboard = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [nitrogenData, setNitrogenData] = useState({ labels: [], values: [] });
  const [phData, setPhData] = useState({ labels: [], values: [] });
  const [phosphorusData, setPhosphorusData] = useState({ labels: [], values: [] });
  const [potassiumData, setPotassiumData] = useState({ labels: [], values: [] });

  const fetchData = async (field, setter, start, end) => {
    try {
      const response = await fetch(`http://api.soilmonitor.my.id/sensor/?field=${field}&start=${start}&end=${end}`);
      const result = await response.json();
  
      if (response.ok) {
        // Tambahkan tanggal dan waktu ke label
        const labels = result.data.map((item) =>
          new Date(item._time).toLocaleString([], {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })
        );
        const values = result.data.map((item) => item._value);
        setter({ labels, values });
      } else {
        console.error(`Failed to fetch data for ${field}:`, result.message);
      }
    } catch (error) {
      console.error(`Error fetching data for ${field}:`, error);
    }
  };
  

  const handleLoadData = () => {
    if (!startDate || !endDate) {
      alert('Harap isi tanggal mulai dan akhir.');
      return;
    }

    fetchData('nitrogen', setNitrogenData, startDate, endDate);
    fetchData('ph', setPhData, startDate, endDate);
    fetchData('phosphorus', setPhosphorusData, startDate, endDate);
    fetchData('potassium', setPotassiumData, startDate, endDate);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-2 text-center">Soil Nutrient Monitoring Dashboard</h1>
        <p className="text-gray-600 text-center mb-6">Real-time and Historical Data Analysis</p>

        {/* Filter Section */}
        <div className="mb-6 flex flex-wrap justify-center gap-4">
          <div>
            <label htmlFor="start-date" className="block text-sm font-medium">Tanggal Mulai:</label>
            <input
              type="date"
              id="start-date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>
          <div>
            <label htmlFor="end-date" className="block text-sm font-medium">Tanggal Akhir:</label>
            <input
              type="date"
              id="end-date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>
          <button
            onClick={handleLoadData}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Terapkan
          </button>
        </div>

        {/* Kartu Ringkasan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card title="Nitrogen" value={nitrogenData.values.length > 0 ? `${nitrogenData.values[nitrogenData.values.length - 1]} ppm` : 'Loading...'} />
          <Card title="pH" value={phData.values.length > 0 ? phData.values[phData.values.length - 1] : 'Loading...'} />
          <Card title="Fosfor" value={phosphorusData.values.length > 0 ? `${phosphorusData.values[phosphorusData.values.length - 1]} ppm` : 'Loading...'} />
          <Card title="Kalium" value={potassiumData.values.length > 0 ? `${potassiumData.values[potassiumData.values.length - 1]} ppm` : 'Loading...'} />
        </div>

        {/* Grafik */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-center">Grafik Tren Nutrisi Tanah</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ChartComponent title="Nitrogen" color="blue" data={nitrogenData} bgcolor={'rgba(0, 123, 255, 0.2)'} />
            <ChartComponent title="pH" color="purple" data={phData} bgcolor={'rgba(153, 102, 255, 0.2)'} />
            <ChartComponent title="Fosfor" color="green" data={phosphorusData} bgcolor={'rgba(0, 200, 100, 0.2)'} />
            <ChartComponent title="Kalium" color="red" data={potassiumData} bgcolor={'rgba(255, 99, 132, 0.2)'} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
