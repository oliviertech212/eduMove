"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScheduleType, TravelBooking, UserType } from '@/types';

const TransporterDashboard = () => {
    const [schedules, setSchedules] = useState<ScheduleType[]>([]);
    const [bookings, setBookings] = useState<TravelBooking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");
            const user = localStorage.getItem("user");
            const savedUser = user ? JSON.parse(user) : null;
            if (!token || !savedUser?._id) {
                toast.error('User not found. Please log in again.');
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const schedulesResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}transporters/${savedUser._id}/schedules`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                const bookingsResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}travels`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                
                setSchedules(schedulesResponse.data?.data?.schedules || schedulesResponse.data || []);
                setBookings(bookingsResponse.data.data || bookingsResponse.data || []);
            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Failed to load dashboard data.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const bookingsPerRoute = schedules.map(schedule => {
        const route = `${schedule.departure} to ${schedule.destination}`;
        const count = bookings.filter(b => 
            b.travelDetails.departure === schedule.departure &&
            b.travelDetails.destination === schedule.destination
        ).length;
        return { name: route, bookings: count };
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Transporter Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader><CardTitle>Total Schedules</CardTitle></CardHeader>
                    <CardContent><p className="text-2xl font-bold">{schedules.length}</p></CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Total Bookings</CardTitle></CardHeader>
                    <CardContent><p className="text-2xl font-bold">{bookings.length}</p></CardContent>
                </Card>
            </div>
            <div className="grid gap-4 mt-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Bookings per Route</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={bookingsPerRoute}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="bookings" fill="#82ca9d" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default TransporterDashboard; 