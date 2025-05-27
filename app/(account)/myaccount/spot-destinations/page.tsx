"use client";

import { TravelPlan } from '@/app/_components/travel-plans';
import { ScheduleType, TravelBooking, UserType } from '@/types';
import axios from 'axios';
import { format, set } from 'date-fns';
import { FiPlus, FiTrash2, FiX } from 'react-icons/fi';
import React, { useState, useEffect } from 'react';
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaFilter, 
  FaCalendarAlt, 
  FaClock, 
  FaMapMarkerAlt, 
  FaBus, 
  FaUsers
} from 'react-icons/fa';
import { toast } from 'sonner';
// Available Spots Management Page
const TransporterDestinationSpotManagement = () => {
  const [activeTab, setActiveTab] = useState<'trips' | 'bookings'>('trips');
  const [travelPlans, setTravelPlans] = useState<TravelPlan[]>([]);
  const [travelSchedule , setTravelSchedule ] = useState<ScheduleType[]>([]);
  const [loadschedule, setLoadSchedule] = useState(true);
  const [user , setUser] = useState<UserType>();
 
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
    // State for filters
    const [bookingFilters, setBookingFilters] = useState({
      district: '',
      date: '',
      status: '',
    });
 


   // Submit form to add/edit trip
   const handleSubmitTripForm = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    
    try {
      if (editingTrip) {
       
        toast.success('Trip updated successfully!');
      } else {

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}schedules`, {...tripForm,
          transporter: user?._id,
        } ,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }); 
      
        toast.success('Trip added successfully!');
        getallTravelSchedule();
      }
      
      setShowTripForm(false);
    } catch (error) {
      console.error('Error saving trip:', error);
      toast.error('Failed to save trip. Please try again.');
    }
  };
  

  
  // Handle form input changes
  const handleTripFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'plan') {
      const selectedP = travelPlans.find(plan => plan._id === value);

    
      if (selectedP) {
        setSelectedPlan( selectedP);
       
      }
    }

    // check on expectederrival time  if not less than selected plan time and date 

    console.log("selected plan",selectedPlan);
    

    if (name === 'expectedArrivalTime') {
      const selectedDate = new Date(value);
      const selectedPlanDate = new Date(selectedPlan?.date || '');
      if (selectedDate < selectedPlanDate) {
        toast.error('Expected arrival time cannot be earlier than the selected travel plan date.');
        return;
      }
    }


    setTripForm({
      ...tripForm,
      [name]: 
      name === 'price' ? parseInt(value) : value
    });
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
    
    } catch (error) {
      console.error('Error deleting trip:', error);
      toast.error('Failed to delete trip. Please try again.');
    }
  };
  



  // Handle filter change
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Clear filters
  const clearFilters = () => {
    setBookingFilters({
      district: '',
      date: '',
      status: '',
    });
  };

  // Apply booking filters
  const filteredBookings = bookings.filter(booking => {
    const { district, date, status } = bookingFilters;

    // Filter by district
    const districtMatch = district
      ? booking.travelDetails.destination.toLowerCase().includes(district.toLowerCase())
      : true;

    // Filter by departure date
    const dateMatch = date
      ? new Date(booking.travelDetails.plan.date).toISOString().split('T')[0] === date
      : true;

    // Filter by status
    const statusMatch = status ? booking.status === status : true;

    // Combine all filters
    return districtMatch && dateMatch && statusMatch;
  });


    // Handle time slot changes
    const handleTimeSlotChange = (index:any, field:any, value :any) => {
      const updatedSlots = [...tripForm.timeSlots];
      updatedSlots[index][field] = field === 'slots' ? parseInt(value) : value;

      // Check if expected arrival time is less than the selected plan date
      if (field === 'expectedArrivalTime') {
        const selectedDate = new Date(value);
        const selectedPlanDate = new Date(selectedPlan?.date || '');
        if (selectedDate < selectedPlanDate) {
          toast.error('Expected arrival time cannot be earlier than the selected travel plan date.');
          return;
        }
      }
      
      setTripForm({
        ...tripForm,
        timeSlots: updatedSlots
      });
    };
  
    // Add a new time slot
    const addTimeSlot = () => {
      setTripForm({
        ...tripForm,
        timeSlots: [...tripForm.timeSlots, { time: '', slots: 0 }]
      });
    };
  
    // Remove a time slot
    const removeTimeSlot = (index:any) => {
      const updatedSlots = [...tripForm.timeSlots];
      updatedSlots.splice(index, 1);
      setTripForm({
        ...tripForm,
        timeSlots: updatedSlots
      });
    };

  const getallTravelSchedule = async () => {
    const user = localStorage.getItem("user");
    const savedUser = user ? JSON.parse(user) : null;
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}transporters/${savedUser?._id}/schedules`); 
      console.log("trvel plan",response.data.data.schedules);
      setLoadSchedule(false);
      setTravelSchedule (response.data.data.schedules);
    } catch (error) {
      setLoadSchedule(false);
      console.error('Error fetching travel plans:', error);
      toast.error('Failed to load travel plans. Please try again.');
    }
  }

  const getallTravelPlans = async () => {

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}plans`); 
      setTravelPlans(response.data);
    } catch (error) {
      console.error('Error fetching travel plans:', error);
      toast.error('Failed to load travel plans. Please try again.');
    }
  }


  const getallTransporterbookings = async () => {
    const token = localStorage.getItem("token");

    const user = localStorage.getItem("user");
    const savedUser = user ? JSON.parse(user) : null;
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}transporters/${savedUser?._id}/travels`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log("bookings response form api",response.data);
      
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load bookings. Please try again.');
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      const savedUser = user ? JSON.parse(user) : null;
      console.log("user",savedUser );
      
      setUser(savedUser);

      
     getallTravelSchedule(); 
      getallTransporterbookings();
     getallTravelPlans();
    }
  }, []);



  if (loadschedule){
    
    
  return(  <>
    <div className="mx-auto mt-32 p-4 w-full">
 
 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
 </div>
</>)
  }
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Transport Management</h1>
      
      {/* Tabs */}
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
      
      {/* Available Spots Tab */}
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
          
          {/* Trip Form Modal */}
          {showTripForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ">
              <div className="bg-white p-6 rounded-lg shadow-lg  max-w-md w-[500px]">
                <h3 className="text-xl font-semibold mb-4">
                  {editingTrip ? 'Edit Trip' : 'Add New Trip'}
                </h3>
                
                <form onSubmit={handleSubmitTripForm}>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">To</label>
  
                    <select 
                      name="plan" 
                      value={tripForm.plan} 
                      onChange={handleTripFormChange}
                      className="w-full p-2 border rounded-md"
                      required
                    >
                      <option value="">Select Travel plan</option>
                      {travelPlans
                        .filter(dest => new Date(dest.date) > new Date())
                        .map(dest => (
                          <option key={dest._id} value={dest._id}>
                            {dest.province} ({dest.destinations.join(', ')}) — {format(new Date(dest.date), ' dd MMMM yyyy HH:mm:ss')}
                         
                          </option>
                        ))}
                    </select>
                    
                                      </div>
                    


                 {/* Time Slots Section */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium">Time Slots</label>
                  <button 
                    type="button" 
                    onClick={addTimeSlot}
                    className="text-primary text-sm flex items-center"
                  >
                    <FiPlus className="mr-1" /> Add Time Slot
                  </button>
                </div>
                
                {tripForm.timeSlots.length === 0 && (
                  <p className="text-sm text-gray-500 mb-2">
                    No time slots added. Click the button above to add one.
                  </p>
                )}
                
                {tripForm.timeSlots.map((slot, index) => (
                 

                 <div key={index} className='bg-primary p-2 mt-2'>
                   <div  className="flex items-center gap-2 mb-2 p-2 border rounded-md bg-gray-50">
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 mb-1">Time</label>
                      <input
                        type="time"
                        value={slot.time}
                        onChange={(e) => handleTimeSlotChange(index, 'time', e.target.value)}
                        className="w-full p-2 border rounded-md text-sm"
                        required
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs text-gray-500 mb-1">Available Slots</label>
                      <input
                        type="number"
                        value={slot.slots}
                        onChange={(e) => handleTimeSlotChange(index, 'slots', parseInt(e.target.value))}
                        min="1"
                        className="w-full p-2 border rounded-md text-sm"
                        required
                      />
                    </div>
                    {/* "busNumber": "RAB2343",
                    "expectedArivalTime": "2025-03-13T18:06:39.159Z" */}

                   

                    <button
                      type="button"
                      onClick={() => removeTimeSlot(index)}
                      className="mt-5 p-2 text-red-500 hover:bg-red-50 rounded-full"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                   <div  className="flex items-center gap-2 mb-2 p-2 border rounded-md bg-gray-50">

                    <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">Bus Number</label>
                    <input
                      type="text"
                      value={slot.busNumber}
                      onChange={(e) => handleTimeSlotChange(index, 'busNumber', e.target.value)}
                      className="w-full p-2 border rounded-md text-sm"
                      required
                    />
                    </div>
                    
                    <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">Expected Arrival Time</label>
                    <input
                      type="datetime-local"
                      value={slot.expectedArivalTime}
                      onChange={(e) => handleTimeSlotChange(index, 'expectedArrivalTime', e.target.value)}
                      className="w-full p-2 border rounded-md text-sm"
                      required
                    />
                    </div>

                    
                    </div>

                 </div>




                ))}
              </div>


                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">From</label>
                    <div>
                      <label className="block text-sm font-medium mb-1">Departure </label>
                      <input 
                        type="text"
                        name="departure" 
                        value={tripForm.departure} 
                        onChange={handleTripFormChange}
                        className="w-full p-2 border rounded-md"
                        required
                      />
                    </div>

                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">To</label>
                    <select 
                      name="destination" 
                      value={tripForm.destination} 
                      onChange={handleTripFormChange}
                      className="w-full p-2 border rounded-md"
                      required
                    >
                      <option value="">Select a destination</option>
                      {selectedPlan?.destinations.map(dest => (
                        <option key={dest} value={dest}>{dest}</option>
                      ))}
                    </select>
                  </div>
                
                   {/* <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Expected Time</label>
                      <input 
                        type="text" 
                        name="expectedTime" 
                        value={tripForm.} 
                        onChange={handleTripFormChange}
                        className="w-full p-2 border rounded-md"
                        required
                      />
                    </div>
                  </div> */}



                   
                  
                  {/* <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Departure Date</label>
                      <input 
                        type="date" 
                        name="departureDate" 
                        value={tripForm.departureDate} 
                        onChange={handleTripFormChange}
                        className="w-full p-2 border rounded-md"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Departure Time</label>
                      <input 
                        type="time" 
                        name="departureTime" 
                        value={tripForm.departureTime} 
                        onChange={handleTripFormChange}
                        className="w-full p-2 border rounded-md"
                        required
                      />
                    </div>
                  </div> */}
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* <div>
                      <label className="block text-sm font-medium mb-1">Total Capacity</label>
                      <input 
                        type="number" 
                        name="price" 
                        value={tripForm.price} 
                        onChange={handleTripFormChange}
                        min="1"
                        className="w-full p-2 border rounded-md"
                        required
                      />
                    </div> */}
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Price (RWF)</label>
                      <input 
                        type="number" 
                        name="price" 
                        value={tripForm.price} 
                        onChange={handleTripFormChange}
                        min="0"
                        className="w-full p-2 border rounded-md"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <button 
                      type="button" 
                      className="px-4 py-2 border rounded-md"
                      onClick={() => setShowTripForm(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="px-4 py-2 bg-primary text-white rounded-md"
                    >
                      {editingTrip ? 'Update Trip' : 'Add Trip'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
         {/* Trips Table */}
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
          // Map each trip to multiple rows, one for each time slot
          trip.timeSlots.map((slot, slotIndex) => (
            <tr key={`${trip._id}-${slotIndex}`} className={`hover:bg-gray-50 ${slotIndex !== 0 && 'border-t border-dashed border-gray-100'}`}>
              {/* Only show departure/destination on first slot row */}
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
            </tr>
          ))
        ))
      )}
    </tbody>
  </table>
</div>
        </div>
      )}
      
      {/* Bookings Tab */}
      {activeTab === 'bookings' && (
        <div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Bookings</h2>
            
            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow mb-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center">
                  <FaFilter className="text-gray-400 mr-2" />
                  <span className="font-medium">Filters:</span>
                </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-grow mb-4 items-center">
        <div>
          <label className="block text-sm font-medium mb-1">District/City</label>
          <input
            type="text"
            name="district"
            value={bookingFilters.district}
            onChange={handleFilterChange}
            placeholder="Filter by district"
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Departure Date</label>
          <input
            type="date"
            name="date"
            value={bookingFilters.date}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            name="status"
            value={bookingFilters.status}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Boarded">Boarded</option>
            <option value="Scheduled">Scheduled</option>
          </select>
        </div>

        {/* check if bookingFilters is not empty shwo clear button */}

        {
          (bookingFilters.district || bookingFilters.date || bookingFilters.status) && (
            <div className="flex items-center">
              <button
                onClick={clearFilters}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Clear Filters
              </button>
            </div>
          )
          
        }

        

        
      </div>
              </div>
            </div>
            
            {/* Bookings Table */}
            {/* Bookings Table */}
<div className="bg-white rounded-lg shadow overflow-hidden overflow-x-visible">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Travel Number</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departure</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Date</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {filteredBookings.length === 0 ? (
        <tr>
          <td colSpan={9} className="px-6 py-4 text-center text-gray-500">
            No bookings found matching your filters.
          </td>
        </tr>
      ) : (
        filteredBookings.map((booking: TravelBooking) => (
          <tr key={booking._id} className="hover:bg-gray-50">
            {/* Student */}
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium">{booking.student.name}</div>
            </td>

            {/* Parent (Guardian) */}
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm">
                <div className="font-medium">{booking.guardian.name}</div>
                <div className="text-gray-500 text-sm">{booking.guardian.phoneNumber}</div>
              </div>
            </td>

            {/* School */}
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm">
                <div className="font-medium">{booking.school.name}</div>
                <div className="text-gray-500 text-sm">{booking.school.email}</div>
              </div>
            </td>

            {/* Travel Number */}
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium">{booking.travelNumber}</div>
            </td>

            {/* Destination */}
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="font-medium">{booking.travelDetails.destination}</div>
            </td>

            {/* Departure */}
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex flex-col">
                <div>{new Date(booking.travelDetails.plan.date).toLocaleDateString()}</div>
                <div className="text-sm text-gray-500">{booking.travelDetails.departureTime}</div>
              </div>
            </td>

            {/* Booking Date */}
            <td className="px-6 py-4 whitespace-nowrap">
              {new Date(booking.createdAt).toLocaleDateString()}
            </td>

            {/* Status */}
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 py-1 rounded-full text-xs ${
                booking.status === 'Boarded'
                  ? 'bg-green-100 text-green-800'
                  : booking.status === 'Cancelled'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
              }`}>
                {booking.status}
              </span>
            </td>

            {/* Payment */}
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 py-1 rounded-full text-xs ${
                booking.travelDetails.paymentDetails.data.status === 'Paid'
                  ? 'bg-green-100 text-green-800'
                  : booking.travelDetails.paymentDetails.data.status === 'Failed'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
              }`}>
                {booking.travelDetails.paymentDetails.data.status}
              </span>
            </td>

             {/* Actions */}
             {/* <td className="px-6 py-4 whitespace-nowrap">
              <button
                onClick={() => confirmBoardingStudent(booking.travelNumber)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
                disabled={loadingBoarding}
              >
                {loadingBoarding ? 'Loading...' : 'Confirm Boarding'}
              </button>
            </td> */}
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>

          </div>
        </div>
      )}
    </div>
  );
};

export default TransporterDestinationSpotManagement;