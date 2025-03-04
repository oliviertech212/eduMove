


"use client";

import React, { useState, useEffect } from 'react';
import { FaCheck, FaExclamationTriangle, FaBus, FaUserGraduate } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'sonner';
import ArrivalConfirmation from '@/app/_components/transportcompany-student-arrivals';

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
  destinationType: 'SCHOOL' | 'HOME';
  destinationName: string;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'DELAYED' | 'CANCELLED';
  students: Student[];
}

const Arrival = () => {
  const [role, setRole] = useState<string | null>(null);
  const [activeTrip, setActiveTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check user role on component mount
  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    setRole(savedRole);

    // Only fetch trip if role is school
    if (savedRole === "school") {
      fetchActiveTrip();
    }
  }, []);

  // Fetch the active trip for the current school
  const fetchActiveTrip = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call - replace with actual API endpoint in production
      setTimeout(() => {
        const mockTrip: Trip = {
          id: 'trip-123',
          routeId: 'route-456',
          routeName: 'Morning Pickup - Route 5',
          destinationType: 'SCHOOL',
          destinationName: 'Muhanga High School',
          status: 'IN_PROGRESS',
          students: [
            {
              id: 'student-001',
              name: 'Alex Johnson',
              grade: '10',
              schoolId: 'school-456',
              schoolName: 'Muhanga High School',
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
              schoolName: 'Muhanga High School',
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
              schoolName: 'Muhanga High School',
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
      
      toast.success('Student arrival confirmed. Notifications will be sent to parents.');
      
    } catch (err) {
      console.error('Error confirming student arrival:', err);
      toast.error('Failed to confirm student arrival. Please try again.');
    }
  };

  // If not school role, return null
  if (role !== "school") {
    return <ArrivalConfirmation />;
  }

  // Loading state
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

  // Error state
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

  // No active trip
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

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Student Arrival Confirmation</h1>
          <div className="flex items-center">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
              activeTrip.status === 'DELAYED' 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {activeTrip.status}
            </span>
          </div>
        </div>
        
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Route: {activeTrip.routeName}</h2>
        </div>
        
        <h2 className="text-xl font-semibold mb-4">
          Students ({activeTrip.students.filter(s => s.isArrived).length}/{activeTrip.students.length} Arrived)
        </h2>
        
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
      </div>
    </div>
  );
};

export default Arrival;