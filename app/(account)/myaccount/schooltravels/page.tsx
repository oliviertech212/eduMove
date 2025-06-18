"use client";

import { TravelPlan } from '@/app/_components/travel-plans';
import { ScheduleType, TravelBooking, UserType } from '@/types';
import axios from 'axios';
import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import FilterBar from '@/app/_components/FilterBar';
import BookingTable from '@/app/_components/BookingTable';

// transportes 
//   [
//     {
//         "_id": "684edcfc0c887d6282a186e5",
//         "name": "Kigali Transporters Ltd",
//         "email": "oliviertech27@gmail.com",
//         "phoneNumber": "+250780123456",
//         "role": "transporter",
//         "areaOfOperations": [
//             "Kigali",
//             "Huye",
//             "Musanze"
//         ],
//         "createdAt": "2025-06-15T14:47:24.895Z",
//         "updatedAt": "2025-06-15T14:47:24.895Z",
//         "__v": 0
//     },
//     {
//         "_id": "684edcfd0c887d6282a186e7",
//         "name": "Eastern Routes Co.",
//         "email": "eric.tuyizere.ndungutse@gmail.com",
//         "phoneNumber": "+250780654321",
//         "role": "transporter",
//         "areaOfOperations": [
//             "Kayonza",
//             "Ngoma",
//             "Rwamagana"
//         ],
//         "createdAt": "2025-06-15T14:47:25.296Z",
//         "updatedAt": "2025-06-15T14:47:25.296Z",
//         "__v": 0
//     }
// ]

// Available Spots Management Page
const TransporterDestinationSpotManagement = () => {
  const [activeTab, setActiveTab] = useState<'trips' | 'bookings'>('trips');
  const [travelPlans, setTravelPlans] = useState<TravelPlan[]>([]);
  const [transporters, setTransporters] = useState<any[]>([]);
  const [travelSchedule, setTravelSchedule] = useState<ScheduleType[]>([]);
  const [loadschedule, setLoadSchedule] = useState(true);
  const [user, setUser] = useState<UserType>();
  const [tripSlots, setTripSlots] = useState<any[]>([]);

  const [bookings, setBookings] = useState<TravelBooking[]>([]);
  const [statusFilter, setStatusFilter] = useState<string | 'All'>('All');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [scheduleIdFilter, setScheduleIdFilter] = useState<string>('');
  const [destinationFilter, setDestinationFilter] = useState<string>('');
  const [timeSlotFilter, setTimeSlotFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [availableDestinations, setAvailableDestinations] = useState<string[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [availableSchedules, setAvailableSchedules] = useState<Array<{ _id: string; departure: string; destination: string; departureTime?: string }>>([]);
  const [loadarrival, setLoadarrival] = useState<{ [key: string]: boolean }>({});
  const [transporterID, setTransporterID] = useState<string>('');
  const [selectedTransporter, setSelectedTransporter] = useState<string>('');
  const [loadingSchedules, setLoadingSchedules] = useState<boolean>(false);

  const fetchTransporters = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}transporters`);
      console.log('Transporters:', response.data);
      setTransporters(response.data);
    } catch (error) {
      console.error('Error fetching transporters:', error);
      toast.error('Failed to load transporters');
    }
  };

  // Build query parameters for API
  const buildQueryParams = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.append('search', searchQuery);
    if (statusFilter && statusFilter !== 'All') params.append('status', statusFilter);
    if (dateFilter) params.append('date', dateFilter);
    if (destinationFilter) params.append('destination', destinationFilter);
    if (timeSlotFilter) params.append('timeSlot', timeSlotFilter);
    if (scheduleIdFilter) params.append('scheduleId', scheduleIdFilter);
    return params.toString();
  };

  // Get all transporter bookings with filters
  const getAllTransporterBookings = async () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const savedUser = user ? JSON.parse(user) : null;
    
    if (!savedUser?._id) {
      toast.error('User not found. Please log in again.');
      return;
    }

    try {
      setLoading(true);
      const queryParams = buildQueryParams();
      const url = `${process.env.NEXT_PUBLIC_API_URL}travels${queryParams ? `?${queryParams}` : ''}`;
      
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const bookingsData = response.data.data || response.data || [];
      setBookings(bookingsData);
      
      const destinations = [...new Set(bookingsData.map((booking:any) => booking.travelDetails.destination))];
      const timeSlots = [...new Set(bookingsData.map((booking:any) => booking.travelDetails.departureTime))];
      
      setAvailableDestinations(destinations as string[]);
      setAvailableTimeSlots(timeSlots as string[]);
      
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setDateFilter('');
    setDestinationFilter('');
    setTimeSlotFilter('');
    setScheduleIdFilter('');
  };

  // Fetch schedules for a specific transporter
  const fetchTransporterSchedules = async (transporterId: string) => {
    try {
      setLoadingSchedules(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}transporters/${transporterId}/schedules`);
      
      if (response?.data?.data?.schedules) {
        const schedules = response.data.data.schedules;
        setTravelSchedule(schedules);
        
        // Format schedules for the filter dropdown
        const formattedSchedules = schedules.map((schedule: ScheduleType) => ({
          _id: schedule._id,
          departure: schedule.departure,
          destination: schedule.destination,
          departureTime: schedule.departureTime
        }));
        setAvailableSchedules(formattedSchedules);
      } else if (response?.data) {
        const schedules = Array.isArray(response.data) ? response.data : [];
        setTravelSchedule(schedules);
        
        const formattedSchedules = schedules.map((schedule: ScheduleType) => ({
          _id: schedule._id,
          departure: schedule.departure,
          destination: schedule.destination,
          departureTime: schedule.departureTime
        }));
        setAvailableSchedules(formattedSchedules);
      } else {
        console.warn('No schedule data received');
        setTravelSchedule([]);
        setAvailableSchedules([]);
      }
    } catch (error) {
      console.error('Error fetching travel schedules:', error);
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        switch (status) {
          case 404:
            toast.error('No schedules found for this transporter');
            break;
          case 401:
            toast.error('Please log in again');
            break;
          case 403:
            toast.error('You do not have permission to view schedules');
            break;
          case 500:
            toast.error('Server error. Please try again later');
            break;
          default:
            toast.error('Failed to load travel schedules');
        }
      } else {
        toast.error('Network error. Please check your connection');
      }
      setTravelSchedule([]);
      setAvailableSchedules([]);
    } finally {
      setLoadingSchedules(false);
    }
  };

  // Handle transporter selection
  const handleTransporterChange = (transporterId: string) => {
    setSelectedTransporter(transporterId);
    setTransporterID(transporterId);
    setScheduleIdFilter(''); // Clear schedule filter when transporter changes
    if (transporterId) {
      fetchTransporterSchedules(transporterId);
    } else {
      setTravelSchedule([]);
      setAvailableSchedules([]);
    }
  };

  const getallTravelSchedule = async () => {
    if (!transporterID) return;
    
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}transporters/${transporterID}/schedules`);
      
      if (response?.data?.data?.schedules) {
        setTravelSchedule(response.data.data.schedules);
      } else if (response?.data) {
        setTravelSchedule(Array.isArray(response.data) ? response.data : []);
      } else {
        console.warn('No schedule data received');
        setTravelSchedule([]);
      }
    } catch (error) {
      console.error('Error fetching travel schedules:', error);
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        switch (status) {
          case 404:
            toast.error('Travel schedules feature is not available yet');
            break;
          case 401:
            toast.error('Please log in again');
            break;
          case 403:
            toast.error('You do not have permission to view schedules');
            break;
          case 500:
            toast.error('Server error. Please try again later');
            break;
          default:
            toast.error('Failed to load travel schedules');
        }
      } else {
        toast.error('Network error. Please check your connection');
      }
      setTravelSchedule([]);
    }
  };

  const getallTravelPlans = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}plans`);
      setTravelPlans(response?.data || []);
    } catch (error) {
      console.error('Error fetching travel plans:', error);
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        toast.error('Travel plans feature is not available yet');
      } else {
        toast.error('Failed to load travel plans');
      }
      setTravelPlans([]);
    }
  };

  useEffect(() => {
    const initializeData = async () => {
      if (typeof window !== "undefined") {
        const user = localStorage.getItem("user");
        const savedUser = user ? JSON.parse(user) : null;
        
        if (savedUser) {
          setUser(savedUser);
          try {
            await Promise.allSettled([
              fetchTransporters(),
              getAllTransporterBookings(),
              getallTravelPlans()
            ]);
          } catch (error) {
            console.error('Error initializing data:', error);
          }
        } else {
          setLoadSchedule(false);
          setTravelSchedule([]);
          setBookings([]);
          setTravelPlans([]);
          toast.error('Please log in to view your data');
        }
      }
    };
    
    initializeData();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getAllTransporterBookings();
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [searchQuery, statusFilter, dateFilter, destinationFilter, timeSlotFilter, scheduleIdFilter]);

  // Check if user should see schedule filter (admin, transporter, or school roles)
  const shouldShowScheduleFilter = () => {
    if (!user) return false;
    return ['admin', 'transporter', 'school'].includes(user.role.toLowerCase());
  };

  // if (loadschedule) {
  //   return (
  //     <div className="mx-auto mt-32 p-4 w-full">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Transport Management</h1>
      
      <div className="flex border-b mb-6">
        <button 
          className={`py-2 px-4 font-semibold ${activeTab === 'trips' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
          onClick={() => setActiveTab('trips')}
        >
          All Travels
        </button>
      </div>

      <div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Bookings</h2>
          
          {/* Transporter Selection (only show if user has permission) */}
          {shouldShowScheduleFilter() && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Transporter (Optional)
              </label>
              <div className="flex gap-2">
                <select
                  className="flex-1 p-2 border rounded-md"
                  value={selectedTransporter}
                  onChange={(e) => handleTransporterChange(e.target.value)}
                  disabled={loadingSchedules}
                >
                  <option value="">All Transporters</option>
                  {transporters.map(transporter => (
                    <option key={transporter._id} value={transporter._id}>
                      {transporter.name}
                    </option>
                  ))}
                </select>
                {loadingSchedules && (
                  <div className="flex items-center px-3">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  </div>
                )}
              </div>
              {selectedTransporter && availableSchedules.length === 0 && !loadingSchedules && (
                <p className="text-sm text-gray-500 mt-1">No schedules available for this transporter</p>
              )}
            </div>
          )}
          
          <FilterBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
            destinationFilter={destinationFilter}
            setDestinationFilter={setDestinationFilter}
            timeSlotFilter={timeSlotFilter}
            setTimeSlotFilter={setTimeSlotFilter}
            scheduleIdFilter={scheduleIdFilter}
            setScheduleIdFilter={setScheduleIdFilter}
            availableDestinations={availableDestinations}
            availableTimeSlots={availableTimeSlots}
            availableSchedules={availableSchedules}
            clearAllFilters={clearAllFilters}
            showScheduleFilter={shouldShowScheduleFilter()}
            loadingSchedules={loadingSchedules}
          />
          
          <BookingTable
            bookings={bookings}
            loading={loading}
          />
        </div>
      </div>
      
    </div>
  );
};

export default TransporterDestinationSpotManagement;