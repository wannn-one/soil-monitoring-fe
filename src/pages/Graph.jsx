import React, { useEffect, useState } from 'react';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import ChartComponent from '../components/ChartComponent';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const INTERVAL = import.meta.env.VITE_AUTO_UPDATE_INTERVAL;

const GraphPage = () => {
  const [field, setField] = useState('ph');
  const [lastParams, setLastParams] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [graphData, setGraphData] = useState({ labels: [], values: [] });
  const [loading, setLoading] = useState(false);
  const [activeField, setActiveField] = useState(field);

  const fieldOptions = {
    ph: { label: 'pH', color: 'purple', bgcolor: 'rgba(153, 102, 255, 0.2)' },
    nitrogen: { label: 'Nitrogen', color: 'blue', bgcolor: 'rgba(0, 123, 255, 0.2)' },
    phosphorus: { label: 'Fosfor', color: 'green', bgcolor: 'rgba(0, 200, 100, 0.2)' },
    potassium: { label: 'Kalium', color: 'red', bgcolor: 'rgba(255, 99, 132, 0.2)' },
  };

  const handleLoadGraph = async () => {
    if (!startDate || !endDate) {
      alert('Harap isi tanggal mulai dan akhir.');
      return;
    }
  
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/sensor/?field=${field}&start=${startDate}&end=${endDate}`
      );
      const result = await response.json();
  
      if (response.ok) {
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
        setGraphData({ labels, values });
        setActiveField(field);
        setLastParams({ field, startDate, endDate }); 
      } else {
        console.error('Gagal memuat data:', result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setLoading(false);
  };    

  const fetchLatestData = async () => {
    if (!lastParams) return;
  
    const { field, startDate, endDate } = lastParams;
  
    try {
      const response = await fetch(
        `${BASE_URL}/sensor/?field=${field}&start=${startDate}&end=${endDate}`
      );
      const result = await response.json();
  
      if (response.ok) {
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
        setGraphData({ labels, values });
      } else {
        console.error('Gagal memuat data:', result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  useEffect(() => {
    if (!lastParams) return;
  
    const interval = setInterval(() => {
      fetchLatestData();
    }, Number(INTERVAL));
  
    return () => clearInterval(interval);
  }, [lastParams]);  

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Visualisasi Data Nutrisi</h1>
        <p className="text-gray-600 text-center mb-6">Pilih parameter dan rentang waktu untuk ditampilkan</p>

        {/* Filter */}
        <div className="mb-6 flex flex-wrap justify-center gap-4">
          <div>
            <label className="block text-sm font-medium">Parameter:</label>
            <select
              value={field}
              onChange={(e) => setField(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="ph">pH</option>
              <option value="nitrogen">Nitrogen</option>
              <option value="phosphorus">Fosfor</option>
              <option value="potassium">Kalium</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Tanggal Mulai:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Tanggal Akhir:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border rounded px-2 py-1"
            />
          </div>
          <button
            onClick={handleLoadGraph}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Tampilkan
          </button>
        </div>

        {/* Grafik */}
        {loading ? (
          <p className="text-center text-gray-600">Memuat data...</p>
        ) : (
          graphData.labels.length > 0 && (
            <div className="max-w-6xl mx-auto">
              <ChartComponent
                title={fieldOptions[activeField].label}
                color={fieldOptions[activeField].color}
                bgcolor={fieldOptions[activeField].bgcolor}
                data={graphData}
              />
            </div>
          )
        )}
      </main>
      <Footer />
    </div>
  );
};

export default GraphPage;
