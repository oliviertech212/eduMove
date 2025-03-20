"use client";

import { useState, useEffect } from "react";
import ParentDashboard from "@/app/_components/dasboard-overview/parent";
import SchoolDashboard from "@/app/_components/dasboard-overview/school";
import StudentDashboard from "@/app/_components/dasboard-overview/student";
import TransportCoDashboard from "@/app/_components/dasboard-overview/transport-company";
import TransporterSpotManagement from "./travel-schedule/page";
import TravelPlanManagement from "./travel-plans/page";

type Role = "student" | "parent" | "school" | "transporter"| "Authority";

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
      {role === "transporter" && <TransportCoDashboard />}
      {role === "Authority" && <TravelPlanManagement />}
      {!role && <p>Loading dashboard...</p>}
    </div>
  );
};

export default Home;

