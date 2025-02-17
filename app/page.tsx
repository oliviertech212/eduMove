

"use client";

import Image from "next/image";
import { useRef } from "react";
import { LandingPage } from "./_components/landing-page";
import { ParallaxScene } from "./_components/ParallaxScene";
import { useParallax } from "react-scroll-parallax";

export default function Home() {
  return (
    <div
      className="font-clash text-center   min-h-screen  pb-20 "
    >
     <ParallaxScene />
    </div>
  );
}








