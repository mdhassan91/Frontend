import React, { useState } from 'react';

const EventForm = ({ movie, onSave }) => {
  const [formData, setFormData] = useState(movie || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="genre" className="block text-sm font-medium text-gray-700">Genre</label>
        <input
          type="text"
          name="genre"
          id="genre"
          value={formData.genre || ''}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="movieName" className="block text-sm font-medium text-gray-700">Movie Name</label>
        <input
          type="text"
          name="movieName"
          id="movieName"
          value={formData.movieName || ''}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-700">Release Date</label>
        <input
          type="date"
          name="releaseDate"
          id="releaseDate"
          value={formData.releaseDate || ''}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="showtime" className="block text-sm font-medium text-gray-700">Showtime</label>
        <input
          type="time"
          name="showtime"
          id="showtime"
          value={formData.showtime || ''}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="imdbRating" className="block text-sm font-medium text-gray-700">IMDb Rating</label>
        <input
          type="number"
          step="0.1"
          name="imdbRating"
          id="imdbRating"
          value={formData.imdbRating || ''}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          id="description"
          value={formData.description || ''}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600">
        Save
      </button>
    </form>
  );
};

export default EventForm;
