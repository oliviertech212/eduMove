

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Header, LandingPage } from "./_components/landing-page";
import { ParallaxScene } from "./_components/ParallaxScene";
import { useParallax } from "react-scroll-parallax";
import { Toaster } from "@/components/ui/sonner"
export default function Home() {
  const [isFixed, setIsFixed] = useState(false);
  useEffect(() => {
      const handleScroll = () => {
        if (typeof window !== "undefined" && window.scrollY > 24) {
          setIsFixed(true);
          console.log("scrolled");
          
        } else {
          console.log("scrolled not");
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
      localStorage.setItem("userRole", "TransportCompany");
     
    }
  }, []);
  return (
    // <div
    //   className="font-clash text-center   min-h-screen  pb-20 "
    // >
      <div className="font-clash text-center min-h-screen overflow-auto">

     <Header/>
     <ParallaxScene />
    </div>
  );
}








