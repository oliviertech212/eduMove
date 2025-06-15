'use client';

import React from 'react';
import { FaBus, FaRoute, FaChartLine, FaUsers } from 'react-icons/fa';

const AboutUsPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center mt-14">About EduMove</h1>
      
      <div className="max-w-4xl mx-auto">
        <p className="text-lg mb-8 text-center">
          EduMove is a revolutionary platform transforming student transportation management. 
          We're dedicated to creating a safer, more efficient, and equitable transport system for students.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <FaBus className="text-2xl text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold">Our Mission</h2>
            </div>
            <p className="text-gray-600">
              To revolutionize student transportation by providing a centralized platform that ensures safe, 
              efficient, and equitable access to education through reliable transport services.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <FaRoute className="text-2xl text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold">Our Vision</h2>
            </div>
            <p className="text-gray-600">
              To become the leading platform in student transportation management, 
              connecting schools, parents, and transport providers for seamless student mobility.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md mb-12">
          <h2 className="text-2xl font-bold mb-6">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <FaChartLine className="text-2xl text-blue-600 mr-3 mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Route Optimization</h3>
                <p className="text-gray-600">
                  Smart route planning and cost calculation for efficient student transportation.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <FaUsers className="text-2xl text-blue-600 mr-3 mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Real-time Tracking</h3>
                <p className="text-gray-600">
                  Live updates and notifications for parents and schools about student transportation.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Join us in transforming student transportation for a better future.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage; 