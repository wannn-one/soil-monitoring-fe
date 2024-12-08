// src/components/dashboard/Card.jsx
import React from 'react';

const Card = ({ title, value }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 text-center border">
      <h3 className="text-lg font-bold text-blue-600">{title}</h3>
      <p className="text-gray-800 text-xl mt-2">{value}</p>
    </div>
  );
};

export default Card;
