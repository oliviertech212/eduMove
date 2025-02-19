"use client";

import React, { useState } from 'react';
import { FaBus, FaUser, FaExclamationTriangle, FaCalendarCheck, FaMapMarkedAlt, FaBell } from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const SchoolDashboard = () => {
  const [currentDate] = useState(new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }));

  // Sample data
  const transportSummary = {
    totalStudents: 1258,
    studentsUsingTransport: 876,
    activeBuses: 18,
    routesOperating: 24,
    delayedBuses: 2,
    attendanceRate: 96.4
  };

  const delayedRoutes = [
    { routeId: "R103", busId: "BUS-34", delay: "15 mins", reason: "Traffic congestion", affectedStudents: 32 },
    { routeId: "R110", busId: "BUS-22", delay: "10 mins", reason: "Road construction", affectedStudents: 27 }
  ];

  const recentAlerts = [
    { id: 1, time: "08:12 AM", message: "Bus BUS-34 running 15 minutes late", type: "delay" },
    { id: 2, time: "07:45 AM", message: "Weather alert: Light rain may affect morning routes", type: "weather" },
    { id: 3, time: "Yesterday", message: "Route R118 modified due to road closure on Main St", type: "route" },
    { id: 4, time: "Yesterday", message: "Driver change for afternoon route R105", type: "staff" }
  ];

  const weeklyAttendanceData = [
    { day: 'Mon', rate: 97.2 },
    { day: 'Tue', rate: 96.8 },
    { day: 'Wed', rate: 98.1 },
    { day: 'Thu', rate: 95.4 },
    { day: 'Fri', rate: 94.7 }
  ];

  const transportModeData = [
    { name: 'School Bus', value: 70 },
    { name: 'Parent Drop-off', value: 15 },
    { name: 'Public Transit', value: 10 },
    { name: 'Walking/Biking', value: 5 }
  ];

  const COLORS = ['#3F6CDF', '#82ca9d', '#ffc658', '#8884d8'];

  const quickActions = [
    { name: "Report Absence", icon: FaUser, color: "bg-indigo-100 text-indigo-800" },
    { name: "Bus Tracking", icon: FaMapMarkedAlt, color: "bg-green-100 text-green-800" },
    { name: "View Schedule", icon: FaCalendarCheck, color: "bg-blue-100 text-blue-800" },
    { name: "Send Notification", icon: FaBell, color: "bg-purple-100 text-purple-800" }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">School Transportation Dashboard</h1>
        <p className="text-gray-600">{currentDate}</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaBus className="text-blue-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Active Buses</p>
              <div className="flex items-end">
                <h3 className="text-2xl font-bold text-gray-800">{transportSummary.activeBuses}</h3>
                <p className="text-sm text-gray-500 ml-2">of {transportSummary.routesOperating} routes</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(transportSummary.activeBuses/transportSummary.routesOperating)*100}%` }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-full">
              <FaUser className="text-green-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Student Transportation</p>
              <div className="flex items-end">
                <h3 className="text-2xl font-bold text-gray-800">{transportSummary.studentsUsingTransport}</h3>
                <p className="text-sm text-gray-500 ml-2">of {transportSummary.totalStudents} students</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${(transportSummary.studentsUsingTransport/transportSummary.totalStudents)*100}%` }}></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-full">
              <FaCalendarCheck className="text-purple-600 text-xl" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Today's Attendance via Bus</p>
              <h3 className="text-2xl font-bold text-gray-800">{transportSummary.attendanceRate}%</h3>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${transportSummary.attendanceRate}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {quickActions.map((action, index) => (
          <button key={index} className={`flex flex-col items-center justify-center p-4 rounded-lg shadow ${action.color} transition-transform hover:scale-105`}>
            <action.icon className="text-2xl mb-2" />
            <span className="text-sm font-medium">{action.name}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Current Alerts */}
        <div className="bg-white rounded-lg shadow col-span-1 h-full">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <FaExclamationTriangle className="text-yellow-500 mr-2" />
              Current Delays & Alerts
            </h2>
          </div>
          <div className="p-4">
            {delayedRoutes.length > 0 ? (
              <div className="space-y-4">
                {delayedRoutes.map((route, index) => (
                  <div key={index} className="bg-yellow-50 p-3 rounded-md border-l-4 border-yellow-400">
                    <div className="flex justify-between">
                      <span className="font-medium text-yellow-800">Route {route.routeId}</span>
                      <span className="text-yellow-800">{route.delay} delay</span>
                    </div>
                    <p className="text-sm text-yellow-700">Bus: {route.busId}</p>
                    <p className="text-sm text-yellow-700">Reason: {route.reason}</p>
                    <p className="text-sm text-yellow-700">{route.affectedStudents} students affected</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No current delays</p>
            )}
          </div>
          <div className="p-4 border-t border-gray-200">
            <h3 className="text-md font-medium text-gray-700 mb-3">Recent Notifications</h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {recentAlerts.map(alert => (
                <div key={alert.id} className="text-sm border-l-2 border-blue-400 pl-3 py-1">
                  <p className="text-gray-600">{alert.message}</p>
                  <p className="text-gray-400 text-xs">{alert.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weekly Attendance Chart */}
        <div className="bg-white rounded-lg shadow col-span-1 lg:col-span-2">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Weekly Attendance via Transportation</h2>
          </div>
          <div className="p-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyAttendanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis domain={[90, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, 'Attendance Rate']} />
                <Bar dataKey="rate" fill="#3F6CDF" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transport Mode Distribution */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Transportation Method Distribution</h2>
          </div>
          <div className="p-4 h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={transportModeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {transportModeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Latest Activity Feed */}
        <div className="bg-white rounded-lg shadow col-span-1 lg:col-span-2">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Today's Transportation Schedule</h2>
          </div>
          <div className="p-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bus</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Driver</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">R101</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">BUS-12</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">John Smith</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">42</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">On time</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">R102</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">BUS-15</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sarah Johnson</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">38</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">On time</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">R103</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">BUS-34</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Michael Brown</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">32</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Delayed</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-right">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Full Schedule →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolDashboard;