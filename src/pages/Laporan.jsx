import React, { useState } from 'react';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import ReportTable from '../components/ReportTable';

const dummyData = [
  { waktu: '2024-11-20 08:00', nitrogen: 531, fosfor: 50, kalium: 140, ph: 6.5 },
  { waktu: '2024-11-20 10:00', nitrogen: 540, fosfor: 55, kalium: 150, ph: 6.4 },
  { waktu: '2024-11-20 12:00', nitrogen: 550, fosfor: 58, kalium: 160, ph: 6.3 },
  { waktu: '2024-11-20 14:00', nitrogen: 560, fosfor: 60, kalium: 170, ph: 6.2 },
];

const Laporan = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredData, setFilteredData] = useState(dummyData);

  const filterData = () => {
    let data = dummyData;
    if (startDate) {
      data = data.filter(row => new Date(row.waktu) >= new Date(startDate));
    }
    if (endDate) {
      data = data.filter(row => new Date(row.waktu) <= new Date(endDate));
    }
    setFilteredData(data);
  };

  const downloadCSV = () => {
    let csvContent = 'Waktu,Nitrogen (ppm),Fosfor (ppm),Kalium (ppm),pH\n';
    filteredData.forEach(row => {
      csvContent += `${row.waktu},${row.nitrogen},${row.fosfor},${row.kalium},${row.ph}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'laporan-data-sensor.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Laporan Data Sensor</h1>
        <p className="text-gray-600 mb-6">Unduh laporan lengkap data sensor untuk analisis lebih lanjut.</p>

        {/* Filter Section */}
        <div className="mb-6 flex flex-wrap justify-center gap-4">
          <div>
            <label htmlFor="filter-start-date" className="block text-sm font-medium">Tanggal Mulai:</label>
            <input
              type="date"
              id="filter-start-date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>
          <div>
            <label htmlFor="filter-end-date" className="block text-sm font-medium">Tanggal Akhir:</label>
            <input
              type="date"
              id="filter-end-date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>
          <button
            onClick={filterData}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Terapkan Filter
          </button>
        </div>

        {/* Tabel Data */}
        <ReportTable data={filteredData} />

        {/* Download Section */}
        <div className="mt-6">
          <button
            onClick={downloadCSV}
            className="bg-blue-600 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700"
          >
            Unduh Laporan (CSV)
          </button>
          <button
            onClick={() => alert('Fitur Unduh PDF sedang dalam pengembangan.')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Unduh Laporan (PDF)
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Laporan;
