// models/TravelPlan.ts
export type TravelPlan = {
    id: string;
    title: string;
    description?: string;
    departureLocation: string;
    arrivalLocation: string;
    departureDate: string;
    departureTime: string;
    estimatedArrivalTime: string;
    district: string;
    publishedDate: string;
    publishedBy: string;
    status: 'Draft' | 'Published' | 'Cancelled';
    seats: number;
    availableSeats: number;
    transporterId: string;
    transporterName: string;
    vehicleInfo?: {
      vehicleId: string;
      registrationNumber: string;
      type: string;
      capacity: number;
    };
  };
  
  export type NotificationRecipient = {
    id: string;
    type: 'School' | 'Parent' | 'Transporter';
    email: string;
    name: string;
  };
  
  export type TravelPlanNotification = {
    id: string;
    travelPlanId: string;
    recipients: NotificationRecipient[];
    sentDate: string;
    status: 'Pending' | 'Sent' | 'Failed';
    message: string;
  };


// api responses

export type TravelPlan1 = {
  _id: string;
  date: string | Date;
  destinations: string[];
  province?: string;
  __v?: number;
};



export type UserType = {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
    areaOfOperations?: string[];
    district?: string;
    sector?: string;
    cell?: string;
    village?: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
export type ScheduleType = {
    _id: string;
    plan: string;
    departure: string;
    destination: string;
    price: number;
    transporter: string;
    departureTime?: string;
    expectedArrivalTime?: string;
    timeSlots: {
      time: string;
      slots: number;
    }[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  
 
