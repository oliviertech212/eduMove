import React from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import { ScheduleType } from '@/types';
import { format } from 'date-fns';
import { TravelPlan } from './travel-plans';

interface TripFormProps {
  showTripForm: boolean;
  setShowTripForm: (show: boolean) => void;
  editingTrip: ScheduleType | null;
  tripForm: any;
  setTripForm: (form: any) => void;
  travelPlans: TravelPlan[];
  selectedPlan: TravelPlan | null;
  handleTripFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleTimeSlotChange: (index: number, field: string, value: any) => void;
  
  addTimeSlot: () => void;
  removeTimeSlot: (index: number) => void;
  handleSubmitTripForm: (e: React.FormEvent) => void;
}

const TripForm: React.FC<TripFormProps> = ({
  showTripForm,
  setShowTripForm,
  editingTrip,
  tripForm,
  setTripForm,
  travelPlans, 
  selectedPlan,
  handleTripFormChange,
  handleTimeSlotChange,
  addTimeSlot,
  removeTimeSlot,
  handleSubmitTripForm,
}) => {
  if (!showTripForm) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-[500px]">
        <h3 className="text-xl font-semibold mb-4">
          {editingTrip ? 'Edit Trip' : 'Add New Trip'}
        </h3>
        
        <form onSubmit={handleSubmitTripForm}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">To</label>
            <select 
              name="plan" 
              value={tripForm.plan} 
              onChange={handleTripFormChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select Travel plan</option>
              {travelPlans
                .filter(dest => new Date(dest.date) > new Date())
                .map(dest => (
                  <option key={dest._id} value={dest._id}>
                    {dest.province} ({dest.destinations.join(', ')}) — {format(new Date(dest.date), ' dd MMMM yyyy HH:mm:ss')}
                  </option>
                ))}
            </select>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium">Time Slots</label>
              <button 
                type="button" 
                onClick={addTimeSlot}
                className="text-primary text-sm flex items-center"
              >
                <FiPlus className="mr-1" /> Add Time Slot
              </button>
            </div>
            
            {tripForm.timeSlots.length === 0 && (
              <p className="text-sm text-gray-500 mb-2">
                No time slots added. Click the button above to add one.
              </p>
            )}
            
            {tripForm.timeSlots.map((slot: any, index: number) => (
              <div key={index} className='bg-primary p-2 mt-2'>
                <div className="flex items-center gap-2 mb-2 p-2 border rounded-md bg-gray-50">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">Time</label>
                    <input
                      type="time"
                      value={slot.time}
                      onChange={(e) => handleTimeSlotChange(index, 'time', e.target.value)}
                      className="w-full p-2 border rounded-md text-sm"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">Available Slots</label>
                    <input
                      type="number"
                      value={slot.slots}
                      onChange={(e) => handleTimeSlotChange(index, 'slots', parseInt(e.target.value))}
                      min="1"
                      className="w-full p-2 border rounded-md text-sm"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeTimeSlot(index)}
                    className="mt-5 p-2 text-red-500 hover:bg-red-50 rounded-full"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
                <div className="flex items-center gap-2 mb-2 p-2 border rounded-md bg-gray-50">
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">Bus Number</label>
                    <input
                      type="text"
                      value={slot.busNumber}
                      onChange={(e) => handleTimeSlotChange(index, 'busNumber', e.target.value)}
                      className="w-full p-2 border rounded-md text-sm"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-gray-500 mb-1">Expected Arrival Time</label>
                    <input
                      type="datetime-local"
                      value={slot.expectedArivalTime}
                      onChange={(e) => handleTimeSlotChange(index, 'expectedArrivalTime', e.target.value)}
                      className="w-full p-2 border rounded-md text-sm"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">From</label>
            <div>
              <label className="block text-sm font-medium mb-1">Departure</label>
              <input 
                type="text"
                name="departure" 
                value={tripForm.departure} 
                onChange={handleTripFormChange}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">To</label>
            <select 
              name="destination" 
              value={tripForm.destination} 
              onChange={handleTripFormChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select a destination</option>
              {selectedPlan?.destinations.map(dest => (
                <option key={dest} value={dest}>{dest}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Price (RWF)</label>
              <input 
                type="number" 
                name="price" 
                value={tripForm.price} 
                onChange={handleTripFormChange}
                min="0"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <button 
              type="button" 
              className="px-4 py-2 border rounded-md"
              onClick={() => setShowTripForm(false)}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-primary text-white rounded-md"
            >
              {editingTrip ? 'Update Trip' : 'Add Trip'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TripForm; 