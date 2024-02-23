import React, { useState } from 'react';

const LocationInput = ({ onSubmit }) => {
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(location);
    setLocation('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter city name"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button type="submit">Get Weather</button>
    </form>
  );
};

export default LocationInput;
