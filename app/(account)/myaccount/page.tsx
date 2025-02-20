"use client";

import { useState, useEffect } from "react";
import ParentDashboard from "@/app/_components/dasboard-overview/parent";
import SchoolDashboard from "@/app/_components/dasboard-overview/school";
import StudentDashboard from "@/app/_components/dasboard-overview/student";
import TransportCoDashboard from "@/app/_components/dasboard-overview/transport-company";

type Role = "student" | "parent" | "school" | "TransportCompany";

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
      {role === "TransportCompany" && <TransportCoDashboard />}
      {!role && <p>Loading dashboard...</p>}
    </div>
  );
};

export default Home;

