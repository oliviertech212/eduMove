"use client";

import React, { useState, useEffect } from 'react';
import { 
  FaMapMarkerAlt, 
  FaBus, 
  FaClock, 
  FaBell, 
  FaWalking, 
  FaMoneyBillWave,
  FaExclamationTriangle,
  FaCalendarAlt,
  FaTemperatureHigh
} from 'react-icons/fa';
import { TiWeatherPartlySunny } from 'react-icons/ti';

export default function StudentDashboard() {
  // Mock data - would come from API in real implementation
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState({
    name: "Alex Johnson",
    schoolName: "Lincoln High School",
    profileImage: "/api/placeholder/100/100",
    currentBalance: 42.50,
    todayRoute: {
      morning: {
        busNumber: "B-104",
        driverName: "Michael Ross",
        pickupTime: "7:15 AM",
        pickupLocation: "Maple Street & 5th Avenue",
        estimatedArrival: "7:55 AM",
        status: "On time",
        currentLocation: "2 stops away",
        nextStop: "Pine Street & 3rd Avenue (7:08 AM)",
        dropoffTime: "8:00 AM"
      },
      afternoon: {
        busNumber: "B-112",
        driverName: "Sarah Miller",
        pickupTime: "3:30 PM",
        pickupLocation: "Lincoln High School - West Exit",
        dropoffTime: "4:10 PM",
        status: "Scheduled",
        estimatedArrival : "4:10 PM",
        currentLocation: "At school",
        nextStop: "Maple Street & 5th Avenue"

      }
    },
    weather: {
      condition: "Partly Cloudy",
      temperature: "72°F",
      precipitation: "10%"
    },
    notifications: [
      {
        id: 1,
        type: "alert",
        message: "Your morning bus B-104 is running 5 minutes ahead of schedule",
        time: "6:50 AM",
        read: false
      },
      {
        id: 2,
        type: "info",
        message: "Route change next Monday due to road construction",
        time: "Yesterday",
        read: true
      },
      {
        id: 3,
        type: "payment",
        message: "Monthly pass will expire in 5 days",
        time: "Yesterday",
        read: true
      }
    ]
  });

  // Simulation of loading data
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const formatTimeRemaining = () => {
    // In real app, calculate actual time remaining
    return "42 minutes";
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  // Get current time info
  const now = new Date();
  const isMorning = now.getHours() < 12;
  const currentRoute = isMorning ? studentData.todayRoute.morning : studentData.todayRoute.afternoon;
  
  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Header with student info */}
      <header className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 overflow-hidden mr-4">
              <img 
                src="/api/placeholder/100/100" 
                alt="Student" 
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Welcome, {studentData.name}</h1>
              <p className="text-gray-600">{studentData.schoolName}</p>
            </div>
          </div>
          <div className="flex items-center bg-blue-50 px-4 py-2 rounded-lg">
            <FaMoneyBillWave className="text-green-600 mr-2" />
            <span>Balance: <strong>${studentData.currentBalance.toFixed(2)}</strong></span>
          </div>
        </div>
        
        {/* Weather status */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg flex items-center text-sm">
          <TiWeatherPartlySunny className="text-yellow-500 text-xl mr-2" />
          <span>Today: {studentData.weather.condition}, {studentData.weather.temperature}</span>
          {Number(studentData.weather.precipitation) > 20 && (
            <span className="ml-2 text-blue-600">
              <FaExclamationTriangle className="inline mr-1" />
              Rain may affect bus timing
            </span>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Current/Next Trip Card - Takes 2 cols */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <FaBus className="mr-2 text-xl" />
              <h2 className="text-lg font-semibold">
                {isMorning ? "Morning Trip to School" : "Afternoon Trip Home"}
              </h2>
            </div>
            <div className="flex items-center">
              <FaClock className="mr-1" />
              <span>{formatTimeRemaining()} until {isMorning ? "pickup" : "departure"}</span>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between mb-6">
              <div>
                <p className="text-sm text-gray-500">Bus Number</p>
                <p className="font-medium">{currentRoute.busNumber}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Driver</p>
                <p className="font-medium">{currentRoute.driverName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className={`font-medium ${currentRoute.status === "On time" ? "text-green-600" : "text-blue-600"}`}>
                  {currentRoute.status}
                </p>
              </div>
            </div>
            
            {/* Trip details */}
            <div className="space-y-4">
              {isMorning ? (
                <>
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <FaMapMarkerAlt className="text-blue-600 text-sm" />
                    </div>
                    <p className="text-sm text-gray-500">Pickup Location</p>
                    <p className="font-medium">{currentRoute.pickupLocation}</p>
                    <p className="text-sm font-medium text-blue-600">Pickup at {currentRoute.pickupTime}</p>
                  </div>
                  
                  <div className="h-12 border-l-2 border-dashed border-gray-300 ml-3"></div>
                  
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <FaSchool className="text-green-600 text-sm" />
                    </div>
                    <p className="text-sm text-gray-500">Arrival at School</p>
                    <p className="font-medium">{studentData.schoolName}</p>
                    <p className="text-sm font-medium text-green-600">ETA: {currentRoute.estimatedArrival}</p>
                  </div>
                  
                  {/* Live status */}
                  {currentRoute.currentLocation && (
                    <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                      <h3 className="font-medium flex items-center mb-2">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                        Live Update
                      </h3>
                      <p>Bus currently: <strong>{currentRoute.currentLocation}</strong></p>
                      <p className="text-sm text-gray-600">Next stop: {currentRoute.nextStop}</p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <FaSchool className="text-blue-600 text-sm" />
                    </div>
                    <p className="text-sm text-gray-500">Pickup Location</p>
                    <p className="font-medium">{currentRoute.pickupLocation}</p>
                    <p className="text-sm font-medium text-blue-600">Pickup at {currentRoute.pickupTime}</p>
                  </div>
                  
                  <div className="h-12 border-l-2 border-dashed border-gray-300 ml-3"></div>
                  
                  <div className="relative pl-8">
                    <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <FaHome className="text-green-600 text-sm" />
                    </div>
                    <p className="text-sm text-gray-500">Estimated Drop-off</p>
                    <p className="font-medium">Home</p>
                    <p className="text-sm font-medium text-green-600">ETA: {currentRoute.dropoffTime}</p>
                  </div>
                </>
              )}
            </div>
            
            <div className="mt-6 flex justify-between">
              <button className="text-blue-600 flex items-center text-sm font-medium">
                <FaMapMarkerAlt className="mr-1" /> View Full Route
              </button>
              <button className="text-blue-600 flex items-center text-sm font-medium">
                <FaWalking className="mr-1" /> Walking Directions to Stop
              </button>
            </div>
          </div>
        </div>
        
        {/* Notifications Card */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="bg-indigo-600 text-white px-6 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <FaBell className="mr-2" />
              <h2 className="text-lg font-semibold">Notifications</h2>
            </div>
            <span className="bg-white text-indigo-600 px-2 py-1 rounded-full text-xs font-bold">
              {studentData.notifications.filter(n => !n.read).length} New
            </span>
          </div>
          
          <div className="divide-y divide-gray-100">
            {studentData.notifications.length > 0 ? (
              studentData.notifications.map(notification => (
                <div 
                  key={notification.id} 
                  className={`p-4 ${!notification.read ? 'bg-blue-50' : ''}`}
                >
                  <div className="flex">
                    {notification.type === 'alert' && <FaExclamationTriangle className="text-orange-500 mt-1 mr-3 flex-shrink-0" />}
                    {notification.type === 'info' && <FaCalendarAlt className="text-blue-500 mt-1 mr-3 flex-shrink-0" />}
                    {notification.type === 'payment' && <FaMoneyBillWave className="text-green-500 mt-1 mr-3 flex-shrink-0" />}
                    
                    <div>
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">No new notifications</div>
            )}
          </div>
          
          <div className="p-4 bg-gray-50">
            <button className="text-indigo-600 text-sm font-medium w-full text-center">
              View All Notifications
            </button>
          </div>
        </div>
        
        {/* Upcoming Schedule Preview */}
        <div className="md:col-span-3 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 mt-2">
          <div className="bg-gray-50 px-6 py-4">
            <h2 className="text-lg font-semibold flex items-center">
              <FaCalendarAlt className="mr-2 text-gray-600" />
              Your Week at a Glance
            </h2>
          </div>
          
          <div className="p-6 overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500">
                  <th className="pb-3 font-medium">Day</th>
                  <th className="pb-3 font-medium">Morning Bus</th>
                  <th className="pb-3 font-medium">Pickup Time</th>
                  <th className="pb-3 font-medium">Afternoon Bus</th>
                  <th className="pb-3 font-medium">Return Time</th>
                  <th className="pb-3 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="bg-blue-50">
                  <td className="py-3 font-medium">Today</td>
                  <td>B-104</td>
                  <td>7:15 AM</td>
                  <td>B-112</td>
                  <td>3:30 PM</td>
                  <td className="text-green-600">On schedule</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Tomorrow</td>
                  <td>B-104</td>
                  <td>7:15 AM</td>
                  <td>B-112</td>
                  <td>3:30 PM</td>
                  <td></td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Friday</td>
                  <td>B-104</td>
                  <td>7:15 AM</td>
                  <td>B-112</td>
                  <td>2:15 PM</td>
                  <td className="text-orange-500">Early dismissal</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Monday</td>
                  <td>B-107</td>
                  <td>7:20 AM</td>
                  <td>B-112</td>
                  <td>3:30 PM</td>
                  <td className="text-orange-500">Route change</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">Tuesday</td>
                  <td>B-107</td>
                  <td>7:20 AM</td>
                  <td>B-112</td>
                  <td>3:30 PM</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

// Missing icon components that weren't imported
const FaSchool = (props:any) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      height="1em" 
      width="1em" 
      {...props}
    >
      <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3m6.82 6L12 12.72 5.18 9 12 5.28 18.82 9M17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
    </svg>
  );
};

const FaHome = (props :any) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      height="1em" 
      width="1em" 
      {...props}
    >
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z" />
    </svg>
  );
};