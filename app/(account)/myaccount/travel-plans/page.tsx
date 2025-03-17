
 'use client';
// pages/authority/travel-plans/index.tsx
import { useState, useEffect } from 'react';
import TravelPlanList from '@/app/_components/authority/TravelPlanList';
import TravelPlanForm from '@/app/_components/authority/TravelPlanForm';
import { TravelPlan } from '@/types';
import { FaPlus, FaFilter } from 'react-icons/fa';
import Link from 'next/link';
import { travelPlans } from '@/dummydata/trips-booking';
const TravelPlanManagement = () => {
//   const [travelPlans, setTravelPlans] = useState<TravelPlan[]>(travelPlans);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    date: '',
    district: ''
  });

  useEffect(() => {
    const loadTravelPlans = async () => {
      setIsLoading(true);
      try {
        
      } catch (error) {
        console.error("Failed to load travel plans:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTravelPlans();
  }, [filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Travel Plan Management</h1>
        <Link href="/authority/travel-plans/create" className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center">
          <FaPlus className="mr-2" /> Create New Travel Plan
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <FaFilter className="text-gray-400 mr-2" />
            <span className="font-medium">Filters:</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow">
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select 
                name="status" 
                value={filters.status} 
                onChange={handleFilterChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="">All Statuses</option>
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Departure Date</label>
              <input 
                type="date" 
                name="date" 
                value={filters.date} 
                onChange={handleFilterChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">District</label>
              <input 
                type="text" 
                name="district" 
                value={filters.district} 
                onChange={handleFilterChange}
                placeholder="Filter by district"
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Travel Plan List */}
      {isLoading ? (
        <div className="text-center py-8">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-2">Loading travel plans...</p>
        </div>
      ) : (
        <TravelPlanList travelPlans={travelPlans} />
      )}
    </div>
  );
};

export default TravelPlanManagement;