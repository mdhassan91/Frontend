import React, { useState, useEffect } from 'react';
import{Link,useParams} from "react-router-dom"
import axios from 'axios';

const SeatSelectionEvent = ({ user }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { id: eventId } = useParams();
  const [seats, setSeats] = useState({});
  const [occupiedSeats, setOccupiedSeats] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [data, setData] = useState([]);


  const seatsPerRow = 5;

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/event/${eventId}`);
        const event = response.data.data;
        // console.log(event);
        setData(event)
        

        const occupied = {};
        const seatsMap = { Left: {}, Center: {}, Right: {} };

        event.Seats.forEach(seat => {
          const row = seat.row;
          const seatNumber = seat.number;

          // Determine section based on seat number
          let section;
          if (seatNumber <= 2) {
            section = 'Left';
          } else if (seatNumber === 3) {
            section = 'Center';
          } else {
            section = 'Right';
          }

          // Initialize the row array if it doesn't exist yet
          if (!seatsMap[section][row]) seatsMap[section][row] = [];

          // Add the seat to the correct row and section
          seatsMap[section][row].push(seat);

          // Track occupied seats
          if (!seat.isAvailable) {
            if (!occupied[section]) occupied[section] = {};
            if (!occupied[section][row]) occupied[section][row] = [];
            occupied[section][row].push(seat.number);
          }
        });

        setSeats(seatsMap);
        setOccupiedSeats(occupied);
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    fetchEventData();
    const intervalId = setInterval(fetchEventData, 5000);

    return () => clearInterval(intervalId);
  }, [eventId]);

  const handleSeatClick = (section, row, seat) => {
    const seatId = `${section}-${row}-${seat.number}-${seat._id}`;

    setSelectedSeats(prevSelectedSeats => {
      return prevSelectedSeats.includes(seatId)
        ? prevSelectedSeats.filter(seat => seat !== seatId)
        : [...prevSelectedSeats, seatId];
    });
  };

  const handleReserve = () => setShowConfirmation(true);
  const handleCancel = () => setShowConfirmation(false);

  const handleProceed = async () => {
    const seatsToReserve = selectedSeats.map(seat => {
      const [section, row, number, id] = seat.split('-');
      return { row: Number(row), number: Number(number), reserveSeatID: id };
    });

    const payload = {
      ...data,
      eventId,
      userId: user._id,
      Firstname: user.Name,
      seats: seatsToReserve,
    };

    try {
      const response = await axios.post('http://localhost:8000/reserve/event', payload);
      alert(response.data.message);

      const updatedSeats = response.data.seats;
      const newOccupiedSeats = { ...occupiedSeats };
      updatedSeats.forEach(seat => {
        if (!newOccupiedSeats[seat.row]) newOccupiedSeats[seat.row] = [];
        newOccupiedSeats[seat.row].push(seat.number);
      });

      setOccupiedSeats(newOccupiedSeats);
      setSelectedSeats([]);
      setShowConfirmation(false);
      setShowSuccess(true);
    } catch (err) {
      console.error('Error during reservation:', err);
    }
  };

  const closeSuccessModal = () => setShowSuccess(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
    <div className="flex-grow flex justify-between">
      {/* Left Section */}
      <div className="flex flex-col items-end w-1/4 p-4">
        <h3 className="text-blue-400 mb-2">Left Section</h3>
        {Object.entries(seats.Left || {}).map(([row, seatsArray]) => (
          <div key={row} className="mb-4">
            <h4 className="text-blue-400 mb-2">Row {row}</h4>
            <div className="flex flex-wrap">
              {seatsArray.map((seat, index) => (
                <div
                  key={index}
                  className={`w-10 h-8 m-1 flex items-center justify-center rounded-full text-xs cursor-pointer transform transition-transform duration-200 ${occupiedSeats.Left && occupiedSeats.Left[row] && occupiedSeats.Left[row].includes(seat.number)
                    ? 'bg-white cursor-not-allowed'
                    : selectedSeats.includes(`Left-${row}-${seat.number}-${seat._id}`)
                      ? 'bg-blue-400'
                      : 'bg-gray-700 hover:bg-gray-600 hover:scale-110'
                    }`}
                  onClick={() =>
                    !(occupiedSeats.Left && occupiedSeats.Left[row] && occupiedSeats.Left[row].includes(seat.number)) &&
                    handleSeatClick('Left', row, seat)
                  }
                >
                  {seat.number}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Center Section */}
      <div className="flex-grow flex flex-col items-center justify-center w-1/2 p-4">
        <div className="w-full flex flex-col items-center">
          <h3 className="text-blue-400 mb-2">Center Section</h3>
          {Object.entries(seats.Center || {}).map(([row, seatsArray]) => (
            <div key={row} className="flex flex-col mb-4">
              <h4 className="text-blue-400 mb-2">Row {row}</h4>
              <div className="flex flex-col items-center">
                {seatsArray.map((seat, index) => (
                  <div
                    key={index}
                    className={`w-10 h-8 m-1 flex items-center justify-center rounded-full text-xs cursor-pointer transform transition-transform duration-200 ${occupiedSeats.Center && occupiedSeats.Center[row] && occupiedSeats.Center[row].includes(seat.number)
                      ? 'bg-white cursor-not-allowed'
                      : selectedSeats.includes(`Center-${row}-${seat.number}-${seat._id}`)
                        ? 'bg-blue-400'
                        : 'bg-gray-700 hover:bg-gray-600 hover:scale-110'
                      }`}
                    onClick={() =>
                      !(occupiedSeats.Center && occupiedSeats.Center[row] && occupiedSeats.Center[row].includes(seat.number)) &&
                      handleSeatClick('Center', row, seat)
                    }
                  >
                    {seat.number}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-start w-1/4 p-4">
        <h3 className="text-blue-400 mb-2">Right Section</h3>
        {Object.entries(seats.Right || {}).map(([row, seatsArray]) => (
          <div key={row} className="mb-4">
            <h4 className="text-blue-400 mb-2">Row {row}</h4>
            <div className="flex flex-wrap">
              {seatsArray.map((seat, index) => (
                <div
                  key={index}
                  className={`w-10 h-8 m-1 flex items-center justify-center rounded-full text-xs cursor-pointer transform transition-transform duration-200 ${occupiedSeats.Right && occupiedSeats.Right[row] && occupiedSeats.Right[row].includes(seat.number)
                    ? 'bg-white cursor-not-allowed'
                    : selectedSeats.includes(`Right-${row}-${seat.number}-${seat._id}`)
                      ? 'bg-blue-400'
                      : 'bg-gray-700 hover:bg-gray-600 hover:scale-110'
                    }`}
                  onClick={() =>
                    !(occupiedSeats.Right && occupiedSeats.Right[row] && occupiedSeats.Right[row].includes(seat.number)) &&
                    handleSeatClick('Right', row, seat)
                  }
                >
                  {seat.number}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Stage */}
    <div className="w-full bg-gray-800 text-center py-4">
      <h2 className="text-blue-400">Stage</h2>
    </div>

    {/* Bottom Section */}
    <div className="w-full bg-gray-800 text-center py-4">
      <p className="text-lg">
        You have selected <span className="text-blue-400">{selectedSeats.length}</span> seat(s) for a price of ₹<span className="text-blue-400">{selectedSeats.length * 10}</span>
      </p>
      <button className="bg-blue-400 text-white rounded-lg p-2 mt-4" onClick={handleReserve}>Reserve</button>
    </div>

    {showConfirmation && (
      <Confirmation
        totalSeats={selectedSeats.length}
        totalPrice={selectedSeats.length * 10}
        onCancel={handleCancel}
        onProceed={handleProceed}
      />
    )}

    {showSuccess && (
      <SuccessModal onClose={closeSuccessModal} />
    )}
  </div>

);
  
};

const Confirmation = ({ totalSeats, totalPrice, onCancel, onProceed }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-xl text-black mb-4">Confirm Your Booking</h2>
      <p className="text-black">Seats: <span className="font-bold">{totalSeats}</span></p>
      <p className="text-black">Total Price: <span className="font-bold">₹{totalPrice}</span></p>
      <div className="flex justify-center mt-4">
        <button className="bg-blue-400 text-white rounded-lg p-2 mx-2" onClick={onProceed}>Proceed</button>
        <button className="bg-gray-500 text-white rounded-lg p-2 mx-2" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  </div>
);

const SuccessModal = ({ onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-xl text-black mb-4">Booking Successful!</h2>
      <p className="text-green-500">Your seats have been reserved successfully.</p>
      <button className="bg-blue-400 text-white rounded-lg p-2 mt-4" onClick={onClose}>Close</button>
      <Link to={`/user-home`} className="bg-blue-400 text-white rounded-lg p-2 mt-4">Home</Link>
    </div>
  </div>
);

export default SeatSelectionEvent;
