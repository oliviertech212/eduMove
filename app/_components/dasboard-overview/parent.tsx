

"use client";
import React, { useState } from 'react';
import { FaBus, FaBell, FaExclamationTriangle, FaMapMarkerAlt, FaPhone, FaEnvelope, FaUserAlt, FaSun } from 'react-icons/fa';

const ParentDashboard = () => {
  // Sample data - in a real app, this would come from your API
  const [children, setChildren] = useState([
    {
      id: 1,
      name: "Emma Johnson",
      grade: "Grade 5",
      school: "Springfield Elementary",
      profileImg: "/api/placeholder/80/80",
      busRouteNumber: "R102",
      busStatus: "en-route",
      busLocation: "2.3 km away",
      estimatedArrival: "3:15 PM",
      driver: {
        name: "Michael Stevens",
        phone: "555-0123"
      }
    },
    {
      id: 2,
      name: "Ryan Johnson",
      grade: "Grade 10", 
      school: "Springfield High",
      profileImg: "/api/placeholder/80/80",
      busRouteNumber: "R44",
      busStatus: "on-time",
      busLocation: "at school",
      estimatedArrival: "4:30 PM",
      driver: {
        name: "Angela Davis",
        phone: "555-0124"
      }
    }
  ]);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "delay",
      message: "Bus R102 is running 10 minutes late due to traffic",
      time: "10 min ago"
    },
    {
      id: 2,
      type: "payment",
      message: "March transportation payment due in 5 days",
      time: "2 hrs ago"
    },
    {
      id: 3,
      type: "weather",
      message: "Snow expected tomorrow - possible delays",
      time: "3 hrs ago"
    }
  ]);

  const [weatherAlert, setWeatherAlert] = useState({
    active: true,
    condition: "Light Rain",
    impact: "Minor delays possible",
    temperature: "12°C"
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Parent Dashboard</h1>
      
      {/* Weather Alert */}
      {weatherAlert.active && (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded shadow">
          <div className="flex items-center">
            <FaSun className="text-blue-500 mr-3 w-6 h-6" />
            <div>
              <h3 className="font-bold">Today's Weather: {weatherAlert.condition}</h3>
              <p className="text-blue-800">{weatherAlert.impact} • Current temperature: {weatherAlert.temperature}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Children Cards */}
      <h2 className="text-xl font-semibold mb-4">My Children</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {children.map(child => (
          <div key={child.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-blue-500 text-white flex items-center justify-between">
              <div className="flex items-center">
                <img 
                  src={child.profileImg} 
                  alt={child.name} 
                  className="w-12 h-12 rounded-full mr-4 border-2 border-white" 
                />
                <div>
                  <h3 className="font-bold text-lg">{child.name}</h3>
                  <p>{child.grade} • {child.school}</p>
                </div>
              </div>
              <span className="bg-white text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                Route #{child.busRouteNumber}
              </span>
            </div>
            
            <div className="p-4">
              <div className="flex items-center mb-4">
                <div className={`w-3 h-3 rounded-full mr-2 ${
                  child.busStatus === 'on-time' ? 'bg-green-500' : 
                  child.busStatus === 'en-route' ? 'bg-blue-500' : 'bg-yellow-500'
                }`}></div>
                <span className="font-medium">
                  {child.busStatus === 'on-time' ? 'On Time' : 
                   child.busStatus === 'en-route' ? 'En Route' : 'Delayed'}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start">
                  <FaMapMarkerAlt className="text-gray-500 mt-1 mr-2 w-4 h-4" />
                  <div>
                    <p className="text-sm text-gray-500">Current Location</p>
                    <p className="font-medium">{child.busLocation}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FaBus className="text-gray-500 mt-1 mr-2 w-4 h-4" />
                  <div>
                    <p className="text-sm text-gray-500">Estimated Arrival</p>
                    <p className="font-medium">{child.estimatedArrival}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-2">Driver Information</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaUserAlt className="text-gray-400 mr-2 w-4 h-4" />
                    <span>{child.driver.name}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                      <FaPhone className="w-4 h-4 text-blue-500" />
                    </button>
                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                      <FaEnvelope className="w-4 h-4 text-blue-500" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 flex justify-between">
              <button className="text-blue-500 hover:text-blue-700 font-medium">Track Bus</button>
              <button className="text-blue-500 hover:text-blue-700 font-medium">View Route Details</button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Recent Notifications */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Recent Notifications</h2>
          <button className="text-blue-500 text-sm hover:text-blue-700">View All</button>
        </div>
        
        <div className="divide-y divide-gray-100">
          {notifications.map(notification => (
            <div key={notification.id} className="p-4 flex items-start">
              <div className={`p-2 rounded-full mr-4 ${
                notification.type === 'delay' ? 'bg-yellow-100 text-yellow-600' :
                notification.type === 'payment' ? 'bg-green-100 text-green-600' :
                'bg-blue-100 text-blue-600'
              }`}>
                {notification.type === 'delay' ? <FaExclamationTriangle className="w-5 h-5" /> :
                 notification.type === 'payment' ? <FaDollarSign className="w-5 h-5" /> :
                 <FaBell className="w-5 h-5" />}
              </div>
              <div className="flex-1">
                <p className="font-medium">{notification.message}</p>
                <p className="text-sm text-gray-500">{notification.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center justify-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <FaBus className="text-blue-500 w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Report Absence</span>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center justify-center">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
              <FaEnvelope className="text-purple-500 w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Message Driver</span>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center justify-center">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-2">
              <FaDollarSign className="text-green-500 w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Make Payment</span>
          </button>
          
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-col items-center justify-center">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mb-2">
              <FaBell className="text-orange-500 w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Notification Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const FaDollarSign = ({ className  }:{
    className: string
}) => {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 512 512">
      <path d="M209.2 233.4l-108-31.6C88.7 198.2 80 186.5 80 173.5c0-16.3 13.2-29.5 29.5-29.5h66.3c12.2 0 24.2 3.7 34.2 10.5 6.1 4.1 14.3 3.1 19.5-2l34.8-34c7.1-6.9 6.1-18.4-1.8-24.5C238 74.8 207.4 64.1 176 64V48c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v17.3c-45.5 4.9-80.7 43.3-80 89.3 1 8.2 7.7 130.3 7.7 207.7c0 8.8-1.9 34.3 9.4 47.1c7.9 9 22.2 14.5 39.7 14.5h66.3c12.2 0 24.2-3.7 34.2-10.5 6.1-4.1 14.3-3.1 19.5 2l34.8 34c7.1 6.9 6.1 18.4-1.8 24.5C238 437.2 207.4 447.9 176 448v16c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16v-16c-43.4-.9-78.7-33.9-83.3-76.4c-1.6-14.7 9.4-27.8 23-27.8h16.2c9.8 0 18.4 7 20.4 16.6 2.7 12.5 14.6 21.8 28.6 21.8h66.3c12.8 0 23-6.1 23-15.6c0-7.5-4.6-12.8-10.4-15L175 271.4c-8.6-3.4-11.8-11.5-11.8-19.3c0-13.6 11.8-19.3 25.3-19.3c18.7 0 33.4 19.3 41.3 19.3c5.1 0 8.8-3.9 8.8-8.8v-13.9c0-12.1-9.4-15.8-10.4-16.7C214.3 205.3 209.9 195.3 209.2 233.4z" />
    </svg>
  );
};

export default ParentDashboard;