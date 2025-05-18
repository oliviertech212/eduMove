

'use client';
import TravelPlanManagement from "@/app/_components/travel-plans";
import { Role } from '@/app/_components/app-sidebar';
import { BookingModelForm } from '@/app/_components/forms/bookingmodel';
import TripFilter from '@/app/_components/forms/filters/topfilter';
import TripBookingTable from '@/app/_components/tables/travel-booking';
import { mockBookings, mockTrips } from '@/dummydata/trips-booking';
import React, { useState, useEffect, use } from 'react';
import { FaPlus, FaEdit, FaTrash, FaFilter, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaBus} from 'react-icons/fa';
import { toast } from 'sonner';
import axios from 'axios';
import { TravelPlan } from "@/app/_components/travel-plans";
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
  busDetails?: {
    busId: string;
    busNumber: string;
    driverName: string;
    driverContact: string;
  };


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


// [
//   {
//       "_id": "67d31e4c05694a416cba76fc",
//       "date": "2020-01-01T00:00:00.000Z",
//       "destinations": [
//           "muhanga",
//           "nyanza",
//           "nyamagabe"
//       ],
//       "province": "south",
//       "__v": 0
//   }
// ]






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
  const [travelPlans, setTravelPlans] = useState<TravelPlan[]>([]);
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  
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

  const getallTravelPlans = async () => {

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}plans`); 
      console.log("trvel plan",response.data);
      setLoadingPlans(false);
      
      setTravelPlans(response.data);
    } catch (error) {
      setLoadingPlans(false);
      console.error('Error fetching travel plans:', error);
      toast.error('Failed to load travel plans. Please try again.');
    }
  }
  

 
  
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
      getallTravelPlans();
      const user = localStorage.getItem("user");
      const savedUser = user ? JSON.parse(user) : null;
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
    <div className="mx-auto mt-32 p-4 w-full">
      {
        loadingPlans &&  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
      }
      <TravelPlanManagement isadmin={false}/>
     
      {/* Tabs */}
      {/* <div className="flex border-b mb-6">
        <button 
          className={`py-2 px-4 font-semibold ${activeTab === 'trips' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
          onClick={() => setActiveTab('trips')}
        >
        {
           userRole === "transporter" ? " Available Spots" : "Available Schedule "
        }
        </button>
        <button 
          className={`py-2 px-4 font-semibold ${activeTab === 'bookings' ? 'border-b-2 border-primary text-primary' : 'text-gray-600'}`}
          onClick={() => setActiveTab('bookings')}
        >
          Bookings
        </button>
      </div> */}
      

    </div>
  );
};

export default TransporterSpotManagement;