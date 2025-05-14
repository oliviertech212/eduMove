
'use client';
import { FaCalendarAlt, FaMapMarkerAlt, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { ScheduleType, UserType } from '@/types';

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
  const [schools, setSchools] = useState<UserType[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<UserType | null>(null);
  const [schedules, setSchedules] = useState<ScheduleType[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleType | null>(null);
  const [departureTime, setDepartureTime] = useState<string | null>(null);
  const [expectedArrivalTime, setExpectedArrivalTime] = useState<string | null>(null);
  const [travelForm, setTravelForm] = useState({
    plan: selectedPlan?._id || '',  
    departure: '',
    destination: '',
    transporter: '',
    price: 0,
    schedule: '',
    travelNumber: '',
    status: 'Scheduled',
    school: selectedSchool?._id || '',
    expectedArrivalTime: expectedArrivalTime || '',
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

  const fetchSchools = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}schools`);
      console.log('Schools:', response.data);
      setSchools(response.data);
    } catch (error) {
      console.error('Error fetching schools:', error);
      toast.error('Failed to load schools');
    }
  }

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
        console.log('departureTime', value ,name);
        
        setDepartureTime(value);

       
    }
  }
  };


const handleSubmitTravelForm = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const token = localStorage.getItem("token");

  try {
    const selectedTransporter = transporters.find((t) => t._id === travelForm.transporter);

    const transporter = selectedTransporter
      ? {
          id: selectedTransporter._id,
          name: selectedTransporter.name,
          contact: selectedTransporter.contact ||  "+250789123456",
          bussNumber: selectedTransporter.bussNumber || "RAB123C"
        }
      : null; // Ensure proper handling if no transporter is found

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}travels`,
      {
        travelDetails: {
          plan: {
            date: selectedPlan.date,
            id: selectedPlan._id,
          },
          departure: travelForm.departure,
          destination: travelForm.destination,
          price: travelForm.price,
          transporter: transporter, 
          departureTime: departureTime,
          // departureTime: "18:30 PM",
          expectedArrivalTime: expectedArrivalTime || "2025-05-02T00:00:00.000Z"
        },
        guardian: travelForm.guardian,
        student: travelForm.student,
        school: travelForm.school,
        status: "Scheduled",
        travelNumber: "TRV123456",
      },
      {
        headers: {
          "Content-Type": "application/json",
          // "Authorization": `Bearer ${token}`
        },
      }
    );

    toast.success("Ticket booked successfully");
    setShowForm(false);
  } catch (error) {
    console.error("Error booking ticket:", error);
    toast.error("Failed to book ticket");
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
    fetchSchools();
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        onClick={()=>{}}
        >
          <div
          onClick={()=>{}}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
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

                        Departure: {schedule?.departureTime} | {schedule?.timeSlots.map((timeSlot: any) => ( timeSlot?.time))}  | Price: {schedule.price} RWF
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
                  value={departureTime  || ''} 
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Select Departure Time</option>
                  {
                    selectedSchedule?.timeSlots.map((timeSlot: any) => (
                      <option key={timeSlot} value={timeSlot.time}>
                        {timeSlot?.time} Arrival at {timeSlot?.expectedArivalTime}
                      </option>
                    ))

                  }

                </select>
              </div>

              {/*  school */}

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">School</label>
                <select 
                  name="school" 
                  value={travelForm.school} 
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="">Select School</option>
                  {schools.map(school => (
                    <option key={school._id} value={school._id}>
                      {school.name}
                    </option>
                  ))}
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
