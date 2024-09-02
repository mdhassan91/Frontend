import React from 'react';

const SeatCategorySelector = ({ seatCategories, handleCategorySelect }) => {
  return (
    <div className="flex items-center mb-4">
      <label className="mr-4">Pick a seat category:</label>
      <select 
        id="categories" 
        onChange={handleCategorySelect} 
        className="bg-white text-black rounded px-4 py-2"
      >
        {Object.entries(seatCategories).map(([key, value]) => (
          <option key={key} value={key}>
            {value.label} (${value.price})
          </option>
        ))}
      </select>
    </div>
  );
};

export default SeatCategorySelector;
