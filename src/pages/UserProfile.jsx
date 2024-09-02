import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance/axiosInstance';
import Modal from '../components/Modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserProfile = ({ user }) => {
    const [userData, setUserData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [reservations, setReservations] = useState([]);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get('/user');
                setUserData(user);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [user]);

    useEffect(() => {
        if (userData && userData._id) {
            const fetchReservations = async () => {
                try {
                    const response = await fetch(`http://localhost:8000/reserve/${userData._id}`);
                    const data = await response.json();
                    if (Array.isArray(data)) {
                        console.log("Data>", data);
                        
                        setReservations(data);
                    } else {
                        setReservations([]);
                    }
                } catch (error) {
                    console.error('Error fetching reservations:', error);
                    setReservations([]);
                }
            };

            fetchReservations();
        }
    }, [userData]);

    const handleUpdate = async (updatedData) => {
        const newUpdatedData = {
            Email: userData.Email,
            Username: userData.Username,
            Name: updatedData.name,
            Password: updatedData.newPassword ? updatedData.newPassword : userData.Password,
        };

        try {
            await axiosInstance.post('/user', newUpdatedData);
            setUserData(newUpdatedData);
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    const handleCancel = async (reservationID, reserveSeatID = null) => {
        const url = reserveSeatID
            ? `http://localhost:8000/reserve/${reservationID}/${reserveSeatID}`
            : `http://localhost:8000/reserve/${reservationID}`;
        try {
            const response = await axios.delete(url);
            if (response.status === 200) {
                if (reserveSeatID) {
                    setReservations(prevReservations => {
                        return prevReservations
                            .map(reservation => {
                                if (reservation._id === reservationID) {
                                    const updatedSeats = reservation.SeatsDetails.filter(
                                        seat => seat.reserveSeatID !== reserveSeatID
                                    );
                                    if (updatedSeats.length === 0) {
                                        return null; // Remove reservation if no seats left
                                    }
                                    return {
                                        ...reservation,
                                        SeatsDetails: updatedSeats,
                                    };
                                }
                                return reservation;
                            })
                            .filter(reservation => reservation !== null);
                    });
                } else {
                    setReservations(prevReservations =>
                        prevReservations.filter(reservation => reservation._id !== reservationID)
                    );
                }
            } else {
                console.error('Failed to cancel:', response.data.message);
            }
        } catch (error) {
            console.error('Error canceling reservation:', error);
        }
    };

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">User Profile</h2>
                  
                </div>
                <div className="bg-white shadow rounded p-6">
                    <p><strong>Name:</strong> {userData.Name}</p>
                    <p><strong>Email:</strong> {userData.Email}</p>
                    <p><strong>Username:</strong> {userData.Username}</p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-indigo-500 text-white px-4 py-2 rounded mt-4 hover:bg-indigo-600"
                    >
                        Update User Information
                    </button>
                </div>
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">Booking History</h3>
                    <h5 className="text-lg mb-4">
                        Total No. of Tickets: {reservations.reduce((total, reservation) => total + reservation.SeatsDetails.length, 0)}
                    </h5>
                    {reservations.length > 0 ? (
                        <table className="min-w-full bg-white shadow rounded overflow-hidden">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-3 px-4 text-left font-medium text-gray-700">Ticket ID</th>
                                    <th className="py-3 px-4 text-left font-medium text-gray-700">Event Name</th>
                                    <th className="py-3 px-4 text-left font-medium text-gray-700">Date</th>
                                    <th className="py-3 px-4 text-left font-medium text-gray-700">Time</th>
                                    <th className="py-3 px-4 text-left font-medium text-gray-700">Seats</th>
                                    <th className="py-3 px-4 text-left font-medium text-gray-700">Quantity</th>
                                    <th className="py-3 px-4 text-left font-medium text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reservations.map((reservation) => (
                                    <tr key={reservation._id} className="border-b">
                                        <td className="py-3 px-4">{reservation._id}</td>
                                        <td className="py-3 px-4">{reservation.eventName}</td>
                                        <td className="py-3 px-4">{new Date(reservation.eventDate).toLocaleDateString()}</td>
                                        {/* <td className="py-3 px-4">{reservation.eventTime ? new Date(reservation.eventTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}</td> */}
                                        <td className="py-3 px-4">{reservation.reserveShowtime ? `Day : ${reservation.reserveShowtime.day} | Time : ${reservation.reserveShowtime.time} `  : 'N/A'}</td>
                                       
                                        <td className="py-3 px-4">
                                            <ul>
                                                {reservation.SeatsDetails.map((seat) => (
                                                    <li key={seat.reserveSeatID} className="flex items-center mb-2">
                                                        <span>
                                                            Seat {seat.row}-{seat.number} (ID: {seat.reserveSeatID})
                                                        </span>
                                                        <button
                                                            onClick={() => handleCancel(reservation._id, seat.reserveSeatID)}
                                                            className="ml-4 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                                                        >
                                                            Cancel Seat
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </td>
                                        <td className="py-3 px-4">{reservation.SeatsDetails.length}</td>
                                        <td className="py-3 px-4">
                                            <button
                                                onClick={() => handleCancel(reservation._id)}
                                                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                                            >
                                                Cancel All
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No reservations found.</p>
                    )}
                </div>

                {isModalOpen && (
                    <Modal
                        user={userData}
                        onClose={() => setIsModalOpen(false)}
                        onUpdate={handleUpdate}
                    />
                )}
            </div>
        </>
    );
};

export default UserProfile;
