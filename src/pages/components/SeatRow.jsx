import React from 'react';
import Seat from './Seat';

const SeatRow = ({ category, seatsArray, seatsPerRow, occupiedSeats, selectedSeats, handleSeatClick }) => {
  return (
    <div className="flex justify-center mb-2">
      {seatsArray.slice(0, seatsPerRow).map((_, index) => {
        const seatIndex = index;
        return (
          <Seat
            key={index}
            category={category}
            seatIndex={seatIndex}
            isOccupied={occupiedSeats[category].includes(seatIndex)}
            isSelected={selectedSeats.includes(`${category}-${seatIndex}`)}
            handleSeatClick={() => !occupiedSeats[category].includes(seatIndex) && handleSeatClick(category, seatIndex)}
          />
        );
      })}
    </div>
  );
};

export default SeatRow;
