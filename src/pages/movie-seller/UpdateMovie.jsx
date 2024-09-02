import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance/axiosInstance';

const UpdateMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    eventName: '',
    eventDate: '',
    eventDetails: '',
    eventImgUrl: '',
    genre: '',
    showtimes: [],
  });
  const [currentDayOfWeek, setCurrentDayOfWeek] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [editingShowtime, setEditingShowtime] = useState(null); // For editing showtime
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch event data for the form
  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.get(`/event/${id}`);
      const data = response.data.data;
      setEventData({
        eventName: data.eventName || '',
        eventDate: data.eventDate ? data.eventDate.split('T')[0] : '',
        eventDetails: data.eventDetails || '',
        genre: data.genre || '',
        eventImgUrl: data.eventImgUrl || '',
        showtimes: data.showtimes || [],
      });
    } catch (error) {
      console.error(error);
      setError('Failed to fetch event data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // Add or update showtime
  const handleAddOrUpdateShowtime = () => {
    if (currentDayOfWeek && currentTime) {
      setEventData(prevData => {
        let updatedShowtimes = [...prevData.showtimes];

        if (editingShowtime) {
          // Update existing showtime
          updatedShowtimes = updatedShowtimes.map(st =>
            st.dayOfWeek === editingShowtime.dayOfWeek
              ? { ...st, times: st.times.map(t => t === editingShowtime.time ? currentTime : t) }
              : st
          );
          setEditingShowtime(null);
        } else {
          // Add new showtime
          const existingDay = updatedShowtimes.find(st => st.dayOfWeek === currentDayOfWeek);
          if (existingDay) {
            // Avoid duplicating times
            if (!existingDay.times.includes(currentTime)) {
              existingDay.times.push(currentTime);
            }
            updatedShowtimes = updatedShowtimes.map(st =>
              st.dayOfWeek === currentDayOfWeek ? existingDay : st
            );
          } else {
            updatedShowtimes = [
              ...updatedShowtimes,
              { dayOfWeek: currentDayOfWeek, times: [currentTime] }
            ];
          }
        }
        return { ...prevData, showtimes: updatedShowtimes };
      });
      setCurrentDayOfWeek('');
      setCurrentTime('');
    }
  };

  // Handle form field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post(`/event/${id}`, eventData);
      console.log(response.data.data);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      setError('Failed to update event');
    } finally {
      setIsLoading(false);
    }
  };

  // Edit showtime
  const handleEditShowtime = (dayOfWeek, time) => {
    setCurrentDayOfWeek(dayOfWeek);
    setCurrentTime(time);
    setEditingShowtime({ dayOfWeek, time });
  };

  // Remove showtime
  const handleRemoveShowtime = (dayOfWeek, time) => {
    setEventData(prevData => ({
      ...prevData,
      showtimes: prevData.showtimes.map(st =>
        st.dayOfWeek === dayOfWeek
          ? { ...st, times: st.times.filter(t => t !== time) }
          : st
      )
    }));
  };

  return (
    <section className="text-gray-600 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <form onSubmit={handleSubmit} className="lg:w-1/2 w-full mx-auto">
            <h2 className="text-gray-900 text-3xl title-font font-medium mb-1">Update Movie</h2>
            {isLoading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventName">Movie Title</label>
              <input
                id="eventName"
                type="text"
                name="eventName"
                value={eventData.eventName}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventDate">Event Date</label>
              <input
                id="eventDate"
                type="date"
                name="eventDate"
                value={eventData.eventDate}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventDetails">Movie Details</label>
              <textarea
                id="eventDetails"
                name="eventDetails"
                value={eventData.eventDetails}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded w-full"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventImgUrl">Image URL</label>
              <input
                id="eventImgUrl"
                type="text"
                name="eventImgUrl"
                value={eventData.eventImgUrl}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="genre"
              >
                Genre
              </label>
              <select
                id="genre"
                name="genre"
                value={eventData.genre} // Genre state value
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded w-full"
                required
              >
                <option value="" disabled>
                  Select Genre
                </option>
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
                <option value="Drama">Drama</option>
                <option value="Horror">Horror</option>
                <option value="Romance">Romance</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Thriller">Thriller</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="showtimes">Showtimes</label>
              <div className="flex items-center mb-2">
                <select
                  value={currentDayOfWeek}
                  onChange={(e) => setCurrentDayOfWeek(e.target.value)}
                  className="p-2 border border-gray-300 rounded mr-2"
                >
                  <option value="" disabled>Select Day</option>
                  <option value="Sunday">Sunday</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                </select>
                <input
                  type="time"
                  value={currentTime}
                  onChange={(e) => setCurrentTime(e.target.value)}
                  className="p-2 border border-gray-300 rounded mr-2"
                />
                <button
                  type="button"
                  onClick={handleAddOrUpdateShowtime}
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                  {editingShowtime ? 'Update Showtime' : 'Add Showtime'}
                </button>
              </div>
              <div>
                {eventData.showtimes?.map((showtime, index) => (
                  <div key={index} className="mb-2">
                    <strong>{showtime?.dayOfWeek}:</strong>
                    {showtime?.times?.map((time, idx) => (
                      <div key={idx} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        <span>{time}</span>
                        <button
                          type="button"
                          onClick={() => handleEditShowtime(showtime.dayOfWeek, time)}
                          className="ml-2 bg-yellow-500 text-white py-1 px-2 rounded"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveShowtime(showtime.dayOfWeek, time)}
                          className="ml-2 bg-red-500 text-white py-1 px-2 rounded"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
              Save
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdateMovie;
