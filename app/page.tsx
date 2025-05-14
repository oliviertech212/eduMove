"use client";

import { useEffect, useState } from "react";
import { ParallaxScene } from "./_components/ParallaxScene";
import { Toaster } from "@/components/ui/sonner"

export default function Home() {
  const [isFixed, setIsFixed] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined" && window.scrollY > 24) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userRole", "transporter");
    }
  }, []);

  return (
    <div className="font-clash min-h-screen">
      <ParallaxScene />
      <Toaster />
    </div>
  );
}








