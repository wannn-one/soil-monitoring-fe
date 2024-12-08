import React from 'react';

const Hero = () => {
  return (
    <section
      className="h-full bg-cover bg-center relative text-white flex items-center justify-center"
      style={{ backgroundImage: "url('background.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-4xl mb-4">Selamat Datang di Sistem Monitoring Nutrisi Tanah</h1>
        <p className="text-lg mb-6">Pantau kondisi tanah secara real-time untuk hasil panen maksimal pada tanaman bawang merah.</p>
        <div className="flex justify-center gap-4">
          <a href="dashboard.html" className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700">Masuk ke Dashboard</a>
          <a href="tentang.html" className="bg-white text-blue-600 py-2 px-4 rounded-lg border-2 border-blue-600 hover:bg-blue-600 hover:text-white">Pelajari Lebih Lanjut</a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
