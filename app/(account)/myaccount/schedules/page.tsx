"use client";
import { useState, useEffect } from "react";
type Role = "student" | "parent" | "school" | "TransportCompany"|"Authority";

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
     
     
    </div>
  );
};

export default Page;

