import { Booking, BusTrip } from "@/app/(account)/myaccount/travel-schedule/page";
import { TravelPlan } from "@/types";

export const mockTrips: BusTrip[] = [
    { 
      id: 't1', 
      destinationId: 'd1', 
      destinationName: 'South',
      district: 'Butare',
      departureDate: '2025-03-05', 
      departureTime: '08:00', 
      totalCapacity: 45, 
      availableSpots: 12, 
      price: 1500, 
      status: 'Active' ,
      distance: '100km',
      expectedTime: '2 hours',
      fromId: 'd1',
      fromName: 'Kigali',
      fromDistrict: 'Nyarugenge',
      company: 'Rwanda Transport',



    },

    { 
      id: 't2', 
      destinationId: 'd2', 
      destinationName: 'North',
      district: 'Musanze',
      departureDate: '2025-03-06', 
      departureTime: '09:00', 
      totalCapacity: 30, 
      availableSpots: 30, 
      price: 2000, 
      status: 'Active' ,
      distance: '90km',
      expectedTime: '1.5 hours',
      fromId: 'd2',
      fromName: 'Kigali',
      fromDistrict: 'Kicukiro',
      company: 'RITCO',
    },
    { 
      id: 't3', 
      destinationId: 'd3', 
      destinationName: 'West',
      district: 'Karongi',
      departureDate: '2025-03-07', 
      departureTime: '10:00', 
      totalCapacity: 40, 
      availableSpots: 40, 
      price: 1800, 
      status: 'Active' ,
      distance: '110km',
      expectedTime: '2.5 hours',
      fromId: 'd3',
      fromName: 'Kigali',
      fromDistrict: 'Gasabo',
      company: 'Royal Express'
    },
    { 
      id: 't4', 
      destinationId: 'd4', 
      destinationName: 'East',
      district: 'Nyagatare',
      departureDate: '2025-03-08', 
      departureTime: '11:00', 
      totalCapacity: 35, 
      availableSpots: 35, 
      price: 1700, 
      status: 'Active' ,
      distance: '120km',
      expectedTime: '3 hours',
      fromId: 'd4',
      fromName: 'Kigali',
      fromDistrict: 'Kicukiro',
      company: 'Rwanda Transport',

    },
    { 
      id: 't5', 
      destinationId: 'd5', 
      destinationName: 'South',
      district: 'Nyamagabe',
      departureDate: '2025-03-09', 
      departureTime: '12:00', 
      totalCapacity: 50, 
      availableSpots: 50, 
      price: 1600, 
      status: 'Active' ,
      distance: '130km',
      expectedTime: '3.5 hours',
      fromId: 'd5',
      fromDistrict: 'Gasabo',
      fromName: 'Kigali',
      company: 'RITCO',
    },
    { 
      id: 't6', 
      destinationId: 'd6', 
      destinationName: 'West',
      district: 'Rubavu',
      departureDate: '2025-03-10', 
      departureTime: '13:00', 
      totalCapacity: 55, 
      availableSpots: 55, 
      price: 1500, 
      status: 'Active' ,
      distance: '140km',
      expectedTime: '4 hours',
      fromId: 'd6',


    },
   
  ];
  
  export const mockBookings: Booking[] = [
    {
      id: 'b1',
      tripId: 't1',
      studentId: 's1',
      studentName: 'John Doe',
      bookingDate: '2025-02-20',
      status: 'Confirmed',
      paymentStatus: 'Paid'
    },
    {
      id: 'b2',
      tripId: 't1',
      studentId: 's2',
      studentName: 'Jane Smith',
      bookingDate: '2025-02-21',
      status: 'Confirmed',
      paymentStatus: 'Paid'
    },
    {
      id: 'b3',
      tripId: 't2',
      studentId: 's3',
      studentName: 'Bob Johnson',
      bookingDate: '2025-02-22',
      status: 'Pending',
      paymentStatus: 'Pending'
    },

    {
      id: 'b4',
      tripId: 't3',
      studentId: 's4',
      studentName: 'Alice Brown',
      bookingDate: '2025-02-23',
      status: 'Confirmed',
      paymentStatus: 'Paid'
    },
    {
      id: 'b5',
      tripId: 't4',
      studentId: 's5',
      studentName: 'Eve White',
      bookingDate: '2025-02-24',
      status: 'Confirmed',
      paymentStatus: 'Paid'
    },
    {
      id: 'b6',
      tripId: 't5',
      studentId: 's6',
      studentName: 'Mike Black',
      bookingDate: '2025-02-25',
      status: 'Pending',
      paymentStatus: 'Pending'
    },
    {
      id: 'b7',
      tripId: 't6',
      studentId: 's7',
      studentName: 'Sarah Green',
      bookingDate: '2025-02-26',
      status: 'Confirmed',
      paymentStatus: 'Paid'
    },
    {
      id: 'b8',
      tripId: 't6',
      studentId: 's8',
      studentName: 'Tom Grey',
      bookingDate: '2025-02-27',
      status: 'Confirmed',
      paymentStatus: 'Paid'
    },
    {
      id: 'b9',
      tripId: 't6',
      studentId: 's9',
      studentName: 'Lisa Red',
      bookingDate: '2025-02-28',
      status: 'Confirmed',
      paymentStatus: 'Paid'
    },





  ];


  export const travelPlans: TravelPlan[] = [
    {
      id: "1",
      title: "Morning School Run",
      description: "Daily school run from Downtown to Greenwood High School.",
      departureLocation: "Downtown",
      arrivalLocation: "Greenwood High School",
      departureDate: "2025-02-22",
      departureTime: "07:30",
      estimatedArrivalTime: "08:15",
      district: "Central District",
      publishedDate: "2025-02-20",
      publishedBy: "Admin",
      status: "Published",
      seats: 40,
      availableSeats: 12,
      transporterId: "T001",
      transporterName: "SafeRide Transport",
      vehicleInfo: {
        vehicleId: "V001",
        registrationNumber: "ABC-1234",
        type: "Minibus",
        capacity: 40,
      },
    },
    {
      id: "2",
      title: "Evening School Pickup",
      description: "Evening transport from Greenwood High School to Downtown.",
      departureLocation: "Greenwood High School",
      arrivalLocation: "Downtown",
      departureDate: "2025-02-22",
      departureTime: "16:00",
      estimatedArrivalTime: "16:45",
      district: "Central District",
      publishedDate: "2025-02-20",
      publishedBy: "Admin",
      status: "Draft",
      seats: 40,
      availableSeats: 25,
      transporterId: "T001",
      transporterName: "SafeRide Transport",
      vehicleInfo: {
        vehicleId: "V002",
        registrationNumber: "XYZ-5678",
        type: "Bus",
        capacity: 50,
      },
    },
    {
      id: "3",
      title: "Weekend Trip to Science Center",
      description: "Educational trip for students to the Science Center.",
      departureLocation: "Greenwood High School",
      arrivalLocation: "Science Center",
      departureDate: "2025-02-24",
      departureTime: "09:00",
      estimatedArrivalTime: "10:30",
      district: "West District",
      publishedDate: "2025-02-21",
      publishedBy: "Admin",
      status: "Cancelled",
      seats: 30,
      availableSeats: 0,
      transporterId: "T002",
      transporterName: "EduTrips Ltd.",
      vehicleInfo: {
        vehicleId: "V003",
        registrationNumber: "LMN-9876",
        type: "Coach",
        capacity: 30,
      },
    },
  ];
  

  