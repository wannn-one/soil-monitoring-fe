import React from 'react';

import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';

import Card from '../components/Card';
import ChartComponent from '../components/ChartComponent';

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-2 text-center">Soil Nutrient Monitoring Dashboard</h1>
        <p className="text-gray-600 text-center mb-6">Real-time and Historical Data Analysis</p>

        {/* Kartu Ringkasan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card title="Nitrogen" value="531 ppm" />
          <Card title="Fosfor" value="643 ppm" />
          <Card title="Kalium" value="1400 ppm" />
          <Card title="pH" value="6.3" />
        </div>

        {/* Grafik */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-center">Grafik Tren Nutrisi Tanah (24 Jam Terakhir)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ChartComponent title="Nitrogen" color="blue" data={[500, 520, 531, 540, 550]} bgcolor={'rgba(0, 123, 255, 0.2)'}/>
            <ChartComponent title="Fosfor" color="green" data={[50, 55, 60, 58, 57]} bgcolor={'rgba(0, 200, 100, 0.2)'}/>
            <ChartComponent title="Kalium" color="red" data={[150, 140, 160, 155, 170]} bgcolor={'rgba(255, 99, 132, 0.2)'} />
            <ChartComponent title="pH" color="purple" data={[6.5, 6.4, 6.3, 6.2, 6.1]} bgcolor={'rgba(153, 102, 255, 0.2)'} />
          </div>
        </div>

        {/* Notifikasi */}
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
          ⚠️ Fosfor pada Tanah B terlalu rendah! (Saat ini: 45 ppm)
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
