import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance/axiosInstance';

const AddMovie = ({ user }) => {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventDetails, setEventDetails] = useState('');
    const [genre, setGenre] = useState('');
    const [image, setImage] = useState('');
    const [showtimes, setShowtimes] = useState([]);
    const [currentDayOfWeek, setCurrentDayOfWeek] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get('/user');
                setUserData(response.data.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [user]);

    // const handleAddShowtime = () => {
    //     if (currentDayOfWeek && currentTime) {
    //         setShowtimes(prevShowtimes => {
    //             const existingDay = prevShowtimes.find(st => st.dayOfWeek === currentDayOfWeek);
    //             if (existingDay) {
    //                 existingDay.times.push(currentTime);
    //                 return [...prevShowtimes];
    //             } else {
    //                 return [
    //                     ...prevShowtimes,
    //                     { dayOfWeek: currentDayOfWeek, times: [currentTime] }
    //                 ];
    //             }
    //         });
    //         setCurrentDayOfWeek('');
    //         setCurrentTime('');
    //     }
    // };
    const handleAddShowtime = () => {
        if (currentDayOfWeek && currentTime) {
            setShowtimes(prevShowtimes => {
                const existingDay = prevShowtimes.find(st => st.dayOfWeek === currentDayOfWeek);

                if (existingDay) {
                    // Avoid duplicating times
                    if (!existingDay.times.includes(currentTime)) {
                        existingDay.times.push(currentTime);
                    }
                    return [...prevShowtimes];
                } else {
                    return [
                        ...prevShowtimes,
                        { dayOfWeek: currentDayOfWeek, times: [currentTime] }
                    ];
                }
            });
            setCurrentDayOfWeek('');
            setCurrentTime('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const newMovieEvent = {
            eventName,
            eventDate,
            eventDetails,
            genre,
            eventImgUrl: image,
            eventType: 'movie',
            activityType: 'outdoor',
            eventCategory: 'Festival',
            showtimes,
            Rows: 3,
            seatsPerRow: 5,
            eventAdmin: userData?._id || user._id
        };

        try {
            await axiosInstance.put('/event', newMovieEvent);
            navigate('/dashboard');
        } catch (error) {
            console.error("Error updating movie event:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <form onSubmit={handleSubmit} className="lg:w-1/2 w-full mx-auto">
                        <h2 className="text-gray-900 text-3xl title-font font-medium mb-1">Add New Movie</h2>
                        {/* Movie Title */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventName">Movie Title</label>
                            <input
                                id="eventName"
                                type="text"
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                                className="p-2 border border-gray-300 rounded w-full"
                                required
                            />
                        </div>
                        {/* Event Date */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventDate">Event Date</label>
                            <input
                                id="eventDate"
                                type="date"
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                                className="p-2 border border-gray-300 rounded w-full"
                                required
                            />
                        </div>
                        {/* Movie Details */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventDetails">Movie Details</label>
                            <textarea
                                id="eventDetails"
                                value={eventDetails}
                                onChange={(e) => setEventDetails(e.target.value)}
                                className="p-2 border border-gray-300 rounded w-full"
                                required
                            ></textarea>
                        </div>
                        {/* Genre Selection */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="genre">Genre</label>
                            <select
                                id="genre"
                                value={genre}
                                onChange={(e) => setGenre(e.target.value)}
                                className="p-2 border border-gray-300 rounded w-full"
                                required
                            >
                                <option value="" disabled>Select Genre</option>
                                <option value="Action">Action</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Drama">Drama</option>
                                <option value="Horror">Horror</option>
                                <option value="Romance">Romance</option>
                                <option value="Sci-Fi">Sci-Fi</option>
                                <option value="Thriller">Thriller</option>
                            </select>
                        </div>
                        {/* Image URL */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">Image URL</label>
                            <input
                                id="image"
                                type="text"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                className="p-2 border border-gray-300 rounded w-full"
                                required
                            />
                        </div>
                        {/* Showtimes */}
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
                                    onClick={handleAddShowtime}
                                    className="bg-blue-500 text-white py-2 px-4 rounded"
                                >
                                    Add Showtime
                                </button>
                            </div>
                            <div>
                                {showtimes.map((showtime, index) => (
                                    <div key={index} className="mb-2">
                                        <strong>{showtime.dayOfWeek}:</strong>
                                        {showtime.times.map((time, idx) => (
                                            <span key={idx} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                                {time}
                                            </span>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-green-500 text-white py-2 px-4 rounded"
                            disabled={loading}
                        >
                            {loading ? 'Adding...' : 'Add Movie'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddMovie;
