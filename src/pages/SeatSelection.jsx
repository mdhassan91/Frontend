import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const SeatSelection = ({ user }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { id: eventId ,day,time} = useParams();
  // console.log(day, time);
  

  const [ticketPrice, setTicketPrice] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState('A');
  const [seats, setSeats] = useState({});
  const [occupiedSeats, setOccupiedSeats] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const seatsPerRow = 5;

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/event/${eventId}`);
        const event = response.data.data;

        const occupied = {};
        const seatsMap = {};

        event.Seats.forEach(seat => {
          if (!seatsMap[seat.row]) seatsMap[seat.row] = [];
          seatsMap[seat.row].push(seat);

          if (!seat.isAvailable) {
            if (!occupied[seat.row]) occupied[seat.row] = [];
            occupied[seat.row].push(seat.number);
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

  const handleSeatClick = (category, row, seat) => {
    const seatId = `${category}-${row}-${seat.number}-${seat._id}`;

    setSelectedSeats(prevSelectedSeats => {
      return prevSelectedSeats.includes(seatId)
        ? prevSelectedSeats.filter(seat => seat !== seatId)
        : [...prevSelectedSeats, seatId];
    });
  };

  const handleCategorySelect = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setTicketPrice(seatCategories[category].price);
  };

  const handleReserve = () => setShowConfirmation(true);
  const handleCancel = () => setShowConfirmation(false);

  const handleProceed = async () => {
    const seatsToReserve = selectedSeats.map(seat => {
      const [category, row, number, id] = seat.split('-');
      return { row: Number(row), number: Number(number), reserveSeatID: id };
    });

    const payload = {
      eventId,
      userId: user._id,
      Firstname: user.Name,
      seats: seatsToReserve,
      reserveShowtime:{
        day: day,
        time:time
      }
    };

    try {
      const response = await axios.post('http://localhost:8000/reserve', payload);
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

  const seatCategories = {
    A: { price: 10, label: 'Cheap' },
    B: { price: 20, label: 'Budget' },
    C: { price: 30, label: 'Luxury' },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <section className="w-full max-w-4xl text-center mb-8">
        <ul className="flex justify-center items-center list-none mb-4 bg-black bg-opacity-20 rounded-lg p-2">
          <li className="flex items-center text-xs mx-2">
            <div className="w-4 h-4 bg-gray-700 mr-1"></div>
            <small>N/A</small>
          </li>
          <li className="flex items-center text-xs mx-2">
            <div className="w-4 h-4 bg-blue-400 mr-1"></div>
            <small>Selected</small>
          </li>
          <li className="flex items-center text-xs mx-2">
            <div className="w-4 h-4 bg-white mr-1"></div>
            <small>Occupied</small>
          </li>
        </ul>
        <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg">
          {Object.entries(seats).map(([row, seatsArray]) => (
            <div key={row} className="mb-2">
              <h3 className="text-blue-400 mb-2">Row {row}</h3>
              {Array.from({ length: Math.ceil(seatsArray.length / seatsPerRow) }, (_, rowIndex) => (
                <div key={rowIndex} className="flex justify-center flex-wrap mb-1">
                  {seatsArray.slice(rowIndex * seatsPerRow, (rowIndex + 1) * seatsPerRow).map((seat, index) => (
                    <div
                      key={index}
                      className={`w-10 h-8 m-1 flex items-center justify-center rounded-full text-xs cursor-pointer transform transition-transform duration-200 ${occupiedSeats[row] && occupiedSeats[row].includes(seat.number)
                        ? 'bg-white cursor-not-allowed'
                        : selectedSeats.includes(`${selectedCategory}-${row}-${seat.number}-${seat._id}`)
                          ? 'bg-blue-400'
                          : 'bg-gray-700 hover:bg-gray-600 hover:scale-110'
                        }`}
                      onClick={() =>
                        !(occupiedSeats[row] && occupiedSeats[row].includes(seat.number)) &&
                        handleSeatClick(selectedCategory, row, seat)
                      }
                    >
                      {seat.number}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
      <p className="mt-4 text-lg">
        You have selected <span className="text-blue-400">{selectedSeats.length}</span> seat(s) for a price of ₹<span className="text-blue-400">{selectedSeats.length * ticketPrice}</span>
      </p>
      <button className="bg-blue-400 text-white rounded-lg p-2 mt-4" onClick={handleReserve}>Reserve</button>

      {showConfirmation && (
        <Confirmation
          currentMovie={{ price: ticketPrice }}
          takenSeats={selectedSeats}
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

const Confirmation = ({ currentMovie, takenSeats, onCancel, onProceed }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg text-center">
      <h2 className="text-xl text-black mb-4">Confirm Your Booking</h2>
      <p className="text-black">Seats: <span className="font-bold">{takenSeats.length}</span></p>
      <p className="text-black">Total Price: <span className="font-bold">₹{currentMovie.price * takenSeats.length}</span></p>
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

export default SeatSelection;
