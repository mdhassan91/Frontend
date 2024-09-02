import React from 'react';

const Seat = ({ category, seatIndex, isOccupied, isSelected, handleSeatClick }) => {
  return (
    <div
      className={`w-8 h-8 flex items-center justify-center m-1 rounded cursor-pointer ${
        isOccupied ? 'bg-white cursor-not-allowed' : isSelected ? 'bg-blue-400' : 'bg-gray-600'
      }`}
      onClick={handleSeatClick}
    >
      {category}{seatIndex + 1}
    </div>
  );
};

export default Seat;
