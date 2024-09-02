import React, { useState, useEffect } from "react";
import axios from "axios";

const DeleteEvent = ({ eventId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.delete(
        `http://localhost:8000/event/${eventId}`
      );
      console.log(response.data);
      // Handle successful deletion
    } catch (error) {
      console.error(error);
      setError("Failed to delete event");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading && <p>Deleting...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!isLoading && !error && (
        <button onClick={handleDelete}>Delete Event</button>
      )}
    </div>
  );
};

export default DeleteEvent;
