'use client';

import { useState, useEffect } from "react";
import { 
  FaFilter, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaDownload, 
  FaEye, 
  FaBell, 
  FaExclamationTriangle, 
  FaBus, 
  FaCheckCircle 
} from "react-icons/fa";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import QRCode from "react-qr-code";

// Types
type Destination = {
  id: string;
  name: string;
  district: string;
};

type FromDestination = {
  id: string;
  name: string;
  district: string;
};

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
  company?: string;
  driver?: string;
  busPlateNumber?: string;
  busDetails?: {
    busId: string;
    busNumber: string;
    driverName: string;
    driverContact: string;
  };
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

type NotificationType = 
  | 'DEPARTURE' 
  | 'ARRIVAL' 
  | 'DELAY' 
  | 'EMERGENCY' 
  | 'BREAKDOWN';

interface TripNotification {
  id: string;
  studentId: string;
  studentName: string;
  busId: string;
  type: NotificationType;
  pickupLocation: string;
  destination: string;
  departureTime?: string;
  estimatedArrivalTime?: string;
  actualArrivalTime?: string;
  delayReason?: string;
  emergencyDetails?: string;
  status: 'SENT' | 'READ' | 'ACKNOWLEDGED';
  timestamp: string;
}

// School notification component that handles all notification types
const SchoolTravelNotifications = ({
  bookings,
  busTrips,
  schoolId
}: {
  bookings: Booking[];
  busTrips: BusTrip[];
  schoolId: string;
}) => {
  const [notifications, setNotifications] = useState<TripNotification[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<TripNotification | null>(null);

  // Fetch notifications - in a real app, this would be from an API
  useEffect(() => {
    // Simulated notification data
    // In a real application, this would come from your backend
    const mockNotifications: TripNotification[] = [
      {
        id: "notif1",
        studentId: bookings[0]?.studentId || "student1",
        studentName: bookings[0]?.studentName || "Jane Doe",
        busId: "bus1",
        type: "DEPARTURE",
        pickupLocation: busTrips[0]?.fromName || "City Center",
        destination: busTrips[0]?.destinationName || "North High School",
        departureTime: "08:30 AM",
        estimatedArrivalTime: "09:15 AM",
        status: "SENT",
        timestamp: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
      },
      {
        id: "notif2",
        studentId: bookings[1]?.studentId || "student2",
        studentName: bookings[1]?.studentName || "John Smith",
        busId: "bus2",
        type: "ARRIVAL",
        pickupLocation: busTrips[1]?.fromName || "South Station",
        destination: busTrips[1]?.destinationName || "West High School",
        actualArrivalTime: "08:45 AM",
        status: "SENT",
        timestamp: new Date(Date.now() - 1800000).toISOString() // 30 minutes ago
      },
      {
        id: "notif3",
        studentId: bookings[2]?.studentId || "student3",
        studentName: bookings[2]?.studentName || "Robert Johnson",
        busId: "bus3",
        type: "DELAY",
        pickupLocation: busTrips[2]?.fromName || "East Terminal",
        destination: busTrips[2]?.destinationName || "South High School",
        departureTime: "07:30 AM",
        estimatedArrivalTime: "08:45 AM",
        delayReason: "Traffic congestion on Main Highway",
        status: "SENT",
        timestamp: new Date(Date.now() - 900000).toISOString() // 15 minutes ago
      },
      {
        id: "notif4",
        studentId: bookings[0]?.studentId || "student1",
        studentName: bookings[0]?.studentName || "Jane Doe",
        busId: "bus1",
        type: "EMERGENCY",
        pickupLocation: busTrips[0]?.fromName || "City Center",
        destination: busTrips[0]?.destinationName || "North High School",
        emergencyDetails: "Medical emergency, ambulance called. Bus will be delayed by 30 minutes.",
        status: "SENT",
        timestamp: new Date(Date.now() - 300000).toISOString() // 5 minutes ago
      }
    ];

    setNotifications(mockNotifications);
  }, [bookings, busTrips]);

  // Mark notification as read
  const markAsRead = (notificationId: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === notificationId
          ? { ...notification, status: 'READ' as const }
          : notification
      )
    );
  };

  // Acknowledge notification
  const acknowledgeNotification = (notificationId: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === notificationId
          ? { ...notification, status: 'ACKNOWLEDGED' as const }
          : notification
      )
    );
    setSelectedNotification(null);
  };

  // Get icon based on notification type
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'DEPARTURE':
        return <FaBus className="text-blue-500" />;
      case 'ARRIVAL':
        return <FaCheckCircle className="text-green-500" />;
      case 'DELAY':
        return <FaExclamationTriangle className="text-yellow-500" />;
      case 'EMERGENCY':
      case 'BREAKDOWN':
        return <FaExclamationTriangle className="text-red-500" />;
      default:
        return <FaBell className="text-gray-500" />;
    }
  };

  // Get notification title based on type
  const getNotificationTitle = (notification: TripNotification) => {
    switch (notification.type) {
      case 'DEPARTURE':
        return `Bus Departed: ${notification.studentName}`;
      case 'ARRIVAL':
        return `Bus Arrived: ${notification.studentName}`;
      case 'DELAY':
        return `Trip Delayed: ${notification.studentName}`;
      case 'EMERGENCY':
        return `Emergency Alert: ${notification.studentName}`;
      case 'BREAKDOWN':
        return `Vehicle Breakdown: ${notification.studentName}`;
      default:
        return `Notification for ${notification.studentName}`;
    }
  };

  // Format timestamp to readable format
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  // Notification detail view modal
  const NotificationDetailModal = ({ notification }: { notification: TripNotification }) => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <button 
            className="text-blue-500 hover:text-blue-700 flex items-center"
            onClick={() => markAsRead(notification.id)}
          >
            <FaEye className="mr-1" /> View Details
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{getNotificationTitle(notification)}</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <div className="flex items-center mb-4">
              {getNotificationIcon(notification.type)}
              <span className="ml-2 font-bold text-lg">{notification.type} Notification</span>
            </div>
            
            <div className="grid grid-cols-1 gap-3 mb-4">
              <div>
                <p className="text-sm text-gray-500">Student</p>
                <p className="font-medium">{notification.studentName}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-sm text-gray-500">From</p>
                  <p className="font-medium">{notification.pickupLocation}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">To</p>
                  <p className="font-medium">{notification.destination}</p>
                </div>
              </div>
              
              {notification.departureTime && (
                <div>
                  <p className="text-sm text-gray-500">Departure Time</p>
                  <p className="font-medium">{notification.departureTime}</p>
                </div>
              )}
              
              {notification.estimatedArrivalTime && (
                <div>
                  <p className="text-sm text-gray-500">Estimated Arrival</p>
                  <p className="font-medium">{notification.estimatedArrivalTime}</p>
                </div>
              )}
              
              {notification.actualArrivalTime && (
                <div>
                  <p className="text-sm text-gray-500">Actual Arrival</p>
                  <p className="font-medium">{notification.actualArrivalTime}</p>
                </div>
              )}
              
              {notification.delayReason && (
                <div>
                  <p className="text-sm text-gray-500">Delay Reason</p>
                  <p className="font-medium">{notification.delayReason}</p>
                </div>
              )}
              
              {notification.emergencyDetails && (
                <div>
                  <p className="text-sm text-gray-500">Emergency Details</p>
                  <p className="font-medium text-red-600">{notification.emergencyDetails}</p>
                </div>
              )}
              
              <div>
                <p className="text-sm text-gray-500">Notification Time</p>
                <p className="font-medium">{formatTimestamp(notification.timestamp)}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className={`font-medium ${
                  notification.status === 'ACKNOWLEDGED' 
                    ? 'text-green-600' 
                    : notification.status === 'READ' 
                      ? 'text-blue-600' 
                      : 'text-yellow-600'
                }`}>
                  {notification.status}
                </p>
              </div>
            </div>
            
            {notification.status !== 'ACKNOWLEDGED' && (
              <button 
                onClick={() => acknowledgeNotification(notification.id)}
                className="w-full bg-primary text-white py-2 rounded font-medium"
              >
                Acknowledge Notification
              </button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  // TripBookingTable component that includes notifications and ticket viewing/downloading
  const TripBookingTable = () => {
    const [bookingFilters, setBookingFilters] = useState({
      district: '',
      date: '',
      status: ''
    });

    // Filter change handler
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

    // Ticket download handler
    const handleDownloadTicket = (booking: Booking, trip: BusTrip) => {
      // Create ticket details for QR code
      const ticketDetails = JSON.stringify({
        bookingId: booking.id,
        studentName: booking.studentName,
        destination: trip.destinationName,
        departureDate: trip.departureDate,
        departureTime: trip.departureTime,
        status: booking.status
      });

      // In a real app, this would use a proper PDF generation library
      alert(`Ticket for ${booking.studentName} is being downloaded`);
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
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

  return (
    <div className="space-y-6">
      {/* Travel Status Notifications Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">School Travel Status Notifications</h2>
          <p className="text-gray-500">Track student bus departures, arrivals, and delays</p>
        </div>
        
        {/* Notification Panel */}
        <div className="p-4">
          <div className="grid gap-4">
            {notifications.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                No travel notifications available at this time
              </div>
            ) : (
              <>
                {/* Show recent notifications or all based on toggle */}
                {(showAll ? notifications : notifications.slice(0, 3)).map(notification => (
                  <div key={notification.id} className={`p-4 border rounded-lg ${
                    notification.status === 'SENT' ? 'bg-blue-50' : 'bg-white'
                  }`}>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-base font-medium">
                            {getNotificationTitle(notification)}
                          </h3>
                          <span className="text-xs text-gray-500">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                        </div>
                        
                        <div className="mt-1 text-sm text-gray-600">
                          {notification.type === 'DEPARTURE' && (
                            <p>Bus departed from {notification.pickupLocation} at {notification.departureTime}. 
                               Expected arrival at {notification.destination}: {notification.estimatedArrivalTime}</p>
                          )}
                          
                          {notification.type === 'ARRIVAL' && (
                            <p>Bus has arrived at {notification.destination} at {notification.actualArrivalTime}.</p>
                          )}
                          
                          {notification.type === 'DELAY' && (
                            <p>Trip delayed: {notification.delayReason}. New estimated arrival: {notification.estimatedArrivalTime}</p>
                          )}
                          
                          {notification.type === 'EMERGENCY' && (
                            <p className="text-red-600">{notification.emergencyDetails}</p>
                          )}
                        </div>
                        
                        <div className="mt-2 flex items-center justify-between">
                          <div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              notification.type === 'DEPARTURE' ? 'bg-blue-100 text-blue-800' :
                              notification.type === 'ARRIVAL' ? 'bg-green-100 text-green-800' :
                              notification.type === 'DELAY' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {notification.type}
                            </span>
                            <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              notification.status === 'ACKNOWLEDGED' ? 'bg-green-100 text-green-800' :
                              notification.status === 'READ' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {notification.status}
                            </span>
                          </div>
                          
                          <div className="flex space-x-2">
                            <NotificationDetailModal notification={notification} />
                            
                            {notification.status !== 'ACKNOWLEDGED' && (
                              <button 
                                onClick={() => acknowledgeNotification(notification.id)}
                                className="text-green-500 hover:text-green-700 flex items-center"
                              >
                                <FaCheckCircle className="mr-1" /> Acknowledge
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Show/Hide toggle button */}
                {notifications.length > 3 && (
                  <button 
                    onClick={() => setShowAll(!showAll)}
                    className="text-primary font-medium text-center"
                  >
                    {showAll ? 'Show Less' : `Show All (${notifications.length})`}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Bookings Table Section */}
      <TripBookingTable />
    </div>
  );
};

export default SchoolTravelNotifications;