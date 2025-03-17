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