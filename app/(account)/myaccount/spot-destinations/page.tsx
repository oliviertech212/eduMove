"use client";

import { TravelPlan } from '@/app/_components/travel-plans';
import { ScheduleType, TravelBooking, UserType } from '@/types';
import axios from 'axios';
import { format } from 'date-fns';
import { FaPlus, FaEdit, FaTrash, FaMapMarkerAlt, FaClock, FaBus } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import FilterBar from '@/app/_components/FilterBar';
import BookingTable from '@/app/_components/BookingTable';
import TripForm from '@/app/_components/TripForm';

// Available Spots Management Page
const TransporterDestinationSpotManagement = () => {
  const [activeTab, setActiveTab] = useState<'trips' | 'bookings'>('trips');
  const [travelPlans, setTravelPlans] = useState<TravelPlan[]>([]);
  const [travelSchedule, setTravelSchedule] = useState<ScheduleType[]>([]);
  const [loadschedule, setLoadSchedule] = useState(true);
  const [user, setUser] = useState<UserType>();
  const [showTripForm, setShowTripForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState<ScheduleType | null>(null);
  const [tripSlots, setTripSlots] = useState<any[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<TravelPlan | null>(null);
  const [tripForm, setTripForm] = useState({
    plan: '',
    transporter: user?._id,
    price: 0,
    departure: '',
    destination: '',
    timeSlots: tripSlots
  });
  const [bookings, setBookings] = useState<TravelBooking[]>([]);
  const [statusFilter, setStatusFilter] = useState<string | 'All'>('All');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [destinationFilter, setDestinationFilter] = useState<string>('');
  const [timeSlotFilter, setTimeSlotFilter] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [availableDestinations, setAvailableDestinations] = useState<string[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  const [loadarrival, setLoadarrival] = useState<{ [key: string]: boolean }>({});

  // Build query parameters for API
  const buildQueryParams = () => {
    const params = new URLSearchParams();
    if (searchQuery) params.append('search', searchQuery);
    if (statusFilter && statusFilter !== 'All') params.append('status', statusFilter);
    if (dateFilter) params.append('date', dateFilter);
    if (destinationFilter) params.append('destination', destinationFilter);
    if (timeSlotFilter) params.append('timeSlot', timeSlotFilter);
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
  };

  console.log("travelplaan",travelPlans,"selected plan", selectedPlan );
  

  // Handle form input changes
  const handleTripFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'plan') {
      const selectedP = travelPlans.find(plan => plan._id === value);
      if (selectedP) {
        setSelectedPlan(selectedP);
      }
    }

    setTripForm({
      ...tripForm,
      [name]: name === 'price' ? parseInt(value) : value
    });
  };

  // Handle time slot changes
  const handleTimeSlotChange = (index: number, field: string, value: any) => {
    const updatedSlots = [...tripForm.timeSlots];
    updatedSlots[index][field] = field === 'slots' ? parseInt(value) : value;
    
    setTripForm({
      ...tripForm,
      timeSlots: updatedSlots
    });
  };

  const handleConfirmDestinationArrival = async (scheduleId: string, timeslot: string) => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      toast.error('Authentication token not found. Please log in again.');
      return;
    }

    try {
      // Set loading state for this specific slot
      setLoadarrival(prev => ({ ...prev, [scheduleId]: true }));

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}travels/${scheduleId}/arrived-at-destination?timeSlot=${timeslot}`,
        {}, 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Handle success response
      if (response.data.status === "success") {
        toast.success(response.data.message);
        await getAllTransporterBookings();
      } else {
        toast.error(response.data.message || 'Failed to confirm arrival');
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error('Authentication failed. Please log in again.');
      } else if (error.response?.status === 404) {
        toast.error('Schedule not found.');
      } else {
        toast.error(error.response?.data?.message || 'Failed to confirm arrival. Please try again.');
      }
    } finally {
      // Clear loading state for this specific slot
      setLoadarrival(prev => ({ ...prev, [scheduleId]: false }));
    }
  };

  // Add a new time slot
  const addTimeSlot = () => {
    setTripForm({
      ...tripForm,
      timeSlots: [...tripForm.timeSlots, { time: '', slots: 0 }]
    });
  };

  // Remove a time slot
  const removeTimeSlot = (index: number) => {
    const updatedSlots = [...tripForm.timeSlots];
    updatedSlots.splice(index, 1);
    setTripForm({
      ...tripForm,
      timeSlots: updatedSlots
    });
  };

  // Submit form to add/edit trip
  const handleSubmitTripForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    try {
      if (editingTrip) {
        toast.success('Trip updated successfully!');
      } else {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}schedules`,
          {
            ...tripForm,
            transporter: user?._id,
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );
        toast.success('Trip added successfully!');
        getallTravelSchedule();
      }
      
      setShowTripForm(false);
    } catch (error) {
      console.error('Error saving trip:', error);
      toast.error('Failed to save trip. Please try again.');
    }
  };

  // Open form for adding new trip
  const handleAddTrip = () => {
    setEditingTrip(null);
    setShowTripForm(true);
  };

  // Open form for editing trip
  const handleEditTrip = (trip: ScheduleType) => {
    setShowTripForm(true);
  };

  // Delete trip
  const handleDeleteTrip = async (tripId: string) => {
    if (!confirm('Are you sure you want to delete this trip? This action cannot be undone.')) {
      return;
    }
    
    try {
      // Add delete functionality here
    } catch (error) {
      console.error('Error deleting trip:', error);
      toast.error('Failed to delete trip. Please try again.');
    }
  };

  const getallTravelSchedule = async () => {
    const user = localStorage.getItem("user");
    const savedUser = user ? JSON.parse(user) : null;
    setLoadSchedule(false);
    
    if (!savedUser?._id) {
      console.warn('No user ID found');
      toast.error('Please log in again');
      return;
    }
    
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}transporters/${savedUser._id}/schedules`);
      
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
              getallTravelSchedule(),
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
  }, [searchQuery, statusFilter, dateFilter, destinationFilter, timeSlotFilter]);

  if (loadschedule) {
    return (
      <div className="mx-auto mt-32 p-4 w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Transport Management</h1>
      
      <div className="flex border-b mb-6">
        <button 
          className={`py-2 px-4 font-semibold ${activeTab === 'trips' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
          onClick={() => setActiveTab('trips')}
        >
          Available Spots 
        </button>
        <button 
          className={`py-2 px-4 font-semibold ${activeTab === 'bookings' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
          onClick={() => setActiveTab('bookings')}
        >
          Bookings
        </button>
      </div>
      
      {activeTab === 'trips' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Available Bus Trips</h2>
            <button 
              className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2"
              onClick={handleAddTrip}
            >
              <FaPlus /> Add Trip
            </button>
          </div>
          
          <TripForm
            showTripForm={showTripForm}
            setShowTripForm={setShowTripForm}
            editingTrip={editingTrip}
            tripForm={tripForm}
            setTripForm={setTripForm}
            travelPlans={travelPlans}
            selectedPlan={selectedPlan}
            handleTripFormChange={handleTripFormChange}
            handleTimeSlotChange={handleTimeSlotChange}
            addTimeSlot={addTimeSlot}
            removeTimeSlot={removeTimeSlot}
            handleSubmitTripForm={handleSubmitTripForm}
          />
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departure Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Arrival Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {travelSchedule.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      No trips available. Add a new trip to get started.
                    </td>
                  </tr>
                ) : (
                  travelSchedule.flatMap((trip) => (
                    trip.timeSlots.map((slot, slotIndex) => (
                      <tr key={`${trip._id}-${slotIndex}`} className={`hover:bg-gray-50 ${slotIndex !== 0 && 'border-t border-dashed border-gray-100'}`}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {slotIndex === 0 ? (
                            <div className="flex items-center">
                              <FaMapMarkerAlt className="text-primary mr-2" />
                              <div className="font-medium">{trip.departure}</div>
                            </div>
                          ) : null}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {slotIndex === 0 ? (
                            <div className="flex items-center">
                              <FaMapMarkerAlt className="text-primary mr-2" />
                              <div className="font-medium">{trip.destination}</div>
                            </div>
                          ) : null}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FaClock className="text-gray-400 mr-2" />
                            <span>{slot.time}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FaBus className="text-gray-400 mr-2" />
                            <span>20</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            slot.slots === 0 
                              ? 'bg-red-100 text-red-800' 
                              : slot.slots < 5 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-green-100 text-green-800'
                          }`}>
                            {slot.slots}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {slotIndex === 0 ? `RWF ${trip.price.toLocaleString()}` : null}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {slotIndex === 0 ? (
                            <>
                              <button 
                                onClick={() => handleEditTrip(trip)}
                                className="text-indigo-600 hover:text-indigo-900 mr-3"
                              >
                                <FaEdit />
                              </button>

                              <button 
                                onClick={() => handleDeleteTrip(trip._id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <FaTrash />
                              </button>
                            </>
                          ) : null}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleConfirmDestinationArrival(trip._id, slot.time)}
                            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded disabled:opacity-50 flex items-center gap-2"
                            disabled={loadarrival[`${trip._id}-${slot.time}`]}
                          >
                            {loadarrival[`${trip._id}-${slot.time}`] ? (
                              <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                <span>Confirming...</span>
                              </div>
                            ) : (
                              'Confirm Arrival'
                            )}
                          </button>
                        </td>
                      </tr>
                    ))
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {activeTab === 'bookings' && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Bookings</h2>
            
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
              availableDestinations={availableDestinations}
              availableTimeSlots={availableTimeSlots}
              clearAllFilters={clearAllFilters}
            />
            
            <BookingTable
              bookings={bookings}
              loading={loading}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TransporterDestinationSpotManagement;