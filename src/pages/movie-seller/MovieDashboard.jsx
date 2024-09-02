import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import axiosInstance from '../../axiosInstance/axiosInstance';
import DeleteEvent from '../../components/DeleteEvent';

const MovieDashboard = () => {
  const [events, setEvents] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
   
    const fetchUserData = async () => {
      try {
          const response = await axiosInstance.get('/user');
          console.log(response.data.data);
          console.log(response.data.data._id);

        fetchEvents(response.data.data._id); // Assuming user ID is _id

          // setUserData(user);
      } catch (error) {
          console.error('Error fetching user data:', error);
      }
  };
    const fetchEvents = async (userId) => {
      try {
        const response = await axiosInstance.get(`/event/events/${userId}`);
        console.log(response.data);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchUserData();
  }, []);

//   const deleteEvent =(id)=>{
//     console.log(id);
// {/* <DeleteEvent  eventId={id}    /> */}
//   }
  const deleteEvent = async (eventId) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.delete(
        `http://localhost:8000/event/${eventId}`
      );
      console.log(response.data);
      // Handle successful deletion
    } catch (error) {
      console.error(error);
      setError("Failed to delete event");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Movie Inventory</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Genre</th>
              <th className="py-3 px-6 text-left">Event Name</th>
              <th className="py-3 px-6 text-left">Event Date</th>
              <th className="py-3 px-6 text-left">Showtimes</th>
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {events.map((event) => (
              <tr key={event._id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{event.genre}</td>
                <td className="py-3 px-6 text-left">{event.eventName}</td>
                <td className="py-3 px-6 text-left">{new Date(event.eventDate).toLocaleDateString()}</td>
                <td className="py-3 px-6 text-left">
                  {/* {event.showtimes.map(st => new Date(st.showtimeDate).toLocaleTimeString()).join(', ')} */}
                  {event.showtimes?.map(st => st && st.times ? `${st.dayOfWeek}: ${st.times.join(', ')}` : null)
  .filter(Boolean) // Remove null values
  .join(' | ')
}
                </td>
                <td className="py-3 px-6 text-left">
                  <img src={event.eventImgUrl} alt={event.eventName} className="w-16 h-16 object-cover rounded-lg" />
                </td>
                <td className="py-3 px-6 text-left">
                  <Link to={`/update-movie/${event._id}`} className="mr-2 text-blue-600 hover:text-blue-800">
                    Update
                  </Link>
                  <button onClick={() => deleteEvent(event._id)} className="text-red-600 hover:text-red-800">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MovieDashboard;
