import React from 'react';

const MovieSelector = ({ handleMovieSelect }) => {
  return (
    <div className="flex items-center mb-4">
      <label className="mr-4">Pick a movie:</label>
      <select 
        id="movies" 
        onChange={handleMovieSelect} 
        className="bg-white text-black rounded px-4 py-2"
      >
        <option value="10">Avenger($10)</option>
        <option value="12">Joker($12)</option>
        <option value="8">Toy story($8)</option>
        <option value="9">The Lion King($9)</option>
      </select>
    </div>
  );
};

export default MovieSelector;
