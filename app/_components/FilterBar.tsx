import React from 'react';
import { FaSearch, FaFilter, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaRoute } from 'react-icons/fa';

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
  scheduleIdFilter: string;
  setScheduleIdFilter: (scheduleId: string) => void;
  availableDestinations: string[];
  availableTimeSlots: string[];
  availableSchedules: Array<{ _id: string; departure: string; destination: string; departureTime?: string }>;
  clearAllFilters: () => void;
  showScheduleFilter?: boolean;
  loadingSchedules?: boolean;
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
  scheduleIdFilter,
  setScheduleIdFilter,
  availableDestinations,
  availableTimeSlots,
  availableSchedules,
  clearAllFilters,
  showScheduleFilter = false,
  loadingSchedules = false,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-6 gap-4 mb-4">
        {/* <div className="lg:col-span-2">
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
        </div> */}
        
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
              <option value="Arrived At Destination">Arrived</option>
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

        {showScheduleFilter && (
          <div>
            <div className="relative">
              <select
                className="w-full p-2 pl-10 border rounded-md appearance-none"
                value={scheduleIdFilter}
                onChange={(e) => setScheduleIdFilter(e.target.value)}
                disabled={loadingSchedules}
              >
                <option value="">
                  {loadingSchedules ? 'Loading schedules...' : 'All Schedules'}
                </option>
                {!loadingSchedules && availableSchedules.map(schedule => (
                  <option key={schedule._id} value={schedule._id}>
                    {schedule.departure} → {schedule.destination} {schedule.departureTime ? `(${schedule.departureTime})` : ''}
                  </option>
                ))}
              </select>
              <FaRoute className="absolute left-3 top-3 text-gray-400" />
              {loadingSchedules && (
                <div className="absolute right-3 top-3">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                </div>
              )}
            </div>
          </div>
        )}
        
        <div>
          <button
            onClick={clearAllFilters}
            className="w-full p-2 bg-primary text-white rounded-md transition-colors"
          >
            Clear All Filters
          </button>
        </div>
        
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">

        <div className="md:col-span-2 flex items-center text-sm text-gray-600">
          {(searchQuery || statusFilter !== 'All' || dateFilter || destinationFilter || timeSlotFilter || scheduleIdFilter) && (
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md">
              {[
                searchQuery && 'Search',
                statusFilter !== 'All' && 'Status',
                dateFilter && 'Date',
                destinationFilter && 'Destination',
                timeSlotFilter && 'Time',
                scheduleIdFilter && 'Schedule'
              ].filter(Boolean).join(', ')} filter(s) active
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar; 