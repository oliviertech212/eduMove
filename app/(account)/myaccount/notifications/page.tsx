"use client";

import ParentNotificationPage from "@/app/_components/notifications/parent-notifications";
import SchoolTravelNotifications from "@/app/_components/notifications/school-notifications";
import { useState, useEffect } from "react";
import { mockBookings, mockTrips } from "@/dummydata/trips-booking";
type Role = "student" | "parent" | "school" | "transporter";

const Page = () => {
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedRole = localStorage.getItem("userRole") as Role | null;
      if (savedRole) {
        setRole(savedRole);

      }
    }
  }, []);

  return (
    <div>
     
      {role === "parent" && <ParentNotificationPage />}
      {role === "school" && 
      <SchoolTravelNotifications 
      busTrips={mockTrips} bookings={mockBookings} 
       schoolId="school-123"
      />}
      {/* {role === "transporter" && <TransportCoDashboard />} */}
      {!role && <p>Loading Notifications...</p>}
    </div>
  );
};

export default Page;

