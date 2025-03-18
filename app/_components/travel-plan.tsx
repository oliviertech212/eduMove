
import React from 'react';
import { format } from 'date-fns';

export type TravelPlan = {
  _id: string;
  date: string | Date;
  destinations: string[];
  province?: string;
  __v?: number;
};

interface TravelPlansListProps {
  travelPlans: TravelPlan[];
  isLoading?: boolean;
}

const TravelPlansList: React.FC<TravelPlansListProps> = ({ travelPlans, isLoading = false }) => {
  // Group travel plans by date
  const groupedByDate = travelPlans.reduce((acc, plan) => {
    const formattedDate = format(new Date(plan.date), 'yyyy-MM-dd');
    if (!acc[formattedDate]) {
      acc[formattedDate] = [];
    }
    acc[formattedDate].push(plan);
    return acc;
  }, {} as Record<string, TravelPlan[]>);

  // Sort dates in ascending order
  const sortedDates = Object.keys(groupedByDate).sort();
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (travelPlans.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg shadow">
        <p className="text-gray-500">No travel plans found. Create your first travel plan!</p>
      </div>
    );
  }

  return (
    <div className=" gap-4 grid grid-cols-3">
      {sortedDates.map((date) => (
        <div key={date} className="bg-white rounded-lg h-fit shadow-md overflow-hidden">
          <div className="bg-blue-600 text-white p-4">
            <h2 className="text-xl font-bold">{format(new Date(date), 'MMMM d, yyyy')}</h2>
            <p className="text-blue-100">{groupedByDate[date].length} destination{groupedByDate[date].length !== 1 ? 's' : ''}</p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {groupedByDate[date].map((plan) => (
              <div key={plan._id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-lg text-gray-800">
                    {plan.destinations.join(', ')}
                  </h3>
                  {plan.province && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full capitalize">
                      {plan.province}
                    </span>
                  )}
                </div>
                
                <div className="flex justify-end space-x-2 mt-3">
                  {/* <button className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md text-sm transition-colors">
                    Edit
                  </button> */}
                  {/* <button className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-700 rounded-md text-sm transition-colors">
                    Delete
                  </button> */}

                  <button className="px-3 py-1 bg-red-50 hover:bg-[green] text-red-700 rounded-md text-sm transition-colors">
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TravelPlansList;