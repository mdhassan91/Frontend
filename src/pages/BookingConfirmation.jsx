import React from 'react';

const BookingConfirmation = ({ event, tickets, closeModal, handleBook }) => {
  return (
    <div className="container px-5 py-24 mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-medium text-gray-900 mb-4">Booking Confirmation</h1>
      <p className="mb-2"><strong>Event:</strong> {event.eventName}</p>
      <p className="mb-2"><strong>Tickets:</strong> {tickets}</p>
      <p className="mb-2"><strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}</p>
      <p className="mb-2"><strong>Time:</strong> {new Date(event.showtimes[0].showtimeDate).toLocaleTimeString()}</p>
      
      <div className="flex justify-end mt-4">
        <button 
          onClick={closeModal} 
          className="bg-gray-500 text-white py-2 px-4 rounded-lg mr-2 hover:bg-gray-600 transition duration-200"
        >
          Close
        </button>
        <button 
          onClick={handleBook} 
          className="bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 transition duration-200"
        >
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
