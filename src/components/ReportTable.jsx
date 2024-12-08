// src/components/laporan/ReportTable.jsx
import React from 'react';

const ReportTable = ({ data }) => {
  return (
    <table className="w-full border-collapse border shadow-md text-sm text-left mt-4">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="border px-4 py-2">Waktu</th>
          <th className="border px-4 py-2">Nitrogen (ppm)</th>
          <th className="border px-4 py-2">Fosfor (ppm)</th>
          <th className="border px-4 py-2">Kalium (ppm)</th>
          <th className="border px-4 py-2">pH</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className="border px-4 py-2">{row.waktu}</td>
              <td className="border px-4 py-2">{row.nitrogen}</td>
              <td className="border px-4 py-2">{row.fosfor}</td>
              <td className="border px-4 py-2">{row.kalium}</td>
              <td className="border px-4 py-2">{row.ph}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="border px-4 py-2 text-center">
              Tidak ada data yang tersedia.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ReportTable;
