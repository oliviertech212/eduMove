'use client';
import { FaBus, FaCalendarAlt, FaMapMarkerAlt, FaUserFriends, FaEdit, FaTrash, FaBell } from 'react-icons/fa';
import Link from 'next/link';
import { use, useState } from 'react';
import { TravelPlan } from '@/types';

type TravelPlanListProps = {
  travelPlans: TravelPlan[];
  onPublish?: (id: string) => Promise<void>;
  onDelete?: (id: string) => Promise<void>;
};

const TravelPlanList = ({ travelPlans, onPublish, onDelete }: TravelPlanListProps) => {
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const handlePublish = async (id: string) => {
    if (!onPublish) return;
    
    try {
      setActionLoading(`publish_${id}`);
      await onPublish(id);
    } catch (error) {
      console.error("Failed to publish travel plan:", error);
      alert("Failed to publish travel plan. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!onDelete) return;
    
    if (window.confirm("Are you sure you want to delete this travel plan?")) {
      try {
        setActionLoading(`delete_${id}`);
        await onDelete(id);
      } catch (error) {
        console.error("Failed to delete travel plan:", error);
        alert("Failed to delete travel plan. Please try again.");
      } finally {
        setActionLoading(null);
      }
    }
  };

  if (travelPlans.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray-500">No travel plans found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {travelPlans.map(plan => (
        <div key={plan.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className={`p-4 ${
            plan.status === 'Published' 
              ? 'bg-green-100' 
              : plan.status === 'Cancelled' 
                ? 'bg-red-100' 
                : 'bg-yellow-100'
          }`}>
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-lg">{plan.title}</h3>
              <span className={`px-2 py-1 rounded-full text-xs ${
                plan.status === 'Published' 
                  ? 'bg-green-200 text-green-800' 
                  : plan.status === 'Cancelled' 
                    ? 'bg-red-200 text-red-800' 
                    : 'bg-yellow-200 text-yellow-800'
              }`}>
                {plan.status}
              </span>
            </div>
          </div>
          
          <div className="p-4">
            <div className="space-y-3">
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-gray-400 mt-1 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">From</p>
                  <p className="font-medium">{plan.departureLocation}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-gray-400 mt-1 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">To</p>
                  <p className="font-medium">{plan.arrivalLocation}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FaCalendarAlt className="text-gray-400 mt-1 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Departure</p>
                  <p className="font-medium">
                    {new Date(plan.departureDate).toLocaleDateString()} at {plan.departureTime}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FaUserFriends className="text-gray-400 mt-1 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Seats</p>
                  <p className="font-medium">
                    {plan.availableSeats} available / {plan.seats} total
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FaBus className="text-gray-400 mt-1 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Transporter</p>
                  <p className="font-medium">{plan.transporterName}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t p-4 flex justify-between">
            <div className="flex space-x-2">
              <Link 
                href={`/authority/travel-plans/edit/${plan.id}`}
                className="text-blue-500 hover:text-blue-700"
              >
                <FaEdit />
              </Link>
              
              {onDelete && (
                <button 
                  onClick={() => handleDelete(plan.id)}
                  disabled={actionLoading === `delete_${plan.id}`}
                  className="text-red-500 hover:text-red-700 disabled:text-gray-400"
                >
                  <FaTrash />
                </button>
              )}
            </div>
            
            {plan.status === 'Draft' && onPublish && (
              <button
                onClick={() => handlePublish(plan.id)}
                disabled={actionLoading === `publish_${plan.id}`}
                className="flex items-center text-sm bg-primary text-white px-3 py-1 rounded hover:bg-blue-700 disabled:bg-gray-400"
              >
                <FaBell className="mr-1" />
                {actionLoading === `publish_${plan.id}` ? 'Publishing...' : 'Publish & Notify'}
              </button>
            )}
            
            {plan.status === 'Published' && (
              <Link
                href={`/authority/travel-plans/${plan.id}/notifications`}
                className="flex items-center text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200"
              >
                <FaBell className="mr-1" />
                View Notifications
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TravelPlanList;