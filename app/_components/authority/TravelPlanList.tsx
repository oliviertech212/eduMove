


// 'use client';
// import { FaCalendarAlt, FaMapMarkerAlt, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
// import { useState } from 'react';
// import { TravelPlan } from '../travel-plans';
// import axios from 'axios';
// import { ScheduleType, UserType } from '@/types';
// import { toast } from 'sonner';

// type TravelPlanProps = {
//   travelPlans: {
//     _id: string;
//     date: string | Date;
//     destinations: string[];
//     province?: string;
//     __v?: number;
//   }[];
//   onDelete?: (id: string) => Promise<void>;
//   isadmin?: boolean | false;
// };

// const TravelPlanList = ({ travelPlans, onDelete, isadmin }: TravelPlanProps) => {
//   const [actionLoading, setActionLoading] = useState<string | null>(null);
//   const [selectedPlan, setSelectedPlan] = useState<TravelPlan | null>(null);
//   const [showForm, setShowForm] = useState(false);
//   const [transporter, setTransporter] = useState<UserType>();
//   const [school, setSchool] = useState<UserType>();
//   const [travelSchedule , setTravelSchedule ] = useState<ScheduleType[]>([]);
//   const [selectedSchedule, setSelectedSchedule] = useState<ScheduleType | null>(null);


//   const [travelForm, setTravelForm] = useState({
    

   
//   });




//   const handleBookingModel = (paln:TravelPlan) => {
//     setShowForm(true);
//     setSelectedPlan(paln);
//   };

//   const handleDelete = async (id: string) => {
//     if (!onDelete) return;
    
//     if (window.confirm("Are you sure you want to delete this travel plan?")) {
//       try {
//         setActionLoading(`delete_${id}`);
//         await onDelete(id);
//       } catch (error) {
//         console.error("Failed to delete travel plan:", error);
//         alert("Failed to delete travel plan. Please try again.");
//       } finally {
//         setActionLoading(null);
//       }
//     }
//   };

//   const handleTripFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;

//     if (name === 'plan') {
//       const selectedP = travelPlans.find(plan => plan._id === value);

    
//       if (selectedP) {
//         setSelectedPlan( selectedP);
       
//       }
//     }


//     setTripForm({
//       ...tripForm,
//       [name]: 
//       name === 'price' ? parseInt(value) : value
//     });
//   };


//   const handleSubmitTravelForm = async (e: React.FormEvent<HTMLFormElement>) => {
//     const token = localStorage.getItem('token');

//     const res= await axios.post(`${process.env.NEXT_PUBLIC_API_URL}travels`, travelForm, {
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       }
//     })

//   };

//   //get all schools 

//   const getSchool = async () => {
//     const user = localStorage.getItem("user");
//     const savedUser = user ? JSON.parse(user) : null;
//     try {
//       const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}schools`); 
//       console.log("school",response.data.data.user);
//       setSchool(response.data.data.user);
//     } catch (error) {
//       console.error('Error fetching schools:', error);
//       toast.error('Failed to load schools. Please try again.');
//     }
//   }


//   //get all transporters

//   const getTransporter = async () => {
//     const user = localStorage.getItem("user");
//     const savedUser = user ? JSON.parse(user) : null;
//     try {
//       const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}transporters`); 
//       console.log("transporter",response.data.data.user);
//       setTransporter(response.data.data.user);
//     } catch (error) {
//       console.error('Error fetching transporters:', error);
//       toast.error('Failed to load transporters. Please try again.');
//     }
//   }


//   //get schedules for selected transporter

//   const getallTravelSchedule = async () => {
//     const user = localStorage.getItem("user");
//     const savedUser = user ? JSON.parse(user) : null;
//     try {
//       const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}transporters/${transporter?._id}/schedules`); 
//       console.log("trvel plan",response.data.data.schedules);
//       setTravelSchedule (response.data.data.schedules);
//     } catch (error) {
//       console.error('Error fetching travel plans:', error);
//       toast.error('Failed to load travel plans. Please try again.');
//     }
//   }




//   const formatDate = (dateString: string | Date) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', { 
//       year: 'numeric', 
//       month: 'long', 
//       day: 'numeric' 
//     });
//   };

//   if (travelPlans.length === 0) {
//     return (
//       <div className="text-center py-12 bg-white rounded-lg shadow">
//         <p className="text-gray-500">No travel plans found.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">





// {showForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//             <h3 className="text-xl font-semibold mb-4">Book a Ticket</h3>
            
//             <form onSubmit={handleSubmitBookingForm}>
//               {/* Travel Plan Selection */}
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-1">Travel Plan</label>
//                 <select 
//                   name="travelDetails.plan" 
//                   value={bookingForm.travelDetails.plan.id} 
//                   onChange={handlePlanChange}
//                   className="w-full p-2 border rounded-md"
//                   required
//                 >
//                   <option value="">Select Travel Plan</option>
//                   {travelPlans.map(plan => (
//                     <option key={plan._id} value={plan._id}>
//                       {plan.province} ({plan.destinations.join(', ')})
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Transporter Selection */}
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-1">Transporter</label>
//                 <select 
//                   name="travelDetails.transporter"
//                   value={selectedTransporter}
//                   onChange={handleTransporterChange}
//                   className="w-full p-2 border rounded-md"
//                   required
//                 >
//                   <option value="">Select Transporter</option>
//                   {transporters.map(transporter => (
//                     <option key={transporter._id} value={transporter._id}>
//                       {transporter.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* Schedule Selection */}
//               {selectedTransporter && (
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium mb-1">Schedule</label>
//                   <select 
//                     name="schedule"
//                     value={selectedSchedule?._id || ''}
//                     onChange={handleScheduleChange}
//                     className="w-full p-2 border rounded-md"
//                     required
//                   >
//                     <option value="">Select Schedule</option>
//                     {schedules.map(schedule => (
//                       <option key={schedule._id} value={schedule._id}>
//                         {schedule.departureTime} - {schedule.expectedArrivalTime}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               )}

//               {/* Guardian Details */}
//               <div className="mb-4">
//                 <h4 className="text-md font-semibold mb-2">Guardian Details</h4>
//                 <div className="grid grid-cols-2 gap-4">
//                   <input 
//                     type="text"
//                     name="guardian.name"
//                     placeholder="Guardian Name"
//                     value={bookingForm.guardian.name}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded-md"
//                     required
//                   />
//                   <input 
//                     type="email"
//                     name="guardian.email"
//                     placeholder="Guardian Email"
//                     value={bookingForm.guardian.email}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded-md"
//                     required
//                   />
//                   <input 
//                     type="tel"
//                     name="guardian.phoneNumber"
//                     placeholder="Phone Number"
//                     value={bookingForm.guardian.phoneNumber}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded-md"
//                     required
//                   />
//                   <input 
//                     type="text"
//                     name="guardian.address"
//                     placeholder="Address"
//                     value={bookingForm.guardian.address}
//                     onChange={handleInputChange}
//                     className="w-full p-2 border rounded-md"
//                     required
//                   />
//                 </div>
//               </div>

//               {/* Student Details */}
//               <div className="mb-4">
//                 <h4 className="text-md font-semibold mb-2">Student Details</h4>
//                 <input 
//                   type="text"
//                   name="student.name"
//                   placeholder="Student Name"
//                   value={bookingForm.student.name}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded-md"
//                   required
//                 />
//               </div>

//               <div className="flex justify-end gap-2">
//                 <button 
//                   type="button" 
//                   className="px-4 py-2 border rounded-md"
//                   onClick={() => setShowForm(false)}
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   type="submit" 
//                   className="px-4 py-2 bg-primary text-white rounded-md"
//                 >
//                   Book Ticket
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}









//       {travelPlans.map(plan => (
//         <div key={plan._id} className={`bg-white rounded-lg shadow-md overflow-hidden ${ new Date(plan.date) > new Date()? 'border-4 border-l-primary' : ' border-4 border-l-red-400'}`}>
//           <div className="p-4 bg-blue-100">
//             <div className="flex justify-between items-start">
//               <h3 className="font-semibold text-lg">Travel Plan</h3>
//               {plan.province && (
//                 <span className="px-2 py-1 rounded-full text-xs bg-green-200 text-green-800">
//                   {plan.province}
//                 </span>
//               )}
//             </div>
//           </div>
          
//           <div className="p-4">
//             <div className="space-y-3">
//               <div className="flex items-start">
//                 <FaCalendarAlt className="text-gray-400 mt-1 mr-2" />
//                 <div>
//                   <p className="text-sm text-gray-500">Date</p>
//                   <p className="font-medium">{formatDate(plan.date)}</p>
//                 </div>
//               </div>
              
//               <div className="flex items-start">
//                 <FaMapMarkerAlt className="text-gray-400 mt-1 mr-2" />
//                 <div>
//                   <p className="text-sm text-gray-500">Destinations</p>
//                   <div>
//                     {plan.destinations.map((destination, index) => (
//                       <span key={index} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
//                         {destination}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
          
//           {isadmin? <div className="border-t p-4 flex justify-between">
//             <div className="flex space-x-2">
//               <button 
//                 className="text-blue-500 hover:text-blue-700"
//                 onClick={() => console.log('Edit plan', plan._id)}
//               >
//                 <FaEdit />
//               </button>
              
//               {onDelete && (
//                 <button 
//                   onClick={() => handleDelete(plan._id)}
//                   disabled={actionLoading === `delete_${plan._id}`}
//                   className="text-red-500 hover:text-red-700 disabled:text-gray-400"
//                 >
//                   <FaTrash />
//                 </button>
//               )}
//             </div>
//           </div>:  

//           <div className={`${ new Date(plan.date) > new Date()?"":"hidden"} `}>
//             <button 
//                         className="bg-primary ml-4 mb-2 text-white px-4 py-2 rounded-md flex items-center gap-2"
//                        onClick={()=>handleBookingModel(plan)}
//                       >
//                           <FaPlus />Book
//             </button>

//           </div>
          
          
          
          
//         }
//         </div>
//       ))}







//     </div>
//   );
// };

// export default TravelPlanList;





'use client';
import { FaCalendarAlt, FaMapMarkerAlt, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { ScheduleType } from '@/types';

type TravelPlanProps = {
  travelPlans: {
    _id: string;
    date: string | Date;
    destinations: string[];
    province?: string;
    __v?: number;
  }[];
  onDelete?: (id: string) => Promise<void>;
  isadmin?: boolean | false;
};

type Transporter = {
  _id: string;
  name: string;
  contact: string;
  bussNumber: string;
};



const TravelPlanList = ({ travelPlans, onDelete, isadmin }: TravelPlanProps) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [transporters, setTransporters] = useState<Transporter[]>([]);
  const [schedules, setSchedules] = useState<ScheduleType[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleType | null>(null);
  const [departureTime, setDepartureTime] = useState<string | null>(null);
  
  const [travelForm, setTravelForm] = useState({
    plan: selectedPlan?._id || '',  
    departure: '',
    destination: '',
    transporter: '',
    price: 0,
    schedule: '',
    departureTime:  departureTime,
    guardian: {
      name: '',
      email: '',
      phoneNumber: '',
      address: ''
    },
    student: {
      name: ''
    }
  });

  // Fetch transporters when the form is opened
  useEffect(() => {
    if (showForm) {
      fetchTransporters();
    }
  }, [showForm]);

  // Fetch transporters
  const fetchTransporters = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}transporters`);
      console.log('Transporters:', response.data);
      setTransporters(response.data);
    } catch (error) {
      console.error('Error fetching transporters:', error);
      toast.error('Failed to load transporters');
    }
  };

  // Fetch schedules when a transporter is selected
  const fetchSchedules = async (transporterId: string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}transporters/${transporterId}/schedules`);
      setSchedules(response.data.data.schedules);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      toast.error('Failed to load schedules');
    }
  };

  // Handle form input changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Handle nested form fields
    if (name.startsWith('guardian.') || name.startsWith('student.')) {
      const [parent, child] = name.split('.');
      setTravelForm(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as 'guardian' | 'student'],
          [child]: value
        }
      }));
    } else {
      // Handle top-level fields
      setTravelForm(prev => ({
        ...prev,
        [name]: name === 'price' ? parseInt(value) : value
      }));

      // Special handling for transporter selection to fetch schedules
      if (name === 'transporter') {
        fetchSchedules(value);
      }

      // Handle plan selection to set initial departure
      if (name === 'plan') {
        const selectedP = travelPlans.find(plan => plan._id === value);
        if (selectedP) {
          setSelectedPlan(selectedP);
          // Optionally set default departure if needed
          setTravelForm(prev => ({
            ...prev,
            departure: selectedP.destinations[0] || ''
          }));
        }
      }
      if (name === 'schedule') {
        const selectedS = schedules.find(s => s._id === value);
        if (selectedS) {
          setSelectedSchedule(selectedS);
          setTravelForm(prev => ({
            ...prev,
            price : selectedS.price,
            departure: selectedS.departure,
            destination: selectedS.destination,
          }));
        }
      }
      if (name === 'departureTime') {
        setDepartureTime(value);
       
    }
  }
  };

  // Handle form submission
  const handleSubmitTravelForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}travels`, 
        {
          ...travelForm,
          travelDetails: {
            plan: {
              date: selectedPlan.date,
              id: selectedPlan._id
            },
            departure: travelForm.departure,
            destination: travelForm.destination,
            price: travelForm.price,
            transporter: transporters.find(t => t._id === travelForm.transporter),
            departureTime: travelForm.departureTime,
            expectedArrivalTime: schedules.find(s => s._id === travelForm.schedule)?.expectedArrivalTime
          }
        }
        // , 
        // {
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${token}`
        //   }
        // }
      );

      toast.success('Ticket booked successfully');
      setShowForm(false);
    } catch (error) {
      console.error('Error booking ticket:', error);
      toast.error('Failed to book ticket');
    }
  };

  // Handle booking model open
  const handleBookingModel = (plan: any) => {
    setShowForm(true);
    setSelectedPlan(plan);
    // Reset form with selected plan
    setTravelForm(prev => ({
      ...prev,
      plan: plan._id,
      departure: plan.destinations[0] || ''
    }));
  };

  useEffect(() => {
   if (schedules){
    console.log('schedules', schedules);
    let s =  schedules.filter(s =>  {
      return s.transporter === travelForm.transporter  && s.plan === travelForm.plan
  }
    )

    console.log('schedules after fileter', s , travelForm.plan );
    
   
   }
  }
  , [schedules]);

  return (
    <div>
      {/* Existing travel plan rendering code... */}
      
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Book a Ticket</h3>

            <div className="p-4">
              <h4 className="text-lg font-semibold mb-2">Travel Plan</h4>
              <p className="text-sm text-gray-500 mb-2">
                {selectedPlan?.province} ({selectedPlan?.destinations.join(', ')})
              </p>
            </div>


            
            <form onSubmit={handleSubmitTravelForm}>
              {/* Plan Selection */}
              <div className="mb-4">
                {/* <label className="block text-sm font-medium mb-1">Travel Plan</label> */}

                {/* seleccted paln */}

                {/* <select 
                  name="plan" 
                  value={travelForm.plan} 
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Select Travel Plan</option>
                  {travelPlans.map(dest => (
                    <option key={dest._id} value={dest._id}>
                      {dest?.province} ({dest.destinations.join(', ')})
                    </option>
                  ))}
                </select> */}
              </div>

              {/* Transporter Selection */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Transporter</label>
                <select 
                  name="transporter" 
                  value={travelForm.transporter} 
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Select Transporter</option>
                  {transporters.map(transporter => (
                    <option key={transporter._id} value={transporter._id}>
                      {transporter.name} (Bus: {transporter.bussNumber})
                    </option>
                  ))}
                </select>
              </div>

            

              {/* Schedule Selection */}
              {travelForm.transporter && (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Schedule</label>
                  <select 
                    name="schedule" 
                    value={travelForm.schedule} 
                    onChange={handleFormChange}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="">Select Schedule</option>
                    {schedules.filter(s =>  {
                        return s.transporter === travelForm.transporter && s.plan=== travelForm.plan 
  
                    }



                      )
                     .map(schedule => (
                      <option key={schedule._id} value={schedule._id}>

                        Departure: {schedule.departureTime} | 
                        {/* Arrival: {new Date(schedule.expectedArrivalTime).toLocaleTimeString()} */}
                      </option>
                    ))}
                  </select>
                </div>
              )}

                <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Departure Time</label>
                {/* {selectedSchedule?.timeSlots} */}


                <select 
                  name="departureTime" 
                  value={travelForm.departureTime  || ''} 
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Select Departure Time</option>
                  {
                    selectedSchedule?.timeSlots.map((timeSlot: any) => (
                      <option key={timeSlot} value={timeSlot}>
                        {timeSlot}
                      </option>
                    ))

                  }

                </select>
              </div>

              {/* Departure and Destination */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Departure</label>
                  <input 
                    type="text"
                    name="departure" 
                    value={travelForm.departure} 
                    onChange={handleFormChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Destination</label>
                  <select 
                    name="destination" 
                    value={travelForm.destination} 
                    onChange={handleFormChange}
                    className="w-full p-2 border rounded-md"
                    required
                  >
                    <option value="">Select Destination</option>
                    {selectedPlan?.destinations.map((dest: string) => (
                      <option key={dest} value={dest}>{dest}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Price (RWF)</label>
                <input 
                  type="number" 
                  name="price" 
                  value={travelForm.price} 
                  onChange={handleFormChange}
                  min="0"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              {/* Guardian Details */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2">Guardian Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text"
                    name="guardian.name"
                    placeholder="Guardian Name"
                    value={travelForm.guardian.name}
                    onChange={handleFormChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                  <input 
                    type="email"
                    name="guardian.email"
                    placeholder="Guardian Email"
                    value={travelForm.guardian.email}
                    onChange={handleFormChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                  <input 
                    type="tel"
                    name="guardian.phoneNumber"
                    placeholder="Guardian Phone"
                    value={travelForm.guardian.phoneNumber}
                    onChange={handleFormChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                  <input 
                    type="text"
                    name="guardian.address"
                    placeholder="Guardian Address"
                    value={travelForm.guardian.address}
                    onChange={handleFormChange}
                    className="w-full p-2 border rounded-md"
                    required
                  />
                </div>
              </div>

              {/* Student Details */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold mb-2">Student Details</h4>
                <input 
                  type="text"
                  name="student.name"
                  placeholder="Student Name"
                  value={travelForm.student.name}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-2">
                <button 
                  type="button" 
                  className="px-4 py-2 border rounded-md"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-primary text-white rounded-md"
                >
                  Book Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {travelPlans.map(plan => (
        <div key={plan._id} className={`bg-white rounded-lg shadow-md overflow-hidden ${ new Date(plan.date) > new Date()? 'border-4 border-l-primary' : ' border-4 border-l-red-400'}`}>
          <div className="p-4 bg-blue-100">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-lg">Travel Plan</h3>
              {plan.province && (
                <span className="px-2 py-1 rounded-full text-xs bg-green-200 text-green-800">
                  {plan.province}
                </span>
              )}
            </div>
          </div>
          
          <div className="p-4">
            <div className="space-y-3">
              <div className="flex items-start">
                <FaCalendarAlt className="text-gray-400 mt-1 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  {/* <p className="font-medium">{formatDate(plan.date)}</p> */}
                </div>
              </div>
              
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-gray-400 mt-1 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Destinations</p>
                  <div>
                    {plan.destinations.map((destination, index) => (
                      <span key={index} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                        {destination}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {isadmin? <div className="border-t p-4 flex justify-between">
            <div className="flex space-x-2">
              <button 
                className="text-blue-500 hover:text-blue-700"
                onClick={() => console.log('Edit plan', plan._id)}
              >
                <FaEdit />
              </button>
              
              {onDelete && (
                <button 
                  // onClick={() => handleDelete(plan._id)}
                  // disabled={actionLoading === `delete_${plan._id}`}
                  className="text-red-500 hover:text-red-700 disabled:text-gray-400"
                >
                  <FaTrash />
                </button>
              )}
            </div>
          </div>:  

          <div className={`${ new Date(plan.date) > new Date()?"":"hidden"} `}>
            <button 
                        className="bg-primary ml-4 mb-2 text-white px-4 py-2 rounded-md flex items-center gap-2"
                       onClick={()=>handleBookingModel(plan)}
                      >
                          <FaPlus />Book
            </button>

          </div>
          
          
          
          
        }
        </div>
      ))}

  </div>


      
    </div>
  );
};


export default TravelPlanList;
