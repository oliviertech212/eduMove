import React from 'react';
import { FaSearch, FaFilter, FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  dateFilter: string;
  setDateFilter: (date: string) => void;
  destinationFilter: string;
  setDestinationFilter: (destination: string) => void;
  timeSlotFilter: string;
  setTimeSlotFilter: (timeSlot: string) => void;
  availableDestinations: string[];
  availableTimeSlots: string[];
  clearAllFilters: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
  destinationFilter,
  setDestinationFilter,
  timeSlotFilter,
  setTimeSlotFilter,
  availableDestinations,
  availableTimeSlots,
  clearAllFilters,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-4">
        <div className="lg:col-span-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by student name, travel number, or school"
              className="w-full p-2 pl-10 border rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
        
        <div>
          <div className="relative">
            <select
              className="w-full p-2 pl-10 border rounded-md appearance-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Boarded">Boarded</option>
              <option value="Denied">Denied</option>
            </select>
            <FaFilter className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
        
        <div>
          <div className="relative">
            <input
              type="date"
              className="w-full p-2 pl-10 border rounded-md"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
            <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
        
        <div>
          <div className="relative">
            <select
              className="w-full p-2 pl-10 border rounded-md appearance-none"
              value={destinationFilter}
              onChange={(e) => setDestinationFilter(e.target.value)}
            >
              <option value="">All Destinations</option>
              {availableDestinations.map(destination => (
                <option key={destination} value={destination}>{destination}</option>
              ))}
            </select>
            <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <div className="relative">
            <select
              className="w-full p-2 pl-10 border rounded-md appearance-none"
              value={timeSlotFilter}
              onChange={(e) => setTimeSlotFilter(e.target.value)}
            >
              <option value="">All Time Slots</option>
              {availableTimeSlots.map(timeSlot => (
                <option key={timeSlot} value={timeSlot}>{timeSlot}</option>
              ))}
            </select>
            <FaClock className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
        
        <div>
          <button
            onClick={clearAllFilters}
            className="w-full p-2 bg-primary text-white rounded-md transition-colors"
          >
            Clear All Filters
          </button>
        </div>
        
        <div className="md:col-span-2 flex items-center text-sm text-gray-600">
          {(searchQuery || statusFilter !== 'All' || dateFilter || destinationFilter || timeSlotFilter) && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md">
              {[
                searchQuery && 'Search',
                statusFilter !== 'All' && 'Status',
                dateFilter && 'Date',
                destinationFilter && 'Destination',
                timeSlotFilter && 'Time'
              ].filter(Boolean).join(', ')} filter(s) active
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar; 