"use client";

import { Role } from '@/app/_components/app-sidebar';
import { BookingModelForm } from '@/app/_components/forms/bookingmodel';
import TripFilter from '@/app/_components/forms/filters/topfilter';
import TripBookingTable from '@/app/_components/tables/travel-booking';
import { mockBookings, mockTrips } from '@/dummydata/trips-booking';
import React, { useState, useEffect, use } from 'react';
import { set } from 'react-hook-form';
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



export type BusTrip = {
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
  company? : string;
  driver? : string;
  busPlateNumber? : string;


};

export type Booking = {
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
  
  // State for bus trips
  const [busTrips, setBusTrips] = useState<BusTrip[]>([]);

  const [loading, setLoading] = useState(true);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [fromDestinations, setFromDestinations] = useState<fromDestination[]>([]);
  const [userRole , setUserRole]= useState<Role>("student");
  const [bookingModel , setBookingModel] = useState(false);
  
  // State for add/edit trip form
  const [showTripForm, setShowTripForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState<BusTrip | null>(null);
  const [bookTrip, setBookTrip] = useState<BusTrip | null>(null);
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
 
  
  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        

        
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      const token = user ? JSON.parse(user).token : null;
      const savedRole = localStorage.getItem("userRole") as Role | null;
      
      if (savedRole) {
        setUserRole(savedRole);
      }
    }
  }, []);





 const handleSubmitTripBooking = async (bookingData: Booking) => {
  // Add the new booking to the mockBookings array
  let  newBooking: Booking = {

    ...bookingData
  };
  setBookings([...bookings, newBooking]);

  // Find the corresponding trip in the mockTrips array and update its available seats
  const updatedTrips = busTrips.map((trip) => {
    if (trip.id === bookingData.tripId) {
      return {
        ...trip,
        availableSeats: trip.availableSpots - 1
      };
    }
    return trip;
  });
  setBusTrips(updatedTrips);

  setTimeout(() => {
    setBookingModel(false);
    toast.success(`Ticket for ${newBooking.studentName} booked successfully!`);
  }, 2000);
};

const handleTripDestination = (
  fromdestination: string,
  datadestination: string
) => {
  
  
  if (busTrips.length > 0) {
    let filteredBusTrips = busTrips.filter((trip) =>
      trip?.distance?.includes( datadestination) || trip.destinationName.includes( datadestination) || trip?.fromDistrict?.includes(fromdestination) || trip?.fromName?.includes(fromdestination) 
   
    );
   
    setBusTrips(filteredBusTrips); 
  } else {
    setBusTrips(mockTrips);
  }
};









  


  // Handle form input changes
  const handleTripFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTripForm({
      ...tripForm,
      [name]: name === 'totalCapacity' || name === 'price' ? parseInt(value) : value
    });
  };
  //open boking model 

  const handleBookingModel = (BookingTrip: BusTrip) => {
    setBookTrip(BookingTrip);
    setBookingModel(!bookingModel);
  };

  const handlecloseModel = () => {
    setBookingModel(false);
  }
  
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
  const handleEditTrip = (trip: BusTrip) => {
    setEditingTrip(trip);
    setTripForm({
      destinationId: trip.destinationId,
      departureDate: trip.departureDate,
      departureTime: trip.departureTime,
      totalCapacity: trip.totalCapacity,
      price: trip.price,
      expectedTime: trip.expectedTime || '',
      fromId: trip.fromId
    });
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
  

  
  // Get destination name from ID
  const getDestinationName = (id: string) => {
    return destinations.find(dest => dest.id === id)?.name || 'Unknown';
  };
  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
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
        {
           userRole === "TransportCompany" ? " Available Spots" : "Available Schedule "
        }
        </button>
        <button 
          className={`py-2 px-4 font-semibold ${activeTab === 'bookings' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
          onClick={() => setActiveTab('bookings')}
        >
          Bookings
        </button>
      </div>
      
      {/* Available Spots Tab */}
      {activeTab ===  'trips'   && (
        <div>
           {  userRole === "TransportCompany" &&   <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Available Bus Trips</h2>
            <button 
              className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2"
              onClick={handleAddTrip}
            >
              <FaPlus /> Add Trip
            </button>
          </div>}
          
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


{bookingModel && (
           <BookingModelForm Trip={bookTrip} handleSubmitTripBooking={handleSubmitTripBooking}  closeModal={handlecloseModel}  />
          )}
          
          <TripFilter handleTripDestination={handleTripDestination} />
          {/* Trips Table */}
          <div className="bg-white rounded-lg shadow overflow-x-scroll">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination



                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departure</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Available</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {busTrips.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                      No trips available. Add a new trip to get started.
                    </td>
                  </tr>
                ) : (
                  busTrips.map(trip => (
                    <tr key={trip.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="text-primary mr-2" />
                          <div>
                            <div className="font-medium">{trip.fromName}</div>
                            <div className="text-sm text-gray-500">{trip.fromDistrict}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="text-primary mr-2" />
                          <div>
                            <div className="font-medium">{trip.destinationName}</div>
                            <div className="text-sm text-gray-500">{trip.district}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <FaCalendarAlt className="text-gray-400 mr-1" />
                            <span>{new Date(trip.departureDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <FaClock className="mr-1" />
                            <span>{trip.departureTime}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FaBus className="text-gray-400 mr-2" />
                          <span>{trip.totalCapacity}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          trip.availableSpots === 0 
                            ? 'bg-red-100 text-red-800' 
                            : trip.availableSpots < 5 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : 'bg-green-100 text-green-800'
                        }`}>
                          {trip.availableSpots}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        RWF {trip.price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          trip.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : trip.status === 'Cancelled' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-blue-100 text-blue-800'
                        }`}>
                          {trip.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex items-end  text-center text-sm  font-medium">

                      <button 
                        className="bg-primary text-white px-4 py-2 rounded-md flex items-center gap-2"
                       onClick={()=>handleBookingModel(trip)}
                      >
                          <FaPlus />Book
                      </button>

                     {  userRole === "TransportCompany" && (<>
                      <button 
                          onClick={() => handleEditTrip(trip)}
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => handleDeleteTrip(trip.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <FaTrash />
                        </button>
                     </>)


                     }  
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Bookings Tab */}
      {activeTab === 'bookings' && (

   <TripBookingTable bookings={bookings} busTrips={busTrips} />
        
      )}
    </div>
  );
};

export default TransporterSpotManagement;