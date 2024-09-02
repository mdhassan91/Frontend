import React, { useEffect, useState } from 'react';
import Card from '../components/Card';
// import { movies, activities, events } from '../data/data';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from "axios";

const ViewAll = () => {
  const { category } = useParams();
  const navigate = useNavigate(); 
  const [movies, setMovies] = useState([]);
  const [items, setItems] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/event?all=true')
      .then(response => {
        const data = response.data.data;
        console.log(data);

        const movies = data.filter(event => event.eventType === 'movie');
        console.log(movies);
        // const activities = data.filter(event => event.eventCategory === 'activity');
        const events = data.filter(event => event.eventType === 'event');
        console.log(events);
        
        setMovies(movies);
        // setActivities(activities);
        setEvents(events);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  useEffect(() => {
    switch (category) {
      case 'movies':
        setItems(movies);
        break;
      case 'events':
        setItems(events);
        break;
      default:
        setItems([]);
    }
  }, [category, movies, events]);

  const handleLogout = () => {
    // onLogout();
    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
     {/* <Navbar handleLogout={handleLogout}/> */}
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <h1 className="text-2xl font-medium text-gray-900 mb-4 capitalize">{category}</h1>
        <div className="flex flex-wrap -m-4">
          {items.map(item => (
            <Card
              key={item.id}
              image={item.eventImgUrl}
              title={item.title || item.eventName}
              category={item.genre || item.type || item.category}
              description={item.description}
              path={item.eventType === 'movie'? `/movie/${item._id}`:`/event/${item._id}`}

            />
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default ViewAll;
