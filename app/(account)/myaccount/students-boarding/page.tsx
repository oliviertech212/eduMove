"use client";

import React, { useState, useEffect } from 'react';
import { 
  FaQrcode, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaBell, 
  FaSearch, 
  FaFilter, 
  FaBus 
} from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'sonner';

// Types
type BoardingStatus = 'Pending' | 'Boarded' | 'Denied';

interface Student {
  id: string;
  name: string;
  school: string;
  grade: string;
  ticketId: string;
  boardingStatus: BoardingStatus;
  trip: string;
  boardingTime?: string;
  denialReason?: string;
}

interface Trip {
  id: string;
  route: string;
  departureTime: string;
  busNumber: string;
  driver: string;
  date: string;
}

const StudentBoardingVerification = () => {
  // States
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<string>('');
  const [trips, setTrips] = useState<Trip[]>([]);
  const [ticketInput, setTicketInput] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<BoardingStatus | 'All'>('All');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Fetch trips and students - simulated
  useEffect(() => {
    // This would be an API call in production
    const fetchTrips = async () => {
      try {
        // Simulated data - replace with actual API call
        const tripsData: Trip[] = [
          {
            id: 'trip-001',
            route: 'Downtown to Northern High School',
            departureTime: '7:30 AM',
            busNumber: 'BUS-123',
            driver: 'John Smith',
            date: new Date().toLocaleDateString()
          },
          {
            id: 'trip-002',
            route: 'Eastern District to Central Elementary',
            departureTime: '8:00 AM',
            busNumber: 'BUS-456',
            driver: 'Sarah Johnson',
            date: new Date().toLocaleDateString()
          }
        ];
        
        setTrips(tripsData);
        setSelectedTrip(tripsData[0].id);
      } catch (error) {
        toast.error('Failed to load trips');
        console.error('Error fetching trips:', error);
      }
    };
    
    fetchTrips();
  }, []);
  
  // Fetch students when trip changes
  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedTrip) return;
      
      setLoading(true);
      try {
        // Simulated data - replace with actual API call
        const studentsData: Student[] = [
          {
            id: 'std-001',
            name: 'Emma Wilson',
            school: 'Northern High School',
            grade: '10',
            ticketId: 'TK-78901',
            boardingStatus: 'Pending',
            trip: 'trip-001'
          },
          {
            id: 'std-002',
            name: 'Michael Brown',
            school: 'Northern High School',
            grade: '11',
            ticketId: 'TK-78902',
            boardingStatus: 'Pending',
            trip: 'trip-001'
          },
          {
            id: 'std-003',
            name: 'Sophia Davis',
            school: 'Northern High School',
            grade: '9',
            ticketId: 'TK-78903',
            boardingStatus: 'Pending',
            trip: 'trip-001'
          },
          {
            id: 'std-004',
            name: 'James Miller',
            school: 'Central Elementary',
            grade: '5',
            ticketId: 'TK-78904',
            boardingStatus: 'Pending',
            trip: 'trip-002'
          }
        ];
        
        // Filter students by selected trip
        const filteredData = studentsData.filter(student => student.trip === selectedTrip);
        setStudents(filteredData);
        setFilteredStudents(filteredData);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load student data');
        console.error('Error fetching students:', error);
        setLoading(false);
      }
    };
    
    fetchStudents();
  }, [selectedTrip]);
  
  // Apply filters when search or status filter changes
  useEffect(() => {
    let result = [...students];
    
    // Apply search filter
    if (searchQuery) {
      result = result.filter(student => 
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        student.ticketId.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'All') {
      result = result.filter(student => student.boardingStatus === statusFilter);
    }
    
    setFilteredStudents(result);
  }, [searchQuery, statusFilter, students]);
  
  // Handle QR code scanning toggle
  const handleScanToggle = () => {
    setIsScanning(!isScanning);
    if (!isScanning) {
      // In a real implementation, this would initialize the device camera
      toast.info('Camera activated for QR scanning');
      // Simulate a successful scan after 3 seconds
      setTimeout(() => {
        setTicketInput('TK-78901');
        setIsScanning(false);
        verifyTicket('TK-78901');
        toast.success('QR code scanned successfully');
      }, 3000);
    }
  };
  
  // Verify ticket
  const verifyTicket = (ticketId: string) => {
    // Find student with matching ticket
    const student = students.find(s => s.ticketId === ticketId);
    
    if (!student) {
      toast.error('Invalid ticket: No matching ticket found');
      return;
    }
    
    setSelectedStudent(student);
    
    // Check if student is already boarded
    if (student.boardingStatus === 'Boarded') {
      toast.warning('Student has already boarded this trip');
      return;
    }
    
    // Validate ticket for trip
    if (student.trip === selectedTrip) {
      toast.success('Ticket verified successfully!');
    } else {
      toast.error('Invalid ticket: Not valid for this trip');
      
      // Update student status to denied
      updateStudentStatus(student.id, 'Denied', 'Ticket not valid for this trip');
    }
  };
  
  // Handle manual ticket input
  const handleManualTicketVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketInput.trim()) {
      toast.error('Please enter a ticket ID');
      return;
    }
    
    verifyTicket(ticketInput);
  };
  
  // Confirm boarding
  const confirmBoarding = (studentId: string) => {
    updateStudentStatus(studentId, 'Boarded');
  };
  
  // Deny boarding
  const denyBoarding = (studentId: string, reason: string = 'Invalid ticket') => {
    updateStudentStatus(studentId, 'Denied', reason);
  };
  
  // Update student boarding status
  const updateStudentStatus = (studentId: string, status: BoardingStatus, reason?: string) => {
    setLoading(true);
    
    // In a real implementation, this would be an API call
    setTimeout(() => {
      const updatedStudents = students.map(student => {
        if (student.id === studentId) {
          return {
            ...student,
            boardingStatus: status,
            boardingTime: status === 'Boarded' ? new Date().toLocaleTimeString() : undefined,
            denialReason: status === 'Denied' ? reason : undefined
          };
        }
        return student;
      });
      
      setStudents(updatedStudents);
      
      // Update filtered students as well
      setFilteredStudents(prev => 
        prev.map(student => 
          student.id === studentId 
            ? {
                ...student,
                boardingStatus: status,
                boardingTime: status === 'Boarded' ? new Date().toLocaleTimeString() : undefined,
                denialReason: status === 'Denied' ? reason : undefined
              }
            : student
        )
      );
      
      // Send notification
      sendBoardingNotification(
        updatedStudents.find(s => s.id === studentId)!,
        status
      );
      
      setSelectedStudent(null);
      setTicketInput('');
      setLoading(false);
      
      toast.success(`Student ${status === 'Boarded' ? 'boarding confirmed' : 'boarding denied'}`);
    }, 1000);
  };
  
  // Send notification to stakeholders
  const sendBoardingNotification = (student: Student, status: BoardingStatus) => {
    // In a real implementation, this would be an API call to a notification service
    console.log(`Sending ${status} notification for ${student.name} to stakeholders`);
    
    const trip = trips.find(t => t.id === student.trip);
    
    // Notification payload
    const notificationData = {
      studentId: student.id,
      studentName: student.name,
      school: student.school,
      boardingStatus: status,
      boardingTime: student.boardingTime,
      denialReason: student.denialReason,
      trip: {
        id: trip?.id,
        route: trip?.route,
        departureTime: trip?.departureTime,
        busNumber: trip?.busNumber,
        driver: trip?.driver,
        date: trip?.date
      },
      recipients: {
        parents: true,
        school: true,
        admin: true
      }
    };
    
    // Simulated API call
    setTimeout(() => {
      console.log('Notification sent:', notificationData);
    }, 500);
  };
  
  // Get trip details
  const getCurrentTrip = () => {
    return trips.find(trip => trip.id === selectedTrip);
  };
  
  // Get status color
  const getStatusColor = (status: BoardingStatus) => {
    switch (status) {
      case 'Boarded': return 'text-green-500';
      case 'Denied': return 'text-red-500';
      default: return 'text-yellow-500';
    }
  };
  
  // Get status icon
  const getStatusIcon = (status: BoardingStatus) => {
    switch (status) {
      case 'Boarded': return <FaCheckCircle className="text-green-500" />;
      case 'Denied': return <FaTimesCircle className="text-red-500" />;
      default: return <FaBell className="text-yellow-500" />;
    }
  };
  
  const currentTrip = getCurrentTrip();
  
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Student Boarding Verification</h1>
      
      {/* Trip Selection */}
      <div className="mb-6">
        <label htmlFor="trip-select" className="block mb-2 font-medium">
          Select Trip
        </label>
        <select
          id="trip-select"
          value={selectedTrip}
          onChange={(e) => setSelectedTrip(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          {trips.map(trip => (
            <option key={trip.id} value={trip.id}>
              {trip.route} - {trip.date} ({trip.departureTime})
            </option>
          ))}
        </select>
      </div>
      
      {/* Trip Details */}
      {currentTrip && (
        <div className="bg-blue-50 p-4 rounded-md mb-6 flex items-center">
          <FaBus className="text-blue-600 text-xl mr-3" />
          <div>
            <h2 className="font-bold">{currentTrip.route}</h2>
            <p>Bus: {currentTrip.busNumber} | Driver: {currentTrip.driver} | Departure: {currentTrip.departureTime}</p>
          </div>
        </div>
      )}
      
      {/* Ticket Verification Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Verify Student Ticket</h2>
        
        <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
          {/* QR Code Scanner */}
          <div className="flex-1">
            <button 
              onClick={handleScanToggle}
              className={`flex items-center justify-center gap-2 p-3 rounded-md w-full ${
                isScanning ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'
              } text-white transition-colors`}
              disabled={loading}
            >
              <FaQrcode /> 
              {isScanning ? 'Cancel Scanning' : 'Scan QR Code'}
            </button>
            {isScanning && (
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-md p-4 h-40 flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="animate-pulse text-gray-500 mb-2">Camera active...</div>
                  <div className="text-sm">Position QR code within this area</div>
                </div>
              </div>
            )}
          </div>
          
          {/* Manual Entry */}
          <div className="flex-1">
            <form onSubmit={handleManualTicketVerify} className="flex flex-col gap-2">
              <label htmlFor="ticket-input" className="font-medium">
                Or Enter Ticket ID Manually
              </label>
              <div className="flex">
                <input
                  id="ticket-input"
                  type="text"
                  value={ticketInput}
                  onChange={(e) => setTicketInput(e.target.value)}
                  placeholder="Enter ticket ID"
                  className="flex-1 p-2 border rounded-l-md"
                  disabled={loading || isScanning}
                />
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-r-md"
                  disabled={loading || isScanning || !ticketInput.trim()}
                >
                  Verify
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Ticket Verification Result */}
        {selectedStudent && (
          <div className={`p-4 rounded-md ${
            selectedStudent.trip === selectedTrip ? 'bg-green-50' : 'bg-red-50'
          } mb-2`}>
            <h3 className="font-semibold mb-2">Verification Result:</h3>
            <p className="mb-2">
              <span className="font-medium">Student:</span> {selectedStudent.name} | 
              <span className="font-medium"> Grade:</span> {selectedStudent.grade} | 
              <span className="font-medium"> School:</span> {selectedStudent.school}
            </p>
            
            <p className="mb-3">
              <span className="font-medium">Ticket:</span> {selectedStudent.ticketId} | 
              <span className={`font-medium ${
                selectedStudent.trip === selectedTrip ? 'text-green-600' : 'text-red-600'
              }`}>
                {selectedStudent.trip === selectedTrip 
                  ? ' Valid for this trip' 
                  : ' Not valid for this trip'}
              </span>
            </p>
            
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => confirmBoarding(selectedStudent.id)}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded disabled:opacity-50"
                disabled={selectedStudent.trip !== selectedTrip || selectedStudent.boardingStatus === 'Boarded' || loading}
              >
                Confirm Boarding
              </button>
              <button
                onClick={() => denyBoarding(selectedStudent.id, 'Ticket not valid for this trip')}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded disabled:opacity-50"
                disabled={selectedStudent.boardingStatus === 'Denied' || loading}
              >
                Deny Boarding
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Student Boarding Status List */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Student Boarding Status</h2>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or ticket ID"
                className="w-full p-2 pl-10 border rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
          
          <div className="md:w-64">
            <div className="relative">
              <select
                className="w-full p-2 pl-10 border rounded-md appearance-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as BoardingStatus | 'All')}
              >
                <option value="All">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Boarded">Boarded</option>
                <option value="Denied">Denied</option>
              </select>
              <FaFilter className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>
        
        {/* Student List */}
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p>Loading student data...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-3 px-4 text-left">Student</th>
                  <th className="py-3 px-4 text-left">Ticket ID</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Time</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map(student => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{student.name}</div>
                          <div className="text-sm text-gray-500">{student.school} - Grade {student.grade}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">{student.ticketId}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          {getStatusIcon(student.boardingStatus)}
                          <span className={`ml-2 ${getStatusColor(student.boardingStatus)}`}>
                            {student.boardingStatus}
                          </span>
                        </div>
                        {student.denialReason && (
                          <div className="text-xs text-gray-500 mt-1">
                            Reason: {student.denialReason}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {student.boardingTime || '-'}
                      </td>
                      <td className="py-3 px-4">
                        {student.boardingStatus === 'Pending' ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => confirmBoarding(student.id)}
                              className="bg-green-100 hover:bg-green-200 text-green-800 py-1 px-3 rounded-md text-sm"
                              disabled={loading}
                            >
                              Board
                            </button>
                            <button
                              onClick={() => denyBoarding(student.id)}
                              className="bg-red-100 hover:bg-red-200 text-red-800 py-1 px-3 rounded-md text-sm"
                              disabled={loading}
                            >
                              Deny
                            </button>
                          </div>
                        ) : (
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setSelectedStudent(student);
                                setTicketInput(student.ticketId);
                              }}
                              className="bg-blue-100 hover:bg-blue-200 text-blue-800 py-1 px-3 rounded-md text-sm"
                            >
                              View
                            </button>
                            {student.boardingStatus === 'Denied' && (
                              <button
                                onClick={() => confirmBoarding(student.id)}
                                className="bg-green-100 hover:bg-green-200 text-green-800 py-1 px-3 rounded-md text-sm"
                                disabled={loading}
                              >
                                Override
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500">
                      No students found for the selected criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Status Summary */}
        <div className="mt-4 flex flex-wrap gap-4">
          <div className="bg-gray-50 px-4 py-2 rounded-md flex items-center">
            <div className="mr-3 text-lg font-medium">Total:</div>
            <div className="text-lg font-bold">{filteredStudents.length}</div>
          </div>
          
          <div className="bg-green-50 px-4 py-2 rounded-md flex items-center">
            <FaCheckCircle className="text-green-500 mr-2" />
            <div className="mr-3">Boarded:</div>
            <div className="font-bold">
              {filteredStudents.filter(s => s.boardingStatus === 'Boarded').length}
            </div>
          </div>
          
          <div className="bg-yellow-50 px-4 py-2 rounded-md flex items-center">
            <FaBell className="text-yellow-500 mr-2" />
            <div className="mr-3">Pending:</div>
            <div className="font-bold">
              {filteredStudents.filter(s => s.boardingStatus === 'Pending').length}
            </div>
          </div>
          
          <div className="bg-red-50 px-4 py-2 rounded-md flex items-center">
            <FaTimesCircle className="text-red-500 mr-2" />
            <div className="mr-3">Denied:</div>
            <div className="font-bold">
              {filteredStudents.filter(s => s.boardingStatus === 'Denied').length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentBoardingVerification;