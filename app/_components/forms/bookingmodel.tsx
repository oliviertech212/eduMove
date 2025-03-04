"use client";

import { Booking, BusTrip } from "@/app/(account)/myaccount/travel-schedule/page";
import { useState } from "react";



export const BookingModelForm = ({
    Trip,
    handleSubmitTripBooking,
    closeModal,
  }: {
    Trip: BusTrip | null;
    handleSubmitTripBooking: (bookingData: Booking) => void;
    closeModal: ( ) => void;
  }) => {
    const [tripForm, setTripForm] = useState<Booking>({
      id: '',
      studentName: '',
      studentId: '',
      tripId: Trip?.id || '',
      bookingDate: new Date().toISOString().split('T')[0],
      status: 'Confirmed',
      paymentStatus: 'Paid'
    });
  
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      handleSubmitTripBooking(tripForm);
    };
  
    const handleTripFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setTripForm({
        ...tripForm,
        [name]: value
      });
    };
  
      return(
        <>
  
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center  items-center">

    
  
          <div className="bg-white relative p-6 rounded-lg shadow-lg w-full max-w-md">
          <div 
      className="absolute top-2 right-2 text-red-500 cursor-pointer p-2"
      onClick={closeModal}
    >
      ✖
    </div>
            <h3 className="text-xl font-semibold mb-4">
              {Trip ? 'Book Ticket' : 'Book Ticket ' } 
            </h3>
            <p> {Trip?.fromName}, {Trip?.fromDistrict} to  {Trip?.destinationName}, {Trip?.district} {Trip?.price} </p>
            <form 
           onSubmit={handleFormSubmit}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Student Name</label>
                <input 
                  type="text" 
                  name="studentName" 
                  value= {tripForm.studentName}
                  onChange={
                    handleTripFormChange
                  }
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Student ID</label>
                <input 
                  type="text" 
                  name="studentId" 
                  value= {tripForm.studentId}
                  onChange={
                    handleTripFormChange
                  }
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Trip ID</label>
                <input 
                  type="text" 
                  name="tripId" 
                  value= {tripForm.tripId}
                  onChange={
                    handleTripFormChange
                  }
                  
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Booking Date</label>
                <input 
                  type="date" 
                  name="bookingDate" 
                  value= {tripForm.bookingDate}
                  onChange={
                    handleTripFormChange
                  }
                  
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Status</label>
                <select 
                  name="status" 
                  value= {tripForm.status}
                  onChange={
                    handleTripFormChange
                  }
                  className="w-full p-2 border rounded-md"
                  required
                >
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
  
              <button 
                type="submit" 
                className="px-4 py-2 bg-primary text-white rounded-md"
              >
                Book Ticket
              </button>
  
            </form>
            </div>
  
  
        </div>
  
        </>
  
        
      )
    }
  