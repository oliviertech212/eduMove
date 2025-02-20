import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaBus, FaUserTie, FaRoute, FaExclamationTriangle, FaGasPump, FaCalendarCheck, FaTools, FaPhoneAlt } from 'react-icons/fa';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD'];

const TransportCoDashboard = () => {
  // Sample fleet status data
  const fleetStatus = {
    total: 48,
    active: 42,
    maintenance: 3,
    outOfService: 2,
    reserved: 1
  };

  // Sample driver data
  const driverData = {
    total: 54,
    active: 50,
    onLeave: 2,
    training: 1,
    unavailable: 1
  };

  // Sample fuel consumption data (last 7 days)
  const fuelData = [
    { day: 'Mon', consumption: 450 },
    { day: 'Tue', consumption: 425 },
    { day: 'Wed', consumption: 480 },
    { day: 'Thu', consumption: 460 },
    { day: 'Fri', consumption: 510 },
    { day: 'Sat', consumption: 320 },
    { day: 'Sun', consumption: 280 },
  ];

  // Sample on-time performance data (last 7 days)
  const performanceData = [
    { day: 'Mon', onTime: 92 },
    { day: 'Tue', onTime: 96 },
    { day: 'Wed', onTime: 94 },
    { day: 'Thu', onTime: 91 },
    { day: 'Fri', onTime: 88 },
    { day: 'Sat', onTime: 97 },
    { day: 'Sun', onTime: 98 },
  ];

  // Sample route utilization data
  const routeUtilizationData = [
    { name: 'North Route', value: 85 },
    { name: 'South Route', value: 78 },
    { name: 'East Route', value: 92 },
    { name: 'West Route', value: 65 },
    { name: 'Central Route', value: 88 },
  ];

  // Sample alerts
  const [alerts] = useState([
    { id: 1, type: 'critical', message: 'Bus #103 reported mechanical issue on Route 5', time: '10 mins ago' },
    { id: 2, type: 'warning', message: 'Heavy traffic reported on North Route, delays expected', time: '25 mins ago' },
    { id: 3, type: 'info', message: 'Bus #118 fuel level below 15%, refueling recommended', time: '42 mins ago' },
    { id: 4, type: 'warning', message: 'Driver Thompson reported sick leave for tomorrow', time: '1 hour ago' },
  ]);

  // Quick actions
  const quickActions = [
    { id: 1, title: 'Assign Driver', icon: FaUserTie, color: '#4299E1' },
    { id: 2, title: 'Schedule Maintenance', icon: FaTools, color: '#ED8936' },
    { id: 3, title: 'Modify Route', icon: FaRoute, color: '#48BB78' },
    { id: 4, title: 'Emergency Contact', icon: FaPhoneAlt, color: '#F56565' },
  ];

  // Upcoming schedules
  const upcomingSchedules = [
    { id: 1, routeName: 'North Route - Morning', time: '06:30', busId: 'BUS-103', driver: 'D. Johnson' },
    { id: 2, routeName: 'East Route - Morning', time: '06:45', busId: 'BUS-118', driver: 'S. Thompson' },
    { id: 3, routeName: 'Central Route - Morning', time: '07:00', busId: 'BUS-124', driver: 'M. Garcia' },
    { id: 4, routeName: 'West Route - Morning', time: '07:15', busId: 'BUS-105', driver: 'J. Williams' },
  ];

  return (
    <div className="p-6 max-w-full bg-gray-50">
      <h1 className="text-2xl font-bold mb-6">Transportation Company Dashboard</h1>
      
      {/* Quick Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <FaBus className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 font-medium">Active Buses</p>
              <p className="text-2xl font-semibold">{fleetStatus.active}/{fleetStatus.total}</p>
              <p className="text-sm text-green-500">87.5% operational</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <FaUserTie className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 font-medium">Active Drivers</p>
              <p className="text-2xl font-semibold">{driverData.active}/{driverData.total}</p>
              <p className="text-sm text-green-500">92.6% availability</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <FaCalendarCheck className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 font-medium">On-Time Performance</p>
              <p className="text-2xl font-semibold">94%</p>
              <p className="text-sm text-green-500">↑ 2% from last week</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-red-100 text-red-600">
              <FaGasPump className="w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500 font-medium">Fuel Consumed Today</p>
              <p className="text-2xl font-semibold">320L</p>
              <p className="text-sm text-red-500">↑ 5% from average</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-4">Weekly On-Time Performance (%)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={performanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis domain={[80, 100]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="onTime" stroke="#3182CE" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-4">Weekly Fuel Consumption (Liters)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={fuelData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="consumption" fill="#ED8936" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Bottom Row - Route Utilization, Alerts, and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="font-semibold mb-4">Route Capacity Utilization (%)</h2>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height={230}>
              <PieChart>
                <Pie
                  data={routeUtilizationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {routeUtilizationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold">Critical Alerts</h2>
            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
              {alerts.length} New
            </span>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {alerts.map(alert => (
              <div 
                key={alert.id} 
                className={`p-3 rounded-md flex items-start ${
                  alert.type === 'critical' ? 'bg-red-50 border-l-4 border-red-500' : 
                  alert.type === 'warning' ? 'bg-yellow-50 border-l-4 border-yellow-500' :
                  'bg-blue-50 border-l-4 border-blue-500'
                }`}
              >
                <FaExclamationTriangle className={`w-5 h-5 mr-2 mt-0.5 ${
                  alert.type === 'critical' ? 'text-red-500' : 
                  alert.type === 'warning' ? 'text-yellow-500' :
                  'text-blue-500'
                }`} />
                <div>
                  <p className="text-sm font-medium">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col space-y-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-semibold mb-3">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-2">
              {quickActions.map(action => (
                <button 
                  key={action.id}
                  className="flex flex-col items-center justify-center p-3 rounded-md transition-colors hover:bg-gray-50 border border-gray-100"
                  style={{ borderLeft: `3px solid ${action.color}` }}
                >
                  <action.icon className="w-5 h-5" style={{ color: action.color }} />
                  <span className="text-xs font-medium mt-1">{action.title}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="font-semibold mb-3">Upcoming Departures</h2>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {upcomingSchedules.map(schedule => (
                <div key={schedule.id} className="flex justify-between items-center p-2 text-sm border-b border-gray-100">
                  <div>
                    <p className="font-medium">{schedule.routeName}</p>
                    <p className="text-xs text-gray-500">{schedule.busId} • {schedule.driver}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{schedule.time}</p>
                    <p className="text-xs text-green-500">On time</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransportCoDashboard;