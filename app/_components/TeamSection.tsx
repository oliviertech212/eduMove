'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Phone, Mail, Linkedin, Github, ArrowUp, ArrowDown } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  phone: string;
  email: string;
  bio: string;
  linkedin?: string;
  github?: string;
}

interface TeamSectionProps {
  onNavigate?: (section: number) => void;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Olivier GANISHURI",
    role: "Software Engineer & Project Manager",
    image: "/images/team/oliviertech.jpg",
    phone: "+250 784 448 194",
    email: "olivier@edumove.com",
    bio: "Passionate about revolutionizing school transportation through technology. Leading the vision to make student transport safer, more efficient, and transparent.",
    linkedin: "https://www.linkedin.com/in/olivier-ganishuri-279aaa240/",
    github: "https://github.com/oliviertech212"
  },
  {
    id: 2,
    name: "NDUNGUTSE TUYIZERE Eric",
    role: "Software Engineer & System Analyst",
    image: "/images/team/eric.png",
    phone: "+250 785 283 007",
    email: "eric@edumove.com",
    bio: "Experienced software engineer with a focus on building scalable, user-friendly applications. Driving the technical innovation behind EduMove's platform.",
    linkedin: "",
    github: "https://github.com/ericndungutse"
  },
  {
    id: 3,
    name: "Fiston DUSHIMIMANA",
    role: "Operations Manager",
    image: "/images/team/fiston.jpeg",
    phone: "+250 784 834 058",
    email: "fiston@edumove.com",
    bio: "Dedicated to ensuring smooth operations and excellent customer service. Managing partnerships with schools and transport companies across Rwanda.",
   
  }
];

export const TeamSection = ({ onNavigate }: TeamSectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 font-clash"
          >
            Meet Our Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            The passionate individuals behind EduMove, working together to transform school transportation in Rwanda
          </motion.p>
        </motion.div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ 
                opacity: 0, 
                y: 100, 
                rotateY: index % 2 === 0 ? -15 : 15,
                scale: 0.8
              }}
              whileInView={{ 
                opacity: 1, 
                y: 0, 
                rotateY: 0,
                scale: 1
              }}
              viewport={{ once: true, amount: 0.3 }}
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
              className="group relative bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Member Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                viewport={{ once: true }}
                className="relative h-80 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                {member.image.startsWith('data:') ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                )}
                
                {/* Social Links Overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }}
                  viewport={{ once: true }}
                  className="absolute bottom-4 left-4 right-4 z-20 flex gap-3"
                >
                  {member.linkedin && (
                    <motion.a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
                    >
                      <Linkedin className="w-5 h-5 text-white" />
                    </motion.a>
                  )}
                  {member.github && (
                    <motion.a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/30 transition-colors"
                    >
                      <Github className="w-5 h-5 text-white" />
                    </motion.a>
                  )}
                </motion.div>
              </motion.div>

              {/* Member Info */}
              <div className="p-6">
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors"
                >
                  {member.name}
                </motion.h3>
                
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-blue-600 font-semibold mb-4"
                >
                  {member.role}
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                  viewport={{ once: true }}
                  className="text-gray-600 mb-6 leading-relaxed"
                >
                  {member.bio}
                </motion.p>

                {/* Contact Information */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.2 }}
                  viewport={{ once: true }}
                  className="space-y-3"
                >
                  {member.phone && (
                    <motion.a
                      href={`tel:${member.phone}`}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors group/contact"
                    >
                      <div className="p-2 bg-blue-100 rounded-full group-hover/contact:bg-blue-200 transition-colors">
                        <Phone className="w-4 h-4" />
                      </div>
                      <span className="text-sm">{member.phone}</span>
                    </motion.a>
                  )}
                  
                  {member.email && (
                    <motion.a
                      href={`mailto:${member.email}`}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors group/contact"
                    >
                      <div className="p-2 bg-purple-100 rounded-full group-hover/contact:bg-purple-200 transition-colors">
                        <Mail className="w-4 h-4" />
                      </div>
                      <span className="text-sm">{member.email}</span>
                    </motion.a>
                  )}
                </motion.div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute top-8 right-8 w-2 h-2 bg-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100" />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-16 hidden"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 mb-8"
          >
            Want to join our mission? We're always looking for passionate individuals to help us grow.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Join Our Team
          </motion.button>
        </motion.div>

        {/* Navigation Buttons */}
        {onNavigate && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center gap-4 mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate(0)}
              className="flex items-center gap-2 bg-white text-gray-700 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              <ArrowUp className="w-5 h-5" />
              Back to Top
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate(4)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Expectations
              <ArrowDown className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}; 