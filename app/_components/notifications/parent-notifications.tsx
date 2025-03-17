

"use client";
import React, { useState, useEffect } from 'react';
import { 
  FaBus, 
  FaMapMarkerAlt, 
  FaClock, 
  FaExclamationTriangle 
} from 'react-icons/fa';

// Types Definition
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
}

// Notification Service
class NotificationService {
  // Simulated notification creation
  static createNotification(data: Partial<TripNotification>): TripNotification {
    return {
      id: Math.random().toString(36).substr(2, 9),
      studentId: data.studentId || '',
      studentName: data.studentName || '',
      busId: data.busId || '',
      type: data.type || 'DEPARTURE',
      pickupLocation: data.pickupLocation || '',
      destination: data.destination || '',
      departureTime: data.departureTime || new Date().toISOString(),
      estimatedArrivalTime: data.estimatedArrivalTime,
      actualArrivalTime: data.actualArrivalTime,
      delayReason: data.delayReason,
      emergencyDetails: data.emergencyDetails,
      status: 'SENT'
    };
  }

  // Notification dispatch methods
  static sendDepartureNotification(trip: Partial<TripNotification>): TripNotification {
    return this.createNotification({
      ...trip,
      type: 'DEPARTURE',
      departureTime: new Date().toISOString()
    });
  }

  static sendArrivalNotification(trip: Partial<TripNotification>): TripNotification {
    return this.createNotification({
      ...trip,
      type: 'ARRIVAL',
      actualArrivalTime: new Date().toISOString()
    });
  }

  static sendDelayNotification(trip: Partial<TripNotification>): TripNotification {
    return this.createNotification({
      ...trip,
      type: 'DELAY',
      delayReason: trip.delayReason || 'Unexpected traffic'
    });
  }

  static sendEmergencyNotification(trip: Partial<TripNotification>): TripNotification {
    return this.createNotification({
      ...trip,
      type: 'EMERGENCY',
      emergencyDetails: trip.emergencyDetails || 'Safety incident reported'
    });
  }
}


export default function ParentNotificationPage() {
  const [notifications, setNotifications] = useState<TripNotification[]>([]);
  const [selectedNotification, setSelectedNotification] = useState<TripNotification | null>(null);

  // Simulated data fetch
  useEffect(() => {
    // In a real-world scenario, this would be an API call
    const mockNotifications: TripNotification[] = [
      NotificationService.sendDepartureNotification({
        studentId: '1',
        studentName: 'Emma Johnson',
        busId: 'BUS-101',
        pickupLocation: '123 Maple Street',
        destination: 'Sunshine Elementary',
        estimatedArrivalTime: new Date(Date.now() + 30 * 60000).toISOString()
      }),
      NotificationService.sendDelayNotification({
        studentId: '2',
        studentName: 'Alex Smith',
        busId: 'BUS-102',
        pickupLocation: '456 Oak Avenue',
        destination: 'Horizon Middle School',
        delayReason: 'Road construction'
      })
    ];

    setNotifications(mockNotifications);
  }, []);

  // Notification type color mapping
  const getNotificationColor = (type: NotificationType) => {
    switch(type) {
      case 'DEPARTURE': return 'bg-green-50 border-green-500';
      case 'ARRIVAL': return 'bg-blue-50 border-blue-500';
      case 'DELAY': return 'bg-yellow-50 border-yellow-500';
      case 'EMERGENCY': return 'bg-red-50 border-red-500';
      case 'BREAKDOWN': return 'bg-red-50 border-red-500';
      default: return 'bg-gray-50 border-gray-500';
    }
  };

  // Notification type icon mapping
  const getNotificationIcon = (type: NotificationType) => {
    switch(type) {
      case 'DEPARTURE': return <FaBus className="text-green-500" />;
      case 'ARRIVAL': return <FaMapMarkerAlt className="text-blue-500" />;
      case 'DELAY': return <FaClock className="text-yellow-500" />;
      case 'EMERGENCY': return <FaExclamationTriangle className="text-red-500" />;
      case 'BREAKDOWN': return <FaExclamationTriangle className="text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Notifications List */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Trip Notifications</h2>
            {notifications.map(notification => (
              <div 
                key={notification.id}
                onClick={() => setSelectedNotification(notification)}
                className={`
                  p-4 mb-3 rounded-lg border-l-4 cursor-pointer
                  hover:bg-gray-100 transition-colors
                  ${getNotificationColor(notification.type)}
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getNotificationIcon(notification.type)}
                    <span className="font-medium">{notification.studentName}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(notification.departureTime || '').toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Details */}
        <div className="md:col-span-2">
          {selectedNotification ? (
            <div className={`
              bg-white rounded-lg shadow-md p-6
              ${getNotificationColor(selectedNotification.type)}
            `}>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                {getNotificationIcon(selectedNotification.type)}
                <span className="ml-3">
                  {selectedNotification.studentName}'s Trip Details
                </span>
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="flex items-center mb-2">
                    <FaBus className="mr-2 text-blue-500" />
                    <strong>Bus ID:</strong> {selectedNotification.busId}
                  </p>
                  <p className="flex items-center mb-2">
                    <FaMapMarkerAlt className="mr-2 text-green-500" />
                    <strong>Pickup Location:</strong> {selectedNotification.pickupLocation}
                  </p>
                </div>
                <div>
                  <p className="flex items-center mb-2">
                    <FaMapMarkerAlt className="mr-2 text-red-500" />
                    <strong>Destination:</strong> {selectedNotification.destination}
                  </p>
                  {selectedNotification.estimatedArrivalTime && (
                    <p className="flex items-center mb-2">
                      <FaClock className="mr-2 text-purple-500" />
                      <strong>Estimated Arrival:</strong> 
                      {new Date(selectedNotification.estimatedArrivalTime).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>

              {/* Conditional Notification Details */}
              {selectedNotification.type === 'DELAY' && (
                <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-3">
                  <p className="flex items-center text-yellow-700">
                    <FaExclamationTriangle className="mr-2" />
                    <strong>Delay Reason:</strong> {selectedNotification.delayReason}
                  </p>
                </div>
              )}

              {selectedNotification.type === 'EMERGENCY' && (
                <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-3">
                  <p className="flex items-center text-red-700">
                    <FaExclamationTriangle className="mr-2" />
                    <strong>Emergency Details:</strong> {selectedNotification.emergencyDetails}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <p className="text-gray-500">Select a notification to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}