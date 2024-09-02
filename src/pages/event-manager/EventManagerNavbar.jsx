import React from 'react';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';


const EventManagerNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
};

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 p-4 flex items-center justify-between">
      <div className="flex space-x-4">
        {/* <Link to="/" className="text-gray-900 dark:text-white hover:text-blue-700">Home</Link> */}
        <Link to="/event-dashboard" className="text-gray-900 dark:text-white hover:text-blue-700">Dashboard</Link>
        <Link to="/profile-event-seller" className="text-gray-900 dark:text-white hover:text-blue-700">Profile</Link>
        <Link to="/add-event" className="text-gray-900 dark:text-white hover:text-blue-700">Add Event</Link>

      </div>
      <button className="text-gray-900 dark:text-white hover:text-blue-700" onClick={() => handleLogout()}>Logout</button>
    </nav>
  );
};

export default EventManagerNavbar;
