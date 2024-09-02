import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const MovieDetail = ({ movies }) => {
    const { id } = useParams();
    const movie = movies.find(m => m._id === id);
    const [selectedShowtime, setSelectedShowtime] = useState(null);
    const navigate = useNavigate();

    // Define the order of days
    const daysOfWeekOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    // Sort the showtimes according to the day order
    const orderedShowtimes = useMemo(() => {
        if (movie) {
            return movie.showtimes.sort((a, b) => {
                return daysOfWeekOrder.indexOf(a.dayOfWeek) - daysOfWeekOrder.indexOf(b.dayOfWeek);
            });
        }
        return [];
    }, [movie, daysOfWeekOrder]);

    if (!movie) {
        return <div>Movie not found</div>;
    }

    const handleProceedToBooking = () => {
        if (selectedShowtime) {
            console.log(selectedShowtime);
            
            navigate(`/booking/${id}/${selectedShowtime.day}/${selectedShowtime.time}`);
        }
    };

    const handleShowtimeSelect = (day, time) => {
        setSelectedShowtime({ day, time });
    };

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <img alt={movie.eventName} className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={movie.eventImgUrl} />
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">MOVIE</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{movie.eventName}</h1>
                        <div className="flex mb-4">
                            <span className="text-gray-600">Genre: {movie.genre}</span>
                        </div>
                        <p className="leading-relaxed">{movie.eventDetails}</p>
                        <div className="mt-6 mb-5">
                            <h2 className="text-2xl font-medium text-gray-900 mb-4">Available Showtimes</h2>
                            {orderedShowtimes.map(showtime => (
                                <div key={showtime.dayOfWeek} className="mb-4">
                                    <h3 className="text-xl font-medium text-gray-700 mb-2">{showtime.dayOfWeek}</h3>
                                    <div className="flex flex-wrap">
                                        {showtime.times.map(time => (
                                            <button 
                                                key={time} 
                                                onClick={() => handleShowtimeSelect(showtime.dayOfWeek, time)}
                                                className={`mr-2 mb-2 py-2 px-4 rounded ${selectedShowtime && selectedShowtime.day === showtime.dayOfWeek && selectedShowtime.time === time ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-900'}`}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {selectedShowtime && (
                            <div className="mt-4">
                                <p className="text-lg text-gray-900">
                                    Selected Showtime: {selectedShowtime.day} at {selectedShowtime.time}
                                </p>
                                <button onClick={handleProceedToBooking} className="bg-green-500 text-white py-2 px-4 rounded mt-2">
                                    Proceed to Booking
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MovieDetail;
