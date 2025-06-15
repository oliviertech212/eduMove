'use client';

import React from 'react';
import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ContactPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-center mt-14"
      >
        Contact Us
      </motion.h1>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        <motion.p variants={itemVariants} className="text-lg mb-8 text-center">
          Have questions or need assistance? We're here to help! 
          Reach out to us through any of the following channels.
        </motion.p>

        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center mb-4">
              <FaEnvelope className="text-2xl text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold">Email Us</h2>
            </div>
            <p className="text-gray-600 mb-2">
              For general inquiries and support:
            </p>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href="mailto:edumovesupport@yopmail.com" 
              className="text-blue-600 hover:text-blue-800 font-medium inline-block"
            >
              edumovesupport@yopmail.com
            </motion.a>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center mb-4">
              <FaWhatsapp className="text-2xl text-green-600 mr-3" />
              <h2 className="text-xl font-semibold">WhatsApp</h2>
            </div>
            <p className="text-gray-600 mb-2">
              For immediate assistance:
            </p>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href="https://wa.me/250784448194" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-800 font-medium inline-block"
            >
              +250 784 448 194
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="bg-white p-8 rounded-lg shadow-md mb-12"
        >
          <h2 className="text-2xl font-bold mb-6">Business Hours</h2>
          <motion.div 
            whileHover={{ x: 10 }}
            className="flex items-center mb-4"
          >
            <FaClock className="text-2xl text-blue-600 mr-3" />
            <div>
              <p className="text-gray-600">
                Monday - Friday: 8:00 AM - 6:00 PM
              </p>
              <p className="text-gray-600">
                Saturday: 9:00 AM - 2:00 PM
              </p>
              <p className="text-gray-600">
                Sunday: Closed
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="text-center"
        >
          <p className="text-gray-600 mb-4">
            We typically respond to all inquiries within 24 hours during business days.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactPage; 