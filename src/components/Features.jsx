import React from 'react';

const Features = () => {
  return (
    <section className="flex-grow p-10 text-center bg-gray-100">
      <h2 className="text-3xl mb-6">Keunggulan Sistem</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl text-blue-600 mb-3">Real-Time Monitoring</h3>
          <p>Data langsung dari sensor ke perangkat Anda.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl text-blue-600 mb-3">Analisis Data Tren</h3>
          <p>Grafik tren nutrisi tanah membantu pengambilan keputusan yang lebih baik.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl text-blue-600 mb-3">Efisiensi Pemupukan</h3>
          <p>Membantu mengoptimalkan penggunaan pupuk untuk hasil panen maksimal.</p>
        </div>
      </div>
    </section>
  );
};

export default Features;
