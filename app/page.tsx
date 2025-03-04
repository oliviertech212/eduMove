

"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { LandingPage } from "./_components/landing-page";
import { ParallaxScene } from "./_components/ParallaxScene";
import { useParallax } from "react-scroll-parallax";
import { Toaster } from "@/components/ui/sonner"
export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("userRole", "TransportCompany");
     
    }
  }, []);
  return (
    <div
      className="font-clash text-center   min-h-screen  pb-20 "
    >
     
     <ParallaxScene />
    </div>
  );
}








