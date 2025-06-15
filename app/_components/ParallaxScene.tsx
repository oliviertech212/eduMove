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
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from "next/navigation";

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

    const router = useRouter();


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
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="relative w-[100%] h-[100vh]"
                >
                    <Image
                        src="/images/busmauntain.png"
                        alt="Hero Background"
                        fill
                        className="object-fill" 
                        priority
                        quality={100}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyuzxvzQlU2X1haLJlLBfZnfcYfJ2/ZsOcEPE5sVx6WnvIXKoNgMYnJ2l5HlNzOxTFGSDX9sA1ZkGpCVWGgRD8nWmVLzXw=="
                    />
                    <div className="absolute inset-0 bg-black/50" />
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4"
                    >
                        <motion.h1 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl md:text-7xl font-bold mb-6 font-clash text-center"
                        >
                            Transforming School Transportation
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-xl md:text-2xl mb-8 max-w-3xl text-center"
                        >
                            Despite improvements in student transport management, the current system remains inefficient, costly, and unsafe due to the lack of a centralized, data-driven approach.
                        </motion.p>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex gap-10"
                        >
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => ref.current?.scrollTo(2)}
                                className="bg-primary hover:bg-primary/90 text-white px-3 md:px-8 py-3 rounded-full md:text-lg font-semibold transition-all"
                            >
                                Learn More
                            </motion.button>
                            <motion.button 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-primary hover:bg-primary/90 text-white px-3 md:px-8 py-3 rounded-full md:text-lg font-semibold transition-all"
                                onClick={() => router.push('/plans')}
                            >
                                <Link href="/plans" className="flex items-center gap-3 hover:translate-z-5">
                                    Book a Ticket
                                </Link>
                            </motion.button>
                        </motion.div>
                        
                        <motion.button 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            whileHover={{ scale: 1.05 }}
                            onClick={() => ref.current?.scrollTo(1)}
                            className="mt-8 text-white/90 hover:text-white underline text-lg transition-all"
                        >
                            Verify Travel Number →
                        </motion.button>
                    </motion.div>
                </motion.div>
            </ParallaxLayer>

{/* <ParallaxLayer
                offset={0}
                speed={0.5}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div className="relative w-[100%] h-[100vh]">
                    <Image
                        src="/images/busmauntain.png"
                        alt="Hero Background"
                        fill
                        className="object-fill" 
                        priority
                        quality={100}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyuzxvzQlU2X1haLJlLBfZnfcYfJ2/ZsOcEPE5sVx6WnvIXKoNgMYnJ2l5HlNzOxTFGSDX9sA1ZkGpCVWGgRD8nWmVLzXw=="
                    />
                    <div className="absolute inset-0 bg-black/50" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4">
                        <motion.h1 
                            initial={{ opacity: 0, y: 100, scale: 0.8 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 1, type: "spring", stiffness: 100 }}
                            className="text-3xl md:text-7xl font-bold mb-6 font-clash text-center"
                        >
                            Transforming School Transportation
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-xl md:text-2xl mb-8 max-w-3xl text-center"
                        >
                            Despite improvements in student transport management, the current system remains inefficient, costly, and unsafe due to the lack of a centralized, data-driven approach.
                        </motion.p>
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex gap-10"
                        > 
                            <motion.button 
                                whileHover={{ scale: 1.05, rotate: 1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => ref.current?.scrollTo(2)}
                                className="bg-primary hover:bg-primary/90 text-white px-3 md:px-8 py-3 rounded-full md:text-lg font-semibold transition-all"
                            >
                                Learn More
                            </motion.button>
                            <motion.button 
                                whileHover={{ scale: 1.05, rotate: -1 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-primary hover:bg-primary/90 text-white px-3 md:px-8 py-3 rounded-full md:text-lg font-semibold transition-all"
                            >
                                <Link href="/plans" className="flex items-center gap-3 hover:translate-z-5">
                                    Book a Ticket
                                </Link>
                            </motion.button>
                        </motion.div>
                        
                        <motion.button 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ duration: 0.8, delay: 0.9 }}
                            whileHover={{ x: 10 }}
                            onClick={() => ref.current?.scrollTo(1)}
                            className="mt-8 text-white/90 hover:text-white underline text-lg transition-all"
                        >
                            Verify Travel Number →
                        </motion.button>
                    </div>
                </div>
            </ParallaxLayer> */}

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
                            <motion.div 
                                initial={{ opacity: 0, rotateX: -20 }}
                                whileInView={{ opacity: 1, rotateX: 0 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{ duration: 0.8, type: "spring" }}
                                className="text-center mb-8"
                            >
                                <motion.h2 
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: false, amount: 0.3 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="text-4xl font-bold text-primary mb-4 font-clash"
                                >
                                    Travel Verification Portal
                                </motion.h2>
                                <motion.p 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: false, amount: 0.3 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    className="text-xl text-gray-600"
                                >
                                    Quickly verify student travel details using their travel number
                                </motion.p>
                            </motion.div>
                            
                            <motion.div 
                                initial={{ opacity: 0, y: 50, rotateY: -10 }}
                                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className="bg-white p-8 rounded-2xl shadow-xl"
                            >
                                <motion.h3 
                                    initial={{ opacity: 0, x: -30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: false, amount: 0.3 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    className="text-2xl font-semibold mb-6 text-primary"
                                >
                                    Verify Student by Travel Number
                                </motion.h3>
                                
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: false, amount: 0.3 }}
                                    transition={{ duration: 0.6, delay: 0.7 }}
                                    className="flex flex-col md:flex-row md:items-end gap-4 mb-6"
                                >
                                    <div className="flex-1">
                                        <form onSubmit={handleManualTravelNumberVerify} className="flex flex-col gap-3">
                                            <motion.label 
                                                initial={{ opacity: 0, y: 10 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: false, amount: 0.3 }}
                                                transition={{ duration: 0.4, delay: 0.8 }}
                                                htmlFor="travel-number-input" 
                                                className="font-medium text-gray-700"
                                            >
                                                Enter Travel Number Manually
                                            </motion.label>
                                            <motion.div 
                                                initial={{ opacity: 0, x: -20 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: false, amount: 0.3 }}
                                                transition={{ duration: 0.6, delay: 0.9 }}
                                                className="flex"
                                            >
                                                <input
                                                    id="travel-number-input"
                                                    type="text"
                                                    value={travelNumberInput}
                                                    onChange={(e) => setTravelNumberInput(e.target.value)}
                                                    placeholder="Enter travel number (e.g., TR-823515-1900)"
                                                    className="flex-1 p-3 border-2 border-gray-200 rounded-l-lg focus:border-primary focus:outline-none text-lg"
                                                    disabled={loading}
                                                />
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    type="submit"
                                                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-r-lg font-medium transition-colors disabled:opacity-50"
                                                    disabled={loading || !travelNumberInput.trim()}
                                                >
                                                    {loading ? 'Verifying...' : 'Verify'}
                                                </motion.button>
                                            </motion.div>
                                        </form>
                                    </div>
                                </motion.div>

                                {/* Travel Number Verification Result */}
                                {mytravels && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.8, rotateX: 20 }}
                                        whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                                        viewport={{ once: false, amount: 0.3 }}
                                        transition={{ duration: 0.6, type: "spring" }}
                                        className="p-6 rounded-xl bg-green-50 border border-green-200"
                                    >
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
                                    </motion.div>
                                )}
                            </motion.div>
                            
                            <motion.div 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{ duration: 0.6, delay: 1.1 }}
                                className="text-center mt-8"
                            >
                                <motion.button 
                                    whileHover={{ scale: 1.05, rotate: 2 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => ref.current?.scrollTo(2)}
                                    className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full text-lg font-semibold transition-all"
                                >
                                    Continue Exploring →
                                </motion.button>
                            </motion.div>
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
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: false }}
                    className="max-w-5xl mx-auto px-6 py-12 bg-primary bg-opacity-20 rounded-xl"
                >
                    <motion.h2 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: false }}
                        className="text-3xl sm:text-4xl font-bold text-primary mb-8 text-center"
                    >
                        Making Transportation Better For Everyone
                    </motion.h2>
                    
                    <div className="flex flex-col md:flex-row gap-10 items-center mb-16">
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: false }}
                            className="w-full md:w-1/2"
                        >
                            <motion.div 
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                                className="h-[350px]"
                            >
                                <img
                                    src="/images/edumovetwopepleorganizationtalkingaboutit.png"
                                    alt="EduMove Stakeholders"
                                    className="w-full h-full object-fill rounded-xl"
                                />
                            </motion.div>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            viewport={{ once: false }}
                            className="w-full md:w-1/2"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    {
                                        title: "For Students",
                                        description: "Reduced travel time and stress with reliable transportation"
                                    },
                                    {
                                        title: "For Parents",
                                        description: "Peace of mind through real-time tracking and notifications"
                                    },
                                    {
                                        title: "For Schools",
                                        description: "Better attendance and reduced administrative burden"
                                    },
                                    {
                                        title: "For Communities",
                                        description: "More equitable access to education and reduced traffic"
                                    }
                                ].map((item, index) => (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                                        viewport={{ once: false }}
                                        whileHover={{ 
                                            scale: 1.05,
                                            boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)"
                                        }}
                                        className="bg-white p-4 rounded-xl shadow-sm"
                                    >
                                        <h3 className="text-lg font-semibold text-primary mb-2">{item.title}</h3>
                                        <p className="text-gray-700">{item.description}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        viewport={{ once: false }}
                        className="bg-white rounded-2xl shadow-md p-8 text-center"
                    >
                        <motion.h3 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.9 }}
                            viewport={{ once: false }}
                            className="text-2xl font-bold text-primary mb-4"
                        >
                            Ready to transform student transportation?
                        </motion.h3>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 1 }}
                            viewport={{ once: false }}
                            className="text-gray-700 mb-6 max-w-2xl mx-auto"
                        >
                            Join schools across the country that are already benefiting from EduMove's intelligent transportation system.
                        </motion.p>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary/90 transition-colors"
                            onClick={() => router.push('/plans')}
                        >
                            Get Started Today
                        </motion.button>
                    </motion.div>
                </motion.div>
            </ParallaxLayer>


             <ParallaxLayer
                offset={3}
                speed={0.2}
                style={{
                    backgroundColor: '#ffffff',
                }}
            >
                <div className="container mx-auto px-4 py-20">
                    <motion.h2 
                        initial={{ opacity: 0, y: -50, rotateX: -30 }}
                        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                        viewport={{ once: false, amount: 0.3 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="text-4xl font-bold text-center mb-16 font-clash text-primary"
                    >
                        Your Expectations
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                image: "/images/edumovestudentwangbusonroad.png",
                                title: "Safe Transportation",
                                description: "Ensuring the safety of every student with our reliable transportation network."
                            },
                            {
                                image: "/images/edumoveonbusandshowconnectionstudentandinternet.png",
                                title: "Real-time Tracking",
                                description: "Stay connected with live updates and tracking of your child's journey."
                            },
                            {
                                image: "/images/edumovetwopepleorganizationtalkingaboutit.png",
                                title: "Expert Support",
                                description: "Dedicated support team to assist you with all your transportation needs."
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ 
                                    opacity: 0, 
                                    y: 100, 
                                    rotateY: index % 2 === 0 ? -20 : 20,
                                    scale: 0.8
                                }}
                                whileInView={{ 
                                    opacity: 1, 
                                    y: 0, 
                                    rotateY: 0,
                                    scale: 1
                                }}
                                viewport={{ once: false, amount: 0.3 }}
                                transition={{ 
                                    duration: 0.8, 
                                    delay: index * 0.2,
                                    type: "spring",
                                    stiffness: 100
                                }}
                                whileHover={{ 
                                    scale: 1.05, 
                                    rotateY: 5,
                                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                                }}
                                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
                            >
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: false, amount: 0.3 }}
                                    transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
                                    className="relative w-full aspect-[4/3] mb-6"
                                >
                                    <img
                                        src={feature.image}
                                        alt={feature.title}
                                        className="w-full h-full object-fill rounded-lg"
                                    />
                                </motion.div>
                                <motion.h3 
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: false, amount: 0.3 }}
                                    transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                                    className="text-2xl font-bold mb-4 text-primary"
                                >
                                    {feature.title}
                                </motion.h3>
                                <motion.p 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: false, amount: 0.3 }}
                                    transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                                    className="text-gray-600"
                                >
                                    {feature.description}
                                </motion.p>
                            </motion.div>
                        ))}
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
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative w-full h-screen"
                >
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
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4"
                    >
                        <motion.h2 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-4xl font-bold mb-8 font-clash"
                        >
                            Our Growing Network
                        </motion.h2>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-xl mb-12 max-w-3xl text-center"
                        >
                            Join our extensive network of schools, transporters, and parents working together to create a better transportation experience.
                        </motion.p>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-8"
                        >
                            {['Schools', 'Routes', 'Transporters', 'Students'].map((item, index) => (
                                <motion.div
                                    key={item}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                                    whileHover={{ scale: 1.1 }}
                                    className="text-center"
                                >
                                    <div className="text-gray-300 font-bold text-2xl">{item}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </motion.div>
            </ParallaxLayer>
        </Parallax>
    );
};