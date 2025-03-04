

import { Booking, BusTrip } from "@/app/(account)/myaccount/travel-schedule/page";
import { useState } from "react";
import { FaFilter, FaMapMarkerAlt, FaUsers, FaDownload, FaQrcode, FaEye } from "react-icons/fa";
// import QRCode from "qrcode.react";
import QRCode from "react-qr-code";
import * as QRCodeGenerator from "qrcode";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const TripBookingTable = ({
    bookings,
    busTrips,
    onTripSelected  
}:{
    bookings:Booking[];
    busTrips:BusTrip[];
    onTripSelected?: (trip: any) => void;
}) => {
    const [bookingFilters, setBookingFilters] = useState({
        district: '',
        date: '',
        status: ''
    });

    // Existing filter change handler
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

    const handleDownloadTicket = async (booking: Booking, trip: BusTrip) => {
        const ticketDetails = JSON.stringify({
            bookingId: booking.id,
            studentName: booking.studentName,
            destination: trip.destinationName,
            departureDate: trip.departureDate,
            departureTime: trip.departureTime,
            status: booking.status
        });

        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw ticket content
            ctx.fillStyle = 'black';
            ctx.font = 'bold 24px Arial';
            ctx.fillText('Bus Trip Ticket', 50, 50);

            ctx.font = '16px Arial';
            ctx.fillText(`Booking ID: ${booking.id}`, 50, 100);
            ctx.fillText(`Student Name: ${booking.studentName}`, 50, 130);
            ctx.fillText(`Destination: ${trip.destinationName}`, 50, 160);
            ctx.fillText(`Departure Date: ${trip.departureDate}`, 50, 190);
            ctx.fillText(`Departure Time: ${trip.departureTime}`, 50, 220);
            ctx.fillText(`Status: ${booking.status}`, 50, 250);

            // Generate QR code
            try {
                const qrCanvas = await QRCodeGenerator.toCanvas(ticketDetails, {
                    errorCorrectionLevel: 'M',
                    width: 200,
                    margin: 1
                });
                
                ctx.drawImage(qrCanvas, 550, 350, 200, 200);

                // Download
                const link = document.createElement('a');
                link.href = canvas.toDataURL('image/png');
                link.download = `ticket_${booking.id}.png`;
                link.click();
            } catch (error) {
                console.error('Error generating QR code:', error);
            }
        }
    };


    // Ticket view modal
    const TicketModal = ({ booking, trip }: { booking: Booking, trip: BusTrip }) => {
        const ticketDetails = JSON.stringify({
            bookingId: booking.id,
            studentName: booking.studentName,
            destination: trip.destinationName,
            departureDate: trip.departureDate,
            departureTime: trip.departureTime,
            status: booking.status
        });

        return (
            <Dialog>
                <DialogTrigger asChild>
                    <button className="text-blue-500 hover:text-blue-700 flex items-center">
                        <FaEye className="mr-1" /> View
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Ticket Details</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex flex-col items-center">
                            <QRCode value={ticketDetails} size={256} />
                            <div className="mt-4 text-center">
                                <p><strong>Booking ID:</strong> {booking.id}</p>
                                <p><strong>Student:</strong> {booking.studentName}</p>
                                <p><strong>Destination:</strong> {trip.destinationName}</p>
                                <p><strong>Departure:</strong> {trip.departureDate} at {trip.departureTime}</p>
                                <p><strong>Status:</strong> {booking.status}</p>
                            </div>
                            <button 
                                onClick={() => handleDownloadTicket(booking, trip)}
                                className="mt-4 bg-primary text-white px-4 py-2 rounded flex items-center"
                            >
                                <FaDownload className="mr-2" /> Download Ticket
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        );
    };

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
          <div className="bg-white w-full rounded-lg shadow overflow-scroll ">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departure</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
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

                        <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex space-x-2">
                                    {trip && (
                                        <>
                                            <TicketModal booking={booking} trip={trip} />
                                            <button 
                                                onClick={() => handleDownloadTicket(booking, trip)}
                                                className="text-green-500 hover:text-green-700 flex items-center"
                                            >
                                                <FaDownload className="mr-1" /> Download
                                            </button>
                                        </>
                                    )}
                                </div>
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
};

export default TripBookingTable;