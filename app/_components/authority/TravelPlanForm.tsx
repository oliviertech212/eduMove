

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