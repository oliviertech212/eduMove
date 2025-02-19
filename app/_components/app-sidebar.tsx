"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; 
import Link from "next/link";
import axios from "axios";
import { FaHome, FaRoute, FaBus, FaBell, FaChartBar, FaUsers,FaAngleDown, FaCalendarAlt, FaMoneyBillWave, FaCog, FaSchool, FaUserGraduate, FaUserTie } from "react-icons/fa";
import { toast } from "sonner";
import SelectField from "./text-fields/selectinputs";

type Role = "student" | "parent" | "school" | "TransportCompany";

const roleBasedMenuItems = {
  student: [
    { title: "Dashboard", url: "/dashboard", icon: FaHome },
    { title: "My Routes", url: "/routes", icon: FaRoute },
    { title: "Bus Schedule", url: "/schedule", icon: FaBus },
    { title: "Notifications", url: "/notifications", icon: FaBell },
    { title: "Payment History", url: "/payments", icon: FaMoneyBillWave },
  ],
  parent: [
    { title: "Dashboard", url: "/dashboard", icon: FaHome },
    { title: "Children Routes", url: "/children-routes", icon: FaRoute },
    { title: "Bus Tracking", url: "/bus-tracking", icon: FaBus },
    { title: "Notifications", url: "/notifications", icon: FaBell },
    { title: "Payment Management", url: "/payments", icon: FaMoneyBillWave },
  ],
  school: [
    { title: "Dashboard", url: "/dashboard", icon: FaHome },
    { title: "Student Management", url: "/students", icon: FaUserGraduate },
    { title: "Route Planning", url: "/route-planning", icon: FaRoute },
    { title: "Bus Schedules", url: "/schedules", icon: FaCalendarAlt },
    { title: "Transport Analytics", url: "/analytics", icon: FaChartBar },
    { title: "Settings", url: "/settings", icon: FaCog },
  ],
  TransportCompany: [
    { title: "Dashboard", url: "/dashboard", icon: FaHome },
    { title: "Fleet Management", url: "/fleet", icon: FaBus },
    { title: "Driver Management", url: "/drivers", icon: FaUserTie },
    { title: "Route Optimization", url: "/route-optimization", icon: FaRoute },
    { title: "Schedule Planning", url: "/scheduling", icon: FaCalendarAlt },
    { title: "Analytics", url: "/analytics", icon: FaChartBar },
    { title: "Cost Management", url: "/costs", icon: FaMoneyBillWave },
  ]
};

// Role selection options
const roleOptions = [
  { label: "Student", value: "student" },
  { label: "Parent", value: "parent" },
  { label: "School", value: "school" },
  { label: "Transport Company", value: "TransportCompany" }
];

export function AppSidebar() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/signin";
  };
  const [user, setUser] = useState<any>();
  const [isMounted, setIsMounted] = useState(false);
  const [role, setRole] = useState<Role>("student");
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleRoleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = event.target.value as Role;
    setRole(value);
    localStorage.setItem("userRole", value);
  };

  const handleGetProfile = async (token: string) => {
    try {
      const res = await axios.get("/api/v1/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.user) {
        setUser(res.data.user);
        // If role is stored in user data, set it here
        if (res.data.user.role) {
          setRole(res.data.user.role as Role);
        }
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: res.data.user.email,
            name: res.data.user.name,
            token: token,
          })
        );
      }
    } catch (err) {
      handleLogout();
      toast.error("Login session expired. Please login again.");
      router.push("/signin");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      const token = user ? JSON.parse(user).token : null;
      const savedRole = localStorage.getItem("userRole") as Role | null;
      
      if (savedRole) {
        setRole(savedRole);
      }

      if (token) {
        // Uncomment when API is ready
        // handleGetProfile(token);
      } else {
        // Uncomment when enforcing authentication
        // handleLogout();
        // toast.error("Login session expired. Please login again.");
        // router.push("/signin");
      }
    }
  }, []);

  if (!isMounted) return null;

  // Get menu items based on current role
  const currentMenuItems = roleBasedMenuItems[role] || [];
  return (
    <Sidebar className="text-white">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
          <div className="space-y-4">
              <h1 className="text-2xl font-bold text-white">eduMove</h1>
              
          
              
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
            <div className="px-2 relative">
                <label className="block text-sm font-medium mb-1 text-white">Switch Role</label>
                <div className="relative">
                  <select
                    name="role-selector"
                    id="role-selector"
                    value={role}
                    onChange={handleRoleChange}
                    className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-md py-2 pl-3 pr-8 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-opacity-20 transition-all"
                  >
                    <option value="student">Student</option>
                    <option value="parent">Parent</option>
                    <option value="school">School</option>
                    <option value="TransportCompany">Transport Company</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <FaAngleDown className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>
              {currentMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <span
                             className="w-full bg-white bg-opacity-10 border border-white border-opacity-20 rounded-md py-2 pl-3 pr-8 fixed bottom-0 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-opacity-20 transition-all"
          onClick={handleLogout}
        >
          Logout
        </span>
      </SidebarContent>
    </Sidebar>
  );
}