// ArrivalConfirmation.tsx
"use client";

import React, { useState, useEffect } from 'react';
import { FaCheck, FaExclamationTriangle, FaBus, FaUserGraduate, FaClock, FaSchool } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'sonner';

// Types
interface Student {
  id: string;
  name: string;
  grade: string;
  schoolId: string;
  schoolName: string;
  parentId: string;
  parentName: string;
  parentContact: string;
  isArrived: boolean;
  arrivalTime?: string;
}

interface Trip {
  id: string;
  routeId: string;
  routeName: string;
  vehicleId: string;
  vehicleName: string;
  driverId: string;
  driverName: string;
  startTime: string;
  expectedArrivalTime: string;
  actualArrivalTime?: string;
  destinationType: 'SCHOOL' | 'HOME';
  destinationName: string;
  destinationAddress: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'DELAYED' | 'CANCELLED';
  students: Student[];
}

const ArrivalConfirmation = () => {
  const [activeTrip, setActiveTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirmingAll, setConfirmingAll] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isNearDestination, setIsNearDestination] = useState(false);
  const [showDelayForm, setShowDelayForm] = useState(false);
  const [delayMinutes, setDelayMinutes] = useState(15);
  const [delayReason, setDelayReason] = useState('');

  // Fetch active trip on component mount
  useEffect(() => {
    fetchActiveTrip();
    
    // Check location to determine if near destination
    checkLocationProximity();
    
    // Set up location tracking for auto-confirmation
    const locationInterval = setInterval(checkLocationProximity, 60000); // Check every minute
    
    return () => {
      clearInterval(locationInterval);
    };
  }, []);

  // Simulating location check for proximity to destination
  const checkLocationProximity = () => {
    // In a real app, this would use GPS coordinates to check proximity
    // For this example, we'll simulate being near the destination after 3 seconds
    setTimeout(() => {
      setIsNearDestination(true);
    }, 3000);
  };

  // Fetch the active trip for the current transporter
  const fetchActiveTrip = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // In a real app, this would call your API
      // For this example, we'll simulate an API response
      setTimeout(() => {
        const mockTrip: Trip = {
          id: 'trip-123',
          routeId: 'route-456',
          routeName: 'Morning Pickup - Route 5',
          vehicleId: 'vehicle-789',
          vehicleName: 'Bus 42',
          driverId: 'driver-101',
          driverName: 'John Smith',
          startTime: '2025-02-27T07:30:00Z',
          expectedArrivalTime: '2025-02-27T08:15:00Z',
          destinationType: 'SCHOOL',
          destinationName: 'Muhanga High School',
          destinationAddress: '123 Education Blvd',
          status: 'IN_PROGRESS',
          students: [
            {
              id: 'student-001',
              name: 'Alex Johnson',
              grade: '10',
              schoolId: 'school-456',
              schoolName: ' Muhanga High School',
              parentId: 'parent-001',
              parentName: 'Sarah Johnson',
              parentContact: '+2507899999999999',
              isArrived: false
            },
            {
              id: 'student-002',
              name: 'Maria Garcia',
              grade: '9',
              schoolId: 'school-456',
              schoolName: ' Muhanga High School',
              parentId: 'parent-002',
              parentName: 'Carlos Garcia',
              parentContact: '+2507899999999999',
              isArrived: false
            },
            {
              id: 'student-003',
              name: 'Jamal Williams',
              grade: '11',
              schoolId: 'school-456',
              schoolName: ' Muhanga High School',
              parentId: 'parent-003',
              parentName: 'David Williams',
              parentContact: '+2507899999999999',
              isArrived: false
            }
          ]
        };
        
        setActiveTrip(mockTrip);
        setLoading(false);
      }, 1000);
      
    } catch (err) {
      console.error('Error fetching active trip:', err);
      setError('Failed to load active trip. Please try again.');
      setLoading(false);
    }
  };

  // Handle confirmation for a single student
  const confirmStudentArrival = async (studentId: string) => {
    if (!activeTrip) return;
    
    try {
      // In a real app, this would call your API
      // api.post('/api/trips/${activeTrip.id}/students/${studentId}/confirm-arrival')
      
      // Update local state to show confirmation
      setActiveTrip(prev => {
        if (!prev) return prev;
        
        const updatedStudents = prev.students.map(student => {
          if (student.id === studentId) {
            return {
              ...student,
              isArrived: true,
              arrivalTime: new Date().toISOString()
            };
          }
          return student;
        });
        
        return {
          ...prev,
          students: updatedStudents
        };
      });
      
      toast.success('Student arrival confirmed. Notifications sent to school and parents.');
      
    } catch (err) {
      console.error('Error confirming student arrival:', err);
      toast.error('Failed to confirm student arrival. Please try again.');
    }
  };

  // Handle confirmation for all students at once
  const confirmAllArrivals = async () => {
    if (!activeTrip) return;
    
    try {
      setConfirmingAll(true);
      
      // In a real app, this would call your API
      // api.post('/api/trips/${activeTrip.id}/confirm-all-arrivals')
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update local state to show all confirmed
      setActiveTrip(prev => {
        if (!prev) return prev;
        
        const now = new Date().toISOString();
        const updatedStudents = prev.students.map(student => ({
          ...student,
          isArrived: true,
          arrivalTime: now
        }));
        
        return {
          ...prev,
          students: updatedStudents,
          status: 'COMPLETED' as const,
          actualArrivalTime: now
        };
      });
      
      toast.success('All arrivals confirmed. Notifications sent to schools and parents.');
      setConfirmingAll(false);
      
    } catch (err) {
      console.error('Error confirming all arrivals:', err);
      toast.error('Failed to confirm all arrivals. Please try again.');
      setConfirmingAll(false);
    }
  };

  // Handle trip delay report
  const reportDelay = async () => {
    if (!activeTrip) return;
    
    try {
      // In a real app, this would call your API
      // api.post('/api/trips/${activeTrip.id}/report-delay', { delayMinutes, reason: delayReason })
      
      // Update local state
      setActiveTrip(prev => {
        if (!prev) return prev;
        
        // Calculate new expected arrival time
        const currentExpectedTime = new Date(prev.expectedArrivalTime);
        currentExpectedTime.setMinutes(currentExpectedTime.getMinutes() + delayMinutes);
        
        return {
          ...prev,
          status: 'DELAYED' as const,
          expectedArrivalTime: currentExpectedTime.toISOString()
        };
      });
      
      toast.success(`Delay reported. Notifications sent to schools and parents with new ETA.`);
      setShowDelayForm(false);
      
    } catch (err) {
      console.error('Error reporting delay:', err);
      toast.error('Failed to report delay. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading trip data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-lg w-full">
          <FaExclamationTriangle className="text-red-500 text-2xl mb-4" />
          <h2 className="text-xl font-bold text-red-700 mb-2">Error Loading Trip</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchActiveTrip}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!activeTrip) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-lg w-full text-center">
          <FaBus className="text-blue-500 text-4xl mx-auto mb-4" />
          <h2 className="text-xl font-bold text-blue-700 mb-2">No Active Trips</h2>
          <p className="text-blue-600 mb-4">You don't have any active transportation trips at the moment.</p>
          <button 
            onClick={fetchActiveTrip}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  // All students have arrived
  if (activeTrip.students.every(student => student.isArrived)) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-green-700 mb-1">Trip Complete</h2>
              <p className="text-green-600">All students have safely arrived at {activeTrip.destinationName}</p>
            </div>
            <div className="bg-green-100 rounded-full p-4">
              <FaCheck className="text-green-500 text-2xl" />
            </div>
          </div>
          <div className="mt-4 text-sm text-green-600">
            Trip ID: {activeTrip.id}<br />
            Route: {activeTrip.routeName}<br />
            Vehicle: {activeTrip.vehicleName}<br />
            Arrival Time: {new Date(activeTrip.actualArrivalTime || '').toLocaleTimeString()}
          </div>
        </div>
        
        <button 
          onClick={fetchActiveTrip}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Check for New Trips
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Arrival Confirmation</h1>
          <div className="flex items-center">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
              activeTrip.status === 'DELAYED' 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {activeTrip.status === 'DELAYED' ? 'DELAYED' : 'IN PROGRESS'}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h2 className="text-sm font-semibold text-gray-500 mb-1">Trip Details</h2>
            <div className="text-lg font-medium">{activeTrip.routeName}</div>
            <div className="text-sm text-gray-500">Vehicle: {activeTrip.vehicleName}</div>
            <div className="text-sm text-gray-500">Driver: {activeTrip.driverName}</div>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-gray-500 mb-1">Destination</h2>
            <div className="text-lg font-medium">{activeTrip.destinationName}</div>
            <div className="text-sm text-gray-500">{activeTrip.destinationAddress}</div>
            <div className="text-sm text-gray-500">
              Expected Arrival: {new Date(activeTrip.expectedArrivalTime).toLocaleTimeString()}
            </div>
          </div>
        </div>
        
        {/* Auto-confirmation suggestion */}
        {isNearDestination && !confirmingAll && activeTrip.students.some(s => !s.isArrived) && (
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <FaSchool className="h-5 w-5 text-blue-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">You appear to be at the destination</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>Would you like to confirm arrival for all students?</p>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={confirmAllArrivals}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Confirm All Arrivals
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Student list */}
        <h2 className="text-xl font-semibold mb-4">Students ({activeTrip.students.filter(s => s.isArrived).length}/{activeTrip.students.length} Arrived)</h2>
        <div className="space-y-3 mb-6">
          {activeTrip.students.map(student => (
            <div 
              key={student.id} 
              className={`border rounded-lg p-4 flex items-center justify-between ${
                student.isArrived ? 'bg-green-50 border-green-100' : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <FaUserGraduate className={`h-6 w-6 ${student.isArrived ? 'text-green-500' : 'text-gray-400'}`} />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium">{student.name}</h3>
                  <p className="text-sm text-gray-500">Grade {student.grade}</p>
                </div>
              </div>
              <div>
                {student.isArrived ? (
                  <div className="flex items-center text-green-600">
                    <FaCheck className="mr-2" />
                    <span>Arrived at {new Date(student.arrivalTime || '').toLocaleTimeString()}</span>
                  </div>
                ) : (
                  <button
                    onClick={() => confirmStudentArrival(student.id)}
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-600 transition-colors"
                  >
                    Confirm Arrival
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-wrap gap-4">
          <button
            onClick={confirmAllArrivals}
            disabled={confirmingAll || activeTrip.students.every(s => s.isArrived)}
            className={`flex items-center px-4 py-2 rounded-md ${
              confirmingAll || activeTrip.students.every(s => s.isArrived)
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {confirmingAll ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Confirming...
              </>
            ) : (
              <>
                <FaCheck className="mr-2" />
                Confirm All Arrivals
              </>
            )}
          </button>
          
          {!showDelayForm ? (
            <button
              onClick={() => setShowDelayForm(true)}
              className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors"
            >
              <FaClock className="mr-2" />
              Report Delay
            </button>
          ) : (
            <div className="w-full bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-yellow-800 mb-3">Report Delay</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-yellow-700 mb-1">
                    Delay Duration (minutes)
                  </label>
                  <select
                    value={delayMinutes}
                    onChange={(e) => setDelayMinutes(Number(e.target.value))}
                    className="w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-yellow-500 focus:border-yellow-500"
                  >
                    <option value={5}>5 minutes</option>
                    <option value={10}>10 minutes</option>
                    <option value={15}>15 minutes</option>
                    <option value={20}>20 minutes</option>
                    <option value={30}>30 minutes</option>
                    <option value={45}>45 minutes</option>
                    <option value={60}>1 hour</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-yellow-700 mb-1">
                    Reason for Delay
                  </label>
                  <select
                    value={delayReason}
                    onChange={(e) => setDelayReason(e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-yellow-500 focus:border-yellow-500"
                  >
                    <option value="">Select a reason</option>
                    <option value="traffic">Heavy Traffic</option>
                    <option value="weather">Weather Conditions</option>
                    <option value="vehicle">Vehicle Issue</option>
                    <option value="road">Road Closure</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={reportDelay}
                    disabled={!delayReason}
                    className={`px-4 py-2 rounded-md ${
                      !delayReason
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-yellow-500 text-white hover:bg-yellow-600'
                    }`}
                  >
                    Report Delay
                  </button>
                  <button
                    onClick={() => setShowDelayForm(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArrivalConfirmation;