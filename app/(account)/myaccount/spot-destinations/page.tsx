"use client";

import { ScheduleType } from '@/types';
import axios from 'axios';
import { set } from 'date-fns';
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

// Types
type Destination = {
  id: string;
  name: string;
  district: string;
};

type fromDestination ={
  id: string;
  name: string;
  district: string;
 
}



type BusTrip = {
  id: string;
  destinationId: string;
  destinationName: string;
  district: string;
  departureDate: string;
  departureTime: string;
  totalCapacity: number;
  availableSpots: number;
  distance?: string;
  expectedTime?: string;
  price: number;
  status: 'Active' | 'Cancelled' | 'Completed';
  fromId: string;
  fromName?: string;
  fromDistrict?: string;


};

type Booking = {
  id: string;
  tripId: string;
  studentId: string;
  studentName: string;
  bookingDate: string;
  status: 'Confirmed' | 'Cancelled' | 'Pending';
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
};

// Available Spots Management Page
const TransporterSpotManagement = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState<'trips' | 'bookings'>('trips');

  const [travelSchedule , setTravelSchedule ] = useState<ScheduleType[]>([]);
  const [loadschedule, setLoadSchedule] = useState(true);
  
  // State for bus trips
  const [busTrips, setBusTrips] = useState<BusTrip[]>([]);
  const [loading, setLoading] = useState(true);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [fromDestinations, setFromDestinations] = useState<fromDestination[]>([]);
  
  // State for add/edit trip form
  const [showTripForm, setShowTripForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState<BusTrip | null>(null);
  const [tripForm, setTripForm] = useState({
    destinationId: '',
    departureDate: '',
    departureTime: '',
    totalCapacity: 0,
    price: 0,
    expectedTime: '',
    fromId: ''

  });
  
  // State for bookings
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingFilters, setBookingFilters] = useState({
    district: '',
    date: '',
    status: ''
  });
  
  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Mock API calls - replace with actual API endpoints
        // const tripsResponse = await axios.get('/api/transporter/trips');
        // const destinationsResponse = await axios.get('/api/destinations');
        // const bookingsResponse = await axios.get('/api/transporter/bookings');
        
        // For demo purposes using mock data
        const mockDestinations: Destination[] = [
          { id: 'd1', name: 'South', district: 'Butare' },
          { id: 'd5', name: 'South', district: 'Nyamagabe' },
          { id: 'd2', name: 'Norht', district: 'Musanze' },
          { id: 'd6', name: 'West', district: 'Rubavu' },
          { id: 'd3', name: 'West', district: 'Karongi' },
          { id: 'd4', name: 'East', district: 'Nyagatare' },
          { id: 'd54', name: 'East', district: 'Rwamagana' },
          { id: 'd24', name: 'East', district: 'Kayonza' },
          { id: 'd44', name: 'East', district: 'Bugesera' },
        ];
        const mockFromDestinations: fromDestination[] = [
          { id: 'd1', name: 'Kigali', district: 'Nyarugenge' },
          { id: 'd5', name: 'Kigali', district: 'Gasabo' },
          { id: 'd2', name: 'Kigali', district: 'Kicukiro' },
          { id: 'd6', name: 'Kigali', district: 'Nyarugenge' },
          { id: 'd3', name: 'Kigali', district: 'Gasabo' },
          { id: 'd4', name: 'Kigali', district: 'Kicukiro' },
          { id: 'd54', name: 'Kigali', district: 'Nyarugenge' },
          { id: 'd24', name: 'Kigali', district: 'Gasabo' },
          { id: 'd44', name: 'Kigali', district: 'Kicukiro' },




        ]
        
        const mockTrips: BusTrip[] = [
          { 
            id: 't1', 
            destinationId: 'd1', 
            destinationName: 'South',
            district: 'Butare',
            departureDate: '2025-03-05', 
            departureTime: '08:00', 
            totalCapacity: 45, 
            availableSpots: 12, 
            price: 1500, 
            status: 'Active' ,
            distance: '100km',
            expectedTime: '2 hours',
            fromId: 'd1',
            fromName: 'Kigali',
            fromDistrict: 'Nyarugenge'



          },

          { 
            id: 't2', 
            destinationId: 'd2', 
            destinationName: 'North',
            district: 'Musanze',
            departureDate: '2025-03-06', 
            departureTime: '09:00', 
            totalCapacity: 30, 
            availableSpots: 30, 
            price: 2000, 
            status: 'Active' ,
            distance: '90km',
            expectedTime: '1.5 hours',
            fromId: 'd2',
            fromName: 'Kigali',
            fromDistrict: 'Kicukiro'


          },
          { 
            id: 't3', 
            destinationId: 'd3', 
            destinationName: 'West',
            district: 'Karongi',
            departureDate: '2025-03-07', 
            departureTime: '10:00', 
            totalCapacity: 40, 
            availableSpots: 40, 
            price: 1800, 
            status: 'Active' ,
            distance: '110km',
            expectedTime: '2.5 hours',
            fromId: 'd3',
            fromName: 'Kigali',
            fromDistrict: 'Gasabo'
          },
          { 
            id: 't4', 
            destinationId: 'd4', 
            destinationName: 'East',
            district: 'Nyagatare',
            departureDate: '2025-03-08', 
            departureTime: '11:00', 
            totalCapacity: 35, 
            availableSpots: 35, 
            price: 1700, 
            status: 'Active' ,
            distance: '120km',
            expectedTime: '3 hours',
            fromId: 'd4',
            fromName: 'Kigali',
          },
          { 
            id: 't5', 
            destinationId: 'd5', 
            destinationName: 'South',
            district: 'Nyamagabe',
            departureDate: '2025-03-09', 
            departureTime: '12:00', 
            totalCapacity: 50, 
            availableSpots: 50, 
            price: 1600, 
            status: 'Active' ,
            distance: '130km',
            expectedTime: '3.5 hours',
            fromId: 'd5',
          },
          { 
            id: 't6', 
            destinationId: 'd6', 
            destinationName: 'West',
            district: 'Rubavu',
            departureDate: '2025-03-10', 
            departureTime: '13:00', 
            totalCapacity: 55, 
            availableSpots: 55, 
            price: 1500, 
            status: 'Active' ,
            distance: '140km',
            expectedTime: '4 hours',
            fromId: 'd6',

          },
         
        ];
        
        const mockBookings: Booking[] = [
          {
            id: 'b1',
            tripId: 't1',
            studentId: 's1',
            studentName: 'John Doe',
            bookingDate: '2025-02-20',
            status: 'Confirmed',
            paymentStatus: 'Paid'
          },
          {
            id: 'b2',
            tripId: 't1',
            studentId: 's2',
            studentName: 'Jane Smith',
            bookingDate: '2025-02-21',
            status: 'Confirmed',
            paymentStatus: 'Paid'
          },
          {
            id: 'b3',
            tripId: 't2',
            studentId: 's3',
            studentName: 'Bob Johnson',
            bookingDate: '2025-02-22',
            status: 'Pending',
            paymentStatus: 'Pending'
          },

          {
            id: 'b4',
            tripId: 't3',
            studentId: 's4',
            studentName: 'Alice Brown',
            bookingDate: '2025-02-23',
            status: 'Confirmed',
            paymentStatus: 'Paid'
          },
          {
            id: 'b5',
            tripId: 't4',
            studentId: 's5',
            studentName: 'Eve White',
            bookingDate: '2025-02-24',
            status: 'Confirmed',
            paymentStatus: 'Paid'
          },
          {
            id: 'b6',
            tripId: 't5',
            studentId: 's6',
            studentName: 'Mike Black',
            bookingDate: '2025-02-25',
            status: 'Pending',
            paymentStatus: 'Pending'
          },
          {
            id: 'b7',
            tripId: 't6',
            studentId: 's7',
            studentName: 'Sarah Green',
            bookingDate: '2025-02-26',
            status: 'Confirmed',
            paymentStatus: 'Paid'
          },
          {
            id: 'b8',
            tripId: 't6',
            studentId: 's8',
            studentName: 'Tom Grey',
            bookingDate: '2025-02-27',
            status: 'Confirmed',
            paymentStatus: 'Paid'
          },
          {
            id: 'b9',
            tripId: 't6',
            studentId: 's9',
            studentName: 'Lisa Red',
            bookingDate: '2025-02-28',
            status: 'Confirmed',
            paymentStatus: 'Paid'
          },





        ];
        
        setDestinations(mockDestinations);
        setBusTrips(mockTrips);
        setBookings(mockBookings);
        setFromDestinations(mockFromDestinations);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load data. Please try again.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Handle form input changes
  const handleTripFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTripForm({
      ...tripForm,
      [name]: name === 'totalCapacity' || name === 'price' ? parseInt(value) : value
    });
  };
  
  // Open form for adding new trip
  const handleAddTrip = () => {
    setEditingTrip(null);
    setTripForm({
      destinationId: '',
      departureDate: '',
      departureTime: '',
      totalCapacity: 0,
      price: 0,
      expectedTime: '',
      fromId: ''
    });
    setShowTripForm(true);
  };
  
  // Open form for editing trip
  const handleEditTrip = (trip: ScheduleType) => {
    // setEditingTrip(trip);
    // setTripForm({
    //   destinationId: trip.destinationId,
    //   departureDate: trip.departureDate,
    //   departureTime: trip.departureTime,
    //   totalCapacity: trip.totalCapacity,
    //   price: trip.price,
    //   expectedTime: trip.expectedTime || '',
    //   fromId: trip.fromId
    // });
    setShowTripForm(true);
  };
  
  // Submit form to add/edit trip
  const handleSubmitTripForm = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingTrip) {
        // Update existing trip
        // In real app, this would be an API call:
        // await axios.put(`/api/transporter/trips/${editingTrip.id}`, tripForm);
        
        // Mock update
        const updatedTrips = busTrips.map(trip => 
          trip.id === editingTrip.id 
            ? { 
                ...trip, 
                destinationId: tripForm.destinationId,
                destinationName: destinations.find(d => d.id === tripForm.destinationId)?.name || '',
                district: destinations.find(d => d.id === tripForm.destinationId)?.district || '',
                departureDate: tripForm.departureDate,
                departureTime: tripForm.departureTime,
                totalCapacity: tripForm.totalCapacity,
                availableSpots: trip.availableSpots + (tripForm.totalCapacity - trip.totalCapacity),
                price: tripForm.price,
                expectedTime: tripForm.expectedTime,
                fromId: tripForm.fromId
              } 
            : trip
        );
        
        setBusTrips(updatedTrips);
        toast.success('Trip updated successfully!');
      } else {
        // Add new trip
        // In real app, this would be an API call:
        // const response = await axios.post('/api/transporter/trips', tripForm);
        
        // Mock add
        const destinationInfo = destinations.find(d => d.id === tripForm.destinationId);
        const fromDestinationInfo = destinations.find(d => d.id === tripForm.fromId);
        const newTrip: BusTrip = {
          id: `t${busTrips.length + 1}`,
          destinationId: tripForm.destinationId,
          destinationName: destinationInfo?.name || '',
          district: destinationInfo?.district || '',
          departureDate: tripForm.departureDate,
          departureTime: tripForm.departureTime,
          totalCapacity: tripForm.totalCapacity,
          availableSpots: tripForm.totalCapacity, // New trip, all spots available
          price: tripForm.price,
          status: 'Active',
          expectedTime: tripForm.expectedTime,
          fromId: tripForm.destinationId,
          fromName: fromDestinationInfo?.name || '',
          fromDistrict: fromDestinationInfo?.district || '',


        };
        
        setBusTrips([...busTrips, newTrip]);
        toast.success('Trip added successfully!');
      }
      
      setShowTripForm(false);
    } catch (error) {
      console.error('Error saving trip:', error);
      toast.error('Failed to save trip. Please try again.');
    }
  };
  
  // Delete trip
  const handleDeleteTrip = async (tripId: string) => {
    if (!confirm('Are you sure you want to delete this trip? This action cannot be undone.')) {
      return;
    }
    
    try {
      // In real app, this would be an API call:
      // await axios.delete(`/api/transporter/trips/${tripId}`);
      
      // Mock delete
      const updatedTrips = busTrips.filter(trip => trip.id !== tripId);
      setBusTrips(updatedTrips);
      
      toast.success('Trip deleted successfully!');
    } catch (error) {
      console.error('Error deleting trip:', error);
      toast.error('Failed to delete trip. Please try again.');
    }
  };
  
  // Filter bookings
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingFilters({
      ...bookingFilters,
      [name]: value
    });
  };
  
  // Apply booking filters
  const filteredBookings = bookings.filter(booking => {
    const trip = busTrips.find(t => t.id === booking.tripId);
    
    if (!trip) return false;
    
    const matchesDistrict = !bookingFilters.district || trip.district.includes(bookingFilters.district);
    const matchesDate = !bookingFilters.date || trip.departureDate === bookingFilters.date;
    const matchesStatus = !bookingFilters.status || booking.status === bookingFilters.status;
    
    return matchesDistrict && matchesDate && matchesStatus;
  });
  
  // Get destination name from ID
  const getDestinationName = (id: string) => {
    return destinations.find(dest => dest.id === id)?.name || 'Unknown';
  };

  const getallTravelSchedule = async () => {
    
    const user = localStorage.getItem("user");
    const savedUser = user ? JSON.parse(user) : null;


    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}transporters/67d31eaf05694a416cba7702/schedules`); 
      console.log("trvel plan",response.data.data.schedules);
      setLoadSchedule(false);
      setTravelSchedule (response.data.data.schedules);
    } catch (error) {
      setLoadSchedule(false);
      console.error('Error fetching travel plans:', error);
      toast.error('Failed to load travel plans. Please try again.');
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
     getallTravelSchedule(); 
    }
  }, []);
  
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }
  

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
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h3 className="text-xl font-semibold mb-4">
                  {editingTrip ? 'Edit Trip' : 'Add New Trip'}
                </h3>
                
                <form onSubmit={handleSubmitTripForm}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">From</label>
                    <select 
                      name="fromId" 
                      value={tripForm.destinationId} 
                      onChange={handleTripFormChange}
                      className="w-full p-2 border rounded-md"
                      required
                    >
                      <option value="">Select a Start</option>
                      {fromDestinations.map(dest => (
                        <option key={dest.id} value={dest.id}>{dest.name} ({dest.district})</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">To</label>
                    <select 
                      name="destinationId" 
                      value={tripForm.destinationId} 
                      onChange={handleTripFormChange}
                      className="w-full p-2 border rounded-md"
                      required
                    >
                      <option value="">Select a destination</option>
                      {destinations.map(dest => (
                        <option key={dest.id} value={dest.id}>{dest.name} ({dest.district})</option>
                      ))}
                    </select>
                  </div>
                  {/* expectedTime
                   */}
                   <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Expected Time</label>
                      <input 
                        type="text" 
                        name="expectedTime" 
                        value={tripForm.expectedTime} 
                        onChange={handleTripFormChange}
                        className="w-full p-2 border rounded-md"
                        required
                      />
                    </div>
                  </div>



                   
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
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
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">Total Capacity</label>
                      <input 
                        type="number" 
                        name="totalCapacity" 
                        value={tripForm.totalCapacity} 
                        onChange={handleTripFormChange}
                        min="1"
                        className="w-full p-2 border rounded-md"
                        required
                      />
                    </div>
                    
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
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow">
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
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bookings Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
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
                      <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                        No bookings found matching your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map(booking => {
                      const trip = busTrips.find(t => t.id === booking.tripId);
                      
                      return (
                        <tr key={booking.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FaUsers className="text-gray-400 mr-2" />
                              <div className="text-sm font-medium">{booking.studentName}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {trip ? (
                              <div className="flex items-center">
                                <FaMapMarkerAlt className="text-primary mr-2" />
                                <div>
                                  <div className="font-medium">{trip.destinationName}</div>
                                  <div className="text-sm text-gray-500">{trip.district}</div>
                                </div>
                              </div>
                            ) : (
                              <span className="text-gray-500">Unknown destination</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {trip ? (
                              <div className="flex flex-col">
                                <div>{new Date(trip.departureDate).toLocaleDateString()}</div>
                                <div className="text-sm text-gray-500">{trip.departureTime}</div>
                              </div>
                            ) : (
                              <span className="text-gray-500">N/A</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {new Date(booking.bookingDate).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              booking.status === 'Confirmed' 
                                ? 'bg-green-100 text-green-800' 
                                : booking.status === 'Cancelled' 
                                  ? 'bg-red-100 text-red-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              booking.paymentStatus === 'Paid' 
                                ? 'bg-green-100 text-green-800' 
                                : booking.paymentStatus === 'Failed' 
                                  ? 'bg-red-100 text-red-800' 
                                  : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {booking.paymentStatus}
                            </span>
                          </td>
                        </tr>
                      );
                    })
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

export default TransporterSpotManagement;