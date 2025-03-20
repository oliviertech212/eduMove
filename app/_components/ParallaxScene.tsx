
'use client';
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import Image from "next/image";

import { useSpring, animated } from "@react-spring/web";
import { useEffect, useRef, useState } from "react";
import { Header, LandingPage } from "./landing-page";
import { IParallax } from "@react-spring/parallax";

export const ParallaxScene = () => {
    // const  ref= useRef<HTMLDivElement>(null);
    const ref = useRef<IParallax>(null);
    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
          if (ref.current && ref.current.current > 24) {
              setIsFixed(true);
              console.log("Scrolled in Parallax");
          } else {
              setIsFixed(false);
          }
      };
  
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  

   
  return (
    // <Parallax pages={7}  ref={ref} 
    
    //  style={{ padding: "" }}
    //  className=" !m-auto  !w-[100%] !h-[100%] !overflow-hidden relative text-center"
    // > 
    // <Parallax pages={7} ref={ref} className="w-full h-screen">
  <Parallax pages={8} ref={ref} className="w-full h-screen overflow-hidden">

      {/* <LandingPage /> */}
      <Header  />
      <ParallaxLayer
      sticky={{ start: 0.9, end: 2.5}}
        >
        {/* <Image
          src="/images/sun.jpeg" 
          alt="Globe"
          width={200}
          height={200}
        /> */}
        </ParallaxLayer>
     
     
        <ParallaxLayer
  offset={0}
  factor={2}
  speed={1}
  style={{
    zIndex: 1,
    display: "flex",
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Center vertically
    backgroundColor:  "transparent"
  }}
>
  {/* Container for the image */}
  <div
    style={{
      width: "70%", 
      maxWidth: "800px",
      height: "500px", 
      // position: "relative", 
    }}
  >
    <Image
      src="/images/rwandaflatmap.png"
      alt="Rwanda Flat Map"
      width={800}
      height={500}
      style={{

        objectFit: "cover", 
        objectPosition: "center", 
      }}
    />
  </div>
</ParallaxLayer>
      


<ParallaxLayer
  factor={4}
  offset={2}
  speed={2.5}
  style={{
    width: "90%",
    maxWidth: "100%",
    height: "500px",
    position: "relative",
    margin: "0 auto",
    filter: "blur(3px)",
    backgroundColor: "red",
    backgroundImage: "url('/images/dashboard.png')",
    backgroundSize: "cover",
    
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
  className="text-4xl font-bold text-white rounded-xl"
>
</ParallaxLayer>




       <ParallaxLayer  offset={0.2} speed={0.005} style={{ zIndex: 2   , }}
        onClick={() => ref.current?.scrollTo(3)}
       
       >
       <h1 className="text-3xl align-middle font-sm text-primary px-0  mx-auto sm:w-[95%] ">
       Despite improvements in student transport management, the current system remains inefficient, costly, and unsafe due to the lack of a centralized, data-driven approach. Students still experience

       EduMove aims to fill this gap by implementing an Intelligent Transport System (ITS) that leverages real-time data to optimize bus allocation, route planning, and safety measures, while also providing stakeholders with real-time tracking of student arrivals.


         </h1>
       </ParallaxLayer>

       <ParallaxLayer offset={3.2} speed={2} style={{ zIndex: 2 ,  backgroundImage: "url('/images/dashboard.png')",
          backgroundSize:"cover",
            backgroundPosition: "center",
            width: "70%",
            height: "500px",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            filter: "blur(3px)",
            backgroundRepeat: "no-repeat" }}
            className="text-4xl font-bold ml-[10%] !text-white  rounded-xl"
       
        onClick={() => ref.current?.scrollTo(0)}
       
       >
       <div>
       <h1 className="text-4xl font-bold text-primary">Edumove is bringing solution for you centralized Intelligent Transport System for managing student transportation effectively and equitably.</h1>
       </div>
       </ParallaxLayer>


{/* additional  */}
       <ParallaxLayer offset={5.2} speed={5} style={{ zIndex: 2 ,  backgroundImage: "url('/images/dashboard.png')",
          backgroundSize:"cover",
            backgroundPosition: "center",
            width: "90%",
            height: "500px",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          
            backgroundRepeat: "no-repeat" }}
            className="text-4xl font-bold ml-[10%] !text-white  rounded-xl"
       
        onClick={() => ref.current?.scrollTo(0)}
       
       >
      
       </ParallaxLayer>



      {/* <ParallaxLayer offset={4} speed={0.10} style={{ zIndex: 2 }}>
        <Image
          src="/images/dashboard.png" 
          alt="Globe"
          width={200}
          height={200}
        /> 
      </ParallaxLayer> */}

      <ParallaxLayer
  offset={1}
  speed={0.02}
  style={{
    zIndex: 2,
    backgroundImage: "url('/images/hills.jpeg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
  className=" sm:ml-[10%] p-2 relative sm:p-20 rounded-xl max-w-fit max-h-fit overflow-hidden"
>
 
  <div style={{ position: "relative", zIndex: 10 }}>
    <Image
      src="/images/schoolbus.webp"
      alt="School Bus"
      width={300}
      height={150}
      className="fixed -bottom-8 right-0"
    />
  </div>

 
  <div className="text-white z-20 text-xl" style={{ position: "relative", zIndex: 20 }}>
    <h1 className="underline">Centralized platform</h1>
    <ul className="!list-disc text-left">
      <li>To calculate optimal routes and travel costs for direct and efficient travel.</li>
      <li>To notify schools, parents, and transport authorities of student departure and arrival.</li>
      <li>To aggregate and analyze transport data for better decision-making.</li>
      <li>To ensure equitable transport access to underserved locations.</li>
    </ul>
  </div>
</ParallaxLayer>


      {/* Students Layer */}
      <ParallaxLayer offset={1.5} speed={3} style={{ zIndex: 4, }}
      
       className="flex justify-center items-center"
      >
      

<div className="text-xl w-fit mx-auto bg-background rounded-xl sm:p-20">
        <h1 className="text-4xl font-bold text-primary">Your Expectations </h1>
        <ul className="list-disc list-inside  ">
            <li className="">
                <strong>Route Optimization</strong>
                <ul className="list-disc list-inside ml-5 text-left ">
                    <li>Direct travel calculations to minimize bus changes.</li>
                    <li>Cost estimation for students.</li>
                </ul>
            </li>
            <li>
                <strong>Real-Time Notifications</strong>
                <ul className="list-disc list-inside ml-5 text-left">
                    <li>Alerts for departure and arrival times.</li>
                    <li>Emergency notifications for delays.</li>
                </ul>
            </li>
            <li>
                <strong>Dynamic Bus Scheduling</strong>
                <ul className="list-disc list-inside ml-5 text-left">
                    <li>Data-driven scheduling to match demand with availability.</li>
                    <li>Prioritize underserved locations.</li>
                </ul>
            </li>
            <li>
                <strong>Data Analytics</strong>
                <ul className="list-disc list-inside ml-5 text-left">
                    <li>Visual dashboards for transport insights.</li>
                    <li>Predictive models for future resource needs.</li>
                </ul>
            </li>
        </ul>
    </div>
      </ParallaxLayer>

    

      {/* <ParallaxLayer offset={1.5} speed={3} style={{ zIndex: 4, textAlign: "center" }}> */}
      <ParallaxLayer offset={2} speed={0.5} style={{ zIndex: 5, textAlign: "center" }}>
    <div className="text-xl w-fit mx-auto">
        <h1 className="text-4xl font-bold text-primary">Your Expectations </h1>
        <ul className="list-disc list-inside  ">
            <li className="">
                <strong>Route Optimization</strong>
                <ul className="list-disc list-inside ml-5 text-left ">
                    <li>Direct travel calculations to minimize bus changes.</li>
                    <li>Cost estimation for students.</li>
                </ul>
            </li>
            <li>
                <strong>Real-Time Notifications</strong>
                <ul className="list-disc list-inside ml-5 text-left">
                    <li>Alerts for departure and arrival times.</li>
                    <li>Emergency notifications for delays.</li>
                </ul>
            </li>
            <li>
                <strong>Dynamic Bus Scheduling</strong>
                <ul className="list-disc list-inside ml-5 text-left">
                    <li>Data-driven scheduling to match demand with availability.</li>
                    <li>Prioritize underserved locations.</li>
                </ul>
            </li>
            <li>
                <strong>Data Analytics</strong>
                <ul className="list-disc list-inside ml-5 text-left">
                    <li>Visual dashboards for transport insights.</li>
                    <li>Predictive models for future resource needs.</li>
                </ul>
            </li>
        </ul>
    </div>
</ParallaxLayer>
    </Parallax>
  );
};



