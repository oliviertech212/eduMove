// "use client";

// import React, { useState, useEffect } from 'react';
// import { 
//   FaQrcode, 
//   FaCheckCircle, 
//   FaTimesCircle, 
//   FaBell, 
//   FaSearch, 
//   FaFilter, 
//   FaBus 
// } from 'react-icons/fa';
// import axios from 'axios';
// import { toast } from 'sonner';
// import { TravelBooking } from '@/types';


//    const getStatusIcon = (status: string) => {
//   switch (status.toLowerCase()) {
//     case 'boarded': return <FaCheckCircle className="text-green-500" />;
//     case 'denied': return <FaTimesCircle className="text-red-500" />;
//     case 'pending': return <FaBell className="text-yellow-500" />;
//     default: return <FaBell className="text-gray-500" />;
//   }
// };

//   // Get status color
//  const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case 'boarded': return 'text-green-500';
//       case 'denied': return 'text-red-500';
//       case 'pending': return 'text-yellow-500';
//       default: return 'text-gray-500';
//     }
//   };
// type BoardingStatus = 'Pending' | 'Boarded' | 'Denied';

// const StudentBoardingVerification = () => {
//   // States
//   const [bookings, setBookings] = useState<TravelBooking[]>([]);
//   const [filteredBookings, setFilteredBookings] = useState<TravelBooking[]>([]);
//   const [travelNumberInput, setTravelNumberInput] = useState<string>('');
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const [statusFilter, setStatusFilter] = useState<string | 'All'>('All');
//   const [isScanning, setIsScanning] = useState<boolean>(false);
//   const [selectedBooking, setSelectedBooking] = useState<TravelBooking | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [loadingBoarding, setLoadingBoarding] = useState<boolean>(false);
  
//   // New filter states
//   const [dateFilter, setDateFilter] = useState<string>('');
//   const [destinationFilter, setDestinationFilter] = useState<string>('');
//   const [timeSlotFilter, setTimeSlotFilter] = useState<string>('');
  
//   // Format time to AM/PM
//   const formatTimeToAMPM = (time: string) => {
//     if (!time) return '';
//     const [hours, minutes] = time.split(':');
//     const hour = parseInt(hours);
//     const ampm = hour >= 12 ? 'PM' : 'AM';
//     const formattedHour = hour % 12 || 12;
//     return `${formattedHour.toString().padStart(2, '0')}:${minutes} ${ampm}`;
//   };

//   // Get all transporter bookings with filters
//   const getAllTransporterBookings = async () => {
//     const token = localStorage.getItem("token");
//     const user = localStorage.getItem("user");
//     const savedUser = user ? JSON.parse(user) : null;
    
//     if (!savedUser?._id) {
//       toast.error('User not found. Please log in again.');
//       return;
//     }

//     try {
//       setLoading(true);
      
//       // Build query parameters
//       const queryParams = new URLSearchParams();
//       if (dateFilter) queryParams.append('date', dateFilter);
//       if (destinationFilter) queryParams.append('destination', destinationFilter);
//       if (timeSlotFilter) {
//         // Convert time to AM/PM format before sending to API
//         const formattedTime = formatTimeToAMPM(timeSlotFilter);
//         queryParams.append('timeSlot', formattedTime);
//       }
      
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_URL}travels?${queryParams.toString()}`,
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         }
//       );

//       console.log("bookings response from api", response.data.data);
      
//       // Handle the response structure based on your API
//       const bookingsData = response.data.data || response.data.data || response.data || [];
//       setBookings(bookingsData);
//       setFilteredBookings(bookingsData);
//     } catch (error) {
//       console.error('Error fetching bookings:', error);
//       toast.error('Failed to load bookings. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch bookings when filters change
//   useEffect(() => {
//     getAllTransporterBookings();
//   }, [dateFilter, destinationFilter, timeSlotFilter]);
  
//   // Apply filters when search or status filter changes
//   useEffect(() => {
//     let result = [...bookings];
    
//     // Apply search filter
//     if (searchQuery) {
//       result = result.filter(booking => 
//         booking.student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
//         booking.travelNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         booking.school.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }
    
//     // Apply status filter
//     if (statusFilter !== 'All') {
//       result = result.filter(booking => booking.status === statusFilter);
//     }
    
//     setFilteredBookings(result);
//   }, [searchQuery, statusFilter, bookings]);
  
//   // Handle QR code scanning toggle
//   const handleScanToggle = () => {
//     setIsScanning(!isScanning);
//     if (!isScanning) {
//       toast.info('Camera activated for QR scanning');
//       // Simulate a successful scan after 3 seconds for demo
//       setTimeout(() => {
//         // You would get the actual travel number from QR scan
//         const sampleTravelNumber = bookings[0]?.travelNumber || '';
//         setTravelNumberInput(sampleTravelNumber);
//         setIsScanning(false);
//         verifyTravelNumber(sampleTravelNumber);
//         toast.success('QR code scanned successfully');
//       }, 3000);
//     }
//   };
  
//   // Verify travel number
//   const verifyTravelNumber = (travelNumber: string) => {
//     const booking = bookings.find(b => b.travelNumber === travelNumber);
    
//     if (!booking) {
//       toast.error('Invalid travel number: No matching booking found');
//       return;
//     }
    
//     setSelectedBooking(booking);
    
//     // Check if student is already boarded
//     if (booking.status === 'Boarded') {
//       toast.warning('Student has already boarded this trip');
//       return;
//     }
    
//     toast.success('Travel number verified successfully!');
//   };
  
//   // Handle manual travel number input
//   const handleManualTravelNumberVerify = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!travelNumberInput.trim()) {
//       toast.error('Please enter a travel number');
//       return;
//     }
    
//     verifyTravelNumber(travelNumberInput);
//   };
  
//   // Confirm boarding student - Updated function
//   const confirmBoardingStudent = async (travelNumber: string) => {
//     const token = localStorage.getItem("token");
    
//     if (!token) {
//       toast.error('Authentication token not found. Please log in again.');
//       return;
//     }

//     try {
//       setLoadingBoarding(true);
      
//       const response = await axios.patch(
//         `${process.env.NEXT_PUBLIC_API_URL}travels/${travelNumber}/boarding`,
//         {}, // Empty body if no additional data needed
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           }
//         }
//       );

//       console.log("Boarding confirmation response:", response.data);
      
//       // Update local state
//       setBookings(prevBookings => 
//         prevBookings.map(booking => 
//           booking.travelNumber === travelNumber 
//             ? { ...booking, status: 'Boarded', updatedAt: new Date().toISOString() }
//             : booking
//         )
//       );
      
//       // Clear selected booking and input
//       setSelectedBooking(null);
//       setTravelNumberInput('');
      
//       toast.success('Student boarding confirmed successfully!');
      
//     } catch (error: any) {
//       console.error('Error confirming boarding:', error);
      
//       if (error.response?.status === 401) {
//         toast.error('Authentication failed. Please log in again.');
//       } else if (error.response?.status === 404) {
//         toast.error('Travel booking not found.');
//       } else {
//         toast.error(error.response?.data?.message || 'Failed to confirm boarding. Please try again.');
//       }
//     } finally {
//       setLoadingBoarding(false);
//     }
//   };
  
//   // Deny boarding (if needed)
//   const denyBoarding = (travelNumber: string, reason: string = 'Denied by transporter') => {
//     // Update local state - you might want to add a deny endpoint to your API
//     setBookings(prevBookings => 
//       prevBookings.map(booking => 
//         booking.travelNumber === travelNumber 
//           ? { ...booking, status: 'Denied', updatedAt: new Date().toISOString() }
//           : booking
//       )
//     );
    
//     setSelectedBooking(null);
//     setTravelNumberInput('');
//     toast.success('Student boarding denied');
//   };
  

  
//   // Get status icon

  
//   // Format date
//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString();
//   };
  
//   // Format time
//   const formatTime = (dateString: string) => {
//     return new Date(dateString).toLocaleTimeString();
//   };
  
//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">Student Boarding Verification</h1>
      
//       {/* Summary Card */}
//       <div className="bg-blue-50 p-4 rounded-md mb-6 flex items-center">
//         <FaBus className="text-blue-600 text-xl mr-3" />
//         <div>
//           <h2 className="font-bold">Transport Management</h2>
//           <p>Total Bookings: {bookings.length} | Today's Date: {new Date().toLocaleDateString()}</p>
//         </div>
//       </div>
      
//       {/* Advanced Filters */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <h2 className="text-xl font-semibold mb-4">Advanced Filters</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
//             <input
//               type="date"
//               value={dateFilter}
//               onChange={(e) => setDateFilter(e.target.value)}
//               className="w-full p-2 border rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
//             <input
//               type="text"
//               value={destinationFilter}
//               onChange={(e) => setDestinationFilter(e.target.value)}
//               placeholder="Enter destination"
//               className="w-full p-2 border rounded-md"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
//             <div className="flex gap-2">
//               <input
//                 type="time"
//                 value={timeSlotFilter}
//                 onChange={(e) => setTimeSlotFilter(e.target.value)}
//                 className="w-full p-2 border rounded-md"
//               />
//               <div className="flex items-center px-3 bg-gray-50 border rounded-md">
//                 {timeSlotFilter ? formatTimeToAMPM(timeSlotFilter) : '--:-- --'}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="mt-4 flex justify-end">
//           <button
//             onClick={() => {
//               setDateFilter('');
//               setDestinationFilter('');
//               setTimeSlotFilter('');
//             }}
//             className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md mr-2"
//           >
//             Clear Filters
//           </button>
//           <button
//             onClick={getAllTransporterBookings}
//             className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
//           >
//             Apply Filters
//           </button>
//         </div>
//       </div>
      
//       {/* Travel Number Verification Section */}
//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <h2 className="text-xl font-semibold mb-4">Verify Student by Travel Number</h2>
        
//         <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
//           {/* QR Code Scanner */}
//           {/* <div className="flex-1">
//             <button 
//               onClick={handleScanToggle}
//               className={`flex items-center justify-center gap-2 p-3 rounded-md w-full ${
//                 isScanning ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
//               } text-white transition-colors`}
//               disabled={loading}
//             >
//               <FaQrcode /> 
//               {isScanning ? 'Cancel Scanning' : 'Scan QR Code'}
//             </button>
//             {isScanning && (
//               <div className="mt-2 border-2 border-dashed border-gray-300 rounded-md p-4 h-40 flex items-center justify-center bg-gray-50">
//                 <div className="text-center">
//                   <div className="animate-pulse text-gray-500 mb-2">Camera active...</div>
//                   <div className="text-sm">Position QR code within this area</div>
//                 </div>
//               </div>
//             )}
//           </div> */}
          
//           {/* Manual Entry */}
//           <div className="flex-1">
//             <form onSubmit={handleManualTravelNumberVerify} className="flex flex-col gap-2">
//               <label htmlFor="travel-number-input" className="font-medium">
//                 Or Enter Travel Number Manually
//               </label>
//               <div className="flex">
//                 <input
//                   id="travel-number-input"
//                   type="text"
//                   value={travelNumberInput}
//                   onChange={(e) => setTravelNumberInput(e.target.value)}
//                   placeholder="Enter travel number (e.g., TR-823515-1900)"
//                   className="flex-1 p-2 border rounded-l-md"
//                   disabled={loading || isScanning}
//                 />
//                 <button
//                   type="submit"
//                   className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-r-md"
//                   disabled={loading || isScanning || !travelNumberInput.trim()}
//                 >
//                   Verify
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
        
//         {/* Travel Number Verification Result */}
//         {selectedBooking && (
//           <div className="p-4 rounded-md bg-green-50 mb-2">
//             <h3 className="font-semibold mb-2">Verification Result:</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
//               <div>
//                 <p><span className="font-medium">Student:</span> {selectedBooking.student.name}</p>
//                 <p><span className="font-medium">School:</span> {selectedBooking.school.name}</p>
//                 <p><span className="font-medium">Guardian:</span> {selectedBooking.guardian.name}</p>
//               </div>
//               <div>
//                 <p><span className="font-medium">Travel Number:</span> {selectedBooking.travelNumber}</p>
//                 <p><span className="font-medium">Route:</span> {selectedBooking.travelDetails.departure} → {selectedBooking.travelDetails.destination}</p>
//                 <p><span className="font-medium">Departure Time:</span> {selectedBooking.travelDetails.departureTime}</p>
//               </div>
//             </div>
            
//             <p className="mb-3">
//               <span className="font-medium">Current Status:</span> 
//               <span className={`ml-2 font-medium ${getStatusColor(selectedBooking.status)}`}>
//                 {selectedBooking.status}
//               </span>
//             </p>
            
//             <div className="flex gap-2 mt-2">
//               <button
//                 onClick={() => confirmBoardingStudent(selectedBooking.travelNumber)}
//                 className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded disabled:opacity-50 flex items-center gap-2"
//                 disabled={selectedBooking.status === 'Boarded' || loadingBoarding}
//               >
//                 {loadingBoarding ? (
//                   <>
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//                     Confirming...
//                   </>
//                 ) : (
//                   'Confirm Boarding'
//                 )}
//               </button>
//               <button
//                 onClick={() => denyBoarding(selectedBooking.travelNumber)}
//                 className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded disabled:opacity-50"
//                 disabled={selectedBooking.status === 'Denied' || loadingBoarding}
//               >
//                 Deny Boarding
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
      
//       {/* Student Booking Status List */}
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <h2 className="text-xl font-semibold mb-4">All Student Bookings</h2>
        
//         {/* Filters */}
//         <div className="flex flex-col md:flex-row gap-4 mb-4">
//           <div className="flex-1">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search by student name, travel number, or school"
//                 className="w-full p-2 pl-10 border rounded-md"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <FaSearch className="absolute left-3 top-3 text-gray-400" />
//             </div>
//           </div>
          
//           <div className="md:w-64">
//             <div className="relative">
//               <select
//                 className="w-full p-2 pl-10 border rounded-md appearance-none"
//                 value={statusFilter}
//                 onChange={(e) => setStatusFilter(e.target.value)}
//               >
//                 <option value="All">All Statuses</option>
//                 <option value="Pending">Pending</option>
//                 <option value="Boarded">Boarded</option>
//                 <option value="Denied">Denied</option>
//               </select>
//               <FaFilter className="absolute left-3 top-3 text-gray-400" />
//             </div>
//           </div>
//         </div>
        
//         {/* Booking List */}
//         {loading ? (
//           <div className="text-center py-8">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
//             <p>Loading booking data...</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-white">
//               <thead>
//                 <tr className="bg-gray-100 text-gray-700">
//                   <th className="py-3 px-4 text-left">Student</th>
//                   <th className="py-3 px-4 text-left">Travel Number</th>
//                   <th className="py-3 px-4 text-left">Route</th>
//                   <th className="py-3 px-4 text-left">Status</th>
//                   <th className="py-3 px-4 text-left">Date</th>
//                   <th className="py-3 px-4 text-left">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {filteredBookings.length > 0 ? (
//                   filteredBookings.map(booking => (
//                     <tr key={booking._id} className="hover:bg-gray-50">
//                       <td className="py-3 px-4">
//                         <div>
//                           <div className="font-medium">{booking.student.name}</div>
//                           <div className="text-sm text-gray-500">{booking.school.name}</div>
//                           <div className="text-xs text-gray-400">Guardian: {booking.guardian.name}</div>
//                         </div>
//                       </td>
//                       <td className="py-3 px-4 font-mono text-sm">{booking.travelNumber}</td>
//                       <td className="py-3 px-4">
//                         <div className="text-sm">
//                           <div>{booking.travelDetails.departure} → {booking.travelDetails.destination}</div>
//                           <div className="text-gray-500">Dep: {booking.travelDetails.departureTime}</div>
//                         </div>
//                       </td>
//                       <td className="py-3 px-4">
//                         <div className="flex items-center">
//                           {getStatusIcon(booking.status)}
//                           <span className={`ml-2 ${getStatusColor(booking.status)}`}>
//                             {booking.status}
//                           </span>
//                         </div>
//                       </td>
//                       <td className="py-3 px-4">
//                         <div className="text-sm">
//                           <div>{formatDate(booking.travelDetails.plan.date)}</div>
//                           <div className="text-gray-500">Updated: {formatTime(booking.updatedAt)}</div>
//                         </div>
//                       </td>
//                       <td className="py-3 px-4">
//                         {booking.status === 'Pending' || booking.status === 'pending' ? (
//                           <div className="flex space-x-2">
//                             <button
//                               onClick={() => confirmBoardingStudent(booking.travelNumber)}
//                               className="bg-green-100 hover:bg-green-200 text-green-800 py-1 px-3 rounded-md text-sm disabled:opacity-50"
//                               disabled={loadingBoarding}
//                             >
//                               Board
//                             </button>
//                             <button
//                               onClick={() => denyBoarding(booking.travelNumber)}
//                               className="bg-red-100 hover:bg-red-200 text-red-800 py-1 px-3 rounded-md text-sm"
//                               disabled={loadingBoarding}
//                             >
//                               Deny
//                             </button>
//                           </div>
//                         ) : (
//                           <div className="flex space-x-2">
//                             <button
//                               onClick={() => {
//                                 setSelectedBooking(booking);
//                                 setTravelNumberInput(booking.travelNumber);
//                               }}
//                               className="bg-blue-100 hover:bg-blue-200 text-blue-800 py-1 px-3 rounded-md text-sm"
//                             >
//                               View
//                             </button>
//                           </div>
//                         )}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={6} className="py-8 text-center text-gray-500">
//                       No bookings found for the selected criteria
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
        
//         {/* Status Summary */}
//         <div className="mt-4 flex flex-wrap gap-4">
//           <div className="bg-gray-50 px-4 py-2 rounded-md flex items-center">
//             <div className="mr-3 text-lg font-medium">Total:</div>
//             <div className="text-lg font-bold">{filteredBookings.length}</div>
//           </div>
          
//           <div className="bg-green-50 px-4 py-2 rounded-md flex items-center">
//             <FaCheckCircle className="text-green-500 mr-2" />
//             <div className="mr-3">Boarded:</div>
//             <div className="font-bold">
//               {filteredBookings.filter(b => b.status.toLowerCase() === 'boarded').length}
//             </div>
//           </div>
          
//           <div className="bg-yellow-50 px-4 py-2 rounded-md flex items-center">
//             <FaBell className="text-yellow-500 mr-2" />
//             <div className="mr-3">Pending:</div>
//             <div className="font-bold">
//               {filteredBookings.filter(b => b.status.toLowerCase() === 'pending').length}
//             </div>
//           </div>
          
//           <div className="bg-red-50 px-4 py-2 rounded-md flex items-center">
//             <FaTimesCircle className="text-red-500 mr-2" />
//             <div className="mr-3">Denied:</div>
//             <div className="font-bold">
//               {filteredBookings.filter(b => b.status.toLowerCase() === 'denied').length}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentBoardingVerification;





"use client";

import React, { useState, useEffect } from 'react';
import { 
  FaQrcode, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaBell, 
  FaSearch, 
  FaFilter, 
  FaBus,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt
} from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'sonner';
import { TravelBooking } from '@/types';

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'boarded': return <FaCheckCircle className="text-green-500" />;
    case 'denied': return <FaTimesCircle className="text-red-500" />;
    case 'pending': return <FaBell className="text-yellow-500" />;
    default: return <FaBell className="text-gray-500" />;
  }
};

// Get status color
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'boarded': return 'text-green-500';
    case 'denied': return 'text-red-500';
    case 'pending': return 'text-yellow-500';
    default: return 'text-gray-500';
  }
};

type BoardingStatus = 'Pending' | 'Boarded' | 'Denied';

const StudentBoardingVerification = () => {
  // States
  const [bookings, setBookings] = useState<TravelBooking[]>([]);
  const [travelNumberInput, setTravelNumberInput] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string | 'All'>('All');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [destinationFilter, setDestinationFilter] = useState<string>('');
  const [timeSlotFilter, setTimeSlotFilter] = useState<string>('');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<TravelBooking | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingBoarding, setLoadingBoarding] = useState<boolean>(false);
  
  // Available destinations and time slots for dropdowns
  const [availableDestinations, setAvailableDestinations] = useState<string[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);
  
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

      console.log("bookings response from api", response.data.data);
      
      // Handle the response structure based on your API
      const bookingsData = response.data.data || response.data || [];
      setBookings(bookingsData);
      
      // Extract unique destinations and time slots for filter dropdowns
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

  // Fetch bookings on component mount
  useEffect(() => {
    getAllTransporterBookings();
  }, []);
  
  // Refetch data when filters change (debounced)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      getAllTransporterBookings();
    }, 500); // 500ms debounce
    
    return () => clearTimeout(timeoutId);
  }, [searchQuery, statusFilter, dateFilter, destinationFilter, timeSlotFilter]);
  
  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery('');
    setStatusFilter('All');
    setDateFilter('');
    setDestinationFilter('');
    setTimeSlotFilter('');
  };
  
  // Handle QR code scanning toggle
  const handleScanToggle = () => {
    setIsScanning(!isScanning);
    if (!isScanning) {
      toast.info('Camera activated for QR scanning');
      // Simulate a successful scan after 3 seconds for demo
      setTimeout(() => {
        // You would get the actual travel number from QR scan
        const sampleTravelNumber = bookings[0]?.travelNumber || '';
        setTravelNumberInput(sampleTravelNumber);
        setIsScanning(false);
        verifyTravelNumber(sampleTravelNumber);
        toast.success('QR code scanned successfully');
      }, 3000);
    }
  };
  
  // Verify travel number
  const verifyTravelNumber = (travelNumber: string) => {
    const booking = bookings.find(b => b.travelNumber === travelNumber);
    
    if (!booking) {
      toast.error('Invalid travel number: No matching booking found');
      return;
    }
    
    setSelectedBooking(booking);
    
    // Check if student is already boarded
    if (booking.status === 'Boarded') {
      toast.warning('Student has already boarded this trip');
      return;
    }
    
    toast.success('Travel number verified successfully!');
  };
  
  // Handle manual travel number input
  const handleManualTravelNumberVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!travelNumberInput.trim()) {
      toast.error('Please enter a travel number');
      return;
    }
    
    verifyTravelNumber(travelNumberInput);
  };
  
  // Confirm boarding student - Updated function
  const confirmBoardingStudent = async (travelNumber: string) => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      toast.error('Authentication token not found. Please log in again.');
      return;
    }

    try {
      setLoadingBoarding(true);
      
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}travels/${travelNumber}/boarding`,
        {}, // Empty body if no additional data needed
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Boarding confirmation response:", response.data);
      
      // Refresh the data to get updated status from server
      await getAllTransporterBookings();
      
      // Clear selected booking and input
      setSelectedBooking(null);
      setTravelNumberInput('');
      
      toast.success('Student boarding confirmed successfully!');
      
    } catch (error: any) {
      console.error('Error confirming boarding:', error);
      
      if (error.response?.status === 401) {
        toast.error('Authentication failed. Please log in again.');
      } else if (error.response?.status === 404) {
        toast.error('Travel booking not found.');
      } else {
        toast.error(error.response?.data?.message || 'Failed to confirm boarding. Please try again.');
      }
    } finally {
      setLoadingBoarding(false);
    }
  };
  
  // Deny boarding (if needed)
  const denyBoarding = async (travelNumber: string, reason: string = 'Denied by transporter') => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      toast.error('Authentication token not found. Please log in again.');
      return;
    }

    try {
      setLoadingBoarding(true);
      
      // If you have a deny endpoint, use it here
      // const response = await axios.patch(
      //   `${process.env.NEXT_PUBLIC_API_URL}travels/${travelNumber}/deny`,
      //   { reason },
      //   {
      //     headers: {
      //       'Authorization': `Bearer ${token}`,
      //       'Content-Type': 'application/json'
      //     }
      //   }
      // );
      
      // For now, update local state
      setBookings(prevBookings => 
        prevBookings.map(booking => 
          booking.travelNumber === travelNumber 
            ? { ...booking, status: 'Denied', updatedAt: new Date().toISOString() }
            : booking
        )
      );
      
      setSelectedBooking(null);
      setTravelNumberInput('');
      toast.success('Student boarding denied');
      
    } catch (error: any) {
      console.error('Error denying boarding:', error);
      toast.error('Failed to deny boarding. Please try again.');
    } finally {
      setLoadingBoarding(false);
    }
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  // Format time
  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString();
  };
  
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Student Boarding Verification</h1>
      
      {/* Summary Card */}
      <div className="bg-blue-50 p-4 rounded-md mb-6 flex items-center">
        <FaBus className="text-blue-600 text-xl mr-3" />
        <div>
          <h2 className="font-bold">Transport Management</h2>
          <p>Total Bookings: {bookings.length} | Today's Date: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
      
      {/* Travel Number Verification Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Verify Student by Travel Number</h2>
        
        <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
    
          
          {/* Manual Entry */}
          <div className="flex-1">
            <form onSubmit={handleManualTravelNumberVerify} className="flex flex-col gap-2">
              <label htmlFor="travel-number-input" className="font-medium">
                Enter Travel Number
              </label>
              <div className="flex">
                <input
                  id="travel-number-input"
                  type="text"
                  value={travelNumberInput}
                  onChange={(e) => setTravelNumberInput(e.target.value)}
                  placeholder="Enter travel number (e.g., TR-823515-1900)"
                  className="flex-1 p-2 border rounded-l-md"
                  disabled={loading || isScanning}
                />
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-r-md"
                  disabled={loading || isScanning || !travelNumberInput.trim()}
                >
                  Verify
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Travel Number Verification Result */}
        {selectedBooking && (
          <div className="p-4 rounded-md bg-green-50 mb-2">
            <h3 className="font-semibold mb-2">Verification Result:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <div>
                <p><span className="font-medium">Student:</span> {selectedBooking.student.name}</p>
                <p><span className="font-medium">School:</span> {selectedBooking.school.name}</p>
                <p><span className="font-medium">Guardian:</span> {selectedBooking.guardian.name}</p>
              </div>
              <div>
                <p><span className="font-medium">Travel Number:</span> {selectedBooking.travelNumber}</p>
                <p><span className="font-medium">Route:</span> {selectedBooking.travelDetails.departure} → {selectedBooking.travelDetails.destination}</p>
                <p><span className="font-medium">Departure Time:</span> {selectedBooking.travelDetails.departureTime}</p>
              </div>
            </div>
            
            <p className="mb-3">
              <span className="font-medium">Current Status:</span> 
              <span className={`ml-2 font-medium ${getStatusColor(selectedBooking.status)}`}>
                {selectedBooking.status}
              </span>
            </p>
            
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => confirmBoardingStudent(selectedBooking.travelNumber)}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded disabled:opacity-50 flex items-center gap-2"
                disabled={selectedBooking.status === 'Boarded' || loadingBoarding}
              >
                {loadingBoarding ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Confirming...
                  </>
                ) : (
                  'Confirm Boarding'
                )}
              </button>
              <button
                onClick={() => denyBoarding(selectedBooking.travelNumber)}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded disabled:opacity-50"
                disabled={selectedBooking.status === 'Denied' || loadingBoarding}
              >
                Deny Boarding
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Student Booking Status List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">All Student Bookings</h2>
        
        {/* Enhanced Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-4">
          {/* Search Filter */}
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
          
          {/* Status Filter */}
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
          
          {/* Date Filter */}
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
          
          {/* Destination Filter */}
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
        
        {/* Second row of filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Time Slot Filter */}
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
          
          {/* Clear Filters Button */}
          <div>
            <button
              onClick={clearAllFilters}
              className="w-full p-2 bg-primary  text-white rounded-md transition-colors"
            >
              Clear All Filters
            </button>
          </div>
          
          {/* Active Filters Indicator */}
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
        
        {/* Booking List */}
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p>Loading booking data...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-3 px-4 text-left">Student</th>
                  <th className="py-3 px-4 text-left">Travel Number</th>
                  <th className="py-3 px-4 text-left">Route</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bookings.length > 0 ? (
                  bookings.map(booking => (
                    <tr key={booking._id} className="hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{booking.student.name}</div>
                          <div className="text-sm text-gray-500">{booking.school.name}</div>
                          <div className="text-xs text-gray-400">Guardian: {booking.guardian.name}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-sm">{booking.travelNumber}</td>
                      <td className="py-3 px-4">
                        <div className="text-sm">
                          <div>{booking.travelDetails.departure} → {booking.travelDetails.destination}</div>
                          <div className="text-gray-500">Dep: {booking.travelDetails.departureTime}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          {getStatusIcon(booking.status)}
                          <span className={`ml-2 ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm">
                          <div>{formatDate(booking.travelDetails.plan.date)}</div>
                          <div className="text-gray-500">Updated: {formatTime(booking.updatedAt)}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        {booking.status === 'Pending' || booking.status === 'pending' ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => confirmBoardingStudent(booking.travelNumber)}
                              className="bg-green-100 hover:bg-green-200 text-green-800 py-1 px-3 rounded-md text-sm disabled:opacity-50"
                              disabled={loadingBoarding}
                            >
                              Board
                            </button>
                            <button
                              onClick={() => denyBoarding(booking.travelNumber)}
                              className="bg-red-100 hover:bg-red-200 text-red-800 py-1 px-3 rounded-md text-sm"
                              disabled={loadingBoarding}
                            >
                              Deny
                            </button>
                          </div>
                        ) : (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setSelectedBooking(booking);
                                setTravelNumberInput(booking.travelNumber);
                              }}
                              className="bg-blue-100 hover:bg-blue-200 text-blue-800 py-1 px-3 rounded-md text-sm"
                            >
                              View
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-500">
                      No bookings found for the selected criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Status Summary */}
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="bg-gray-50 px-4 py-2 rounded-md flex items-center">
            <div className="mr-3 text-lg font-medium">Total:</div>
            <div className="text-lg font-bold">{bookings.length}</div>
          </div>
          
          <div className="bg-green-50 px-4 py-2 rounded-md flex items-center">
            <FaCheckCircle className="text-green-500 mr-2" />
            <div className="mr-3">Boarded:</div>
            <div className="font-bold">
              {bookings.filter(b => b.status.toLowerCase() === 'boarded').length}
            </div>
          </div>
          
          <div className="bg-yellow-50 px-4 py-2 rounded-md flex items-center">
            <FaBell className="text-yellow-500 mr-2" />
            <div className="mr-3">Pending:</div>
            <div className="font-bold">
              {bookings.filter(b => b.status.toLowerCase() === 'pending').length}
            </div>
          </div>
          
          <div className="bg-red-50 px-4 py-2 rounded-md flex items-center">
            <FaTimesCircle className="text-red-500 mr-2" />
            <div className="mr-3">Denied:</div>
            <div className="font-bold">
              {bookings.filter(b => b.status.toLowerCase() === 'denied').length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentBoardingVerification;