import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [activities, setActivities] = useState([]);
  const [events, setEvents] = useState([]);

//   useEffect(() => {
//     // const fetchData = async () => {
//     //   try {
//     //     const moviesResponse = await axios.get('/api/movies');
//     //     const activitiesResponse = await axios.get('/api/activities');
//     //     const eventsResponse = await axios.get('/api/events');

//     //     setMovies(moviesResponse.data);
//     //     setActivities(activitiesResponse.data);
//     //     setEvents(eventsResponse.data);
//     //   } catch (error) {
//     //     console.error('Error fetching data:', error);
//     //   }
//     // };

//     // fetchData();
//   }, []);

  return (
    <DataContext.Provider value={{ movies, activities, events }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
