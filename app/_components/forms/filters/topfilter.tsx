import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';

interface TripFilterProps {
  handleTripDestination: (from: string, to: string) => void;
}

const TripFilter: React.FC<TripFilterProps> = ({ handleTripDestination }) => {
  const [fromDestination, setFromDestination] = useState('');
  const [toDestination, setToDestination] = useState('');

  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromDestination(value);
    handleTripDestination(value, toDestination);
  };

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setToDestination(value);
    handleTripDestination(fromDestination, value);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center">
          <FaFilter className="text-gray-400 mr-2" />
        </div>
        <div>
          <label htmlFor="fromDestination" className="block text-sm font-medium mb-1">
            Start District/City
          </label>
          <input
            id="fromDestination"
            type="text"
            value={fromDestination}
            onChange={handleFromChange}
            placeholder="Filter by district"
            className="w-full p-2 border rounded-md text-black"
          />
        </div>
        <div>
          <label htmlFor="toDestination" className="block text-sm font-medium mb-1">
            End District/City
          </label>
          <input
            id="toDestination"
            type="text"
            value={toDestination}
            onChange={handleToChange}
            placeholder="Filter by district"
            className="w-full p-2 border rounded-md text-black"
          />
        </div>
      </div>
    </div>
  );
};

export default TripFilter;