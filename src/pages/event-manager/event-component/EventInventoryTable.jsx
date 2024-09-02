import React from 'react';

const EventInventoryTable = ({ movies, onEdit, onDelete }) => (
  <table className="min-w-full bg-white">
    <thead className="bg-gray-800 text-white">
      <tr>
        <th className="w-1/6 py-2">Genre</th>
        <th className="w-1/6 py-2">Movie Name</th>
        <th className="w-1/6 py-2">Release Date</th>
        <th className="w-1/6 py-2">Showtime</th>
        <th className="w-1/6 py-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {movies.map((movie) => (
        <tr key={movie.id}>
          <td className="py-2">{movie.genre}</td>
          <td className="py-2">{movie.name}</td>
          <td className="py-2">{movie.releaseDate}</td>
          <td className="py-2">{movie.showtime}</td>
          <td className="py-2">
            <button
              className="text-blue-500 mr-2"
              onClick={() => onEdit(movie)}
            >
              Edit
            </button>
            <button
              className="text-red-500"
              onClick={() => onDelete(movie.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default EventInventoryTable;
