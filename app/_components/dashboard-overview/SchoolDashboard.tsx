"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TravelBooking } from '@/types';

const COLORS = ['#00C49F', '#FFBB28', '#FF8042', '#0088FE'];

const SchoolDashboard = () => {
  const [bookings, setBookings] = useState<TravelBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllBookings = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error('Authentication token not found.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const url = `${process.env.NEXT_PUBLIC_API_URL}travels`;
        const response = await axios.get(url, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setBookings(response.data.data || response.data || []);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        toast.error('Failed to load bookings.');
      } finally {
        setLoading(false);
      }
    };
    getAllBookings();
  }, []);

  const bookingStatusData = bookings.reduce((acc, booking) => {
    const status = booking.status || 'Unknown';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieChartData = Object.entries(bookingStatusData).map(([name, value]) => ({ name, value }));

  if (loading) {
    return (
        <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">School Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{bookings.length}</p>
          </CardContent>
        </Card>
        {Object.entries(bookingStatusData).map(([status, count]) => (
            <Card key={status}>
                <CardHeader><CardTitle>{status}</CardTitle></CardHeader>
                <CardContent><p className="text-2xl font-bold">{count}</p></CardContent>
            </Card>
        ))}
      </div>

      <div className="grid gap-4 mt-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Booking Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SchoolDashboard; 