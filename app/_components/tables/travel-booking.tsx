import { Booking, BusTrip } from "@/app/(account)/myaccount/travel-schedule/page";
import { useState } from "react";
import { FaFilter, FaMapMarkerAlt, FaUsers } from "react-icons/fa";



const TripBookingTable = ({
    bookings,
    busTrips,
    onTripSelected  
}:{
    bookings:Booking[];
    busTrips:BusTrip[];
    onTripSelected?: (trip: any) => void;
}
    ) => {
        const [bookingFilters, setBookingFilters] = useState({
            district: '',
            date: '',
            status: ''
          });

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
    
    return (
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
    );
    }   



    export default TripBookingTable;