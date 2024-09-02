import React from 'react';
import Card from './Card';
// import { movies } from '../data/data.js';
import { Link } from 'react-router-dom';

const Movies = ({movies,setMovies}) => {
  console.log("Getting Movies...",movies);
    return (
        <>
      {/* <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {movies.map(movie => (
              <Card
                key={movie.id}
                image={movie.image}
                title={movie.title}
                category={movie.genre}
                description={movie.description}
              />
            ))}
          </div>
        </div>
      </section> */}
     <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-medium text-gray-900">Movies</h1>
          <Link to="/view-all/movies" className="text-indigo-500 inline-flex items-center">
            View All
          </Link>
        </div>
        <div className="flex flex-wrap -m-4">
          {movies.slice(0, 3).map(movie => (
            <Card
              key={movie._id}
              id={movie._id}
              image={movie.eventImgUrl}
              title={movie.eventName}
              category={movie.genre}
              description={movie.description}
              path={`/movie/${movie._id}`}
            />
          ))}
        </div>
      </div>
    </section>
        </>
    );
  };
  
  export default Movies;