'use client';
import { useState, useEffect } from 'react';
import TravelPlanList from '@/app/_components/authority/TravelPlanList';
import TravelPlanForm from '@/app/_components/authority/TravelPlanForm';
import { FaPlus, FaFilter } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'sonner';
export type TravelPlan = {
    _id: string;
    date: string | Date;
    destinations: string[];
    province?: string;
    __v?: number;
  };
  

const TravelPlanManagement = (
    { isadmin }:{ isadmin: boolean }
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    province: '',
    date: '',
    destination: ''
  });

  type TravelPlan = {
    _id: string;
    date: string | Date;
    destinations: string[];
    province?: string;
    __v?: number;
  };
  
  const [travelPlans, setTravelPlans] = useState<TravelPlan[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
 
  const createTravelPlan = async (data: { date: string; destinations: string[]; province?: string }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}plans`, data,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      setTravelPlans(prev => [response.data, ...prev]);
      toast.success('Travel plan created successfully.');
      return response.data;
    } catch (error) {
      console.error('Failed to create travel plan:', error);
      toast.error('Failed to create travel plan. Please try again.');
      throw error;
    }
  }

  const deleteTravelPlan = async (id: string) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}plans/${id}`);
      setTravelPlans(prev => prev.filter(plan => plan._id !== id));
      toast.success('Travel plan deleted successfully.');
    } catch (error) {
      console.error('Failed to delete travel plan:', error);
      toast.error('Failed to delete travel plan. Please try again.');
      throw error;
    }
  }

  const getallTravelPlans = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}plans`); 
      console.log("travel plans", response.data);
      setTravelPlans(response.data);
    } catch (error) {
      console.error('Error fetching travel plans:', error);
      toast.error('Failed to load travel plans. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      getallTravelPlans();
    }
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Apply filters to travel plans
  const filteredTravelPlans = travelPlans.filter(plan => {
    // Filter by province if specified
    if (filters.province && (!plan.province || !plan.province.toLowerCase().includes(filters.province.toLowerCase()))) {
      return false;
    }
    
    // Filter by date if specified
    if (filters.date) {
      const planDate = new Date(plan.date).toISOString().split('T')[0];
      if (planDate !== filters.date) {
        return false;
      }
    }
    
    // Filter by destination if specified
    if (filters.destination && !plan.destinations.some(dest => 
      dest.toLowerCase().includes(filters.destination.toLowerCase())
    )) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Travel Plan Management</h1>
        <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <FaFilter className="text-gray-400 mr-2" />
            <span className="font-medium">Filters:</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-grow">

            
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <input 
                type="date" 
                name="date" 
                value={filters.date} 
                onChange={handleFilterChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Destination</label>
              <input 
                type="text" 
                name="destination" 
                value={filters.destination} 
                onChange={handleFilterChange}
                placeholder="Filter by destination"
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
       
      </div>

      {/* Filters */}


      {/* Travel Plan Form Modal */}
      <TravelPlanForm 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={createTravelPlan}
        
      />

      {/* Travel Plan List */}
      {isLoading ? (
        <div className="text-center py-8">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-2">Loading travel plans...</p>
        </div>
      ) : (
        <TravelPlanList 
          travelPlans={filteredTravelPlans} 
          onDelete={deleteTravelPlan} 
          isadmin={isadmin}
        />
      )}
    </div> 
  );
};

export default TravelPlanManagement;