"use client";

import { useState, useEffect } from "react";
import AdminDashboard from "@/app/_components/dashboard-overview/AdminDashboard";
import AuthorityDashboard from "@/app/_components/dashboard-overview/AuthorityDashboard";
import SchoolDashboard from "@/app/_components/dashboard-overview/SchoolDashboard";
import TransporterDashboard from "@/app/_components/dashboard-overview/TransporterDashboard";

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

      {role === "school" && <SchoolDashboard />}
      {role === "transporter" && <TransporterDashboard />}
      {role === "authority" && <AuthorityDashboard />}
      {role === "admin" && <AdminDashboard />}
      {!role && <p>Loading dashboard...</p>}
    </div>
  );
};

export default Home;

