import React from 'react';
// import { events } from '../data/data.js';
import Card from './Card';
import { Link } from 'react-router-dom';



const Events = ({events}) => {
  return (
    <>
      {/* <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {events.map(event => (
              <Card
                key={event.id}
                image="https://dummyimage.com/720x400"
                title={event.name}
                category={event.category}
                description="A brief description of the event."
              />
            ))}
          </div>
        </div>
      </section> */}
      {/* <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-medium text-gray-900">Events</h1>
          <a href="/all-events" className="text-indigo-500 inline-flex items-center">
            View All
          </a>
        </div>
        <div className="flex flex-wrap -m-4">
          {events.map(event => (
            <Card
              key={event.id}
              image={event.image}
              title={event.name}
              category={event.category}
              description={event.description}
            />
          ))}
        </div>
      </div>
    </section> */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-medium text-gray-900">Events</h1>
            <Link to="/view-all/events" className="text-indigo-500 inline-flex items-center">
              View All
            </Link>
          </div>
          <div className="flex flex-wrap -m-4">
            {events.slice(0, 3).map(event => (
              <Card
                key={event._id}
                image={event.eventImgUrl}
                title={event.eventName}
                category={event.category}
                description={event.description}
                id={event.id}
                path={`/event/${event._id}`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Events;