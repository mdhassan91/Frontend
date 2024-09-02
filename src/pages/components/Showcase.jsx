import React from 'react';

const Showcase = () => {
  return (
    <ul className="flex justify-center items-center bg-gray-800 p-2 rounded mb-4">
      <li className="flex items-center mx-2">
        <div className="w-4 h-4 bg-gray-600 rounded mr-2"></div>
        <small>N/A</small>
      </li>
      <li className="flex items-center mx-2">
        <div className="w-4 h-4 bg-blue-400 rounded mr-2"></div>
        <small>Selected</small>
      </li>
      <li className="flex items-center mx-2">
        <div className="w-4 h-4 bg-white rounded mr-2"></div>
        <small>Occupied</small>
      </li>
    </ul>
  );
};

export default Showcase;
