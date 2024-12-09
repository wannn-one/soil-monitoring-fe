import React from 'react';

const ReportTable = ({ data }) => {
  return (
    <table className="w-full border-collapse border shadow-md text-sm text-left mt-4">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="border px-4 py-2">Waktu</th>
          <th className="border px-4 py-2">Nilai</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
              <td className="border px-4 py-2">{new Date(row.waktu).toLocaleString()}</td>
              <td className="border px-4 py-2">{row.nilai}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="2" className="border px-4 py-2 text-center">
              Tidak ada data yang tersedia.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ReportTable;
