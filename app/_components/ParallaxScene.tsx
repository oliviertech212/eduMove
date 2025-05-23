'use client';
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import { useRef } from "react";
import { Header } from "./landing-page";
import { IParallax } from "@react-spring/parallax";
import Link from "next/link";

export const ParallaxScene = () => {
    const ref = useRef<IParallax>(null);

    return (
        <Parallax pages={4} ref={ref} className="w-full h-screen overflow-hidden">
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
                <div className="relative w-full h-full">
                    <img
                        src="/images/edmoovebusandvolcanoes.png"
                        alt="Hero Background"
                        className="absolute inset-0  w-full h-full  object-fill"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 font-clash text-center">
                            Transforming School Transportation
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 max-w-3xl text-center">
                            Despite improvements in student transport management, the current system remains inefficient, costly, and unsafe due to the lack of a centralized, data-driven approach.
                        </p>
                        <div className="flex gap-10"> 
                        <button 
                            onClick={() => ref.current?.scrollTo(1)}
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
                    </div>
                </div>
            </ParallaxLayer>

            {/* Stakeholders Section */}
            <ParallaxLayer
                offset={1}
                speed={0.4}
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1
                }}
            >
                <div className="max-w-5xl mx-auto px-6 py-12">
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
                offset={2}
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
                offset={3}
                speed={0.5}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <div className="relative w-full h-screen">
                    <img
                        src="/images/edumovemanybusonroadshowconnection.png"
                        alt="Network Background"
                        className="absolute inset-0 w-full h-full object-fill"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4">
                        <h2 className="text-4xl font-bold mb-8 font-clash">Our Growing Network</h2>
                        <p className="text-xl mb-12 max-w-3xl text-center">
                            Join our extensive network of schools, transporters, and parents working together to create a better transportation experience.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="text-4xl font-bold mb-2">100+</div>
                                <div className="text-gray-300">Schools</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold mb-2">500+</div>
                                <div className="text-gray-300">Routes</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold mb-2">50+</div>
                                <div className="text-gray-300">Transporters</div>
                            </div>
                            <div className="text-center">
                                <div className="text-4xl font-bold mb-2">10k+</div>
                                <div className="text-gray-300">Students</div>
                            </div>
                        </div>
                    </div>
                </div>
            </ParallaxLayer>
        </Parallax>
    );
};



