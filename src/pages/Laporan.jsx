import React, { useState } from 'react';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import ReportTable from '../components/ReportTable';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Laporan = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    if (!startDate || !endDate) {
      alert('Harap isi tanggal mulai dan tanggal akhir.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/sensor/?start=${startDate}&end=${endDate}`
      );
      const result = await response.json();

      if (response.ok) {
        const groupedData = groupByField(result.data);
        setData(groupedData);
      } else {
        alert(result.message || 'Gagal memuat data.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Terjadi kesalahan saat memuat data.');
    } finally {
      setLoading(false);
    }
  };

  const groupByField = (data) => {
    return data.reduce((acc, curr) => {
      if (!acc[curr._field]) {
        acc[curr._field] = [];
      }
      acc[curr._field].push({
        waktu: curr._time,
        nilai: curr._value,
      });
      return acc;
    }, {});
  };

  const downloadCSV = () => {
    if (!startDate || !endDate) {
      alert('Harap isi tanggal mulai dan tanggal akhir.');
      return;
    }
    const url = `${BASE_URL}/sensor/csv?start=${startDate}&end=${endDate}`;
    window.open(url, '_blank');
  };

  const downloadPDF = () => {
    if (!startDate || !endDate) {
      alert('Harap isi tanggal mulai dan tanggal akhir.');
      return;
    }
  
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Laporan Data Sensor', 14, 20);
    doc.setFontSize(12);
    doc.text(`Periode: ${startDate} hingga ${endDate}`, 14, 28);
  
    let yOffset = 36;
  
    Object.keys(data).forEach((field) => {
      doc.setFontSize(14);
      doc.text(`${field.toUpperCase()}`, 14, yOffset);
      yOffset += 6;
  
      const rows = data[field].map((item) => [
        new Date(item.waktu).toLocaleString(),
        item.nilai,
      ]);
  
      autoTable(doc, {
        head: [['Waktu', 'Nilai']],
        body: rows,
        startY: yOffset,
        theme: 'grid',
        headStyles: { fillColor: [0, 123, 255] },
      });
  
      yOffset = doc.lastAutoTable.finalY + 10; // Update yOffset agar tidak tumpuk
    });
  
    doc.save(`laporan_sensor_${startDate}_sampai_${endDate}.pdf`);
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
            onClick={fetchData}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Terapkan Filter
          </button>
        </div>

        {/* Tabel Data */}
        {loading ? (
          <p className="text-gray-600">Memuat data...</p>
        ) : (
          Object.keys(data).map((field) => (
            <div key={field} className="mb-8">
              <h2 className="text-lg font-bold mb-2">{field.toUpperCase()}</h2>
              <ReportTable data={data[field]} />
            </div>
          ))
        )}

        {/* Download Section */}
        <div className="mt-6">
          <button
            onClick={downloadCSV}
            className="bg-blue-600 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700"
          >
            Unduh Laporan (CSV)
          </button>
          <button
            onClick={downloadPDF}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
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
