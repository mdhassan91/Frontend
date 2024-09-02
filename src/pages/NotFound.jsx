import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-4xl mb-4">404 - Page Not Found</h1>
      <p className="mb-4">The page you are looking for does not exist.</p>
      <button 
        onClick={handleRedirect} 
        className="bg-indigo-500 text-white px-4 py-2 rounded"
      >
        Go to Login
      </button>
    </div>
  );
};

export default NotFound;
