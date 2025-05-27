


"use client";

import React, { useState, useEffect } from 'react';
import { FaCheck, FaExclamationTriangle, FaBus, FaUserGraduate, FaSearch, FaFilter, FaDownload, FaEye } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'sonner';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import QRCode from "react-qr-code";
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
  
  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    grade: '',
    arrivalStatus: ''
  });

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
              parentContact: '+250789123456',
              isArrived: false,
              arrivalTime: new Date().toISOString()
            },
            {
              id: 'student-002',
              name: 'Maria Garcia',
              grade: '9',
              schoolId: 'school-456',
              schoolName: 'Muhanga High School',
              parentId: 'parent-002',
              parentName: 'Carlos Garcia',
              parentContact: '+250789234567',
              isArrived: false,
              arrivalTime: new Date().toISOString()
            },
            {
              id: 'student-003',
              name: 'Jamal Williams',
              grade: '11',
              schoolId: 'school-456',
              schoolName: 'Muhanga High School',
              parentId: 'parent-003',
              parentName: 'David Williams',
              parentContact: '+250789345678',
              isArrived: false,
              arrivalTime: new Date().toISOString()
            },
            {
              id: 'student-004',
              name: 'Emily Chen',
              grade: '10',
              schoolId: 'school-456',
              schoolName: 'Muhanga High School',
              parentId: 'parent-004',
              parentName: 'Lisa Chen',
              parentContact: '+250789456789',
              isArrived: true,
              arrivalTime: new Date().toISOString()
            },
            {
              id: 'student-005',
              name: 'Daniel Kamau',
              grade: '9',
              schoolId: 'school-456',
              schoolName: 'Muhanga High School',
              parentId: 'parent-005',
              parentName: 'Grace Kamau',
              parentContact: '+250789567890',
              isArrived: true,
              arrivalTime: new Date().toISOString()
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

  // Ticket viewer modal component
  const StudentTicketModal = ({ student }: { student: Student }) => {
    const ticketDetails = JSON.stringify({
      studentId: student.id,
      studentName: student.name,
      grade: student.grade,
      schoolName: student.schoolName,
      parentName: student.parentName,
      parentContact: student.parentContact,
      isArrived: student.isArrived,
      arrivalTime: student.arrivalTime
    });

    return (
      <Dialog>
        <DialogTrigger asChild>
          <button className="text-blue-500 hover:text-blue-700 flex items-center">
            <FaEye className="mr-1" /> View Ticket
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Student Travel Ticket</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center">
              <QRCode value={ticketDetails} size={200} />
              <div className="mt-4 text-center">
                <p><strong>Student ID:</strong> {student.id}</p>
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Grade:</strong> {student.grade}</p>
                <p><strong>School:</strong> {student.schoolName}</p>
                <p><strong>Parent:</strong> {student.parentName}</p>
                <p><strong>Contact:</strong> {student.parentContact}</p>
                <p><strong>Status:</strong> {student.isArrived ? 'Arrived' : 'Not Arrived'}</p>
                {student.isArrived && student.arrivalTime && (
                  <p><strong>Arrival Time:</strong> {new Date(student.arrivalTime).toLocaleTimeString()}</p>
                )}
              </div>
              <button 
                onClick={() => handleDownloadTicket(student)}
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

  // Handle ticket download
  const handleDownloadTicket = (student: Student) => {
    // Create ticket details for QR code
    const ticketDetails = JSON.stringify({
      studentId: student.id,
      studentName: student.name,
      grade: student.grade,
      schoolName: student.schoolName,
      parentName: student.parentName,
      parentContact: student.parentContact,
      isArrived: student.isArrived,
      arrivalTime: student.arrivalTime
    });

    // Create a canvas with ticket details
    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      // Background
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Ticket Header
      ctx.fillStyle = 'black';
      ctx.font = 'bold 24px Arial';
      ctx.fillText('Student Travel Ticket', 50, 50);

      // Student Details
      ctx.font = '16px Arial';
      ctx.fillText(`Student ID: ${student.id}`, 50, 100);
      ctx.fillText(`Name: ${student.name}`, 50, 130);
      ctx.fillText(`Grade: ${student.grade}`, 50, 160);
      ctx.fillText(`School: ${student.schoolName}`, 50, 190);
      ctx.fillText(`Parent: ${student.parentName}`, 50, 220);
      ctx.fillText(`Contact: ${student.parentContact}`, 50, 250);
      ctx.fillText(`Status: ${student.isArrived ? 'Arrived' : 'Not Arrived'}`, 50, 280);
      
      if (student.isArrived && student.arrivalTime) {
        ctx.fillText(`Arrival Time: ${new Date(student.arrivalTime).toLocaleTimeString()}`, 50, 310);
      }

      // Create QR code (would need to add this to canvas)
      // For simplicity, we'll just convert the page to image

      // Convert to image and trigger download
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `student_ticket_${student.id}.png`;
      link.click();
    }
  };

  // Handle search and filter changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Apply filters and search to student list
  const getFilteredStudents = () => {
    if (!activeTrip) return [];
    
    return activeTrip.students.filter(student => {
      // Apply text search
      const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            student.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Apply grade filter
      const matchesGrade = !filters.grade || student.grade === filters.grade;
      
      // Apply arrival status filter
      const matchesArrival = !filters.arrivalStatus || 
                             (filters.arrivalStatus === 'arrived' && student.isArrived) ||
                             (filters.arrivalStatus === 'notArrived' && !student.isArrived);
      
      return matchesSearch && matchesGrade && matchesArrival;
    });
  };

  // Get unique grades for filter options
  const getUniqueGrades = () => {
    if (!activeTrip) return [];
    const grades = new Set(activeTrip.students.map(student => student.grade));
    return Array.from(grades);
  };

  // Count arrived vs total students
  const getArrivalStats = () => {
    if (!activeTrip) return { arrived: 0, total: 0 };
    
    const arrived = activeTrip.students.filter(s => s.isArrived).length;
    const total = activeTrip.students.length;
    
    return { arrived, total };
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

  const stats = getArrivalStats();
  const filteredStudents = getFilteredStudents();

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="bg-white border rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold">Student Arrival Confirmation</h1>
            <p className="text-gray-600">Route: {activeTrip.routeName}</p>
          </div>
          <div className="flex items-center">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
              activeTrip.status === 'DELAYED' 
                ? 'bg-yellow-100 text-yellow-800' 
                : activeTrip.status === 'IN_PROGRESS'
                  ? 'bg-blue-100 text-blue-800'
                  : activeTrip.status === 'COMPLETED'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
            }`}>
              {activeTrip.status.replace('_', ' ')}
            </span>
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold">Arrival Progress</h2>
            <p className="text-blue-600">
              {stats.arrived} of {stats.total} students have arrived ({Math.round((stats.arrived / stats.total) * 100)}%)
            </p>
          </div>
          <div className="w-40 bg-gray-200 rounded-full h-4">
            <div 
              className="bg-blue-600 h-4 rounded-full" 
              style={{ width: `${Math.round((stats.arrived / stats.total) * 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center flex-grow">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5"
                  placeholder="Search by name or ID..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-400" />
              <span className="font-medium text-sm">Filters:</span>
            </div>
            
            <div>
              <select
                name="grade"
                value={filters.grade}
                onChange={handleFilterChange}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              >
                <option value="">All Grades</option>
                {getUniqueGrades().map(grade => (
                  <option key={grade} value={grade}>Grade {grade}</option>
                ))}
              </select>
            </div>
            
            <div>
              <select
                name="arrivalStatus"
                value={filters.arrivalStatus}
                onChange={handleFilterChange}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              >
                <option value="">All Statuses</option>
                <option value="arrived">Arrived</option>
                <option value="notArrived">Not Arrived</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Students Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                    No students found matching your search criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map(student => (
                  <tr key={student.id} className={student.isArrived ? 'bg-green-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <FaUserGraduate className={`h-5 w-5 ${student.isArrived ? 'text-green-500' : 'text-gray-400'}`} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-500">ID: {student.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Grade {student.grade}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.parentName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.parentContact}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {student.isArrived ? (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Arrived at {new Date(student.arrivalTime || '').toLocaleTimeString()}
                        </span>
                      ) : (
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Not Arrived
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <StudentTicketModal student={student} />
                        <button 
                          onClick={() => handleDownloadTicket(student)}
                          className="text-green-500 hover:text-green-700 flex items-center"
                        >
                          <FaDownload className="mr-1" /> Ticket
                        </button>
                        {!student.isArrived && (
                          <button
                            onClick={() => confirmStudentArrival(student.id)}
                            className="text-blue-500 hover:text-blue-700 flex items-center"
                          >
                            <FaCheck className="mr-1" /> Confirm
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Results summary */}
        <div className="mt-4 text-sm text-gray-500">
          Showing {filteredStudents.length} of {activeTrip.students.length} students
        </div>
      </div>
    </div>
  );
};

export default Arrival;