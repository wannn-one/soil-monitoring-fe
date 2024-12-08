import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white flex justify-between items-center p-4">
      <div className="font-bold text-lg">Soil Monitoring</div>
      <ul className="flex gap-4">
        <li>
          <Link to="/" className="text-white hover:underline">
            Beranda
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="text-white hover:underline">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/laporan" className="text-white hover:underline">
            Laporan
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
