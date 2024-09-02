import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Movies from '../components/Movies';
import Events from '../components/Events';
import SearchBar from '../components/SearchBar';

const LandingPage = ({ movies, setMovies, events, setEvents }) => {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    console.log('Movies data:', movies);
    console.log('Events data:', events);
  }, [movies, events]);

  // Ensure the search query is also lowercased for comparison
  const lowercasedQuery = searchQuery.toLowerCase();

  // Filter movies and events based on search query
  const filteredMovies = movies.filter(movie =>
    movie.eventName && movie.eventName.toLowerCase().includes(lowercasedQuery)
  );

  const filteredEvents = events.filter(event =>
    event.eventName && event.eventName.toLowerCase().includes(lowercasedQuery)
  );

  // Determine if filtered data should be shown
  const showMovies = searchQuery ? filteredMovies : movies;
  const showEvents = searchQuery ? filteredEvents : events;

  return (
    <>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {showMovies.length > 0 && <Movies movies={showMovies} setMovies={setMovies} />}
      {showEvents.length > 0 && <Events events={showEvents} />}
      {searchQuery && showMovies.length === 0 && showEvents.length === 0 && (
         <p className="text-center text-black-500 dark:text-black-400 mt-4">No results found</p>
      )}
    </>
  );
};

export default LandingPage;
