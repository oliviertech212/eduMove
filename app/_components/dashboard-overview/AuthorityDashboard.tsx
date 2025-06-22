"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TravelPlan } from '@/app/_components/travel-plans';

const AuthorityDashboard = () => {
  const [travelPlans, setTravelPlans] = useState<TravelPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getallTravelPlans = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}plans`);
        setTravelPlans(response.data);
      } catch (error) {
        console.error('Error fetching travel plans:', error);
        toast.error('Failed to load travel plans. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    getallTravelPlans();
  }, []);

  const plansByProvince = travelPlans.reduce((acc, plan) => {
    const province = plan.province || 'Unknown';
    acc[province] = (acc[province] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const barChartData = Object.entries(plansByProvince).map(([name, value]) => ({ name, plans: value }));

    if (loading) {
        return (
            <div className="flex items-center justify-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Authority Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Travel Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{travelPlans.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 mt-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Travel Plans by Province</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="plans" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthorityDashboard; 