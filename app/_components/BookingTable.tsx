import React from 'react';
import { TravelBooking } from '@/types';

interface BookingTableProps {
  bookings: TravelBooking[];
  loading: boolean;
}

const BookingTable: React.FC<BookingTableProps> = ({ bookings, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
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
          {bookings.length === 0 ? (
            <tr>
              <td colSpan={9} className="px-6 py-4 text-center text-gray-500">
                No bookings found matching your filters.
              </td>
            </tr>
          ) : (
            bookings.map((booking: TravelBooking) => (
              <tr key={booking._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium">{booking.student.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm">
                    <div className="font-medium">{booking.guardian.name}</div>
                    <div className="text-gray-500 text-sm">{booking.guardian.phoneNumber}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm">
                    <div className="font-medium">{booking.school.name}</div>
                    <div className="text-gray-500 text-sm">{booking.school.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium">{booking.travelNumber}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium">{booking.travelDetails.destination}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col">
                    <div>{new Date(booking.travelDetails.plan.date).toLocaleDateString()}</div>
                    <div className="text-sm text-gray-500">{booking.travelDetails.departureTime}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {new Date(booking.createdAt).toLocaleDateString()}
                </td>
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
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BookingTable; 