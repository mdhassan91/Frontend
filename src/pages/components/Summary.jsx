import React from 'react';

const Summary = ({ selectedSeats, ticketPrice }) => {
  return (
    <p className="mt-4 text-center">
      You have selected <span className="text-blue-400">{selectedSeats.length}</span> seat(s) for a price of ₹<span className="text-blue-400">{selectedSeats.length * ticketPrice}</span>
    </p>
  );
};

export default Summary;
