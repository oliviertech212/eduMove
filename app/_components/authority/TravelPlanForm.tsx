// 'use client';


// import { TravelPlan } from '@/types';
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { FaCalendarAlt, FaMapMarkerAlt, FaUserFriends, FaBus } from 'react-icons/fa';

// type TravelPlanFormProps = {
//   onSubmit: (data: Omit<TravelPlan, 'id' | 'publishedDate' | 'publishedBy' | 'availableSeats'>) => void;
//   transporters: { id: string; name: string }[];
//   initialData?: Partial<TravelPlan>;
//   isSubmitting?: boolean;
// };

// const TravelPlanForm = ({ 
//   onSubmit, 
//   transporters, 
//   initialData, 
//   isSubmitting = false 
// }: TravelPlanFormProps) => {
//   const [selectedTransporter, setSelectedTransporter] = useState(initialData?.transporterId || '');
  
//   const { register, handleSubmit, formState: { errors } } = useForm({
//     defaultValues: initialData || {
//       title: '',
//       description: '',
//       departureLocation: '',
//       arrivalLocation: '',
//       departureDate: '',
//       departureTime: '',
//       estimatedArrivalTime: '',
//       district: '',
//       status: 'Draft',
//       seats: 0,
//       transporterId: '',
//       transporterName: ''
//     }
//   });

//   const handleFormSubmit = (data: any) => {
//     // Find the selected transporter's name
//     const selectedTransporterObj = transporters.find(t => t.id === data.transporterId);
    
//     onSubmit({
//       ...data,
//       transporterName: selectedTransporterObj?.name || '',
//       seats: parseInt(data.seats, 10),
//       status: data.status as 'Draft' | 'Published' | 'Cancelled'
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow">
//       <div className="space-y-4">
//         <h2 className="text-xl font-semibold">Create Travel Plan</h2>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {/* Basic Information */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Title</label>
//             <input
//               type="text"
//               {...register('title', { required: 'Title is required' })}
//               className="w-full p-2 border rounded-md"
//               placeholder="e.g., Weekly Trip to Science Museum"
//             />
//             {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message?.toString()}</p>}
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium mb-1">District</label>
//             <input
//               type="text"
//               {...register('district', { required: 'District is required' })}
//               className="w-full p-2 border rounded-md"
//               placeholder="e.g., North District"
//             />
//             {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district.message?.toString()}</p>}
//           </div>
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium mb-1">Description</label>
//           <textarea
//             {...register('description')}
//             className="w-full p-2 border rounded-md"
//             placeholder="Provide details about the travel plan"
//             rows={3}
//           />
//         </div>
        
//         {/* Location Information */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               <FaMapMarkerAlt className="inline mr-1 text-gray-500" /> Departure Location
//             </label>
//             <input
//               type="text"
//               {...register('departureLocation', { required: 'Departure location is required' })}
//               className="w-full p-2 border rounded-md"
//               placeholder="e.g., School Campus"
//             />
//             {errors.departureLocation && <p className="text-red-500 text-sm mt-1">{errors.departureLocation.message?.toString()}</p>}
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               <FaMapMarkerAlt className="inline mr-1 text-gray-500" /> Arrival Location
//             </label>
//             <input
//               type="text"
//               {...register('arrivalLocation', { required: 'Arrival location is required' })}
//               className="w-full p-2 border rounded-md"
//               placeholder="e.g., Science Museum"
//             />
//             {errors.arrivalLocation && <p className="text-red-500 text-sm mt-1">{errors.arrivalLocation.message?.toString()}</p>}
//           </div>
//         </div>
        
//         {/* Date and Time Information */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               <FaCalendarAlt className="inline mr-1 text-gray-500" /> Departure Date
//             </label>
//             <input
//               type="date"
//               {...register('departureDate', { required: 'Departure date is required' })}
//               className="w-full p-2 border rounded-md"
//             />
//             {errors.departureDate && <p className="text-red-500 text-sm mt-1">{errors.departureDate.message?.toString()}</p>}
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium mb-1">Departure Time</label>
//             <input
//               type="time"
//               {...register('departureTime', { required: 'Departure time is required' })}
//               className="w-full p-2 border rounded-md"
//             />
//             {errors.departureTime && <p className="text-red-500 text-sm mt-1">{errors.departureTime.message?.toString()}</p>}
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium mb-1">Estimated Arrival Time</label>
//             <input
//               type="time"
//               {...register('estimatedArrivalTime', { required: 'Estimated arrival time is required' })}
//               className="w-full p-2 border rounded-md"
//             />
//             {errors.estimatedArrivalTime && <p className="text-red-500 text-sm mt-1">{errors.estimatedArrivalTime.message?.toString()}</p>}
//           </div>
//         </div>
        
//         {/* Seats and Transporter Information */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               <FaUserFriends className="inline mr-1 text-gray-500" /> Total Seats
//             </label>
//             <input
//               type="number"
//               {...register('seats', { 
//                 required: 'Number of seats is required',
//                 min: { value: 1, message: 'At least 1 seat is required' }
//               })}
//               className="w-full p-2 border rounded-md"
//               placeholder="e.g., 40"
//             />
//             {errors.seats && <p className="text-red-500 text-sm mt-1">{errors.seats.message?.toString()}</p>}
//           </div>
          
//           <div>
//             <label className="block text-sm font-medium mb-1">
//               <FaBus className="inline mr-1 text-gray-500" /> Transporter
//             </label>
//             <select
//               {...register('transporterId', { required: 'Transporter is required' })}
//               className="w-full p-2 border rounded-md"
//               onChange={(e) => setSelectedTransporter(e.target.value)}
//               value={selectedTransporter}
//             >
//               <option value="">Select a transporter</option>
//               {transporters.map(transporter => (
//                 <option key={transporter.id} value={transporter.id}>
//                   {transporter.name}
//                 </option>
//               ))}
//             </select>
//             {errors.transporterId && <p className="text-red-500 text-sm mt-1">{errors.transporterId.message?.toString()}</p>}
//           </div>
//         </div>
        
//         {/* Status */}
//         <div>
//           <label className="block text-sm font-medium mb-1">Status</label>
//           <select
//             {...register('status')}
//             className="w-full p-2 border rounded-md"
//           >
//             <option value="Draft">Draft</option>
//             <option value="Published">Published</option>
//             <option value="Cancelled">Cancelled</option>
//           </select>
//         </div>
//       </div>
      
//       <div className="flex justify-end">
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
//         >
//           {isSubmitting ? 'Saving...' : initialData?.id ? 'Update Travel Plan' : 'Create Travel Plan'}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default TravelPlanForm;


'use client';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

type TravelPlanFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { date: string; destinations: string[]; province?: string }) => Promise<void>;
};

const TravelPlanForm = ({ isOpen, onClose, onSubmit }: TravelPlanFormProps) => {
  const [date, setDate] = useState('');
  const [destinationsInput, setDestinationsInput] = useState('');
  const [province, setProvince] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!date) {
      setError('Date is required');
      return;
    }

    if (!destinationsInput) {
      setError('At least one destination is required');
      return;
    }

    const destinations = destinationsInput.split(',').map(dest => dest.trim());

    try {
      setIsSubmitting(true);
      await onSubmit({
        date,
        destinations,
        ...(province ? { province } : {})
      });
      
      // Reset form
      setDate('');
      setDestinationsInput('');
      setProvince('');
      onClose();
    } catch (err) {
      setError('Failed to create travel plan. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create New Travel Plan</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Destinations (comma separated)</label>
            <input
              type="text"
              value={destinationsInput}
              onChange={(e) => setDestinationsInput(e.target.value)}
              placeholder="e.g. Kigali, Musanze, Rubavu"
              className="w-full p-2 border rounded-md"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Enter destinations separated by commas</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Province (optional)</label>
            <input
              type="text"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              placeholder="e.g. North, South, East, West"
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isSubmitting ? 'Creating...' : 'Create Travel Plan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TravelPlanForm;