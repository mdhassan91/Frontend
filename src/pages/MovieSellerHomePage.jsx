import React from 'react';
import { useNavigate } from 'react-router-dom';
import MovieSellerNavbar from './movie-seller/movie-components/MovieSellerNavbar';
import MovieDashboard from './movie-seller/MovieDashboard';
import AddMovie from './movie-seller/AddMovie';

const MovieSellerHomePage = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div>
      {/* <MovieSellerNavbar/> */}
      <MovieDashboard/>
      {/* <AddMovie/>  */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default MovieSellerHomePage;
