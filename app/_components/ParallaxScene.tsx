'use client';
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useRef, useState } from "react";
import { Header } from "./landing-page";
import { IParallax } from "@react-spring/parallax";
import Link from "next/link";
import { toast } from 'sonner';
import axios from "axios";
import { TravelBooking } from "@/types";
import Image from 'next/image';
const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'boarded': return 'text-green-500';
      case 'denied': return 'text-red-500';
      case 'pending': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

export const ParallaxScene = () => {
    const ref = useRef<IParallax>(null);
    const [travelNumberInput, setTravelNumberInput] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [mytravels, setMyTravels] = useState<TravelBooking>();

    const getAllTravelsBookings = async () => {
        try {
          setLoading(true);
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}travels/${travelNumberInput}`)
          console.log("bookings response from api", response.data);
          setMyTravels(response.data);
          
        } catch (error) {
          console.error('Error fetching bookings:', error);
          toast.error('Failed to load bookings. Please try again.');
        } finally {
          setLoading(false);
        }
      };

  // Handle manual travel number input
  const handleManualTravelNumberVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!travelNumberInput.trim()) {
      toast.error('Please enter a travel number');
      return;
    }
    getAllTravelsBookings();
    };

    return (
        <Parallax pages={5} ref={ref} className="w-full h-screen overflow-hidden">
            <Header />
            
            {/* Hero Section */}
            <ParallaxLayer
                offset={0}
                speed={0.5}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >

<div className="relative w-[100%]  h-[100vh]">
<Image
        // src="/images/edmoovebusandvolcanoes.png"
        src="/images/busmauntain.png"
        alt="Hero Background"
        fill
        className="object-fill" 
        priority
        // sizes="100vw"
        quality={100}
        // style={{ objectFit: 'cover', objectPosition: 'center' }}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyuzxvzQlU2X1haLJlLBfZnfcYfJ2/ZsOcEPE5sVx6WnvIXKoNgMYnJ2l5HlNzOxTFGSDX9sA1ZkGpCVWGgRD8nWmVLzXw=="
    />
  
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4">
                        <h1 className="text-3xl md:text-7xl font-bold mb-6 font-clash text-center">
                            Transforming School Transportation
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 max-w-3xl text-center">
                            Despite improvements in student transport management, the current system remains inefficient, costly, and unsafe due to the lack of a centralized, data-driven approach.
                        </p>
                        <div className="flex gap-10"> 
                            <button 
                                onClick={() => ref.current?.scrollTo(2)}
                                className="bg-primary hover:bg-primary/90 text-white px-3 md:px-8 py-3 rounded-full md:text-lg font-semibold transition-all"
                            >
                                Learn More
                            </button>
                            <button 
                                className="bg-primary hover:bg-primary/90 text-white px-3 md:px-8 py-3 rounded-full md:text-lg font-semibold transition-all"
                            >
                                <Link href="/plans" className="flex items-center gap-3 hover:translate-z-5">
                                    Book a Ticket
                                </Link>
                            </button>
                        </div>
                        
                        {/* Quick verification link */}
                        <button 
                            onClick={() => ref.current?.scrollTo(1)}
                            className="mt-8 text-white/90 hover:text-white underline text-lg transition-all"
                        >
                            Verify Travel Number →
                        </button>
                    </div>
                </div>
            </ParallaxLayer>

            {/* Travel Number Verification Section */}
            <ParallaxLayer
                offset={1}
                speed={0.3}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div className="relative w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100">
                    <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
                        <div className="max-w-4xl w-full">
                            <div className="text-center mb-8">
                                <h2 className="text-4xl font-bold text-primary mb-4 font-clash">
                                    Travel Verification Portal
                                </h2>
                                <p className="text-xl text-gray-600">
                                    Quickly verify student travel details using their travel number
                                </p>
                            </div>
                            
                            <div className="bg-white p-8 rounded-2xl shadow-xl">
                                <h3 className="text-2xl font-semibold mb-6 text-primary">Verify Student by Travel Number</h3>
                                
                                <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
                                    <div className="flex-1">
                                        <form onSubmit={handleManualTravelNumberVerify} className="flex flex-col gap-3">
                                            <label htmlFor="travel-number-input" className="font-medium text-gray-700">
                                                Enter Travel Number Manually
                                            </label>
                                            <div className="flex">
                                                <input
                                                    id="travel-number-input"
                                                    type="text"
                                                    value={travelNumberInput}
                                                    onChange={(e) => setTravelNumberInput(e.target.value)}
                                                    placeholder="Enter travel number (e.g., TR-823515-1900)"
                                                    className="flex-1 p-3 border-2 border-gray-200 rounded-l-lg focus:border-primary focus:outline-none text-lg"
                                                    disabled={loading}
                                                />
                                                <button
                                                    type="submit"
                                                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-r-lg font-medium transition-colors disabled:opacity-50"
                                                    disabled={loading || !travelNumberInput.trim()}
                                                >
                                                    {loading ? 'Verifying...' : 'Verify'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                {/* Travel Number Verification Result */}
                                {mytravels && (
                                    <div className="p-6 rounded-xl bg-green-50 border border-green-200">
                                        <h4 className="font-semibold mb-4 text-green-800 text-xl">✓ Verification Result:</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                            <div className="space-y-2">
                                                <p><span className="font-medium text-gray-700">Student:</span> <span className="text-gray-900">{mytravels.student.name}</span></p>
                                                <p><span className="font-medium text-gray-700">School:</span> <span className="text-gray-900">{mytravels.school.name}</span></p>
                                                <p><span className="font-medium text-gray-700">Guardian:</span> <span className="text-gray-900">{mytravels.guardian.name}</span></p>
                                            </div>
                                            <div className="space-y-2">
                                                <p><span className="font-medium text-gray-700">Travel Number:</span> <span className="text-gray-900 font-mono">{mytravels.travelNumber}</span></p>
                                                <p><span className="font-medium text-gray-700">Route:</span> <span className="text-gray-900">{mytravels.travelDetails.departure} → {mytravels.travelDetails.destination}</span></p>
                                                <p><span className="font-medium text-gray-700">Departure Time:</span> <span className="text-gray-900">{mytravels.travelDetails.departureTime}</span></p>
                                            </div>
                                        </div>
                                        
                                        <div className="pt-4 border-t border-green-200">
                                            <p className="text-lg">
                                                <span className="font-medium text-gray-700">Current Status:</span> 
                                                <span className={`ml-2 font-bold text-lg ${getStatusColor(mytravels.status)}`}>
                                                    {mytravels.status.toUpperCase()}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            <div className="text-center mt-8">
                                <button 
                                    onClick={() => ref.current?.scrollTo(2)}
                                    className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all"
                                >
                                    Continue Exploring →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </ParallaxLayer>

            {/* Stakeholders Section */}
            <ParallaxLayer
                offset={2}
                speed={0.4}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  
                }}
            >
                <div className="max-w-5xl mx-auto px-6 py-12 bg-primary bg-opacity-20 rounded-xl">
                    <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-8 text-center">
                        Making Transportation Better For Everyone
                    </h2>
                    
                    <div className="flex flex-col md:flex-row gap-10 items-center mb-16">
                        <div className="w-full md:w-1/2">
                            <div className="h-[350px]">
                                <img
                                    src="/images/edumovetwopepleorganizationtalkingaboutit.png"
                                    alt="EduMove Stakeholders"
                                    className="w-full h-full object-fill rounded-xl"
                                />


                            </div>
                        </div>
                        
                        <div className="w-full md:w-1/2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-white p-4 rounded-xl shadow-sm">
                                    <h3 className="text-lg font-semibold text-primary mb-2">For Students</h3>
                                    <p className="text-gray-700">Reduced travel time and stress with reliable transportation</p>
                                </div>
                                
                                <div className="bg-white p-4 rounded-xl shadow-sm">
                                    <h3 className="text-lg font-semibold text-primary mb-2">For Parents</h3>
                                    <p className="text-gray-700">Peace of mind through real-time tracking and notifications</p>
                                </div>
                                
                                <div className="bg-white p-4 rounded-xl shadow-sm">
                                    <h3 className="text-lg font-semibold text-primary mb-2">For Schools</h3>
                                    <p className="text-gray-700">Better attendance and reduced administrative burden</p>
                                </div>
                                
                                <div className="bg-white p-4 rounded-xl shadow-sm">
                                    <h3 className="text-lg font-semibold text-primary mb-2">For Communities</h3>
                                    <p className="text-gray-700">More equitable access to education and reduced traffic</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                        <h3 className="text-2xl font-bold text-primary mb-4">Ready to transform student transportation?</h3>
                        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">Join schools across the country that are already benefiting from EduMove's intelligent transportation system.</p>
                        <button className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary/90 transition-colors">
                            Get Started Today
                        </button>
                    </div>
                </div>
            </ParallaxLayer>

            {/* Features Section */}
            <ParallaxLayer
                offset={3}
                speed={0.2}
                style={{
                    backgroundColor: '#ffffff',
                }}
            >
                <div className="container mx-auto px-4 py-20">
                    <h2 className="text-4xl font-bold text-center mb-16 font-clash text-primary">Your Expectations</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
                            <div className="relative w-full aspect-[4/3] mb-6">
                                <img
                                    src="/images/edumovestudentwangbusonroad.png"
                                    alt="Safe Transportation"
                                    className="w-full h-full object-fill rounded-lg"
                                />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-primary">Safe Transportation</h3>
                            <p className="text-gray-600">Ensuring the safety of every student with our reliable transportation network.</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
                            <div className="relative w-full aspect-[4/3] mb-6">
                                <img
                                    src="/images/edumoveonbusandshowconnectionstudentandinternet.png"
                                    alt="Real-time Tracking"
                                    className="w-full h-full object-fill rounded-lg"
                                />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-primary">Real-time Tracking</h3>
                            <p className="text-gray-600">Stay connected with live updates and tracking of your child's journey.</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all">
                            <div className="relative w-full aspect-[4/3] mb-6">
                                <img
                                    src="/images/edumovetwopepleorganizationtalkingaboutit.png"
                                    alt="Expert Support"
                                    className="w-full h-full object-fill rounded-lg"
                                />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-primary">Expert Support</h3>
                            <p className="text-gray-600">Dedicated support team to assist you with all your transportation needs.</p>
                        </div>
                    </div>
                </div>
            </ParallaxLayer>

            {/* Network Section */}
            <ParallaxLayer
                offset={4}
                speed={0.5}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div className="relative w-full h-screen">
                    {/* <img
                        src="/images/edumovemanybusonroadshowconnection.png"
                        alt="Network Background"
                        className="absolute inset-0 w-full h-full object-fill"
                    /> */}
                    <Image
                        src="/images/edumovemanybusonroadshowconnection.png"
                        alt="Network Background"
                        fill
                        className="object-cover object-bottom"
                        priority
                        sizes="100vw"
                        quality={100}
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyuzxvzQlU2X1haLJlLBfZnfcYfJ2/ZsOcEPE5sVx6WnvIXKoNgMYnJ2l5HlNzOxTFGSDX9sA1ZkGpCVWGgRD8nWmVLzXw=="
                    />
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4">
                        <h2 className="text-4xl font-bold mb-8 font-clash">Our Growing Network</h2>
                        <p className="text-xl mb-12 max-w-3xl text-center">
                            Join our extensive network of schools, transporters, and parents working together to create a better transportation experience.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="text-center">
                                {/* <div className="text-4xl font-bold mb-2">100+</div> */}
                                <div className="text-gray-300">Schools</div>
                            </div>
                            <div className="text-center">
                                {/* <div className="text-4xl font-bold mb-2">500+</div> */}
                                <div className="text-gray-300">Routes</div>
                            </div>
                            <div className="text-center">
                                {/* <div className="text-4xl font-bold mb-2">50+</div> */}
                                <div className="text-gray-300">Transporters</div>
                            </div>
                            <div className="text-center">
                                {/* <div className="text-4xl font-bold mb-2">10k+</div> */}
                                <div className="text-gray-300">Students</div>
                            </div>
                        </div>
                    </div>
                </div>
            </ParallaxLayer>
        </Parallax>
    );
};