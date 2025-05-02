import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white text-center py-4 mt-auto">
      <p> &copy; {new Date().getFullYear()} Soil Monitoring System | Rehan</p>
    </footer>
  );
};

export default Footer;
