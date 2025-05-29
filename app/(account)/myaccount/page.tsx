"use client";

import { useState, useEffect } from "react";
import ParentDashboard from "@/app/_components/dasboard-overview/parent";
import SchoolDashboard from "@/app/_components/dasboard-overview/school";
import StudentDashboard from "@/app/_components/dasboard-overview/student";
import TransportCoDashboard from "@/app/_components/dasboard-overview/transport-company";
import TransporterSpotManagement from "./travel-schedule/page";
import TransporterDestinationSpotManagement from "./spot-destinations/page";

import TravelPlanManagement from "./travel-plans/page";
import UserManagement from "./user-management/page";

type Role = "student" | "parent" | "school" | "transporter"| "authority" | "admin";

const Home = () => {
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
      {role === "student" && <StudentDashboard />}
      {role === "parent" && <ParentDashboard />}
      {role === "school" && <SchoolDashboard />}
      {/* {role === "transporter" && <TransportCoDashboard />} */}
      {role === "transporter" && <TransporterDestinationSpotManagement/>}
      {role === "authority" && <TravelPlanManagement />}
      {/* {role === "admin" && <TransporterSpotManagement />} */}
      {role === "admin" && <UserManagement />}
      {!role && <p>Loading dashboard...</p>}
    </div>
  );
};

export default Home;

