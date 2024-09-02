import React from 'react';
import { useNavigate } from 'react-router-dom';
import Movies from '../components/Movies';
import Activities from '../components/Activities';
import Events from '../components/Events';
import SearchBar from '../components/SearchBar';
import { movies, activities, events } from '../data/data.js';
import LandingPage from './LandingPage';
import Navbar from '../components/Navbar';

const UserHomePage = ({ onLogout ,movies,setMovies,events,setEvents }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
    {/* <Navbar handleLogout={handleLogout}/> */}
      {/* <button onClick={handleLogout}>Logout</button> */}
      <LandingPage movies={movies} setMovies={setMovies}  events={events} setEvents={setEvents}/>
    </>
  );
};

export default UserHomePage;
