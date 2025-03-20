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


//   "user": {
//     "_id": "67d31eaf05694a416cba7702",
//     "name": "Horizon",
//     "email": "horizon@example.com",
//     "phoneNumber": "3402809483",
//     "role": "transporter",
//     "areaOfOperations": [
//         "huhanga",
//         "nyanza",
//         "huye",
//         "nyamagabe",
//         "ruhango"
//     ],
//     "createdAt": "2025-03-13T18:06:39.159Z",
//     "updatedAt": "2025-03-13T18:06:39.159Z",
//     "__v": 0
// }

export type UserType = {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    role: string;
    areaOfOperations?: string[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  
 
